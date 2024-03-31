document.addEventListener('DOMContentLoaded', function() {
// Simplex noise setup
const noise = new SimplexNoise();
const container = document.getElementById('wave-container');
const body = document.getElementsByName('body');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = 300;
let nt = 0;
let animationId;

// Default configuration
const config = {
colors: ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
waveWidth: 50,
backgroundFill: "rgba(232, 232, 237, 0.1)",
blur: 10,
speed: "fast",
waveOpacity: 0.5
};

// Adjust canvas size
canvas.width = w;
canvas.height = h;
canvas.style.filter = `blur(${config.blur}px)`;
container.appendChild(canvas);

window.onresize = function() {
w = canvas.width = window.innerWidth;
};

function getSpeed() {
return config.speed === "slow" ? 0.001 : 0.002;
}

function drawWave(n) {
nt += getSpeed();
for (let i = 0; i < n; i++) {
   ctx.beginPath();
   ctx.lineWidth = config.waveWidth;
   ctx.strokeStyle = config.colors[i % config.colors.length];
   for (let x = 0; x < w; x += 5) {
       let y = noise.noise3D(x / 800, 0.3 * i, nt) * 100;
       ctx.lineTo(x, y + h * 0.5);
   }
   ctx.stroke();
   ctx.closePath();
}
}

function render() {
ctx.fillStyle = config.backgroundFill;
ctx.globalAlpha = config.waveOpacity;
ctx.fillRect(0, 0, w, h);
drawWave(5);
animationId = requestAnimationFrame(render);
}

render();

// Cleanup on unload
window.addEventListener('unload', function() {
cancelAnimationFrame(animationId);
});
});