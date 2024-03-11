status="";
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status : detecting objects";
    value=document.getElementById("inputbox").value;
}

function modelLoaded()
{
    console.log("Model loaded");
    status=true;
}

function draw()
{
    image(video,0,0,480,380);
}