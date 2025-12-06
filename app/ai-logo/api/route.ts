import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, style } = body;

    const finalPrompt = `
      Create a logo for the brand "Aiexor".
      Style: ${style}.
      Description: ${prompt}.
      Modern, futuristic, professional.
    `;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: finalPrompt,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      url: data.data?.[0]?.url || null
    });
  } catch (error: any) {
    console.error("AI Logo API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
        }
      
