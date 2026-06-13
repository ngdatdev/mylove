import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../animations/ScrollAnimations';
import { content } from '../../data/content';

function ConstellationCanvas({ stars }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Background stars
    const bgStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Heart points mapped to canvas
    const heartStars = stars.map(s => ({
      x: (s.x / 100) * W,
      y: (s.y / 100) * H,
      label: s.label,
    }));

    let frame = 0;
    let lineProgress = 0;
    const maxLines = heartStars.length - 1;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Twinkle background stars
      bgStars.forEach(s => {
        s.alpha += s.speed;
        const a = (Math.sin(s.alpha) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.7})`;
        ctx.fill();
      });

      // Draw connecting lines progressively
      if (lineProgress < maxLines) lineProgress += 0.03;
      for (let i = 0; i < Math.min(Math.floor(lineProgress), maxLines); i++) {
        const a = heartStars[i];
        const b = heartStars[i + 1];
        const partial = i < Math.floor(lineProgress) ? 1 : lineProgress % 1;
        const tx = a.x + (b.x - a.x) * partial;
        const ty = a.y + (b.y - a.y) * partial;

        const grad = ctx.createLinearGradient(a.x, a.y, tx, ty);
        grad.addColorStop(0, 'rgba(232,160,191,0.6)');
        grad.addColorStop(1, 'rgba(178,164,255,0.6)');
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw constellation stars (heart points)
      heartStars.forEach((s) => {
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12);
        glow.addColorStop(0, 'rgba(255,179,209,0.9)');
        glow.addColorStop(1, 'rgba(255,179,209,0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });

      frame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frame);
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 420, display: 'block', borderRadius: 20 }}
    />
  );
}

export default function ConstellationSection() {
  const { closing, constellationStars } = content;

  return (
    <section id="finale" style={{ padding: 'clamp(60px,10vh,120px) clamp(16px,5vw,80px)', background: 'linear-gradient(160deg,#1a0a2e 0%,#2D1B33 60%,#0f0520 100%)' }}>
      <FadeUp>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(2rem,5vw,3.5rem)',
          textAlign: 'center', marginBottom: '0.5rem',
          background: 'linear-gradient(135deg,#FFB3D1,#C4B5FD)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Chòm sao của chúng mình
        </h2>
        <p style={{
          fontFamily: 'var(--font-hand)', fontSize: '1.3rem',
          textAlign: 'center', color: 'rgba(255,255,255,0.6)',
          marginBottom: '2.5rem',
        }}>
          Mỗi kỷ niệm là một ngôi sao sáng ✨
        </p>
      </FadeUp>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeUp delay={0.2}>
          <ConstellationCanvas stars={constellationStars} />
        </FadeUp>

        {/* Labels */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {constellationStars.map((s, i) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 50, padding: '4px 14px',
              fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)',
            }}>
              ✦ {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: '4rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(1.5rem,4vw,2.5rem)',
          color: '#fff', marginBottom: '1rem',
        }}>
          "{closing.quote}"
        </p>
        <p style={{
          fontFamily: 'var(--font-hand)', fontSize: '1.2rem',
          color: 'rgba(255,179,209,0.8)', marginBottom: '2.5rem',
        }}>
          {closing.promise}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
          {closing.credit}
        </p>
      </motion.div>
    </section>
  );
}
