export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export async function getJson(path) { const res = await fetch(path); if (!res.ok) throw new Error(`Cannot load ${path}`); return res.json(); }
export function photoUrl(path, fallback = 'Love') { return `https://placehold.co/900x650/f8c8dc/2d1b33?text=${encodeURIComponent(fallback)}`; }
