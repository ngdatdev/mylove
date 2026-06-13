import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { content } from '../../data/content';
import { BackgroundBeamsWithCollision } from '../ui/BackgroundBeamsWithCollision';

const fragments = [
  { className: 'left-[7%] top-[16%] h-28 w-20 md:h-40 md:w-28', delay: 0.1 },
  { className: 'right-[9%] top-[14%] h-24 w-36 md:h-36 md:w-56', delay: 0.22 },
  { className: 'bottom-[18%] left-[10%] h-24 w-36 md:h-32 md:w-52', delay: 0.34 },
  { className: 'bottom-[12%] right-[13%] h-32 w-24 md:h-48 md:w-36', delay: 0.46 },
];

const memories = [''];

function MagneticBackdrop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.4 });
  const orbX = useTransform(smoothX, [0, 1], ['-4%', '4%']);
  const orbY = useTransform(smoothY, [0, 1], ['-3%', '3%']);

  useEffect(() => {
    const updateMouse = (event) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('pointermove', updateMouse);
    return () => window.removeEventListener('pointermove', updateMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div className="absolute inset-0" style={{ x: orbX, y: orbY }}>
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#ff4f9a]/25 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#ff8cc6]/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#ffc2dd]/25 blur-3xl" />
    </motion.div>
  );
}

function FloatingFragment({ className, delay }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 50, rotate: -8, clipPath: 'inset(45% 45% 45% 45% round 28px)' }}
      animate={{ opacity: 1, y: [0, -18, 0], rotate: [-5, 4, -5], clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      transition={{ opacity: { duration: 0.8, delay }, clipPath: { duration: 1, delay }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay }, rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay } }}
    >
      <div className="h-full w-full border border-[#3a1725]/15 bg-[#fff5df]/70 p-2 shadow-[0_30px_90px_rgba(23,31,27,0.18)] backdrop-blur-md">
        <div className="h-full w-full rounded-[22px] bg-[linear-gradient(135deg,#ff4f9a_0%,#ffc2dd_38%,#ff8cc6_100%)] opacity-80 mix-blend-multiply" />
      </div>
    </motion.div>
  );
}


function WalkingBear() {
  const loopySrc = '/assets/3caabeb9-033f-499d-9ebc-7d9508cc600d.png';

  return (
    <motion.div
      className="pointer-events-none absolute bottom-8 left-0 z-20 hidden md:block"
      initial={{ x: '-18vw' }}
      animate={{ x: ['-18vw', '118vw'] }}
      transition={{ duration: 24, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
    >
      <motion.div
        className="relative h-36 w-36"
        animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute -right-12 top-0 rounded-full bg-[#fff7fb]/85 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#df1d73] shadow-[0_14px_38px_rgba(223,29,115,.18)] backdrop-blur-md"
          animate={{ y: [0, -10, 0], opacity: [0.78, 1, 0.78] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Dươn nè
        </motion.div>

        <div className="absolute inset-0 p-2 bg-transparent">
          <img
            src={loopySrc}
            alt="Loopy gui tim"
            className="h-full w-full rounded-[28px] object-cover bg-transparent"
          />
        </div>

        <motion.div
          className="absolute -top-4 right-5 text-lg"
          animate={{ y: [0, -18], opacity: [0, 1, 0], scale: [0.7, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        >
          💕
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MemoryTicker() {
  return (
    <div className="absolute bottom-8 left-1/2 hidden w-[min(920px,86vw)] -translate-x-1/2 overflow-hidden rounded-full border border-[#3a1725]/10 bg-[#fff7fb]/65 py-3 backdrop-blur-xl md:block">
      <motion.div className="flex gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.32em] text-[#3a1725]/60" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        {[...memories, ...memories, ...memories].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </motion.div>
    </div>
  );
}

export default function HeroSectionV2() {
  const { couple } = content;

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
    <section id="hero" className="relative min-h-screen w-full overflow-hidden text-[#3a1725]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_42%,rgba(35,49,43,0.14)_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(35,49,43,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(35,49,43,.22)_1px,transparent_1px)] [background-size:48px_48px]" />
      <MagneticBackdrop />
      {fragments.map((fragment) => <FloatingFragment key={fragment.className} {...fragment} />)}

      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center justify-center px-5 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 flex items-center gap-3 rounded-full border border-[#3a1725]/10 bg-[#fff7fb]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] shadow-[0_16px_50px_rgba(35,49,43,0.08)] backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-[#ff4f9a] shadow-[0_0_24px_#ff4f9a]" />
          Story love
        </motion.div>

        <motion.h1 style={{ fontFamily: 'var(--font-display)' }} className="text-[clamp(4.2rem,15vw,12rem)] font-black leading-[0.78] tracking-[-0.09em]">
          <motion.span className="block origin-left" initial={{ y: 120, rotateX: -70, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>{couple.name1}</motion.span>
          <motion.span className="mx-auto my-2 block w-fit rounded-full bg-[#3a1725] px-7 py-3 text-[clamp(1rem,3vw,2rem)] font-black leading-none tracking-[0.36em] text-[#fff7fb]" initial={{ clipPath: 'inset(0% 50% 0% 50% round 9999px)', opacity: 0 }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 9999px)', opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}>&amp;</motion.span>
          <motion.span className="block origin-right text-[#e91e73]" initial={{ y: 120, rotateX: 70, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>{couple.name2}</motion.span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }} className="mt-9 max-w-2xl text-balance text-xl font-medium leading-relaxed text-[#3a1725]/78 md:text-3xl">
          {couple.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05 }} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })} className="group relative overflow-hidden rounded-full bg-[#3a1725] px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-[#fff7fb] shadow-[0_24px_70px_rgba(35,49,43,0.22)]">
            <span className="relative z-10">Anh và em</span>
            <span className="absolute inset-0 -translate-x-full bg-[#ff4f9a] transition-transform duration-500 group-hover:translate-x-0" />
          </button>
          <span className="rounded-full border border-[#3a1725]/10 bg-[#fff7fb]/55 px-5 py-4 text-sm font-semibold text-[#3a1725]/65 backdrop-blur-xl">{couple.subTagline}</span>
        </motion.div>
      </div>

      <motion.div className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-xs font-black uppercase tracking-[0.36em] text-[#3a1725]/45 [writing-mode:vertical-rl] md:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>Since {couple.startDate}</motion.div>
      <WalkingBear />
      <MemoryTicker />
    </section>
    </BackgroundBeamsWithCollision>
  );
}

