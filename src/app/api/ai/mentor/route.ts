import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // TODO: Initialize @google/genai SDK
    // const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // const response = await genAI.generateContent(...)

    return NextResponse.json({ 
      success: true, 
      reply: 'This is a mock response from the Pro Mentor. Gemini API integration will be completed in Phase 2.' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
