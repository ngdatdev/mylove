import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';

function LoveTimer({ startDate }) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = Date.now() - new Date(startDate).getTime();
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [startDate]);
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[['Ngày', time.d], ['Giờ', time.h], ['Phút', time.m], ['Giây', time.s]].map(([label, value], i) => <motion.div key={label} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-[26px] bg-[#3a1725] p-4 text-center text-white shadow-[0_28px_80px_rgba(58,23,37,.18)] md:p-6"><p style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black tracking-[-0.06em] md:text-7xl">{String(value ?? 0).padStart(2, '0')}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffd6e8]">{label}</p></motion.div>)}</div>;
}

export default function LoveCounterSection() {
  const ref = useRef(null);
  return (
    <section id="counter" className="section bg-pink-purple" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <span className="chapter-badge">Data / love dashboard</span>
        <h2 className="section-title mt-5">Chúng mình đã bên nhau...</h2>
        <p className="section-subtitle">Những con số chạy như một dashboard tình yêu.</p>
      </motion.div>
      <div className="mx-auto"><LoveTimer startDate={content.couple.startDate} /></div>
      <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{content.funStats.map((stat, i) => <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} whileHover={{ rotate: i % 2 ? 2 : -2, y: -10 }} transition={{ duration: 0.6, delay: i * 0.07 }} className="glass p-6"><p className="mb-6 text-4xl">{stat.emoji}</p><p style={{ fontFamily: 'var(--font-display)' }} className="text-5xl font-black tracking-[-0.06em] text-[#df1d73]">{stat.value}</p><p className="mt-3 font-bold text-[#6d4052]">{stat.label}</p></motion.div>)}</div>
    </section>
  );
}
