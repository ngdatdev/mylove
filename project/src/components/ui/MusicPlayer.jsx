import { useState, useEffect, useRef } from 'react';
import iCanFlyAudio from '../../assets/audio/i_can_fly.mp3';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);

  // Try to play; returns true if successful
  const tryPlay = () => {
    const audio = audioRef.current;
    if (!audio || hasStarted.current) return;
    audio.volume = 0.2;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        hasStarted.current = true;
        setPlaying(true);
      }).catch(() => {
        // Still blocked — will retry on next interaction
      });
    }
  };

  useEffect(() => {
    // Attempt autoplay immediately (works if user already interacted)
    tryPlay();

    // Listen for the FIRST user interaction anywhere to unlock audio
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    const unlock = () => {
      tryPlay();
      if (hasStarted.current) {
        events.forEach((e) => window.removeEventListener(e, unlock, true));
      }
    };
    events.forEach((e) => window.addEventListener(e, unlock, { capture: true, passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock, true));
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.2;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={iCanFlyAudio} />

      {/* FAB button — bottom-right corner */}
      <button
        id="music-fab"
        onClick={toggle}
        title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
        className="glass"
        style={{ color: '#8B5CF6' }}
      >
        <span style={{
          display: 'inline-block',
          animation: playing ? 'spin 3s linear infinite' : 'none',
        }}>
          {playing ? '🔊' : '🔇'}
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </>
  );
}

