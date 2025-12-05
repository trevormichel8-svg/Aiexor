// Aiexor V3 OMEGA — logo generator logic

function getGradient(ctx, style, width) {
  const g = ctx.createLinearGradient(0, 0, width, 0);

  switch (style) {
    case "gold":
      g.addColorStop(0, "#FFD700");
      g.addColorStop(1, "#D4AF37");
      break;
    case "turquoise":
      g.addColorStop(0, "#00F5FF");
      g.addColorStop(1, "#40E0D0");
      break;
    case "hybrid":
      g.addColorStop(0, "#FFD700");
      g.addColorStop(0.5, "#FFFFFF");
      g.addColorStop(1, "#40E0D0");
      break;
    case "neon":
      g.addColorStop(0, "#FF00FF");
      g.addColorStop(1, "#00C3FF");
      break;
    case "chrome":
      g.addColorStop(0, "#fdfdfd");
      g.addColorStop(0.3, "#c0c0c0");
      g.addColorStop(0.6, "#8e8e8e");
      g.addColorStop(1, "#ffffff");
      break;
    case "holo":
      g.addColorStop(0, "#FF00FF");
      g.addColorStop(0.25, "#00FFAA");
      g.addColorStop(0.5, "#00C3FF");
      g.addColorStop(0.75, "#FFD700");
      g.addColorStop(1, "#ffffff");
      break;
    case "plasma":
      g.addColorStop(0, "#FF0077");
      g.addColorStop(1, "#7700FF");
      break;
    case "matte":
      g.addColorStop(0, "#151515");
      g.addColorStop(1, "#333333");
      break;
    case "gem":
      g.addColorStop(0, "#00BFFF");
      g.addColorStop(1, "#0040FF");
      break;
    case "cyber":
      g.addColorStop(0, "#00FFC3");
      g.addColorStop(0.5, "#00A3FF");
      g.addColorStop(1, "#FF00FF");
      break;
    default:
      g.addColorStop(0, "#FFFFFF");
      g.addColorStop(1, "#FFFFFF");
  }

  return g;
}

function applyTextFX(ctx, fx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  if (fx === "emboss") {
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 9;
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = -2;
  } else if (fx === "depth") {
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;
  } else if (fx === "metal") {
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 16;
  } else if (fx === "shadowed") {
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 6;
  }
}

function drawBackground(ctx, w, h, mode) {
  ctx.clearRect(0, 0, w, h);

  if (mode === "transparent") {
    return; // leave pixel background transparent
  }

  if (mode === "dark") {
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#050816");
    bg.addColorStop(1, "#02030A");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  }

  if (mode === "glow") {
    const radial = ctx.createRadialGradient(
      w / 2,
      h * 0.2,
      40,
      w / 2,
      h / 2,
      Math.max(w, h)
    );
    radial.addColorStop(0, "rgba(64, 224, 208, 0.35)");
    radial.addColorStop(0.4, "rgba(10, 16, 32, 0.95)");
    radial.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);
  }
}

function drawLogo(ctx, options, canvas) {
  const { brand, tagline, style, fx, bgMode } = options;
  const w = canvas.width;
  const h = canvas.height;

  drawBackground(ctx, w, h, bgMode);

  const gradient = getGradient(ctx, style, w);
  ctx.fillStyle = gradient;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Brand text
  const baseFontSize = 170;
  ctx.font = `bold ${baseFontSize}px "Segoe UI", system-ui, -apple-system`;
  applyTextFX(ctx, fx);

  if (fx === "curve") {
    ctx.save();
    ctx.translate(w / 2, h / 2 - 20);
    ctx.rotate(-0.2);
    ctx.fillText(brand, 0, 0);
    ctx.restore();
  } else {
    ctx.fillText(brand, w / 2, h / 2 - 20);
  }

  // Tagline
  if (tagline.trim() !== "") {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = `600 46px "Segoe UI", system-ui`;
    ctx.fillStyle = "rgba(230,238,255,0.9)";
    ctx.fillText(tagline, w / 2, h / 2 + 90);
  }
}

