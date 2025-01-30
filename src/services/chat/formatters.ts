// Response formatting utilities
export function formatResponse(content: string): string {
  return `
# ${generateTitle(content)}

${formatMainContent(content)}

## Key Points

${extractKeyPoints(content)}

## Summary

${generateSummary(content)}
`;
}

function generateTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
}

function formatMainContent(content: string): string {
  return content
    .split('\n')
    .map(line => {
      // Add triple newlines after each point for extra spacing
      if (line.trim().startsWith('-')) {
        return `${line}\n\n\n`;
      }
      // Add double newlines for regular paragraphs
      return `${line}\n\n`;
    })
    .join('');
}

function extractKeyPoints(content: string): string {
  const points = content
    .split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .map(point => point.trim().replace(/^[-•]\s*/, ''));

  if (points.length === 0) {
    return '• No key points extracted\n\n\n';
  }

  // Add triple newlines after each point for maximum spacing
  return points
    .map(point => `• ${point}\n\n\n`)
    .join('');
}

function generateSummary(content: string): string {
  const paragraphs = content.split('\n\n\n');
  const lastParagraph = paragraphs[paragraphs.length - 1];
  return lastParagraph.length > 200 
    ? lastParagraph.substring(0, 200) + '...'
    : lastParagraph;
}

// New function to generate alternative perspectives
function generateAlternativePrompt(originalPrompt: string): string {
  return `
Please provide a completely different perspective on this topic:

${originalPrompt}

Requirements:
1. Take a fresh approach with new examples and metaphors
2. Maintain the same level of detail and expertise
3. Use different structure and organization
4. Provide unique insights not covered in previous responses
5. Keep the same professional tone and quality
`;
}

export { generateAlternativePrompt };