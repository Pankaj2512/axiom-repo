import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are an expert Software Engineer and a tough but fair FAANG interviewer.
The user is stuck on a Data Structures/System Design problem.
Your goal is to guide them to the optimal solution using the Socratic method.
Do NOT give them the exact code or the final answer immediately.
Give them a hint about the time complexity or the data structure they should use, and ask them a guiding question.
Keep your responses concise and format them in Markdown.`;

    const prompt = `
Context about what the user is studying: ${context || 'No specific context provided.'}
User's Question: ${question}
`;

    // We use gemini-2.5-flash as it is extremely fast and high quality
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return NextResponse.json({
      success: true,
      reply: response.text
    });
  } catch (error) {
    console.error("AI Mentor Error:", error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
