import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generates content using available AI models with fallback logic.
 * Tries Gemini first, falls back to Groq on failure.
 */
export const generateAIContent = async (prompt, systemInstruction = "") => {
    try {
        console.log("Attempting generation with Gemini...");
        const result = await geminiModel.generateContent(
            systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt
        );
        return result.response.text();
    } catch (error) {
        console.warn("Gemini AI failed or rate limited, falling back to Groq...", error.message);

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key') {
            throw new Error("Gemini failed and Groq API key is not configured.");
        }

        try {
            console.log("Attempting generation with Groq...");
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: systemInstruction || "You are a helpful assistant."
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                model: "llama-3.3-70b-versatile", // Using a powerful Groq model
                temperature: 0.7,
            });

            return chatCompletion.choices[0]?.message?.content || "";
        } catch (groqError) {
            console.error("Both Gemini and Groq failed:", groqError.message);
            throw new Error("AI service temporarily unavailable. Please try again later.");
        }
    }
};

/**
 * Specifically for JSON responses, ensures the output is valid JSON.
 */
export const generateJSONContent = async (prompt, systemInstruction = "") => {
    const rawText = await generateAIContent(prompt, systemInstruction);

    // Clean up markdown if present
    let jsonText = rawText.trim();
    if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json|```/g, '').trim();
    } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```/g, '').trim();
    }

    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse AI JSON response:", jsonText);
        throw new Error("AI provided a malformed response. Please try again.");
    }
};
