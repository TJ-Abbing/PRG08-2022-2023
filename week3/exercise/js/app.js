const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const video = document.getElementById("webcam");
const label = document.getElementById("label");
const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const classifybtn = document.querySelector("#classify");

label.innerText = "Ready when you are!";

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

function modelLoaded() {
    console.log('Model Loaded!')
    classifier = featureExtractor.classification(video, videoReady)
}
function videoReady(){
    console.log("the webcam is ready")
}

labelOneBtn.addEventListener("click", () => addLabel1())
function addLabel1() {
    classifier.addImage(video, 'label 1', ()=>{
        console.log("added an image for label 1 to model!")
    })
}

labelTwoBtn.addEventListener("click", () => addLabel2());
function addLabel2() {
    classifier.addImage(video, 'label 2', ()=>{
        console.log("added an image for label 2 to model!")
    })
}
labelThreeBtn.addEventListener("click", () => addLabel3());
function addLabel3() {
    classifier.addImage(video, 'label 3', ()=>{
        console.log("added an image for label 3 to model!")
    })
}

trainbtn.addEventListener("click", () => train());
function train(){
    console.log(`Training started.`)
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue)
        if(lossValue == null) console.log("Finished training.")
    })
}

classifybtn.addEventListener("click", () => startClassification());
function startClassification(){
    
    setInterval(()=>{
        classifier.classify(video, (err, result) => {
            if (err) console.log(err)
            console.log(result)
            label.innerHTML = result[0].label
        })
    }, 4000)
}