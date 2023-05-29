const image = document.getElementById("image");
const label = document.getElementById("label");

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  classifyImage();
}

// Make a prediction with a selected image
function classifyImage() {
  classifier.classify(image, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(results);
    const predictedLabel = results[0].label;
    label.innerText = predictedLabel;
    speak(predictedLabel); // Call the speak function with the predicted label
  });
}

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainBtn = document.querySelector("#train");

labelOneBtn.addEventListener("click", () => console.log("button 1"));
labelTwoBtn.addEventListener("click", () => console.log("button 2"));
labelThreeBtn.addEventListener("click", () => console.log("button 3"));

trainBtn.addEventListener("click", () => console.log("train"));

label.innerText = "Ready when you are!";

let synth = window.speechSynthesis;

function speak(text) {
  if (synth.speaking) {
    console.log('still speaking...');
    return;
  }
  if (text !== '') {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}

speak("One moment please. We are analyzing the image you've provided.");
