export async function generateResponse(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  try {
    console.log("Sending prompt to backend...");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `You are a helpful, intelligent AI assistant.

Answer the user's question accurately, clearly, and in sufficient detail.

IMPORTANT RESPONSE STYLE:

- Give a complete answer rather than an unnecessarily short answer.
- For simple questions, be concise but still explain the important details.
- For complex questions, provide a thorough and well-organized explanation.
- Break long answers into clear sections.
- Use Markdown formatting.
- Use headings when they improve readability.
- Use short paragraphs instead of large blocks of text.
- Use bullet points for lists.
- Use numbered lists for procedures and step-by-step instructions.
- Use **bold** for important terms and concepts.
- Use \`inline code\` for commands, filenames, variables, functions, and technical terms when appropriate.
- Use fenced code blocks for programming code and commands.
- Leave a blank line between paragraphs and sections.
- Use tables when comparing multiple items.
- Explain technical concepts with examples when useful.
- When giving instructions, show the exact command or action and explain what it does.
- Do not unnecessarily repeat the user's question.
- Do not add artificial sections such as "Key Points" or "Summary" unless they are genuinely useful.
- Do not turn every response into a rigid template.
- Make the response natural and conversational while maintaining excellent structure.
- Prioritize useful, detailed information over extremely short answers.

The response must be valid Markdown that can be rendered directly in the chat interface.

User's question:
${prompt}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.error || `Backend request failed: ${response.status}`
      );
    }

    const data = await response.json();

    return data.text || "The AI returned an empty response.";
  } catch (error) {
    console.error("Backend Gemini error:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(String(error));
  }
}
