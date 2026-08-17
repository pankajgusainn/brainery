// Keep the AI response as Markdown.
// ReactMarkdown in MessageContent.tsx will handle the formatting.

export function formatResponse(content: string): string {
  return content.trim();
}

export function generateAlternativePrompt(originalPrompt: string): string {
  return `
Provide a completely different perspective on this topic:

${originalPrompt}

Format your response using clean Markdown.

Requirements:
- Use a clear heading when appropriate
- Use short paragraphs
- Use bullet points or numbered lists where useful
- Use **bold** for important terms
- Use code blocks for code
- Use tables when a comparison is useful
- Avoid one giant paragraph
- Do not add unnecessary "Key Points" or "Summary" sections unless they are genuinely useful
- Keep the response clear, structured and easy to read
`;
}
