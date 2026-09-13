import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import {defineConfig, loadEnv, type Connect, type Plugin} from 'vite';
import {generateCompanionReply} from './src/server/geminiChat';
import {LANGUAGES, type LanguageCode} from './src/lib/translations';

function toLanguageCode(value: unknown): LanguageCode {
  return LANGUAGES.some((l) => l.code === value) ? (value as LanguageCode) : 'en';
}

// Dev/preview-only middleware exposing POST /api/chat, so the Gemini API key
// stays server-side and is never bundled into client JS.
function geminiChatApiPlugin(): Plugin {
  const jsonParser = express.json({limit: '32kb'});

  const handler: Connect.SimpleHandleFunction = async (req: any, res: any) => {
    try {
      const {history, mood, language} = req.body ?? {};
      if (!Array.isArray(history) || history.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'A non-empty message history is required.'}));
        return;
      }
      const reply = await generateCompanionReply(
        history,
        typeof mood === 'string' ? mood : 'Okay',
        toLanguageCode(language)
      );
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({reply}));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({error: err?.message || 'Failed to generate a response.'}));
    }
  };

  const mount = (middlewares: Connect.Server) => {
    middlewares.use('/api/chat', jsonParser);
    middlewares.use('/api/chat', handler);
  };

  return {
    name: 'gemini-chat-api',
    configureServer(server) {
      mount(server.middlewares);
    },
    configurePreviewServer(server) {
      mount(server.middlewares);
    },
  };
}

export default defineConfig(({mode}) => {
  // Loads GEMINI_API_KEY (and any other non-VITE_-prefixed vars) from .env.local
  // for the dev-server-side plugin above; it is never exposed to client code.
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

  return {
    plugins: [react(), tailwindcss(), geminiChatApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      watch: {
        ignored: [
          '**/AIML LAB/**',
          '**/avatar-sales-trainer/**',
          '**/car/**',
          '**/chat-app/**',
          '**/covid19analyisis-main/**',
          '**/f1-prediction/**',
          '**/f1-race-replay/**',
          '**/files(college)/**',
          '**/icloud/**',
          '**/javascript/**',
          '**/john-*/**',
          '**/kali-linux*/**',
          '**/metasploitable*/**',
          '**/mind2care/**',
          '**/mind2care 2.0/**',
          '**/mongodb/**',
          '**/oracle certificates/**',
          '**/quintalmind-clone/**',
          '**/react/**',
          '**/real-time-chat-hub/**',
          '**/routineapp/**',
          '**/saumya project/**',
          '**/saumya-birthday/**',
          '**/ScoutIQ/**',
          '**/vanilla projects/**',
          '**/vsm-gui/**',
          '**/worldmonitor/**',
          '**/*.7z',
          '**/*.zip',
          '**/*.mp4',
          '**/*.docx',
          '**/*.pptx',
          '**/*.pdf',
          '**/*.lnk',
          '**/*.url',
          '**/.*/**',
        ],
      },
    },
  };
});