function getOptionsFromUI() {
  const brand =
    document.getElementById("brandInput").value.trim() || "Aiexor";
  const tagline = document
    .getElementById("taglineInput")
    .value.trim();
  const style = document.getElementById("styleInput").value;
  const fx = document.getElementById("fxInput").value;
  const bgMode = document.getElementById("bgInput").value;

  return { brand, tagline, style, fx, bgMode };
}

function generateLogo() {
  const canvas = document.getElementById("logoCanvas");
  const ctx = canvas.getContext("2d");

  const status = document.getElementById("statusPill");
  status.textContent = "Rendering…";
  status.style.background = "rgba(255,215,0,0.16)";
  status.style.color = "#ffe58f";

  const options = getOptionsFromUI();
  drawLogo(ctx, options, canvas);

  status.textContent = "Ready • Preview updated";
  status.style.background = "rgba(0,255,170,0.14)";
  status.style.color = "#7ef9c3";
}

/* ===== EXPORT HELPERS ===== */

function downloadFromCanvas(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function downloadPNG() {
  const canvas = document.getElementById("logoCanvas");
  downloadFromCanvas(canvas, "aiexor-logo.png");
}

function downloadTransparent() {
  // For transparent export, re-render with transparent background
  const baseCanvas = document.getElementById("logoCanvas");
  const temp = document.createElement("canvas");
  temp.width = baseCanvas.width;
  temp.height = baseCanvas.height;
  const ctx = temp.getContext("2d");

  const opts = getOptionsFromUI();
  opts.bgMode = "transparent";
  drawLogo(ctx, opts, temp);

  downloadFromCanvas(temp, "aiexor-logo-transparent.png");
}

function download4K() {
  const options = getOptionsFromUI();
  const big = document.createElement("canvas");
  big.width = 5000;
  big.height = 1600;
  const ctx = big.getContext("2d");

  drawLogo(ctx, options, big);
  downloadFromCanvas(big, "aiexor-logo-4k.png");
}

function downloadSVG() {
  const opts = getOptionsFromUI();
  const brand = opts.brand;
  const tagline = opts.tagline;
  const style = opts.style;

  // Simple 2-color mapping for SVG gradient
  const styleMap = {
    gold: ["#FFD700", "#D4AF37"],
    turquoise: ["#00F5FF", "#40E0D0"],
    hybrid: ["#FFD700", "#40E0D0"],
    neon: ["#FF00FF", "#00C3FF"],
    chrome: ["#fdfdfd", "#8e8e8e"],
    holo: ["#FF00FF", "#00C3FF"],
    plasma: ["#FF0077", "#7700FF"],
    matte: ["#ffffff", "#cccccc"],
    gem: ["#00BFFF", "#0040FF"],
    cyber: ["#00FFC3", "#FF00FF"]
  };

  const [c1, c2] = styleMap[style] || ["#FFFFFF", "#CCCCCC"];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="450">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="50%" y="48%" text-anchor="middle"
        font-family="Segoe UI, system-ui" font-size="170"
        font-weight="700" fill="url(#textGrad)">
    ${brand}
  </text>
  ${
    tagline
      ? `<text x="50%" y="72%" text-anchor="middle"
        font-family="Segoe UI, system-ui" font-size="48"
        font-weight="600" fill="#E6EEFF">
        ${tagline}
      </text>`
      : ""
  }
</svg>`.trim();

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "aiexor-logo.svg";
  link.click();

  URL.revokeObjectURL(url);
}

function downloadSocial() {
  const options = getOptionsFromUI();
  const sizes = [
    { w: 1080, h: 540, name: "social-1080x540.png" },
    { w: 1200, h: 630, name: "social-1200x630.png" },
    { w: 1500, h: 750, name: "social-1500x750.png" }
  ];

  sizes.forEach((s) => {
    const c = document.createElement("canvas");
    c.width = s.w;
    c.height = s.h;
    const ctx = c.getContext("2d");
    drawLogo(ctx, options, c);
    downloadFromCanvas(c, "aiexor-" + s.name);
  });
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  // Pre-fill brand as Aiexor for demo
  const brandInput = document.getElementById("brandInput");
  if (brandInput && brandInput.value.trim() === "") {
    brandInput.value = "Aiexor";
  }
  generateLogo();
});
      
