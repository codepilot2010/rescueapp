status="";
objects=[];
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
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

    if(status!="")
    {
        objectDetector.detect(video,gotResult)
        for(i=0; i<objects.length;i++)
        {
            fill("royalblue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%"+objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("cyan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(value==objects[i].label)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML="status :"+value+" is found";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance("object found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("status").innerHTML=("status : "+value+" is not found")
            }
        }
    }
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else{
    console.log(results)
    objects=results
    }
}
