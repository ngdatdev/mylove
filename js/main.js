import { $, $$, getJson, photoUrl } from './utils.js';
import { initScrollManager } from './scroll-manager.js';
import { initParticles } from './particles.js';
import { openLightbox, initLightbox } from './lightbox.js';

const contentPromise = getJson('data/content.json');
const manifestPromise = getJson('albums/manifest.json');

function renderStory(content){
  const grid = $('#storyGrid');
  grid.innerHTML = content.story.map((item, i) => `
    <article class="glass-card story-card reveal ${i % 2 === 0 ? 'slide-left' : 'slide-right'}">
      <div class="story-thumb">${item.icon}</div>
      <div><p class="eyebrow">${item.speaker}</p><h3>${item.title}</h3><p><strong>${item.quote}</strong></p><p>${item.body}</p></div>
    </article>`).join('');
}

function renderTimeline(content){
  const list = $('#timelineList');
  list.innerHTML = content.timeline.map((item, i) => `
    <article class="glass-card timeline-node reveal ${i % 2 === 0 ? 'slide-left' : 'slide-right'}">
      <p class="eyebrow">${item.date}</p><h3>${item.icon} ${item.title}</h3><p>${item.text}</p>
    </article>`).join('');
}

function renderLetters(content){
  const grid = $('#lettersGrid');
  grid.innerHTML = content.letters.map((item, i) => `
    <article class="letter-card reveal" style="--rot:${i % 2 === 0 ? '-4deg' : '4deg'}">
      <p>${item.title}</p><h3>${item.text}</h3>
    </article>`).join('');
  grid.addEventListener('click', e => { const card = e.target.closest('.letter-card'); if(card) card.classList.toggle('is-open'); });
}

function renderMap(content){
  const svg = $('#journeyMap');
  const paths = content.locations.map((loc, i, arr) => i < arr.length - 1 ? `<path d="M ${loc.x} ${loc.y} L ${arr[i+1].x} ${arr[i+1].y}" stroke="rgba(255,255,255,.65)" stroke-width="4" stroke-dasharray="8 12" fill="none"/>` : '').join('');
  const pins = content.locations.map(loc => `<g transform="translate(${loc.x},${loc.y})"><circle r="18" fill="#ff6fae" opacity=".85"></circle><text y="6" text-anchor="middle" font-size="18">❤</text><title>${loc.name} - ${loc.date}: ${loc.text}</title></g>`).join('');
  svg.innerHTML = `<rect width="900" height="420" rx="26" fill="url(#bg)"/><defs><linearGradient id="bg" x1="0" x2="1"><stop offset="0%" stop-color="#fff0f5"/><stop offset="100%" stop-color="#e8f0ff"/></linearGradient></defs>${paths}${pins}`;
}

function renderTracks(content){
  $('#trackList').innerHTML = content.tracks.map(track => `
    <article class="track-card reveal"><div class="vinyl"></div><h3>${track.title}</h3><p>${track.artist}</p><p>${track.reason}</p></article>`).join('');
}

function startCounter(content){
  const box = $('#loveCounter');
  const target = new Date(content.startDate).getTime();
  const render = () => {
    const diff = Math.max(0, Date.now() - target);
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remDays = days % 30;
    box.innerHTML = [
      ['Nam', years], ['Thang', months], ['Ngay', remDays], ['Gio', hours % 24], ['Phut', mins % 60]
    ].map(([label, val]) => `<div class="counter-item"><strong>${val}</strong><span>${label}</span></div>`).join('');
  };
  render();
  setInterval(render, 60000);
  $('#statsGrid').innerHTML = content.stats.map(s => `<div class="stat-card"><strong>${s.value}</strong><div>${s.label}</div></div>`).join('');
}

async function renderAlbums(manifest){
  const tabs = $('#albumTabs');
  const grid = $('#albumGrid');
  const allAlbums = manifest.albums;
  const categories = [{ id:'all', label:'Tat ca' }, ...manifest.categories];
  let active = 'all';
  const draw = () => {
    const items = active === 'all' ? allAlbums : allAlbums.filter(a => a.category === active);
    grid.innerHTML = items.length ? items.map(a => `
      <article class="album-card reveal" data-id="${a.id}">
        <div class="album-cover">❤</div>
        <div class="album-card__body"><span class="badge">${a.photoCount} anh</span><h3>${a.title}</h3><p>${a.date}</p><p>${a.description}</p></div>
      </article>`).join('') : '<p class="album-card" style="padding:24px;text-align:center">Se co them ky niem o day...</p>';
  };
  tabs.innerHTML = categories.map(c => `<button class="chip ${c.id === active ? 'is-active' : ''}" data-cat="${c.id}">${c.label}</button>`).join('');
  draw();
  tabs.onclick = e => { const btn = e.target.closest('[data-cat]'); if(!btn) return; active = btn.dataset.cat; $$('.chip', tabs).forEach(x => x.classList.toggle('is-active', x === btn)); draw(); };
  grid.onclick = async e => {
    const card = e.target.closest('[data-id]'); if(!card) return;
    const album = allAlbums.find(a => a.id === card.dataset.id);
    const details = await getJson(`albums/${album.id}/album.json`);
    openLightbox({ ...details, photos: details.photos }, `albums/${album.id}`);
  };
}

function initConstellation(){
  const canvas = $('#constellationCanvas');
  const ctx = canvas.getContext('2d');
  const stars = Array.from({ length: 42 }, (_, i) => ({ x: 130 + (i % 7) * 90 + (i % 2) * 18, y: 110 + Math.floor(i / 7) * 42, r: 2 + Math.random() * 2 }));
  const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); };
  resize(); addEventListener('resize', resize);
  let t = 0;
  const loop = () => {
    t += .012; ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = 'rgba(255,255,255,.95)';
    stars.forEach((s,i) => { ctx.beginPath(); ctx.arc(s.x + Math.sin(t + i) * 2, s.y + Math.cos(t * 1.2 + i) * 1.5, s.r, 0, Math.PI*2); ctx.fill(); });
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); stars.forEach((s,i) => { const p = i ? stars[i-1] : null; if(p) { ctx.moveTo(p.x,p.y); ctx.lineTo(s.x,s.y); } }); ctx.stroke(); requestAnimationFrame(loop);
  };
  loop();
}

(async function init(){
  initParticles();
  initLightbox();
  const [content, manifest] = await Promise.all([contentPromise, manifestPromise]);
  renderStory(content);
  renderTimeline(content);
  renderLetters(content);
  renderMap(content);
  renderTracks(content);
  startCounter(content);
  await renderAlbums(manifest);
  initScrollManager();
  initConstellation();
  document.getElementById('preloader').classList.add('is-hidden');
})();

