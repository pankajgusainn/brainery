import OpenAI from "openai";

const SYSTEM_PROMPT =
  "You are a helpful AI assistant. " +
  "Answer the user's question accurately, clearly, naturally, and in sufficient detail. " +
  "Use Markdown formatting. " +
  "Use headings when useful. " +
  "Use bullet points and numbered lists when appropriate. " +
  "Use bold for important concepts. " +
  "Use inline code for commands, filenames, variables, and technical terms. " +
  "Use fenced code blocks for programming code. " +
  "Keep answers natural and easy to read.";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      console.error("NVIDIA_API_KEY is missing");
      return res.status(500).json({
        error: "NVIDIA_API_KEY is not configured",
      });
    }

    console.log("Sending prompt to Nemotron...");

    const client = new OpenAI({
      apiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const stream = await client.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 2048,
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;

      if (text) {
        res.write(text);
      }
    }

    console.log("Nemotron response completed.");

    res.end();
  } catch (error) {
    console.error("Nemotron API error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: "Failed to generate response",
      });
    }

    res.end();
  }
}
