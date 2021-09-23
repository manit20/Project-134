status1 = "";
objects = [];
alarm = "";

function preload(){
    alarm = loadSound("Alarm_Sound.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Finding Baby";
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status1 != ""){
        r = random(100, 240);
        g = random(100, 240);
        b = random(100, 240);
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object[i].label == "person"){
                document.getElementById("status").innerHTML = "Status: Baby Found";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Status: Baby Not Found";
                alarm.play();
            }

            if(objects.length == ""){
                document.getElementById("status").innerHTML = "Status: Baby Not Found";
                alarm.play();
            }
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}