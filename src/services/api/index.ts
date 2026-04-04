export async function generateResponse(prompt: string) {
  try {
    const response = await fetch(`https://brainery.braineryy.workers.dev/chat/?prompt=${encodeURIComponent(prompt)}&model=gpt-4o-mini`);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    if (data.status !== 200) {
      throw new Error('API response error');
    }

    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate response');
  }
}