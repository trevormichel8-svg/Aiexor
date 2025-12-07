import sharp from "sharp";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Engine = "basic" | "standard" | "premium";

export async function generateLogo({
  prompt,
  engine,
}: {
  prompt: string;
  engine: Engine;
}) {
  let base64: string | null = null;

  try {
    if (engine === "basic") {
      // 🔹 Fast & cheap (Stability)
      base64 = await stabilityGenerate(prompt);
    } else if (engine === "standard") {
      // 🔹 Better quality (Replicate)
      base64 = await replicateGenerate(prompt, false);
    } else if (engine === "premium") {
      // 🔹 Highest quality (OpenAI gpt-image-1)
      base64 = await openaiGenerate(prompt);
    }

    if (!base64) return null;

    // 🧊 Apply Aiexor watermark overlay
    const marked = await applyWatermark(base64);
    return marked;
  } catch (err) {
    console.error("generateLogo error:", err);
    return null;
  }
}

/* =======================
   STABILITY AI ENGINE
======================= */
async function stabilityGenerate(prompt: string) {
  try {
    const res = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          output_format: "png",
        }),
      }
    );

    const json: any = await res.json();
    return json?.image_base64 ?? null;
  } catch (e) {
    console.error("Stability Error:", e);
    return null;
  }
}

/* =======================
   REPLICATE ENGINE
======================= */
async function replicateGenerate(prompt: string, hd = false) {
  try {
    const response = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-pro",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size: hd ? "768x768" : "512x512",
          image_format: "png",
        }),
      }
    );

    const output: any = await response.json();
    return output?.image_base64 ?? null;
  } catch (err) {
    console.error("Replicate Error:", err);
    return null;
  }
}

/* =======================
   OPENAI (PREMIUM ENGINE)
======================= */
async function openaiGenerate(prompt: string) {
  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // OpenAI returns base64 in data[0].b64_json
    const b64 = result.data?.[0]?.b64_json;
    if (!b64) return null;
    return b64;
  } catch (err) {
    console.error("OpenAI Image Error:", err);
    return null;
  }
}

/* =======================
   WATERMARKING
======================= */
async function applyWatermark(base64Image: string) {
  const png = Buffer.from(base64Image, "base64");

  const wm = Buffer.from(`
    <svg width="800" height="200">
      <text x="50%" y="50%" font-size="48"
            font-family="Space Grotesk, Arial, sans-serif"
            text-anchor="middle"
            fill="rgba(255,255,255,0.22)">
        A I E X O R
      </text>
    </svg>
  `);

  const marked = await sharp(png)
    .composite([{ input: wm, gravity: "center" }])
    .png()
    .toBuffer();

  return marked.toString("base64");
               }
