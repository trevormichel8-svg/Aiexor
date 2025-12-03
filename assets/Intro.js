/* ---------------------------------------------------------
   CINEMATIC INTRO — AI NEURAL CORE BOOT SEQUENCE
   Smooth fading + pulse animation compatible with all devices
---------------------------------------------------------- */

const introScreen = document.getElementById("intro-screen");
const introCanvas = document.getElementById("introCanvas");
const introText = document.getElementById("introText");
const ctx = introCanvas.getContext("2d");

function resizeIntro() {
  introCanvas.width = window.innerWidth;
  introCanvas.height = window.innerHeight;
}
resizeIntro();
window.addEventListener("resize", resizeIntro);

let alpha = 1;
let pulse = 0;

function animateIntro() {
  ctx.clearRect(0, 0, introCanvas.width, introCanvas.height);

  // Pink neon pulse
  ctx.fillStyle = `rgba(255, 0, 212, ${0.4 + Math.sin(pulse) * 0.2})`;
  ctx.beginPath();
  ctx.arc(
    introCanvas.width / 2,
    introCanvas.height / 2,
    120 + Math.sin(pulse) * 25,
    0,
    Math.PI * 2
  );
  ctx.fill();

  pulse += 0.05;

  // Fade out the entire intro
  alpha -= 0.005;
  introScreen.style.opacity = alpha;

  if (alpha <= 0) {
    introScreen.style.display = "none";
  } else {
    requestAnimationFrame(animateIntro);
  }
}

animateIntro();
