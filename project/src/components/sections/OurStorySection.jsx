import { motion } from 'framer-motion';
import { content } from '../../data/content';

const cardVariants = {
  hidden: { opacity: 0, y: 80, rotate: -4, filter: 'blur(14px)' },
  visible: (i) => ({ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2, filter: 'blur(0px)', transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
};

export default function OurStorySection() {
  return (
    <section id="our-story" className="section bg-pink-purple">
      <div className="absolute left-0 top-0 h-full w-full opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,63,146,.22),transparent_24rem),radial-gradient(circle_at_80%_60%,rgba(255,172,208,.36),transparent_22rem)]" />
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative text-center">
        <span className="chapter-badge">Act I / split screen</span>
        <h2 className="section-title mt-5">Câu chuyện của chúng mình</h2>
        <p className="section-subtitle">Hai góc nhìn đan vào nhau như một cuộn phim hồng.</p>
      </motion.div>

      <div className="relative mx-auto grid gap-6 md:grid-cols-2">
        {content.ourStory.map((item, i) => (
          <motion.article key={item.id} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} whileHover={{ y: -10, rotate: 0, scale: 1.015 }} className="group relative min-h-[420px] overflow-hidden rounded-[36px] bg-[#3a1725] p-4 shadow-[0_30px_90px_rgba(223,29,115,0.18)]">
            <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-110 group-hover:opacity-72" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,23,37,0.08),rgba(58,23,37,0.86))]" />
            <div className="relative flex h-full min-h-[388px] flex-col justify-between rounded-[28px] border border-white/20 p-6 text-white backdrop-blur-[1px]">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.22em] text-white/70">
                <span>{String(i + 1).padStart(2, '0')}</span><span>{item.author} kể</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="mb-4 text-3xl font-black leading-none tracking-[-0.04em] md:text-5xl">{item.title}</h3>
                <p className="max-w-xl text-sm leading-7 text-white/82 md:text-base">{item.content}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
