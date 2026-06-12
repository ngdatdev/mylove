import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';

function EnvelopeCard({ letter, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.button onClick={() => setOpen(!open)} initial={{ opacity: 0, y: 80, rotate: index % 2 ? 8 : -8 }} whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 2 : -2 }} viewport={{ once: true }} whileHover={{ rotate: 0, y: -12 }} transition={{ duration: 0.75, delay: index * 0.1 }} className="relative min-h-[330px] w-full overflow-hidden rounded-[34px] bg-[#fff7fb] p-0 text-left shadow-[0_28px_90px_rgba(223,29,115,.16)]">
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(135deg,#ff72ad,#ffd6e8)] [clip-path:polygon(0_0,50%_72%,100%_0)]" />
      <div className="relative z-10 flex min-h-[330px] flex-col justify-end p-7">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#df1d73]">{letter.from} to {letter.to}</p>
        <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-black leading-none tracking-[-0.04em] text-[#3a1725]">{letter.subject}</h3>
        <AnimatePresence>
          {open && <motion.p initial={{ opacity: 0, height: 0, y: 16 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }} className="mt-5 text-lg leading-9 text-[#6d4052]" style={{ fontFamily: 'var(--font-hand)' }}>{letter.content}</motion.p>}
        </AnimatePresence>
        <span className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#a71154]/55">{open ? 'Đóng thư' : 'Chạm để mở'}</span>
      </div>
    </motion.button>
  );
}

export default function LoveLettersSection() {
  return (
    <section id="letters" className="section bg-pink-purple">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <span className="chapter-badge">Act III / paper theatre</span>
        <h2 className="section-title mt-5">Những lời chưa nói</h2>
        <p className="section-subtitle">Phong bì bung mở bằng motion, như một sân khấu giấy nhỏ.</p>
      </motion.div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-3">{content.loveLetters.map((letter, i) => <EnvelopeCard key={letter.id} letter={letter} index={i} />)}</div>
    </section>
  );
}
