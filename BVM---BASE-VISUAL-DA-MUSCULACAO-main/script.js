
(() => {
  'use strict';
  const CHECKOUT_URL = 'https://pay.cakto.com.br/38a83vk_1056254';

  function setupActions() {
    document.querySelectorAll('[data-action="scroll-to-pricing"]').forEach(btn => {
      btn.addEventListener('click', () => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}));
    });
    document.querySelectorAll('[data-action="checkout"]').forEach(btn => {
      btn.addEventListener('click', () => { window.location.href = CHECKOUT_URL; });
    });
    document.querySelectorAll('[data-action="back-to-top"]').forEach(btn => {
      btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    });
  }

  function setupDate() {
    const el = document.querySelector('[data-current-date-banner]');
    if (el) {
      const d = new Date();
      const date = new Intl.DateTimeFormat('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric'}).format(d);
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
      const setOpen = (open) => {
        if (ans) ans.style.display = open ? '' : 'none';
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (sym) sym.textContent = open ? '−' : '+';
      };
      setOpen(idx === 0);
      btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    });
  }

  function setupLightbox() {
    const box = document.getElementById('static-lightbox');
    if (!box) return;
    const img = box.querySelector('.static-lightbox-image');
    const close = () => { box.classList.remove('is-open'); box.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
    document.querySelectorAll('[data-lightbox-src]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (card.dataset.wasDragged === '1') { card.dataset.wasDragged='0'; return; }
        if (img) { img.src = card.getAttribute('data-lightbox-src') || ''; img.alt = card.querySelector('img')?.alt || 'Imagem ampliada'; }
        box.classList.add('is-open'); box.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      });
    });
    box.querySelector('.static-lightbox-close')?.addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function setupCarousel(key, speed) {
    const viewport = document.querySelector(`[data-carousel="${key}"]`);
    const track = document.querySelector(`[data-carousel-track="${key}"]`);
    if (!viewport || !track) return;
    let offset = 0, setWidth = 0, dragging = false, hovered = false, startX = 0, lastX = 0, dragDistance = 0;
    const measure = () => { setWidth = track.scrollWidth / 4; };
    measure(); window.addEventListener('resize', measure);
    track.querySelectorAll('img').forEach(im => im.addEventListener('load', measure));

    viewport.addEventListener('mouseenter', () => hovered = true);
    viewport.addEventListener('mouseleave', () => hovered = false);
    viewport.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; startX = lastX = e.clientX; dragDistance = 0;
      try { viewport.setPointerCapture(e.pointerId); } catch(_) {}
    });
    viewport.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; dragDistance += Math.abs(dx); offset -= dx;
      if (setWidth > 0) offset = ((offset % setWidth) + setWidth) % setWidth;
      track.style.transform = `translate3d(-${offset}px,0,0)`;
    });
    const endDrag = e => {
      if (!dragging) return; dragging = false;
      if (dragDistance >= 6) {
        const card = e.target?.closest?.('[data-lightbox-src]');
        if (card) card.dataset.wasDragged = '1';
      }
      try { if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId); } catch(_) {}
    };
    viewport.addEventListener('pointerup', endDrag); viewport.addEventListener('pointercancel', endDrag);

    const animate = () => {
      if (setWidth > 0 && !dragging && !hovered) offset += speed;
      if (setWidth > 0) offset = ((offset % setWidth) + setWidth) % setWidth;
      track.style.transform = `translate3d(-${offset}px,0,0)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  function setupSocialProof() {
    const root = document.getElementById('live-social-proof');
    if (!root) return;
    const buyers = [
      ['Vanessa O.','Vitória','ES','HÁ 1 MIN'],['Patrícia L.','Porto Alegre','RS','HÁ 1 MIN'],['Fernanda L.','Salvador','BA','HÁ 4 MIN'],['Aline C.','Brasília','DF','HÁ 7 MIN'],['Roberta P.','Manaus','AM','HÁ 1 MIN'],['Bianca T.','Campinas','SP','HÁ 4 MIN'],['Mariana S.','São Paulo','SP','HÁ 1 MIN'],['Lucas M.','Belo Horizonte','MG','HÁ 2 MIN'],['Rodrigo K.','Curitiba','PR','HÁ 3 MIN']
    ];
    root.innerHTML = '<div class="social-toast"><div class="social-icon">✓</div><div class="social-main"><div class="social-row"><span class="social-name"></span><span class="social-time"></span></div><div class="social-place"></div><div class="social-copy">Adquiriu a <strong>Base Visual da Musculação</strong></div></div></div>';
    const toast = root.querySelector('.social-toast'); let idx = 0, timer;
    const fill = () => { const [n,c,s,t] = buyers[idx]; root.querySelector('.social-name').textContent=n; root.querySelector('.social-time').textContent=t; root.querySelector('.social-place').textContent=`${c}, ${s}`; };
    const randomWait = () => Math.floor(Math.random()*9001)+6000;
    const show = () => { fill(); toast.classList.add('show'); timer=setTimeout(()=>{toast.classList.remove('show'); idx=(idx+1)%buyers.length; timer=setTimeout(show, randomWait());},4500); };
    timer=setTimeout(show,3000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupActions(); setupDate(); setupCountdown(); setupFAQ(); setupLightbox(); setupCarousel('sheets', .65); setupCarousel('reviews', .5); setupSocialProof();
  });
})();
