import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);
  const audioRef = useRef(null);

  // Show prompt after 2s
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* Actual audio — swap src when you have a real file */}
      <audio ref={audioRef} loop src="/assets/audio/bg-music.mp3" />

      {/* Prompt toast */}
      {shown && !playing && (
        <div
          onClick={toggle}
          style={{
            position: 'fixed', bottom: 90, right: 28,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: 50,
            padding: '8px 16px',
            fontSize: '0.8rem',
            color: '#4A3555',
            cursor: 'pointer',
            zIndex: 1000,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(139,92,246,0.15)',
          }}
        >
          🎵 Bật nhạc nền?
        </div>
      )}

      {/* FAB button */}
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
          {playing ? '🎵' : '🎶'}
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    </>
  );
}
