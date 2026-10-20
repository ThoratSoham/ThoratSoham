import test from 'node:test';
import assert from 'node:assert/strict';
import { reelPose, interpolateScene } from './reelPose.js';

test('reelPose - resting geometry at Cardinal angles (formation = 1)', () => {
  const scene = { radius: 1000, scale: 1.0, perspective: 1000, expansion: 0 };

  // Angle 0°: Far centre of the ring (z = -radius, x = 0, yaw = 0)
  const pose0 = reelPose(0, 1, scene);
  assert.equal(pose0.x, 0, 'x at 0° should be 0');
  assert.equal(pose0.z, -1000, 'z at 0° should be -radius');
  assert.equal(pose0.yaw, 0, 'yaw at 0° should be 0');
  assert.equal(pose0.appear, 1, 'appear should be 1');
  assert.equal(pose0.behindCamera, false, 'far card is in front of camera');

  // Angle 90°: Left edge of cylinder (x = -radius, z = 0, yaw = 90)
  const pose90 = reelPose(90, 1, scene);
  assert.equal(Math.round(pose90.x), -1000, 'x at 90° should be -radius');
  assert.equal(Math.round(pose90.z), 0, 'z at 90° should be 0');
  assert.equal(pose90.yaw, 90, 'yaw at 90° should be 90');

  // Angle 180°: Nearest card to camera (x = 0, z = +radius, yaw = 180)
  const pose180 = reelPose(180, 1, scene);
  assert.equal(Math.round(pose180.x), 0, 'x at 180° should be 0');
  assert.equal(Math.round(pose180.z), 1000, 'z at 180° should be +radius');
  assert.equal(pose180.yaw, 180, 'yaw at 180° should be 180');

  // Angle 270°: Right edge of cylinder (x = +radius, z = 0, yaw = 270)
  const pose270 = reelPose(270, 1, scene);
  assert.equal(Math.round(pose270.x), 1000, 'x at 270° should be +radius');
  assert.equal(Math.round(pose270.z), 0, 'z at 270° should be 0');
  assert.equal(pose270.yaw, 270, 'yaw at 270° should be 270');
});

test('reelPose - formation loader deal sequencing', () => {
  const scene = { radius: 1000, scale: 1.0, perspective: 1000, expansion: 0 };

  // For a card at angle 270° (slot 12 of 16, order = 270/360 = 0.75):
  // At formation = 0, it must be hidden in the stack (appear = 0) at angle 180°
  const initial = reelPose(270, 0, scene);
  assert.equal(initial.appear, 0, 'waiting card in stack must be hidden');
  assert.equal(initial.yaw, 180, 'waiting card starts at front stack angle 180°');

  // Card at angle 0° deals earliest (order = 0)
  // At formation = 0.2, card 0 is in transit, appearing > 0
  const earlyDealt = reelPose(0, 0.2, scene);
  assert.ok(earlyDealt.appear > 0, 'early card should have started appearing');

  // But card 270° should still be waiting at formation = 0.2
  const laterCard = reelPose(270, 0.2, scene);
  assert.equal(laterCard.appear, 0, 'later card should still be hidden in waiting stack');

  // At formation = 1.0, all cards are fully visible at resting positions
  const final0 = reelPose(0, 1.0, scene);
  const final270 = reelPose(270, 1.0, scene);
  assert.equal(final0.appear, 1.0);
  assert.equal(final270.appear, 1.0);
  assert.equal(final0.yaw, 0);
  assert.equal(final270.yaw, 270);
});

test('interpolateScene - validates exact expansion boundary values', () => {
  // Expansion = 0
  const scene0 = interpolateScene(0);
  assert.equal(Math.round(scene0.radius), 460, 'Expansion 0 radius is 460');
  assert.equal(Math.round(scene0.tilt), -22, 'Expansion 0 tilt is -22°');
  assert.equal(Math.round(scene0.roll), -20, 'Expansion 0 roll is -20°');
  assert.equal(Math.round(scene0.perspective), 1000, 'Expansion 0 perspective is 1000px');
  assert.equal(Number(scene0.scale.toFixed(2)), 0.52, 'Expansion 0 scale is 0.52');

  // Expansion = 1
  const scene1 = interpolateScene(1);
  assert.equal(Math.round(scene1.radius), 1800, 'Expansion 1 radius is 1800');
  assert.equal(Math.round(scene1.tilt), 0, 'Expansion 1 tilt is 0°');
  assert.equal(Math.round(scene1.roll), 0, 'Expansion 1 roll is 0°');
  assert.equal(Math.round(scene1.perspective), 450, 'Expansion 1 perspective is 450px');
  assert.equal(Number(scene1.scale.toFixed(1)), 2.3, 'Expansion 1 scale is 2.3');
});

test('reelPose - behindCamera flag inside the ring', () => {
  const sceneInside = { radius: 1800, scale: 2.3, perspective: 450, expansion: 1.0 };

  // Facing far center (angle 0°, z = -1800): in front of camera
  const pose0 = reelPose(0, 1, sceneInside);
  assert.equal(pose0.behindCamera, false, 'far card is visible in front');

  // Near front card (angle 180°, z = +1800): behind viewer inside center
  const pose180 = reelPose(180, 1, sceneInside);
  assert.equal(pose180.behindCamera, true, 'card behind viewpoint is marked behindCamera');
});
