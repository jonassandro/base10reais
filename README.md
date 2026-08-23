# Exercícios no Bolso — render-blocking corrigido

Esta versão foi feita a partir da versão SEGURA/FUNCIONAL e altera apenas recursos do caminho crítico de renderização.

- Imagens: URLs, `src`, poster e conteúdo preservados.
- Vídeo: URL e poster preservados.
- Tailwind: continua compilado pelo Vite; não usa `@tailwindcss/browser` no navegador.
- Google Fonts: carregadas somente após `window.load`/idle, sem bloquear FCP/LCP.
- Lucide: carregado somente após `window.load`/idle, sem bloquear FCP/LCP.
- CTAs e carrosséis: lógica preservada.
- Meta Pixel e UTMify: preservados.

Vercel: Framework Vite, Build Command `npm run build`, Output Directory `dist`.
