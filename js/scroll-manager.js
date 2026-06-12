import { $$, $ } from './utils.js';
export function initScrollManager(){
  const progress = $('#scrollProgress');
  const update = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${Math.max(0, scrollY / max) * 100}%`; };
  addEventListener('scroll', update, { passive:true }); update();
  const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold:.16, rootMargin:'0px 0px -8% 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  addEventListener('mousemove', e => { const card = $('[data-parallax]'); if(!card) return; card.style.transform = `translate(${(e.clientX/innerWidth-.5)*12}px,${(e.clientY/innerHeight-.5)*12}px)`; }, { passive:true });
}
