let featureExtractor;
let classifier;
let video;
let loss;
let happyFaces = 0;
let neutralFaces = 0;
let sadFaces = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  video.parent("videoContainer");
  video.size(320, 240);

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  // Create a new classifier using those features and give the video we want to use
  const options = { numLabels: 3 };
  classifier = featureExtractor.classification(video, options);
  // Set up the UI buttons
  setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
  select("#modelStatus").html("MobileNet Loaded!");
  // If you want to load a pre-trained model at the start
  classifier.load('./model/model.json', function() {
    select('#modelStatus').html('Custom Model Loaded!');
  });
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {

  // Predict Button
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);
}

// Show the results
function gotResults(err, results) {
  // Display any error
  if (err) {
    console.error(err);
  }
  if (results && results[0]) {
    select("#result").html(results[0].label);
    select("#confidence").html(`${results[0].confidence.toFixed(2) * 100  }%`);
    classify();
  }
}
