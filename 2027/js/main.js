
let bgRule = 90;

/* UPDATE RULE */
function updateRule(){
bgRule = parseInt(document.getElementById("ruleInput").value);
resetBackground();
}

/* CA BACKGROUND */

let bgCanvas, bgCtx, currentRow, cols, y, cellSize = 3;

function initBackground(){

bgCanvas = document.getElementById("bgECA");
bgCtx = bgCanvas.getContext("2d");

resizeBG();
window.addEventListener("resize", resizeBG);

resetBackground();
animateBG();
}

function resizeBG(){
bgCanvas.width = bgCanvas.offsetWidth;
bgCanvas.height = bgCanvas.offsetHeight;
cols = Math.floor(bgCanvas.width / cellSize);
}

function resetBackground(){
currentRow = new Array(cols).fill(0);
currentRow[Math.floor(cols/2)] = 1;
y = 0;
bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
}

function animateBG(){

function step(){

const ruleBin = bgRule.toString(2).padStart(8,"0");

/* draw */
for(let i=0;i<cols;i++){
if(currentRow[i]){
bgCtx.fillStyle = "#00ffff";
bgCtx.fillRect(i*cellSize, y*cellSize, cellSize, cellSize);
}
}

/* PERIODIC BOUNDARY */
let next = new Array(cols).fill(0);

for(let i=0;i<cols;i++){
const left  = currentRow[(i-1+cols)%cols];
const mid   = currentRow[i];
const right = currentRow[(i+1)%cols];

const pattern = "" + left + mid + right;
const index = 7 - parseInt(pattern,2);

next[i] = parseInt(ruleBin[index]);
}

currentRow = next;
y++;

if(y*cellSize >= bgCanvas.height){
resetBackground();
}

requestAnimationFrame(step);
}

step();
}

window.onload = function(){
initBackground();
};