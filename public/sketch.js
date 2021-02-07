const publicURL = "http://gump500-api.glitch.me"; // Use empty string "" here if you want to fetch data from a local server
let dataLoaded = false;
let runners = {};

function setup() {
  createCanvas(1200, 800);
  noLoop();
  visualize();
}

function draw() {
  background(0,0,128); 
  textSize(32);
  fill(255); // actually the text color
  let message = "";
  if (! dataLoaded) {
    let origin = (publicURL.length > 0) ? publicURL : "local machine"; 
    message = "Fetching data from " + origin + " ...";
  }
  else {
    message = "Gump 500 data fetched";
  }
  text(message, 10, 25);
  for (let i=0; i<runners.length; i++) {
    textSize(16);
    text(runners[i].name, 10, 80 + i*25);
    rect(140, 64 + i*25, runners[i].total*4, 16);
  }
}

async function visualize() {
  // Get all runners as json
  const response = await fetch(publicURL + "/api");
  runners = await response.json();
  console.log(runners);
  // Sort runners from highest total to lowest
  runners.sort((a, b) => b.total - a.total);
  // Create a new div for each runner, containing their name and
  // total distance ran
  for (let runner of runners) {
    createDiv(`${runner.name} ran a total of ${runner.total} miles.`);
  }
  dataLoaded = true;
  redraw();
}
