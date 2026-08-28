export async function generateResponse(
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  try {
    console.log("Sending prompt to backend...");

    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        errorText || `Backend request failed: ${response.status}`
      );
    }

    if (!response.body) {
      throw new Error("Streaming response is not available.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, {
        stream: true,
      });

      if (!chunk) {
        continue;
      }

      fullResponse += chunk;

      // Send each piece to the UI.
      if (onChunk) {
        onChunk(chunk);
      }
    }

    // Flush any remaining decoder data.
    const remaining = decoder.decode();

    if (remaining) {
      fullResponse += remaining;

      if (onChunk) {
        onChunk(remaining);
      }
    }

    return fullResponse || "The AI returned an empty response.";
  } catch (error) {
    console.error("Nemotron backend error:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(String(error));
  }
}
