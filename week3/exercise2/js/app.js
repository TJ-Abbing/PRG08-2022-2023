const video = document.getElementById("webcam");
const label = document.getElementById("label");

const options = { numLabels: 3 };
// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', console.log('Model Loaded.'));
// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, options, console.log('The video is ready.'));

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainBtn = document.querySelector("#train");
const saveBtn = document.querySelector('#save');

labelOneBtn.addEventListener("click", () => {
    classifier.addImage('labelOne');
    console.log("Classified label one.");
});
labelTwoBtn.addEventListener("click", () => {
    classifier.addImage('labelTwo');
    console.log("Classified label two.");
});
labelThreeBtn.addEventListener("click", () => {
    classifier.addImage('labelThree');
    console.log("Classified label three.");
});
trainBtn.addEventListener("click", () => {
    train();
});
saveBtn.addEventListener("click", () => {
    save();
})

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

// Retrain the network
const train = () => {
    classifier.train((lossValue) => {
      console.log('Loss is', lossValue);
      if (lossValue === null) {
        console.log('Training completed.');
        classify();
      } else {
        console.log('Continuing training...');
      }
    });
};
  
const classify = () => {
    setInterval(() => {
        classifier.classify(video, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        label.innerHTML = result[0].label;
        });
    }, 1000);
};

const save = () => {
    featureExtractor.save()
    console.log("Model saved!")
};

label.innerText = "";