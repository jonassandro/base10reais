# Exercícios no Bolso — versão máxima de performance

## Vercel
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: raiz do projeto

## Otimizações aplicadas
- Tailwind compilado no build (sem Tailwind Browser CDN).
- Google Fonts removido do caminho crítico; usa fontes do sistema.
- Lucide JS removido; ícones viraram SVG inline.
- LCP com `fetchpriority=high`, preload responsivo e Vercel Image Optimization.
- Imagens abaixo da dobra usam carregamento por IntersectionObserver + versões dimensionadas.
- Vídeo e poster só carregam quando chegam perto da viewport.
- Carrosséis infinitos em CSS, sem `requestAnimationFrame`.
- CTAs são links HTML reais; 2 links para checkout e os demais para `#pricing`.
- Parâmetros UTM da URL são preservados no checkout.
- Assets do build recebem cache imutável.

## Avisos do Lighthouse que podem continuar aparecendo
Meta Pixel e UTMify são scripts de terceiros. Cache TTL e JavaScript legado desses domínios são controlados pelos próprios provedores, então não é possível corrigir esses cabeçalhos no seu site sem remover o rastreamento.
