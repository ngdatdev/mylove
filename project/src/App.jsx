import { useEffect } from 'react';
import Preloader from './components/ui/Preloader';
import FloatingHearts from './components/animations/FloatingHearts';
import MusicPlayer from './components/ui/MusicPlayer';
import HeroSection from './components/sections/HeroSection';
import OurStorySection from './components/sections/OurStorySection';
import TimelineSection from './components/sections/TimelineSection';
import AlbumsSection from './components/sections/AlbumsSection';
import LoveLettersSection from './components/sections/LoveLettersSection';
import JourneyMapSection from './components/sections/JourneyMapSection';
import SoundtrackSection from './components/sections/SoundtrackSection';
import LoveCounterSection from './components/sections/LoveCounterSection';
import ConstellationSection from './components/sections/ConstellationSection';
import './index.css';
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision';

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div id="scroll-progress" />;
}

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <FloatingHearts />
      <MusicPlayer />

      <main>
        <HeroSection />
        <OurStorySection />
        <TimelineSection />
        <AlbumsSection />
        <LoveLettersSection />
        <JourneyMapSection />
        <SoundtrackSection />
        <LoveCounterSection />
        <ConstellationSection />
      </main>
    </>
  );
}
