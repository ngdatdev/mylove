import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from '../ui/Lightbox';
import { content } from '../../data/content';

export default function AlbumsSection() {
  const manifest = content.albumsData;
  const [activeCategory, setActiveCategory] = useState('all');
  const [openAlbum, setOpenAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openAlbumById = (id) => {
    const data = manifest.albums.find(a => a.id === id);
    if (data) {
      setOpenAlbum(data);
      setAlbumPhotos(data.photos || []);
      setLightboxIdx(0);
    }
  };

  const filtered = !manifest ? [] : activeCategory === 'all' ? manifest.albums : manifest.albums.filter(a => a.category === activeCategory);

  return (
    <section id="albums" className="section bg-cream-pink">
      <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative text-center">
        <span className="chapter-badge">Gallery / hover portal</span>
        <h2 className="section-title mt-5">Những khoảnh khắc</h2>
        <p className="section-subtitle">Cậu ấy và tớ.</p>
      </motion.div>
      {manifest && <div className="mb-10 flex flex-wrap justify-center gap-3 mb-10 flex flex-wrap justify-center gap-2">{manifest.categories.map(cat => <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`rounded-full px-5 py-3 text-sm font-extrabold transition ${activeCategory === cat.id ? 'bg-[#df1d73] text-white shadow-[0_18px_50px_rgba(223,29,115,.28)]' : 'bg-white/60 text-[#6d4052] backdrop-blur hover:bg-white'}`}>{cat.emoji} {cat.label}</button>)}</div>}
      <div className='h-4'></div>
      <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((album, i) => (
          <motion.button key={album.id} onClick={() => openAlbumById(album.id)} initial={{ opacity: 0, y: 70, clipPath: 'inset(40% round 30px)' }} whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% round 30px)' }} viewport={{ once: true }} transition={{ duration: 0.75, delay: i * 0.08 }} whileHover={{ y: -12 }} className={`group relative overflow-hidden rounded-[34px] text-left shadow-[0_28px_80px_rgba(223,29,115,.15)]`}>
            <img src={album.cover} alt={album.title} className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-110 md:h-[360px]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(58,23,37,.88))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#ffd6e8]">{album.photos?.length || 0} ảnh / {album.date}</p>
              <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl font-black leading-none tracking-[-0.05em]">{album.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/72">{album.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      {lightboxIdx !== null && albumPhotos.length > 0 && <Lightbox photos={albumPhotos} initialIndex={lightboxIdx} onClose={() => { setLightboxIdx(null); setOpenAlbum(null); }} />}
    </section>
  );
}
