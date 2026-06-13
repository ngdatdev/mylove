/**
 * BackgroundBeamsWithCollision
 * Ported from Aceternity UI (https://ui.aceternity.com/components/background-beams-with-collision)
 * Adapted for Vite + React (no Next.js / shadcn required).
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Collision particle ──────────────────────────────────────────────────────
function Explosion({ style }) {
  const spans = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const velocity = 30 + Math.random() * 60;
    const size = 1 + Math.random() * 2;
    return { angle, velocity, size };
  });

  return (
    <AnimatePresence>
      <motion.div
        className="absolute z-50 h-2 w-2"
        style={style}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {spans.map((s, i) => (
          <motion.span
            key={i}
            className="absolute inline-block h-px w-px rounded-full bg-gradient-to-b from-[#df1d73] to-[#ffd6e8]"
            style={{ width: `${s.size}px`, height: `${s.size}px` }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((s.angle * Math.PI) / 180) * s.velocity,
              y: Math.sin((s.angle * Math.PI) / 180) * s.velocity,
              opacity: 0,
            }}
            transition={{ duration: 0.8 + Math.random() * 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Single animated beam ────────────────────────────────────────────────────
function CollisionMechanism({ containerRef, parentRef, beamOptions = {} }) {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({ detected: false, coords: null });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (!beamRef.current || !containerRef.current || cycleCollisionDetected) return;

      const beamRect = beamRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (beamRect.bottom >= containerRect.bottom) {
        const relativeX = beamRect.left - containerRect.left + beamRect.width / 2;
        const relativeY = beamRect.bottom - containerRect.top;
        setCollision({ detected: true, coords: { x: relativeX, y: relativeY } });
        setCycleCollisionDetected(true);
      }
    };

    const animationFrame = requestAnimationFrame(function loop() {
      checkCollision();
      requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected) {
      const timeout = setTimeout(() => {
        setCollision({ detected: false, coords: null });
        setCycleCollisionDetected(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [collision.detected]);

  const resetBeam = useCallback(() => {
    setBeamKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY ?? '-200px',
          translateX: beamOptions.initialX ?? '0px',
          rotate: beamOptions.rotate ?? 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY ?? '1800px',
            translateX: beamOptions.translateX ?? '0px',
            rotate: beamOptions.rotate ?? 0,
          },
        }}
        transition={{
          duration: beamOptions.duration ?? 8,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay ?? 0,
        }}
        onAnimationComplete={resetBeam}
        className={`absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-[#df1d73] via-[#ff72ad] to-transparent ${beamOptions.className ?? ''}`}
        style={{
          left: beamOptions.initialX ?? '0px',
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coords && (
          <Explosion
            style={{
              left: `${collision.coords.x}px`,
              top: `${collision.coords.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Public component ────────────────────────────────────────────────────────
export function BackgroundBeamsWithCollision({ children, className = '' }) {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    { initialX: '10px',   translateX: '10px',   duration: 7,  repeatDelay: 3,  delay: 2 },
    { initialX: '80px',   translateX: '80px',   duration: 5,  repeatDelay: 5,  delay: 1,  className: 'h-8' },
    { initialX: '180px',  translateX: '180px',  duration: 9,  repeatDelay: 4,  delay: 0,  className: 'h-16' },
    { initialX: '300px',  translateX: '300px',  duration: 4,  repeatDelay: 8,  delay: 3,  className: 'h-6' },
    { initialX: '420px',  translateX: '420px',  duration: 6,  repeatDelay: 6,  delay: 1.5 },
    { initialX: '540px',  translateX: '540px',  duration: 10, repeatDelay: 3,  delay: 0.5,className: 'h-24' },
    { initialX: '660px',  translateX: '660px',  duration: 3,  repeatDelay: 3,  delay: 4 },
    { initialX: '750px',  translateX: '750px',  duration: 8,  repeatDelay: 5,  delay: 2,  className: 'h-10' },
    { initialX: '860px',  translateX: '860px',  duration: 5,  repeatDelay: 9,  delay: 0 },
    { initialX: '950px',  translateX: '950px',  duration: 11, repeatDelay: 2,  delay: 3,  className: 'h-20' },
    { initialX: '1050px', translateX: '1050px', duration: 4,  repeatDelay: 2,  delay: 1,  className: 'h-12' },
    { initialX: '1150px', translateX: '1150px', duration: 7,  repeatDelay: 6,  delay: 2.5,className: 'h-8' },
    { initialX: '1260px', translateX: '1260px', duration: 6,  repeatDelay: 4,  delay: 0,  className: 'h-6' },
    { initialX: '1350px', translateX: '1350px', duration: 9,  repeatDelay: 5,  delay: 1.5 },
    { initialX: '1450px', translateX: '1450px', duration: 5,  repeatDelay: 7,  delay: 3,  className: 'h-14' },
    { initialX: '1540px', translateX: '1540px', duration: 8,  repeatDelay: 3,  delay: 0.5 },
  ];

  return (
    <div
      ref={parentRef}
      className={`relative flex w-full overflow-hidden bg-[#fff1f6] ${className}`}
    >
      {/* Beam container (full absolute overlay) */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none">
        {beams.map((beam, i) => (
          <CollisionMechanism
            key={i}
            containerRef={containerRef}
            parentRef={parentRef}
            beamOptions={beam}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
