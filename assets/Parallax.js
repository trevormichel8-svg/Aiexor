/* ---------------------------------------------------------
   PARALLAX ENGINE — Safe for mobile & desktop
   Moves hero layer based on cursor or touch
---------------------------------------------------------- */

document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".parallax").forEach((layer) => {
    const speed = 0.02;
    const x = (window.innerWidth / 2 - e.pageX) * speed;
    const y = (window.innerHeight / 2 - e.pageY) * speed;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Mobile touch support
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  document.querySelectorAll(".parallax").forEach((layer) => {
    const speed = 0.025;
    const x = (window.innerWidth / 2 - touch.clientX) * speed;
    const y = (window.innerHeight / 2 - touch.clientY) * speed;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
});
