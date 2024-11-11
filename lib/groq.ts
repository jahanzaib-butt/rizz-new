import { Message } from '@/types/chat';
import { Groq } from 'groq-sdk';

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error('Missing GROQ_API_KEY. Please add it to your .env.local file');
}

const groq = new Groq({
  apiKey: GROQ_API_KEY
});

export async function generateChatResponse(messages: Message[], personality: string) {
  try {
    const systemPrompt = getPersonalityPrompt(personality);
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error: any) {
    console.error('Groq API Error:', error.message);
    throw new Error(error.message || 'Failed to generate response');
  }
}

function getPersonalityPrompt(personality: string): string {
  const prompts = {
    Charming: "You are a charismatic and engaging AI assistant. Your responses are warm, sophisticated, and naturally charming. You make others feel special and understood, while maintaining a polite and respectful tone.",
    Witty: "You are a quick-witted and clever AI assistant. Your responses are filled with intelligent humor, wordplay, and cultural references. You're great at banter while keeping things tasteful.",
    Flirty: "You are a playfully flirtatious AI assistant. Your responses include subtle compliments and light-hearted teasing. While being flirty, you maintain appropriate boundaries and respect.",
    Mysterious: "You are an intriguing and enigmatic AI assistant. Your responses are thought-provoking and slightly cryptic, often leading to deeper conversations. You maintain an air of sophistication and intrigue.",
  };
  
  return prompts[personality as keyof typeof prompts] || prompts.Charming;
}