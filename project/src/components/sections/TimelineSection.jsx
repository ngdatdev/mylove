import { motion } from 'framer-motion';
import { content } from '../../data/content';

export default function TimelineSection() {
  return (
    <section id="timeline" className="section bg-purple-blue">
      <div className="absolute inset-x-0 top-24 h-24 rotate-[-2deg] bg-[#ff3f92]/10" />
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative text-center">
        <span className="chapter-badge">Kinetic diary</span>
        <h2 className="section-title mt-5">Memories</h2>
        <p className="section-subtitle">Những lần chúng tôi bên nhau</p>
      </motion.div>
      <div className="relative mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.timeline.map((item, i) => (
          <motion.article key={item.id} initial={{ opacity: 0, y: 60, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: i * 0.08 }} whileHover={{ y: -16, rotate: i % 2 ? 2 : -2 }} className="glass w-full overflow-hidden p-3">
            <div className="relative h-80 overflow-hidden rounded-[22px] bg-[#3a1725]">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-75" />
              <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-black text-[#df1d73] backdrop-blur">{item.date}</div>
            </div>
            <div className="p-5">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#df1d73]">Frame {String(i + 1).padStart(2, '0')}</p>
              <h3 style={{ fontFamily: 'var(--font-display)' }} className="mb-3 text-3xl font-black leading-none tracking-[-0.04em]">{item.title}</h3>
              <p className="text-sm leading-7 text-[#6d4052]">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
