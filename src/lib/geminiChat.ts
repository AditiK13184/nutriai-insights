import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// TEXT CHAT
export async function askGemini(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (err) {
    console.error("Gemini chat error:", err);
    return "Sorry, I couldn't process that.";
  }
}

// IMAGE ANALYSIS
export async function analyzeImageWithGemini(base64Image: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      "Analyze this food and give calories, protein, carbs, fats, and description.",
    ]);

    return result.response.text();
  } catch (err) {
    console.error("Gemini image error:", err);
    return "Unable to analyze image.";
  }
}
