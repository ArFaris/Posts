import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr({
      include: '**/*.svg',
      svgrOptions: {
        icon: true,
      },
    })],
    server: {
      port: +env.PORT,
      allowedHosts: [
        'e53046108c2d3a.lhr.life',
        '.lhr.life' 
      ]
    },
    preview: {
      port: +env.PORT,
    },
  };
});
