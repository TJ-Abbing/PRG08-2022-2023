const video = document.getElementById("webcam");
const texOutput = document.getElementById("textOutput");

const options = { numLabels: 3 };
// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', console.log('Model Loaded.'));
// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, options, console.log('The video is ready.'));

const labelBtns = ["labelRed", "labelBlue", "labelWhite"].map(label => {
  const btn = document.querySelector(`#${label}`);
  btn.addEventListener("click", () => {
    classifier.addImage(label);
    console.log(`Classified ${label}.`);
  });
  return btn;
});

document.querySelector('#train').addEventListener("click", () => {
  classifier.train((lossValue) => {
    console.log('Loss is', lossValue);
    if (lossValue === null) {
      console.log('Training completed.');
      // classify();
    } else {
      console.log('Continuing training...');
    }
  });
});

document.querySelector('#save').addEventListener("click", () => {
  featureExtractor.save();
  console.log("Model saved!");
});

document.querySelector('#load').addEventListener("click", () => {
  load();
});

document.querySelector('#play').addEventListener("click", () => {
  load();
  const randomIndex = Math.floor(Math.random() * labelBtns.length);
  const randomLabel = labelBtns[randomIndex].id;
  output = `Go and find; ${randomLabel}`;
  textOutput.innerHTML = output;
  console.log(output);

  // Store the generated label for comparison
  const generatedLabel = randomLabel;

  document.querySelector('#check').addEventListener("click", () => {
    classifier.classify(video, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`I think it's...`, result[0].label);
        if (result && result.length > 0) {
          const classifiedLabel = result[0].label;
          if (classifiedLabel === generatedLabel) {
            textOutput.innerHTML = "Correct!";
          } else {
            textOutput.innerHTML = "Incorrect!";
          }
        } else {
          textOutput.innerHTML = "Unable to classify";
        }
      }
    });
  });
});



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

const load = () => {

  featureExtractor.load('model/model.json'), () => {
    console.log("Previously saved model loaded!");
  }
};

const classify = () => {
  setInterval(() => {
    classifier.classify(video, (err, result) => {
      if (err) console.log(err);
      console.log(result);
      textOutput.innerHTML = result[0].label;
    });
  }, 1000);
};

textOutput.innerText = "";