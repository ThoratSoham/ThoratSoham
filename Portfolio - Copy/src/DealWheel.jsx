import React, { useState, useEffect, useRef } from 'react';
import {
  WHEEL_CARDS_COUNT,
  VISIBLE_ANGLE_CUTOFF,
  wrapAngle,
  cardDealProgress,
  liftGeometry,
  calculateCardPose
} from './dealPose.js';

/**
 * DealWheel Component (React + plain CSS 3D transforms)
 * Avi Vashishta's "The Deal Hero" architecture:
 * Dealt into a fan -> Lifts into a turning wheel rising out of clouds
 */
export default function DealWheel({ photos = [] }) {
  const [deal, setDeal] = useState(0);
  const [lift, setLift] = useState(0);
  const [spin, setSpin] = useState(0);
  const [activePhoto, setActivePhoto] = useState(null);

  const targetAngleRef = useRef(0);
  const spinRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Pad photos to 34
  const cards = [...photos];
  while (cards.length < WHEEL_CARDS_COUNT) {
    cards.push(...photos.slice(0, WHEEL_CARDS_COUNT - cards.length));
  }
  const displayCards = cards.slice(0, WHEEL_CARDS_COUNT);

  // Entrance Deal & Lift Animation Loop
  useEffect(() => {
    let startTime = null;
    let animId;

    const animateEntrance = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      if (elapsed < 2400) {
        // Deal stage (0 -> 1)
        setDeal(Math.min(1, elapsed / 2400));
      } else if (elapsed < 4300) {
        // Lift stage (0 -> 1)
        setDeal(1);
        const liftElapsed = (elapsed - 2400) / 1900;
        setLift(1 - Math.pow(1 - Math.min(1, liftElapsed), 3.5));
      } else {
        setDeal(1);
        setLift(1);
      }

      if (elapsed < 4500) {
        animId = requestAnimationFrame(animateEntrance);
      }
    };

    animId = requestAnimationFrame(animateEntrance);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Physics & Idle Drift Loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Exponential follow
      spinRef.current += (targetAngleRef.current - spinRef.current) * (1 - Math.exp(-dt * 9));

      // Velocity decay
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.05) {
        targetAngleRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.exp(-dt * 3.2);
      }

      // Idle drift
      if (!isDraggingRef.current && lift > 0.2) {
        const drift = 6.5 * lift * dt;
        targetAngleRef.current += drift;
        spinRef.current += drift;
      }

      setSpin(spinRef.current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lift]);

  const geom = liftGeometry(lift);

  return (
    <div className="deal-wheel-viewport">
      {/* Painted Celestial Sky */}
      <div className="deal-sky-bg" style={{ opacity: 0.15 + 0.85 * lift }}>
        <div className="deal-sky-stars" />
      </div>

      {/* 3D Stage */}
      <div
        className="deal-wheel-stage"
        style={{
          transform: `translateY(${geom.stageY}px) rotateX(${geom.stageRotateX}deg) scale(${0.54 * geom.stageScaleBoost})`
        }}
        onPointerDown={(e) => {
          isDraggingRef.current = true;
          lastXRef.current = e.clientX;
          lastTimeRef.current = performance.now();
          velocityRef.current = 0;
        }}
        onPointerMove={(e) => {
          if (!isDraggingRef.current) return;
          const deltaX = e.clientX - lastXRef.current;
          targetAngleRef.current += deltaX * 0.16;

          const now = performance.now();
          const dt = Math.max(0.001, (now - lastTimeRef.current) / 1000);
          velocityRef.current = (deltaX / dt) * 0.22;

          lastXRef.current = e.clientX;
          lastTimeRef.current = now;
        }}
        onPointerUp={() => {
          isDraggingRef.current = false;
        }}
      >
        <div className="deal-wheel-cards">
          {displayCards.map((card, idx) => {
            const pose = calculateCardPose({
              cardIndex: idx,
              cardsCount: WHEEL_CARDS_COUNT,
              spin,
              deal,
              lift
            });

            return (
              <div
                key={card.id || idx}
                className="deal-card"
                style={{
                  transform: pose.transform,
                  visibility: pose.visible ? 'visible' : 'hidden',
                  zIndex: Math.round(100 - pose.away)
                }}
                onClick={() => setActivePhoto(card)}
              >
                <div className="deal-card-inner">
                  {/* Front Face */}
                  <div className="deal-card-front">
                    <img src={card.image} alt={card.title} className="deal-card-img" />
                    <div className="deal-card-scrim" />
                    <div className="deal-card-info">
                      <span className="deal-card-badge">{card.category}</span>
                      <h4 className="deal-card-title">{card.title}</h4>
                      <p className="deal-card-meta">{card.camera || card.subtitle}</p>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="deal-card-back">
                    <div className="deal-back-pattern">
                      <div className="deal-back-border">
                        <span className="deal-back-monogram">ST</span>
                        <span className="deal-back-num">#{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opaque Cloud Bank */}
      <div
        className="deal-clouds-bank"
        style={{
          transform: `translateY(${120 * (1 - lift)}px)`,
          opacity: Math.min(1, 0.3 + 0.7 * lift)
        }}
      >
        {/* Rendered SVG Clouds */}
      </div>
    </div>
  );
}
