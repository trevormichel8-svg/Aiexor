/* ---------------------------------------------------------
   3D NEURAL GLOBE — Rotating AI Intelligence Sphere
   Mobile-safe & GPU-friendly canvas animation
---------------------------------------------------------- */

const globe = document.getElementById("globeCanvas");
const gctx = globe.getContext("2d");

function resizeGlobe() {
  globe.width = window.innerWidth;
  globe.height = window.innerHeight;
}
resizeGlobe();
window.addEventListener("resize", resizeGlobe);

let angle = 0;

function drawNeuralGlobe() {
  gctx.clearRect(0, 0, globe.width, globe.height);

  const centerX = globe.width / 2;
  const centerY = globe.height / 2;

  for (let i = 0; i < 60; i++) {
    const x = centerX + Math.cos(i * 0.25 + angle) * 180;
    const y = centerY + Math.sin(i * 0.25 + angle) * 80;

    gctx.beginPath();
    gctx.arc(x, y, 3, 0, Math.PI * 2);
    gctx.fillStyle = "rgba(255, 0, 212, 0.7)";
    gctx.fill();
  }

  angle += 0.01;
  requestAnimationFrame(drawNeuralGlobe);
}

drawNeuralGlobe();
