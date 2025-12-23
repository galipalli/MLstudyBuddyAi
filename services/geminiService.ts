
import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlan, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudyPlan = async (goal: string): Promise<StudyPlan> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a structured study plan for learning: ${goal}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          goal: { type: Type.STRING },
          duration: { type: Type.STRING },
          milestones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                status: { type: Type.STRING },
                estimatedHours: { type: Type.NUMBER }
              },
              required: ["id", "title", "description", "status", "estimatedHours"]
            }
          }
        },
        required: ["goal", "duration", "milestones"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse study plan", e);
    throw e;
  }
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 multiple-choice questions for the ML topic: ${topic}. Each question must have exactly 4 options and one correct answer.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse quiz", e);
    return [];
  }
};

export const getChatBuddyResponse = async (history: {role: string, content: string}[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an expert ML Study Buddy. You explain complex machine learning concepts simply using analogies. You are encouraging and helpful. You can also help debug code snippets."
    }
  });

  // We only send the latest for this simple implementation but can be improved
  const response = await chat.sendMessage({ message });
  return response.text;
};
