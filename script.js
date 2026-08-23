(() => {
  'use strict';
  const CHECKOUT_URL = 'https://pay.cakto.com.br/dmtq5ne_1057849';

  function preserveCampaignParams() {
    const incoming = new URLSearchParams(location.search);
    if (![...incoming.keys()].length) return;
    document.querySelectorAll('a[data-checkout-link]').forEach(a => {
      try {
        const u = new URL(CHECKOUT_URL);
        incoming.forEach((value,key) => { if (!u.searchParams.has(key)) u.searchParams.set(key,value); });
        a.href = u.toString();
      } catch (_) {}
    });
  }

  function setupDate() {
    const el = document.querySelector('[data-current-date-banner]');
    if (el) {
      const date = new Intl.DateTimeFormat('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());
      el.textContent = `ÚLTIMA CHANCE — OFERTA TERMINA HOJE (${date})`;
    }
    const cp = document.querySelector('[data-copyright]');
    if (cp) cp.textContent = `© ${new Date().getFullYear()} Base Visual da Musculação. Todos os direitos reservados.`;
  }

  function setupCountdown() {
    const el = document.querySelector('[data-countdown]');
    if (!el) return;
    let total = 778;
    const render = () => {
      const m = Math.floor(total/60), s = total%60;
      el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    };
    render();
    setInterval(() => { total = total <= 0 ? 778 : total - 1; render(); }, 1000);
  }

  function setupFAQ() {
    document.querySelectorAll('[data-faq-item]').forEach((item, idx) => {
      const btn = item.querySelector('[data-faq-toggle]');
      const ans = item.querySelector('[data-faq-answer]');
      const sym = btn?.querySelector('.faq-symbol');
      const setOpen = open => {
        if (ans) ans.style.display = open ? '' : 'none';
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (sym) sym.textContent = open ? '−' : '+';
      };
      setOpen(idx === 0);
      btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    });
  }

  function setupLazyMedia() {
    const images = [...document.querySelectorAll('img[data-src]')];
    const loadImage = img => {
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      if (img.dataset.src) img.src = img.dataset.src;
      img.addEventListener('load', () => img.classList.add('is-loaded'), {once:true});
      img.removeAttribute('data-src'); img.removeAttribute('data-srcset');
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { loadImage(entry.target); io.unobserve(entry.target); } });
      }, {rootMargin:'500px 0px'});
      images.forEach(img => io.observe(img));
    } else images.forEach(loadImage);

    document.querySelectorAll('video[data-src],video[data-poster]').forEach(video => {
      const hydrate = () => {
        if (video.dataset.poster) { video.poster = video.dataset.poster; delete video.dataset.poster; }
        if (video.dataset.src) { video.src = video.dataset.src; delete video.dataset.src; video.load(); }
      };
      if ('IntersectionObserver' in window) {
        const vo = new IntersectionObserver(entries => {
          entries.forEach(entry => { if (entry.isIntersecting) { hydrate(); vo.disconnect(); } });
        }, {rootMargin:'400px 0px'});
        vo.observe(video);
      } else hydrate();
    });
  }

  function setupLightbox() {
    const box = document.getElementById('static-lightbox');
    if (!box) return;
    const img = box.querySelector('.static-lightbox-image');
    const close = () => { box.classList.remove('is-open'); box.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-lightbox-src]').forEach(card => {
      card.addEventListener('click', () => {
        if (img) { img.src = card.getAttribute('data-lightbox-src') || ''; img.alt = card.querySelector('img')?.alt || 'Imagem ampliada'; }
        box.classList.add('is-open'); box.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      });
    });
    box.querySelector('.static-lightbox-close')?.addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function setupSocialProof() {
    const root = document.getElementById('live-social-proof');
    if (!root) return;
    const buyers = [
      ['Vanessa O.','Vitória','ES','HÁ 1 MIN'],['Patrícia L.','Porto Alegre','RS','HÁ 1 MIN'],['Fernanda L.','Salvador','BA','HÁ 4 MIN'],['Aline C.','Brasília','DF','HÁ 7 MIN'],['Roberta P.','Manaus','AM','HÁ 1 MIN'],['Bianca T.','Campinas','SP','HÁ 4 MIN'],['Mariana S.','São Paulo','SP','HÁ 1 MIN'],['Lucas M.','Belo Horizonte','MG','HÁ 2 MIN'],['Rodrigo K.','Curitiba','PR','HÁ 3 MIN']
    ];
    root.innerHTML = '<div class="social-toast"><div class="social-icon">✓</div><div class="social-main"><div class="social-row"><span class="social-name"></span><span class="social-time"></span></div><div class="social-place"></div><div class="social-copy">Adquiriu a <strong>Base Visual da Musculação</strong></div></div></div>';
    const toast = root.querySelector('.social-toast'); let idx = 0;
    const fill = () => { const [n,c,s,t] = buyers[idx]; root.querySelector('.social-name').textContent=n; root.querySelector('.social-time').textContent=t; root.querySelector('.social-place').textContent=`${c}, ${s}`; };
    const randomWait = () => Math.floor(Math.random()*9001)+6000;
    const show = () => { fill(); toast.classList.add('show'); setTimeout(()=>{toast.classList.remove('show'); idx=(idx+1)%buyers.length; setTimeout(show, randomWait());},4500); };
    setTimeout(show,3000);
  }

  function init() {
    preserveCampaignParams();
    setupDate();
    setupCountdown();
    setupFAQ();
    setupLazyMedia();
    setupLightbox();
    setupSocialProof();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
