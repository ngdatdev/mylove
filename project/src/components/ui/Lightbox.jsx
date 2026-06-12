import { useState, useEffect, useCallback } from 'react';

export default function Lightbox({ photos, initialIndex = 0, onClose }) {
  const [idx, setIdx] = useState(initialIndex);

  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  const photo = photos[idx];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', textAlign: 'center' }}>
        <img className="lightbox-img" src={photo.src} alt={photo.caption || ''} />
        {photo.caption && <p className="lightbox-caption">{photo.caption}</p>}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          {idx + 1} / {photos.length}
        </p>
      </div>

      {photos.length > 1 && (
        <>
          <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
          <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); next(); }}>›</button>
        </>
      )}
      <button className="lightbox-close" onClick={onClose}>✕</button>
    </div>
  );
}
