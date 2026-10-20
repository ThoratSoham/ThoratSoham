/**
 * reelPose: Pure mathematical pose function for the 3D Reel Cylinder.
 * Calculates 3D transform coordinates and visibility for a card in the cylinder.
 *
 * Coordinates:
 * - 0° is the far centre of the ring (z = -radius).
 * - ±180° is nearest the camera (z = +radius).
 * - x = -sin(a) * radius
 * - z = -cos(a) * radius
 * - yaw = a (facing inwards toward the cylinder axis)
 *
 * @param {number} angle - Target resting angle in degrees [0, 360) or slot * (360 / 16)
 * @param {number} formation - Progress of deal formation [0, 1]
 * @param {object} scene - Scene parameters: { radius, scale, perspective, tilt, roll, expansion }
 * @returns {{
 *   x: number,
 *   y: number,
 *   z: number,
 *   yaw: number,
 *   scale: number,
 *   appear: number,
 *   behindCamera: boolean
 * }}
 */
export function reelPose(angle, formation = 1, scene = {}) {
  const radius = scene.radius ?? 1800;
  const baseScale = scene.scale ?? 1.0;
  const expansion = scene.expansion ?? 1.0;
  const perspective = scene.perspective ?? 450;

  // Normalize target angle to [0, 360)
  const normTarget = ((angle % 360) + 360) % 360;

  // Stacking origin for loader: front of the ring is 180°
  const STACK_ANGLE = 180;

  // Staggered deal calculation:
  // Each card deals in sequential order based on its angle around the ring.
  // Order range: 0 to 1
  const order = normTarget / 360;
  const dealDuration = 0.35; // Individual swing out duration fraction
  const cardStart = order * (1 - dealDuration);
  const cardEnd = cardStart + dealDuration;

  let currentAngle;
  let appear;

  if (formation <= cardStart) {
    // Waiting in the front stack: hidden so the waiting stack is never visible
    currentAngle = STACK_ANGLE;
    appear = 0;
  } else if (formation >= cardEnd) {
    // Fully dealt to its resting cylinder position
    currentAngle = normTarget;
    appear = 1;
  } else {
    // In transit: ease-out cubic swing from stack to target angle
    const t = (formation - cardStart) / dealDuration;
    // Ease-out cubic: 1 - (1 - t)^3
    const easedT = 1 - Math.pow(1 - t, 3);

    // Shortest angular path from 180° to normTarget
    let diff = normTarget - STACK_ANGLE;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    currentAngle = STACK_ANGLE + diff * easedT;

    // Fade in swiftly as it begins swinging out
    appear = Math.min(1, t * 2.5);
  }

  // Radians conversion
  const rad = (currentAngle * Math.PI) / 180;

  // Pure cylinder coordinate math
  // x = -sin(a) * radius
  // z = -cos(a) * radius
  const x = -Math.sin(rad) * radius;
  const y = 0;
  const z = -Math.cos(rad) * radius;
  const yaw = currentAngle;
  const scale = baseScale;

  // Behind camera detection:
  // When camera is inside the ring (expansion -> 1) and looking into the scene (towards 0° / -z),
  // cards with z > 0 (front half of ring) or beyond the camera's near projection plane are behind camera.
  const behindCamera =
    (expansion > 0.5 && z > radius * 0.15) ||
    z > perspective * 0.85;

  const normalizeZero = (val) => (Object.is(val, -0) || Math.abs(val) < 1e-6 ? 0 : val);

  return {
    x: normalizeZero(Number(x.toFixed(4))),
    y: normalizeZero(Number(y.toFixed(4))),
    z: normalizeZero(Number(z.toFixed(4))),
    yaw: normalizeZero(Number(yaw.toFixed(4))),
    scale: Number(scale.toFixed(4)),
    appear: Number(appear.toFixed(4)),
    behindCamera
  };
}

/**
 * Pure scene interpolator for Expansion (0 to 1).
 * Expansion 0:
 *   radius: 460, tilt: -22°, roll: -20°, perspective: 1000px, scale: 0.52
 * Expansion 1:
 *   radius: 1800, tilt: 0°, roll: 0°, perspective: 450px, scale: 2.3
 */
export function interpolateScene(expansionProgress) {
  // Clamp progress [0, 1]
  const p = Math.max(0, Math.min(1, expansionProgress));

  // cubic-bezier(.5, 0, .15, 1) approximation
  // High acceleration with smooth landing
  const ease = cubicBezier(0.5, 0, 0.15, 1, p);

  return {
    radius: lerp(460, 1800, ease),
    tilt: lerp(-22, 0, ease),
    roll: lerp(-20, 0, ease),
    perspective: lerp(1000, 450, ease),
    scale: lerp(0.52, 2.3, ease),
    expansion: p
  };
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Cubic bezier evaluator for accurate animation pacing
function cubicBezier(p1x, p1y, p2x, p2y, t) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(tVal) {
    return ((ax * tVal + bx) * tVal + cx) * tVal;
  }
  function sampleCurveY(tVal) {
    return ((ay * tVal + by) * tVal + cy) * tVal;
  }
  function sampleCurveDerivativeX(tVal) {
    return (3 * ax * tVal + 2 * bx) * tVal + cx;
  }

  // Newton-Raphson iteration to find t for given x
  let t2 = t;
  for (let i = 0; i < 8; i++) {
    const x2 = sampleCurveX(t2) - t;
    if (Math.abs(x2) < 1e-6) break;
    const d2 = sampleCurveDerivativeX(t2);
    if (Math.abs(d2) < 1e-6) break;
    t2 -= x2 / d2;
  }
  return sampleCurveY(Math.max(0, Math.min(1, t2)));
}
