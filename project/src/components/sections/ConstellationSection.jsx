import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';

function ConstellationCanvas({ stars }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
    resize();
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const bgStars = Array.from({ length: 160 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, phase: Math.random() * 6 }));
    const heartStars = stars.map(s => ({ x: s.x / 100, y: s.y / 100, label: s.label }));
    let frame;
    let t = 0;
    const render = () => {
      const w = W(); const h = H();
      ctx.clearRect(0, 0, w, h);
      t += 0.015;
      bgStars.forEach(s => { ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,214,232,${0.18 + Math.sin(t + s.phase) * 0.16})`; ctx.fill(); });
      ctx.lineWidth = 1.8;
      for (let i = 0; i < heartStars.length - 1; i++) {
        const a = heartStars[i]; const b = heartStars[i + 1];
        const grad = ctx.createLinearGradient(a.x * w, a.y * h, b.x * w, b.y * h);
        grad.addColorStop(0, 'rgba(255,114,173,.18)'); grad.addColorStop(1, 'rgba(255,214,232,.82)');
        ctx.strokeStyle = grad; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke();
      }
      heartStars.forEach((s, i) => { const x = s.x * w; const y = s.y * h; const pulse = 5 + Math.sin(t * 2 + i) * 2; const glow = ctx.createRadialGradient(x, y, 0, x, y, 22); glow.addColorStop(0, 'rgba(255,63,146,.9)'); glow.addColorStop(1, 'rgba(255,63,146,0)'); ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff7fb'; ctx.beginPath(); ctx.arc(x, y, pulse, 0, Math.PI * 2); ctx.fill(); });
      frame = requestAnimationFrame(render);
    };
    window.addEventListener('resize', resize);
    render();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [stars]);
  return <canvas ref={canvasRef} className="h-[460px] w-full rounded-[36px] bg-[radial-gradient(circle_at_50%_40%,#6d1745,#160814_72%)] shadow-[0_40px_120px_rgba(58,23,37,.35)]" />;
}

export default function ConstellationSection() {
  const { closing, constellationStars } = content;
  return (
    <section id="finale" className="section bg-night text-white">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <span className="chapter-badge !border-white/15 !bg-white/10 !text-[#ffd6e8]">Finale / living stars</span>
        <h2 className="section-title mt-5 !text-white">Chòm sao của chúng mình</h2>
        <p className="section-subtitle !text-white/60">Một trái tim vẽ bằng ánh sao, tự thở và lấp lánh.</p>
      </motion.div>
      <div className="mx-auto max-w-5xl"><ConstellationCanvas stars={constellationStars} /></div>
      <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2">{constellationStars.map((s, i) => <motion.span key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.035 }} className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold text-white/58">✦ {s.label}</motion.span>)}</div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mx-auto mt-16 max-w-4xl text-center">
        <p style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black italic leading-tight tracking-[-0.05em] md:text-7xl">“{closing.quote}”</p>
        <p className="mt-6 text-xl text-[#ffd6e8]" style={{ fontFamily: 'var(--font-hand)' }}>{closing.promise}</p>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-white/35">{closing.credit}</p>
      </motion.div>
    </section>
  );
}
