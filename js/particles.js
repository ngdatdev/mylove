export function initParticles(){
  const root = document.getElementById('particles'); if(!root) return;
  const count = matchMedia('(max-width: 768px)').matches ? 7 : 18;
  for(let i=0;i<count;i++){ const el=document.createElement('span'); const heart=i%2===0; el.className=`particle ${heart?'heart':'bokeh'}`; el.style.cssText=`--x:${Math.random()*100}vw;--y:${Math.random()*100}vh;--s:${8+Math.random()*24}px;--o:${.14+Math.random()*.28};--d:${8+Math.random()*14}s;--delay:${-Math.random()*12}s`; root.append(el); }
}
