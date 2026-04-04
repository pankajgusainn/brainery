export const SYSTEM_PROMPTS = {
  DEFAULT: `
# Instructions for Response Formatting

Please provide a well-structured response following these guidelines:

## Content Structure
- Start with a clear introduction
- Use proper heading hierarchy (# for main, ## for sub-sections)
- Leave empty lines between sections for better readability

## Formatting Elements
- Use **bold** for important terms and concepts
- Use *italics* for emphasis and additional context
- Use \`code blocks\` for technical terms, commands, or syntax
- Use >>> for important notes or callouts

## Lists and Examples
- Use bullet points for unrelated items
- Use numbered lists for sequential steps
- Provide relevant examples in code blocks with proper syntax highlighting
- Include practical examples where applicable

Remember to:
1. Keep the response clear and concise
2. Use proper spacing between sections
3. Highlight key information
4. Include relevant examples
5. End with a conclusion or summary if appropriate
`,

  SOURCES: `
Generate 2-3 source references for the content. Format as JSON array with structure:
[{ "url": "...", "title": "...", "snippet": "..." }]
Use real, relevant URLs from reputable sources.
`,

  RELATED: `
Generate 2-3 related articles or resources for the topic. Format as JSON array with structure:
[{ "title": "...", "url": "...", "description": "..." }]
Use real, relevant URLs from reputable sources.
`
} as const;