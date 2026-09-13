import { GoogleGenAI } from '@google/genai';
import { LanguageCode, t } from '../lib/translations';

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

const MODEL = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `You are the "CareSync Care Companion," a warm, trauma-informed AI chat companion inside a crisis-support check-in app called CareSync.

Ground rules:
- You are an AI companion, not a licensed therapist, counselor, or medical professional. Never claim to be one, never diagnose, and never promise a clinical outcome.
- Respond with empathy, active listening, and validation. Keep replies short — 2 to 4 sentences — since they render as chat bubbles.
- Where helpful, gently suggest grounding techniques (paced breathing, the 5-4-3-2-1 senses exercise) rather than generic advice.
- If someone describes an active emergency or says they intend to harm themselves or someone else, tell them clearly to call or text 988 (Suicide & Crisis Lifeline) or call 911 if in immediate danger, and encourage them to reach a trusted person nearby.
- Keep language simple, calm, and non-clinical. Never be dismissive of what the person shares.
- Never fabricate capabilities this app doesn't have (e.g. don't claim to notify a real counselor or store data permanently) — this is a prototype and conversations are not persisted.`;

const CRISIS_PATTERNS = [
  /suicid/i,
  /kill(ing)? myself/i,
  /end(ing)? my life/i,
  /want(ed)? to die/i,
  /hurt(ing)? myself/i,
  /self[- ]harm/i,
  /no reason to live/i,
  /can'?t go on/i,
  /better off dead/i,
];

function containsCrisisLanguage(text: string): boolean {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) {
    cachedClient = new GoogleGenAI({ apiKey });
  }
  return cachedClient;
}

export async function generateCompanionReply(
  history: ChatTurn[],
  mood: string,
  language: LanguageCode
): Promise<string> {
  const lastUserTurn = [...history].reverse().find((turn) => turn.role === 'user');
  if (lastUserTurn && containsCrisisLanguage(lastUserTurn.text)) {
    return t(language)('checkin.botReplyCrisis');
  }

  const ai = getClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  const contents = history.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));

  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}\n\nThe person's currently self-reported mood indicator is: ${mood}. Let that inform your tone, but don't just repeat it back to them.`,
      maxOutputTokens: 220,
      temperature: 0.8,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error('Empty response from Gemini.');
  }
  return text;
}
