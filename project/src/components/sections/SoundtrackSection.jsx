import { motion } from 'framer-motion';
import { content } from '../../data/content';

export default function SoundtrackSection() {
  return (
    <section id="soundtrack" className="section bg-cream-pink">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <span className="chapter-badge">Audio / vinyl orbit</span>
        <h2 className="section-title mt-5">Giai điệu của chúng mình</h2>
        <p className="section-subtitle">Một đĩa vinyl hồng xoay giữa các track như quỹ đạo cảm xúc.</p>
      </motion.div>
      <div className="mx-auto grid items-center gap-10 md:grid-cols-[.85fr_1.15fr]">
        <motion.div className="relative mx-auto h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,#3a1725,#df1d73,#ffd6e8,#3a1725)] p-8 shadow-[0_40px_120px_rgba(223,29,115,.22)]" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          <div className="h-full w-full rounded-full border-[18px] border-[#3a1725]/70 bg-[#fff7fb]" />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff72ad]" />
        </motion.div>
        <div className="space-y-4">
          {content.soundtrack.map((track, i) => (
            <motion.div key={track.id} initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.08 }} whileHover={{ x: 14 }} className="glass group flex items-center gap-5 p-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#df1d73] text-2xl text-white shadow-[0_16px_40px_rgba(223,29,115,.25)]">{String(i + 1).padStart(2, '0')}</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-black text-[#3a1725]">{track.title}</h3>
                <p className="text-sm font-bold text-[#df1d73]">{track.artist}</p>
                <p className="mt-1 text-sm leading-6 text-[#6d4052]">{track.reason}</p>
              </div>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} className="text-2xl">♪</motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
