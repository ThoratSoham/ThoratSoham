/**
 * dealPose.js
 * Implementation of Avi Vashishta's "The Deal Hero" architecture:
 * A deck of vertical cards dealt into a fan, lifting into a turning wheel.
 *
 * Plain CSS 3D transforms only. No WebGL, no Three.js.
 */

export const WHEEL_CARDS_COUNT = 34;
export const VISIBLE_ANGLE_CUTOFF = 105; // Cards past 105 degrees are hidden

/**
 * Normalizes an angle into the [-180, 180) degree range.
 * 0 is straight up (12 o'clock).
 */
export function wrapAngle(deg) {
  return ((deg + 180) % 360 + 360) % 360 - 180;
}

/**
 * Easing: ease-out cubic
 */
export function outCubic(t) {
  const clampT = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clampT, 3);
}

/**
 * Normalizes value v into 0..1 over [start, end]
 */
export function span(v, start, end) {
  if (v <= start) return 0;
  if (v >= end) return 1;
  return (v - start) / (end - start);
}

/**
 * Calculates card deal progress p from deal motion value (0..1)
 * Deal spreads outward from top (home = 0) to both sides at once.
 */
export function cardDealProgress(away, deal) {
  // order: 0 at top, 1 at edges (capped at 100 deg)
  const order = Math.min(away, 100) / 100;
  return outCubic(span(deal, order * 0.6, order * 0.6 + 0.4));
}

/**
 * Computes lift geometry values from lift motion value (0..1)
 */
export function liftGeometry(lift) {
  const clampedLift = Math.max(0, Math.min(1, lift));
  return {
    radius: 580 + 430 * clampedLift,       // 580 -> 1010 px
    pivot: 500 + 314 * clampedLift,        // 500 -> 814 px
    grow: 1 + 0.35 * clampedLift,          // 1.0 -> 1.35
    kick: (-28 * clampedLift) || 0,        // 0 -> -28 deg (turns left)
    stageY: 60 - 10 * clampedLift,         // 60 -> 50 px
    stageRotateX: 12 * clampedLift,        // 0 -> 12 deg
    stageScaleBoost: 1 + 0.14 * clampedLift // 1.0 -> 1.14
  };
}

/**
 * Calculates the exact single transform string and visibility for card i.
 *
 * Transform order:
 * 1. translate3d(0, pivot, -away * 0.5)  -> to pivot, top card frontmost
 * 2. rotateZ(home + (1 - p) * 70)        -> sweep left into place
 * 3. translate3d(0, -radius * p + (1 - p) * 140, 0) -> push out to rim from below
 * 4. rotateY((1 - p) * 180)              -> flip face up as it lands
 * 5. scale((0.7 + 0.3 * p) * grow)       -> scale from 0.7 to full
 */
export function calculateCardPose({
  cardIndex,
  cardsCount = WHEEL_CARDS_COUNT,
  spin = 0,
  deal = 1,
  lift = 1
}) {
  const step = 360 / cardsCount;
  const geom = liftGeometry(lift);

  const home = wrapAngle(cardIndex * step - spin + geom.kick);
  const away = Math.abs(home);

  const p = cardDealProgress(away, deal);
  const visible = p > 0 && away < VISIBLE_ANGLE_CUTOFF;

  // Transform components formatted with precision
  const zDepth = (-away * 0.5).toFixed(2);
  const rotateZ = (home + (1 - p) * 70).toFixed(2);
  const outY = (-geom.radius * p + (1 - p) * 140).toFixed(2);
  const flipY = ((1 - p) * 180).toFixed(2);
  const scale = ((0.7 + 0.3 * p) * geom.grow).toFixed(4);

  const transform =
    `translate3d(0, ${geom.pivot.toFixed(2)}px, ${zDepth}px) ` +
    `rotateZ(${rotateZ}deg) ` +
    `translate3d(0, ${outY}px, 0) ` +
    `rotateY(${flipY}deg) ` +
    `scale(${scale})`;

  return {
    home: Number(home.toFixed(2)),
    away: Number(away.toFixed(2)),
    p: Number(p.toFixed(4)),
    visible,
    transform,
    zDepth: Number(zDepth),
    rotateZ: Number(rotateZ),
    outY: Number(outY),
    flipY: Number(flipY),
    scale: Number(scale)
  };
}
