import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


// Your actual Gemini API key
const API_KEY = "AIzaSyAMbMCJ_CYTeHlmnDO5mLhNcFYaSp4w5Xo";


const MODEL_NAME = "gemini-1.5-pro";  // or "gemini-1.0-pro" if your API key only supports that


async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = await model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;

    // ✅ Fixed: added 'await' to parse text properly
    const finalText = await response.text();
    console.log("Gemini response:", finalText); // ✅ Optional: for debugging

    return finalText;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return "Something went wrong. Please try again.";
  }
}

export default runChat;
