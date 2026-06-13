import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';

export default function JourneyMapSection() {
  const [activePin, setActivePin] = useState(content.journeyMap.locations[0]);
  const { locations } = content.journeyMap;
  return (
    <section id="map" className="">
      {/* <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <span className="chapter-badge">Map / pulse route</span>
        <h2 className="section-title mt-5">Dấu chân của chúng mình</h2>
        <p className="section-subtitle">Một bản đồ trừu tượng: mỗi điểm đến là một nhịp hồng phát sáng.</p>
      </motion.div>
      <div className="glass relative mx-auto grid gap-8 overflow-hidden p-5 md:grid-cols-[1.15fr_.85fr] md:p-8">
        <div className="relative min-h-[360px] rounded-[30px] bg-[radial-gradient(circle_at_50%_45%,#fff7fb,#ffd6e8)] md:min-h-[520px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full p-8" fill="none">
            <motion.path d="M62 5 C70 16 55 21 64 32 C76 47 48 51 56 64 C65 79 36 83 42 96" stroke="#df1d73" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="8 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease: 'easeInOut' }} />
          </svg>
          {locations.map((loc, i) => <motion.button key={loc.id} onClick={() => setActivePin(loc)} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, type: 'spring' }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#df1d73] p-3 text-white shadow-[0_0_0_10px_rgba(223,29,115,.12),0_18px_50px_rgba(223,29,115,.3)]" style={{ left: `${loc.x}%`, top: `${loc.y}%` }}><motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.7, repeat: Infinity, delay: i * 0.2 }}>✦</motion.span></motion.button>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.aside key={activePin.id} initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -40 }} className="flex flex-col justify-between rounded-[30px] bg-[#3a1725] p-5 text-white">
            <img src={activePin.image} alt={activePin.name} className="mb-6 h-52 w-full rounded-[24px] object-cover md:h-64" />
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#ffd6e8]">{activePin.date}</p>
            <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-5xl font-black leading-none tracking-[-0.06em]">{activePin.name}</h3>
            <p className="mt-5 leading-8 text-white/72">{activePin.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">{locations.map(loc => <button key={loc.id} onClick={() => setActivePin(loc)} className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ${activePin.id === loc.id ? 'bg-[#ff72ad] text-white' : 'bg-white/10 text-white/60'}`}>{loc.name}</button>)}</div>
          </motion.aside>
        </AnimatePresence>
      </div> */}
    </section>
  );
}
