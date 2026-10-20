import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useMotionValue, useSpring, animate } from 'framer-motion';
import { reelPose, interpolateScene } from './reelPose.js';

const TOTAL_SLOTS = 16;
const SLOT_STEP = 360 / TOTAL_SLOTS;

/**
 * ReelWall: 3D Cylinder Reel Wall powered by Motion & plain CSS 3D transforms.
 *
 * @param {object} props
 * @param {Array} props.reels - Array of reel data items: { id, title, videoUrl, posterUrl, linkUrl, client }
 * @param {function} props.onProgress - Callback delivering real asset load progress [0, 100]
 * @param {function} props.onHandoffReady - Callback triggered when formation completes and assets ready
 * @param {boolean} props.forceSkip - When user presses Escape, Tab or clicks Skip
 */
export function ReelWall({
  reels = [],
  onProgress,
  onHandoffReady,
  forceSkip = false
}) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);

  // Motion Values: The two master drivers
  const formation = useMotionValue(0);
  const expansion = useMotionValue(0);

  // Smooth angle tracking with spring dynamics
  const targetAngle = useMotionValue(0);
  const visibleAngle = useSpring(targetAngle, {
    stiffness: 90,
    damping: 22,
    mass: 0.85
  });

  // State management
  const [assetsReady, setAssetsReady] = useState(false);
  const [isFormed, setIsFormed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  // Interaction tracking
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastAngle = useRef(0);
  const frameCounter = useRef(0);

  // DOM write cache for dirty-checking
  const domCache = useRef(
    Array.from({ length: TOTAL_SLOTS }, () => ({
      transform: '',
      opacity: -1,
      visibility: ''
    }))
  );

  // Shared ring CSS variable cache
  const ringCache = useRef({
    perspective: 0,
    tilt: 999,
    roll: 999,
    radius: 0
  });

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // 1. Asset preloading with real progress tracking
  useEffect(() => {
    if (!reels || reels.length === 0) {
      onProgress?.(100);
      setAssetsReady(true);
      return;
    }

    let loadedCount = 0;
    const totalAssets = Math.min(reels.length, TOTAL_SLOTS) * 2; // poster + video metadata

    const markLoaded = () => {
      loadedCount++;
      const currentProgress = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      onProgress?.(currentProgress);
      if (loadedCount >= totalAssets) {
        setAssetsReady(true);
      }
    };

    // Preload top 16 reel assets
    const activeReels = reels.slice(0, TOTAL_SLOTS);
    activeReels.forEach((reel) => {
      // Image poster
      const img = new Image();
      img.src = reel.posterUrl;
      img.onload = markLoaded;
      img.onerror = markLoaded;

      // Video metadata
      const vid = document.createElement('video');
      vid.preload = 'metadata';
      vid.src = reel.videoUrl;
      vid.onloadedmetadata = markLoaded;
      vid.onerror = markLoaded;
    });

    // Fallback safety timeout (4.5s max)
    const fallbackTimer = setTimeout(() => {
      setAssetsReady(true);
      onProgress?.(100);
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, [reels, onProgress]);

  // 2. Formation Animation: 2.6s linear
  useEffect(() => {
    if (prefersReducedMotion || forceSkip) {
      formation.set(1);
      expansion.set(1);
      setIsFormed(true);
      setIsExpanded(true);
      onHandoffReady?.();
      return;
    }

    // Scroll lock during entrance
    document.body.style.overflow = 'hidden';

    const controls = animate(formation, 1, {
      duration: 2.6,
      ease: 'linear',
      onComplete: () => {
        setIsFormed(true);
      }
    });

    return () => controls.stop();
  }, [formation, expansion, prefersReducedMotion, forceSkip, onHandoffReady]);

  // 3. Expansion Animation: 1.9s cubic-bezier(.5, 0, .15, 1)
  // Starts ONLY when formation has finished AND real assets are ready
  useEffect(() => {
    if (forceSkip || prefersReducedMotion) {
      expansion.set(1);
      setIsExpanded(true);
      document.body.style.overflow = '';
      return;
    }

    if (isFormed && assetsReady) {
      // Overlap handoff: trigger handoff right as expansion starts
      onHandoffReady?.();

      const controls = animate(expansion, 1, {
        duration: 1.9,
        ease: [0.5, 0, 0.15, 1],
        onComplete: () => {
          setIsExpanded(true);
          document.body.style.overflow = '';
        }
      });

      return () => controls.stop();
    }
  }, [isFormed, assetsReady, forceSkip, prefersReducedMotion, expansion, onHandoffReady]);

  // 4. Autonomous ambient rotation when not dragging
  useEffect(() => {
    let animId;
    const tick = () => {
      if (!isDragging.current && isExpanded) {
        targetAngle.set(targetAngle.get() + 0.05);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isExpanded, targetAngle]);

  // 5. Unified Animation & Rendering Loop
  useEffect(() => {
    let animId;

    const render = () => {
      frameCounter.current++;
      const currentRingAngle = visibleAngle.get();
      const currentFormation = formation.get();
      const currentExpansion = expansion.get();

      // Compute current scene parameters via pure interpolator
      const scene = interpolateScene(currentExpansion);

      // A. Write shared ring parameters as CSS variables on ring element ONLY when changed
      if (ringRef.current) {
        if (
          Math.abs(ringCache.current.perspective - scene.perspective) > 0.5 ||
          Math.abs(ringCache.current.tilt - scene.tilt) > 0.1 ||
          Math.abs(ringCache.current.roll - scene.roll) > 0.1 ||
          Math.abs(ringCache.current.radius - scene.radius) > 0.5
        ) {
          ringRef.current.style.setProperty('--scene-perspective', `${scene.perspective.toFixed(1)}px`);
          ringRef.current.style.setProperty('--scene-tilt', `${scene.tilt.toFixed(2)}deg`);
          ringRef.current.style.setProperty('--scene-roll', `${scene.roll.toFixed(2)}deg`);
          ringRef.current.style.setProperty('--ring-radius', `${scene.radius.toFixed(1)}px`);

          ringCache.current = {
            perspective: scene.perspective,
            tilt: scene.tilt,
            roll: scene.roll,
            radius: scene.radius
          };
        }

        // Apply ring rotation
        ringRef.current.style.setProperty('--ring-angle', `${currentRingAngle.toFixed(2)}deg`);
      }

      // B. Update 16 DOM Cards with dirty checking
      for (let slot = 0; slot < TOTAL_SLOTS; slot++) {
        const cardEl = cardRefs.current[slot];
        if (!cardEl) continue;

        // Resting slot angle: slot * 360 / 16
        const restingSlotAngle = slot * SLOT_STEP;

        // Absolute angle of this card in world coordinates:
        const worldAngle = ((restingSlotAngle + currentRingAngle) % 360 + 360) % 360;

        // Calculate card pose
        const pose = reelPose(restingSlotAngle, currentFormation, scene);

        // Normalize card's camera-relative yaw [-180, 180]
        let cameraDelta = worldAngle;
        if (cameraDelta > 180) cameraDelta -= 360;

        // Facing camera condition: within ±52°
        const isFacingCamera = Math.abs(cameraDelta) < 52 && currentExpansion > 0.4;

        // C. Smart Video Playback: Play ONLY facing camera to conserve GPU/CPU
        const videoEl = videoRefs.current[slot];
        if (videoEl) {
          if (isFacingCamera && !pose.behindCamera) {
            if (videoEl.paused) {
              videoEl.play().catch(() => {});
            }
          } else {
            if (!videoEl.paused) {
              videoEl.pause();
            }
          }
        }

        // D. Dirty-checking DOM writes
        const cache = domCache.current[slot];
        const newTransform = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateY(${pose.yaw}deg) scale(${pose.scale})`;
        const newOpacity = pose.appear;
        const newVisibility = pose.behindCamera ? 'hidden' : 'visible';

        if (cache.transform !== newTransform) {
          cardEl.style.transform = newTransform;
          cache.transform = newTransform;
        }

        if (Math.abs(cache.opacity - newOpacity) > 0.01) {
          cardEl.style.opacity = newOpacity.toFixed(3);
          cache.opacity = newOpacity;
        }

        if (cache.visibility !== newVisibility) {
          cardEl.style.visibility = newVisibility;
          cache.visibility = newVisibility;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [visibleAngle, formation, expansion]);

  // 6. Interactive Drag & Swipe handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastAngle.current = targetAngle.get();
    containerRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX.current;
    // Drag sensitivity mapping px to degrees
    targetAngle.set(lastAngle.current - deltaX * 0.22);
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture?.(e.pointerId);
  };

  // 7. Mouse Wheel Handler
  const handleWheel = useCallback((e) => {
    // Only capture carousel rotation once formed
    if (isFormed) {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      targetAngle.set(targetAngle.get() + delta * 0.12);
    }
  }, [isFormed, targetAngle]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // 8. Hover hit-testing: every third frame optimization
  const handleCardPointerEnter = (slot) => {
    if (frameCounter.current % 3 === 0) {
      setHoveredSlot(slot);
    }
  };

  const handleCardPointerLeave = () => {
    setHoveredSlot(null);
  };

  return (
    <div
      ref={containerRef}
      className="reel-scene-viewport"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-label="Interactive 3D Video Carousel"
    >
      {/* 3D Ring Container */}
      <div ref={ringRef} className="cylinder-ring">
        {Array.from({ length: TOTAL_SLOTS }).map((_, slot) => {
          // Virtual recycling: map slot to reel catalog
          const reelIndex = slot % Math.max(1, reels.length);
          const reel = reels[reelIndex] || {
            id: slot,
            title: `Reel #${slot + 1}`,
            videoUrl: '',
            posterUrl: '',
            linkUrl: '#',
            client: 'Thorat Creative'
          };

          return (
            <a
              key={slot}
              ref={(el) => (cardRefs.current[slot] = el)}
              href={reel.linkUrl || '#'}
              className={`cylinder-card ${hoveredSlot === slot ? 'is-hovered' : ''}`}
              onPointerEnter={() => handleCardPointerEnter(slot)}
              onPointerLeave={handleCardPointerLeave}
              aria-label={`View project: ${reel.title} by ${reel.client}`}
              tabIndex={isExpanded ? 0 : -1}
            >
              {/* Poster frame for non-video / loading states */}
              <img
                src={reel.posterUrl}
                alt=""
                className="card-poster"
                loading="lazy"
                aria-hidden="true"
              />

              {/* Video preview: active only when facing camera */}
              {reel.videoUrl && (
                <video
                  ref={(el) => (videoRefs.current[slot] = el)}
                  src={reel.videoUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="card-video"
                  aria-hidden="true"
                />
              )}

              {/* Card Meta & Glassmorphism Badge */}
              <div className="card-overlay" aria-hidden="true">
                <span className="card-badge">{reel.client || 'Creative'}</span>
                <h3 className="card-title">{reel.title}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
