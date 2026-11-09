
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

console.log("API key loaded:", !!process.env.GEMINI_API_KEY);
console.log("Model:", process.env.GEMINI_MODEL || "gemini-3.8-flash");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    timeout: 20000
  }
});

async function test() {
  try {
    console.log("Sending request to Gemini...");

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: "Say hello in one sentence."
    });

    console.log("SUCCESS!");
    console.log("Gemini response:", response.text);

  } catch (error) {
    console.error("\nGEMINI ERROR");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Cause:", error.cause);
    console.error("Code:", error.code);
    console.error("Stack:", error.stack);
  }
}

test();
