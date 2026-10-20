import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DigitRoller: Single digit column that rolls vertically to display 0-9.
 */
function DigitRoller({ digit }) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="digit-column" aria-hidden="true">
      <motion.div
        className="digit-track"
        animate={{ y: `-${digit * 10}%` }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
      >
        {digits.map((d) => (
          <span key={d} className="digit-cell">
            {d}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * MonoCounter: 3-digit rolling tabular counter showing real loading percentage.
 */
export function MonoCounter({ progress }) {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));
  const hundreds = Math.floor(clamped / 100);
  const tens = Math.floor((clamped % 100) / 10);
  const ones = clamped % 10;

  return (
    <div
      className="mono-counter-container"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading reels progress"
    >
      <div className="counter-digits">
        {hundreds > 0 && <DigitRoller digit={hundreds} />}
        <DigitRoller digit={tens} />
        <DigitRoller digit={ones} />
        <span className="counter-unit">%</span>
      </div>
    </div>
  );
}

/**
 * ScrambledCaption: Scrambles random glyphs before settling into "Loading Reels".
 */
export function ScrambledCaption({ isComplete }) {
  const targetText = 'Loading Reels';
  const glyphs = '0123456789_#*+<>~%!?';
  const [displayText, setDisplayText] = useState(targetText);

  useEffect(() => {
    if (isComplete) {
      setDisplayText('Reels Ready');
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const revealedCount = Math.floor(frame / 3);
      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < revealedCount) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      setDisplayText(scrambled);
    }, 45);

    return () => clearInterval(interval);
  }, [isComplete]);

  return <div className="scrambled-caption">{displayText}</div>;
}

/**
 * ReelLoader: Full-screen overlay with:
 * - Brand wordmark that flies to header on handoff
 * - Scrambled caption
 * - Tabular numeral rolling counter connected to real assets
 * - Accessible skip trigger
 */
export function ReelLoader({
  progress,
  isHandoff,
  onSkip,
  brandWord = 'SOHAM THORAT'
}) {
  return (
    <AnimatePresence>
      {!isHandoff && (
        <motion.div
          className="reel-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
        >
          {/* Top Left Brand Wordmark (Flies into header on handoff) */}
          <motion.div
            layoutId="brand-wordmark"
            className="loader-brand-wordmark"
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-text">{brandWord}</span>
          </motion.div>

          {/* Accessible Skip Button */}
          <button
            type="button"
            className="loader-skip-btn"
            onClick={onSkip}
            aria-label="Skip 3D entrance animation and go directly to content"
          >
            Skip Intro (Esc)
          </button>

          {/* Bottom Right Counter & Scrambled Caption */}
          <div className="loader-bottom-right">
            <ScrambledCaption isComplete={progress >= 100} />
            <MonoCounter progress={progress} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
