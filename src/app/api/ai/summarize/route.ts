import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { notes, topicData } = await req.json();

    if (!topicData) {
      return NextResponse.json({ error: 'Topic data is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are an expert technical writer and senior educator.
The user will provide raw notes and the topic name they just studied.
Your job is to format these notes into a beautiful, easy-to-read Markdown cheat sheet.
Organize it into these exact sections:
1. 'Core Concept' (TLDR)
2. 'Key Edge Cases'
3. 'Time/Space Complexity' (if applicable)
4. 'Interview Cheat Code' (one sentence mnemonic or trick)
Do not hallucinate info, just structure what they give you or infer standard definitions for the topic.`;

    const prompt = `
Topic: ${topicData}
Raw Notes: ${notes || 'No notes provided, just generate a standard cheat sheet for the topic.'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // lower temperature for more structured, factual outputs
      }
    });

    return NextResponse.json({
      success: true,
      summary: response.text
    });
  } catch (error: any) {
    console.error("AI Summarizer Error:", error);
    return NextResponse.json({ error: 'An unexpected error occurred during summarization' }, { status: 500 });
  }
}
