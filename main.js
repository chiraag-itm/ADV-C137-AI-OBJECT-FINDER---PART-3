video="";
status="";
objects=[];
object_name="";


function preload(){


}

function setup(){
canvas=createCanvas(500,400);
canvas.center();

video=createCapture(VIDEO);
video.hide();

}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
    }

function draw(){
    image(video,0,0,500,400);
    
    if (status!=""){
        objectDetector.detect(video,gotResults);

        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects:"+objects.length;
fill("#ff0000");
stroke("#ff0000");
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
text(objects[i].label+" "+floor(objects[i].confidence*100)+"%",objects[i].x+15,objects[i].y+15);
if(objects[i].label==object_name){
    video.stop();
    objectDetector.detect(gotResults);
    document.getElementById("status").innerHTML=object_name+" found";
    synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(object_name+" found");
    synth.speak(utterThis);
}
else{
    document.getElementById("status").innerHTML=object_name+" not found";
}
}
        }
    }


function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model loaded");
    status="true";
    

}

