import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
});
