import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHEEL_CARDS_COUNT,
  VISIBLE_ANGLE_CUTOFF,
  wrapAngle,
  cardDealProgress,
  liftGeometry,
  calculateCardPose
} from './dealPose.js';

test('wrapAngle properly normalizes within [-180, 180)', () => {
  assert.equal(wrapAngle(0), 0);
  assert.equal(wrapAngle(180), -180);
  assert.equal(wrapAngle(-180), -180);
  assert.equal(wrapAngle(360), 0);
  assert.equal(wrapAngle(270), -90);
  assert.equal(wrapAngle(-270), 90);
});

test('liftGeometry interpolates accurately across [0, 1]', () => {
  const g0 = liftGeometry(0);
  assert.equal(g0.radius, 580);
  assert.equal(g0.pivot, 500);
  assert.equal(g0.grow, 1.0);
  assert.equal(g0.kick, 0);

  const g1 = liftGeometry(1);
  assert.equal(g1.radius, 1010);
  assert.equal(g1.pivot, 814);
  assert.equal(g1.grow, 1.35);
  assert.equal(g1.kick, -28);
});

test('cardDealProgress: top card deals first, sides deal later', () => {
  // At deal = 0.2: top card (away = 0) has started (span(0.2, 0, 0.4) = 0.5)
  const pTop = cardDealProgress(0, 0.2);
  assert.ok(pTop > 0, 'Top card should have started dealing');

  // Edge card (away = 80): order = 0.8, window is [0.48, 0.88]. At deal = 0.2 it is still 0
  const pEdge = cardDealProgress(80, 0.2);
  assert.equal(pEdge, 0, 'Edge card should not have started at deal = 0.2');

  // At deal = 1.0: both should be fully settled
  assert.equal(cardDealProgress(0, 1), 1);
  assert.equal(cardDealProgress(80, 1), 1);
});

test('calculateCardPose: top card at resting fan (deal = 1, lift = 0)', () => {
  const pose = calculateCardPose({
    cardIndex: 0,
    cardsCount: 34,
    spin: 0,
    deal: 1,
    lift: 0
  });

  assert.equal(pose.home, 0);
  assert.equal(pose.away, 0);
  assert.equal(pose.p, 1);
  assert.equal(pose.flipY, 0);
  assert.equal(pose.outY, -580);
  assert.equal(pose.scale, 1);
  assert.equal(pose.visible, true);
  assert.ok(pose.transform.includes('translate3d(0, 500.00px, 0.00px)'));
  assert.ok(pose.transform.includes('rotateZ(0.00deg)'));
  assert.ok(pose.transform.includes('translate3d(0, -580.00px, 0)'));
  assert.ok(pose.transform.includes('rotateY(0.00deg)'));
  assert.ok(pose.transform.includes('scale(1.0000)'));
});

test('calculateCardPose: hides cards past 105 degrees', () => {
  // Card 17 is at opposite side of 34-card wheel (180 deg away)
  const poseBack = calculateCardPose({
    cardIndex: 17,
    cardsCount: 34,
    spin: 0,
    deal: 1,
    lift: 1
  });

  assert.ok(poseBack.away > VISIBLE_ANGLE_CUTOFF);
  assert.equal(poseBack.visible, false);
});
