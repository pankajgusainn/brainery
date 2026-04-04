import { GoogleGenerativeAI } from "@google/generative-ai";

export async function processImage(model: any, imageUrl: string, prompt: string) {
  try {
    const imageResp = await fetch(imageUrl).then(response => response.arrayBuffer());
    
    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      prompt || 'Describe this image.',
    ]);

    return result.response.text();
  } catch (error) {
    console.error('Image processing error:', error);
    throw new Error('Failed to process image: ' + (error as Error).message);
  }
}