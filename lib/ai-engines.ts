export async function generateLogo({
  engine,
  prompt,
}: {
  engine: "basic" | "standard" | "premium";
  prompt: string;
}) {
  if (engine === "basic") {
    // Stability AI (cheap)
    const result = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        output_format: "jpeg",
      }),
    }).then((r) => r.arrayBuffer());
    
    return Buffer.from(result).toString("base64");
  }

  if (engine === "standard") {
    // Replicate (mid-tier)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "tstr", // We'll replace with a real logo model ID
        input: { prompt },
      }),
    });

    const result = await response.json();
    return result.output[0];
  }

  if (engine === "premium") {
    // OpenAI (highest quality)
    const openai = await import("openai").then((m) => new m.OpenAI());
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return result.data[0].url;
  }
}
