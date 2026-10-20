import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReelLoader } from './ReelLoader.jsx';
import { ReelWall } from './ReelWall.jsx';
import './ReelHero.css';

// Sample real reel catalogue using actual video assets in workspace
// 9 Real portfolio videos
const SAMPLE_REELS = [
  {
    id: 1,
    title: 'Kinetic Velocity Reel',
    client: 'Lead Video Editor',
    videoUrl: 'portfolio_vids/Portfolio_vid_1.mp4',
    posterUrl: 'assets/images/portfolio-vid-1.webp',
    linkUrl: '#create'
  },
  {
    id: 2,
    title: 'High-Retention Hook Cut',
    client: 'Motion Graphics',
    videoUrl: 'portfolio_vids/Portfolio_vid_2.mp4',
    posterUrl: 'assets/images/portfolio-vid-2.webp',
    linkUrl: '#create'
  },
  {
    id: 3,
    title: 'Cinematic Brand Narrative',
    client: 'Creative Direction',
    videoUrl: 'portfolio_vids/Portfolio_vid_3.mp4',
    posterUrl: 'assets/images/portfolio-vid-3.webp',
    linkUrl: '#create'
  },
  {
    id: 4,
    title: 'Dynamic Visual Flow',
    client: 'Sound Design & Sync',
    videoUrl: 'portfolio_vids/Portfolio_vid_4.mp4',
    posterUrl: 'assets/images/portfolio-vid-4.webp',
    linkUrl: '#create'
  },
  {
    id: 5,
    title: 'Fast-Paced Social Retention',
    client: 'Short-Form Specialist',
    videoUrl: 'portfolio_vids/Portfolio_vid_5.mp4',
    posterUrl: 'assets/images/portfolio-vid-5.webp',
    linkUrl: '#create'
  },
  {
    id: 6,
    title: 'Premium Commercial Cut',
    client: 'Color & Assembly',
    videoUrl: 'portfolio_vids/Portfolio_vid_6.mp4',
    posterUrl: 'assets/images/portfolio-vid-6.webp',
    linkUrl: '#create'
  },
  {
    id: 7,
    title: 'Visual FX & Motion Reel',
    client: 'VFX & Compositing',
    videoUrl: 'portfolio_vids/Portfolio_vid_7.mp4',
    posterUrl: 'assets/images/portfolio-vid-7.webp',
    linkUrl: '#create'
  },
  {
    id: 8,
    title: 'Vertical Anamorphic Motion',
    client: '9:16 Kinetic Design',
    videoUrl: 'portfolio_vids/Portfolio_vid_8.mp4',
    posterUrl: 'assets/images/portfolio-vid-8.webp',
    linkUrl: '#create'
  },
  {
    id: 9,
    title: 'Glitch & Typography Cut',
    client: 'Typography & Motion',
    videoUrl: 'portfolio_vids/Portfolio_vid_9.mp4',
    posterUrl: 'assets/images/portfolio-vid-9.webp',
    linkUrl: '#create'
  }
];

// Fill up to 18 items (2 × 9) for balanced double-loop cylinder distribution
const REELS_CATALOGUE = Array.from({ length: 18 }, (_, i) => ({
  ...SAMPLE_REELS[i % SAMPLE_REELS.length],
  id: i + 1,
  title: `${SAMPLE_REELS[i % SAMPLE_REELS.length].title} [${String((i % 9) + 1).padStart(2, '0')}]`
}));

export function ReelHero() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isHandoff, setIsHandoff] = useState(false);
  const [forceSkip, setForceSkip] = useState(false);

  // Esc / Tab keyboard listener for immediate escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' || e.key === 'Tab') {
      setForceSkip(true);
      setIsHandoff(true);
      setLoadProgress(100);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSkip = () => {
    setForceSkip(true);
    setIsHandoff(true);
    setLoadProgress(100);
  };

  const handleHandoffReady = () => {
    // Overlapping handoff: begins as cards expand into final level perspective
    setIsHandoff(true);
  };

  return (
    <div className="reel-hero-root">
      {/* 1. Seamless 3D Scene (Both Loader & Hero Wall) */}
      <ReelWall
        reels={REELS_CATALOGUE}
        onProgress={setLoadProgress}
        onHandoffReady={handleHandoffReady}
        forceSkip={forceSkip}
      />

      {/* 2. Loader UI Overlay (Counter, Scrambled Text, Flying Brand) */}
      <ReelLoader
        progress={loadProgress}
        isHandoff={isHandoff}
        onSkip={handleSkip}
        brandWord="SOHAM THORAT"
      />

      {/* 3. White Page Backdrop Handoff Layer:
          Fades out cleanly without resetting the cards */}
      <motion.div
        className="loader-backdrop-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHandoff ? 0 : 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isHandoff ? 'none' : 'auto' }}
        aria-hidden="true"
      />

      {/* 4. Site Header & Content Overlap (Enters as cards settle) */}
      <motion.header
        className="site-header-handoff"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isHandoff ? 1 : 0, y: isHandoff ? 0 : -20 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header-inner container">
          {/* Brand Wordmark target for FLIP layout flight */}
          <motion.div layoutId="brand-wordmark" className="header-logo-wordmark">
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-text">SOHAM THORAT</span>
          </motion.div>

          <nav aria-label="Main Navigation" className="header-nav">
            <a href="#create">Create</a>
            <a href="#build">Build</a>
            <a href="#learn">Learn</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-contact-btn">Get In Touch</a>
          </nav>
        </div>
      </motion.header>

      {/* 5. Hero Content Overlap: Headline & Pitch */}
      <motion.div
        className="hero-headline-overlay container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isHandoff ? 1 : 0, y: isHandoff ? 0 : 30 }}
        transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-content-clean">
          <div className="hero-badge-wrap">
            <span className="sticker-tag">High-Retention Video & Engineering</span>
          </div>
          <h1 className="hero-clean-title">
            HIGH-OCTANE <span className="highlight-clean">VIDEO REELS</span>
          </h1>
          <p className="hero-clean-pitch">
            16 vertical video cards running pure CSS 3D transforms. Turn the cylinder, swipe between projects, or dive in.
          </p>
          <div className="hero-clean-actions">
            <a href="#create" className="btn btn-primary">
              Explore All Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Work With Me
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ReelHero;
