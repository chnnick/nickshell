import type React from 'react';
import { About } from '../components/site/About';
import { Experience } from '../components/site/Experience';
import { Footer } from '../components/site/Footer';
import { Gallery } from '../components/site/Gallery';
import { Header } from '../components/site/Header';
import { Projects } from '../components/site/Projects';

/**
 * Single scrolling column. Everything renders on first paint — no scroll-reveal
 * animation, no staged timeouts, nothing that arrives after the page does.
 */
export const Home: React.FC = () => (
  <div className="mx-auto max-w-column px-6 pt-16 text-[14px] leading-[1.65] sm:px-12 sm:pt-24">
    <Header />
    <About />
    <Experience />
    <Projects />
    <Gallery />
    <Footer />
  </div>
);
