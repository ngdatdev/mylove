import { useEffect, useRef } from 'react';

const EMOJIS = ['💕', '🌸', '✨', '💫', '🌷', '💖'];

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = window.innerWidth < 768 ? 5 : 12;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'heart-particle';
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        bottom: -60px;
        font-size: ${0.7 + Math.random() * 1}rem;
        animation-duration: ${8 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(el);
    }

    return () => { container.innerHTML = ''; };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
