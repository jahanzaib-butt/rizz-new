export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type Personality = 'Charming' | 'Witty' | 'Flirty' | 'Mysterious';