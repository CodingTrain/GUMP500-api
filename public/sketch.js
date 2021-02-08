const publicURL = "http://gump500-api.glitch.me";
// Use empty string "" here if you want to fetch data from a local server.

let dataLoaded = false;
let runners = {
  // This array of objects will contain later the JSON data from the server.
  [0]:{"total":1} // Initialize first element to avoid warnings or errors.
}; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  visualize();
}

function draw() {
  background(0,0,128); 
  textSize(28);
  fill(255); // actually the text color
  let message = "";
  if (! dataLoaded) {
    let origin = (publicURL.length > 0) ? publicURL : "local machine"; 
    message = "Fetching data from " + origin + " ...";
  }
  else {
    message = "Gump 500 data fetched:";
  }
  text(message, 12, 28);
  let milesMax = runners[0].total;
  let barStartX = 180;
  let barMaxX = windowWidth - 40;
  let barWidth = barMaxX - barStartX;
  for (let i=0; i<runners.length; i++) {
    textSize(16);
    let y = 80 + i*25;
    let name = runners[i].name.substring(0, 24);
    text(name, 12, y);
    text(Math.round(runners[i].total*10)/10, 140, y);
    rect(barStartX, 64 + i*25, runners[i].total*barWidth/milesMax, 16);
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
