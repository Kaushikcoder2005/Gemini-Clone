import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import mime from "mime-types";


const apiKey = "AIzaSyCb9kYMKEqHVQZxtUtFMfWtnDxz8ZGxfvI"

// Validate API key
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in the environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: ["text"], // Add appropriate modalities if needed
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const candidates = result.response.candidates || [];
    for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
      const parts = candidates[candidateIndex]?.content?.parts || [];
      for (let partIndex = 0; partIndex < parts.length; partIndex++) {
        const part = parts[partIndex];
        if (part.inlineData) {
          try {
            const filename = `output_${candidateIndex}_${partIndex}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(`Error writing file: ${err.message}`);
          }
        }
      }
    }

    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error(`Error during API call: ${error.message}`);
  }
}



export default run;