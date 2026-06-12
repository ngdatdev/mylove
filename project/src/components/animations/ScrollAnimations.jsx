import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }
  }),
};

const VIEWPORT = { once: true, margin: '-80px' };

export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function SlideLeft({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function SlideRight({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={slideRight}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
