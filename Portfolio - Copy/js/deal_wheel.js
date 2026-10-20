/**
 * Deal Hero: A Deck of Reels Dealt Into a Fan That Lifts Into a Turning Wheel
 * Based on Avi Vashishta's 3D CSS transform wheel architecture.
 * Adapted for Soham Thorat's Portfolio (Section 1.1 Vertical Format - Mobile & Poster Design).
 */

(function () {
  'use strict';

  // Portfolio items for the 28 vertical cards (9:16)
  const CARDS_DATA = [
    { title: 'Mobile Reel 01', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_1.mp4', poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg' },
    { title: 'Carousel Deck 01', cat: 'poster', type: 'image', src: 'portfolio_img/caraousal_01.jpg', poster: 'portfolio_img/caraousal_01.jpg' },
    { title: 'Motion Reel 02', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_2.mp4', poster: 'portfolio_img/SaveClip.App_741395706_18099442355521521_1424516651156152427_n.jpg' },
    { title: 'Visual Brand 02', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_741099411_18099442382521521_991808803393734881_n.jpg', poster: 'portfolio_img/SaveClip.App_741099411_18099442382521521_991808803393734881_n.jpg' },
    { title: 'Commercial Reel 03', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_3.mp4', poster: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg' },
    { title: 'Carousel Deck 02', cat: 'poster', type: 'image', src: 'portfolio_img/caraousal_02.jpg', poster: 'portfolio_img/caraousal_02.jpg' },
    { title: 'Social Edit 04', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_4.mp4', poster: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg' },
    { title: 'Graphic Artwork', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_758573430_17897899854559531_7838646958684505089_n.jpg', poster: 'portfolio_img/SaveClip.App_758573430_17897899854559531_7838646958684505089_n.jpg' },
    { title: 'Dynamic Reel 05', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_5.mp4', poster: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg' },
    { title: 'Carousel Deck 03', cat: 'poster', type: 'image', src: 'portfolio_img/caraousal_03.jpg', poster: 'portfolio_img/caraousal_03.jpg' },
    { title: 'Color Grade 06', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_6.mp4', poster: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg' },
    { title: 'Editorial Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg', poster: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg' },
    { title: 'Cinematic Reel 07', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_7.mp4', poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg' },
    { title: 'Carousel Deck 04', cat: 'poster', type: 'image', src: 'portfolio_img/caraousal_04.jpg', poster: 'portfolio_img/caraousal_04.jpg' },
    { title: 'Vertical Reel 08', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_8.mp4', poster: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg' },
    { title: 'Portrait Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg', poster: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg' },
    { title: 'Sound Design 09', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_9.mp4', poster: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg' },
    { title: 'Carousel Deck 12', cat: 'poster', type: 'image', src: 'portfolio_img/caraousal_12.jpg', poster: 'portfolio_img/caraousal_12.jpg' },
    { title: 'Fast Cut Reel', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_1.mp4', poster: 'portfolio_img/SaveClip.App_758573430_17897899854559531_7838646958684505089_n.jpg' },
    { title: 'Typography Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_759477753_17897899836559531_3003339110223252816_n.jpg', poster: 'portfolio_img/SaveClip.App_759477753_17897899836559531_3003339110223252816_n.jpg' },
    { title: 'Retention Edit', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_2.mp4', poster: 'portfolio_img/SaveClip.App_759477753_17897899836559531_3003339110223252816_n.jpg' },
    { title: 'Minimalist Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg', poster: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg' },
    { title: 'Foley & Ambience', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_3.mp4', poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg' },
    { title: 'Geometric Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg', poster: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg' },
    { title: 'Viral Hook 9:16', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_4.mp4', poster: 'portfolio_img/SaveClip.App_741395706_18099442355521521_1424516651156152427_n.jpg' },
    { title: 'Poster Series', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg', poster: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg' },
    { title: 'Kinetic Motion', cat: 'mobile', type: 'video', src: 'portfolio_vids/Portfolio_vid_5.mp4', poster: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg' },
    { title: 'Dark Mode Poster', cat: 'poster', type: 'image', src: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg', poster: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg' }
  ];

  const CARD_COUNT = CARDS_DATA.length;
  const STEP = 360 / CARD_COUNT;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function cubicEaseLift(t) {
    // Approx cubic-bezier(.5, 0, .15, 1)
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function wrap(deg) {
    let a = deg % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function initDealHero() {
    const stage = document.getElementById('deal-hero-stage');
    if (!stage) return;

    const sceneEl = stage.querySelector('.deal-hero__scene');
    const wheelEl = stage.querySelector('#deal-hero-wheel');
    const expandBtn = document.getElementById('deal-hero-expand-btn');
    if (!wheelEl || !sceneEl) return;

    // Build cards DOM
    wheelEl.innerHTML = '';
    const cardNodes = [];
    const videoNodes = [];

    CARDS_DATA.forEach((data, i) => {
      const card = document.createElement('div');
      card.className = `deal-card deal-card--${data.cat}`;
      card.dataset.index = i;
      card.dataset.title = data.title;

      const inner = document.createElement('div');
      inner.className = 'deal-card__inner';

      // Front
      const front = document.createElement('div');
      front.className = 'deal-card__front';

      const img = document.createElement('img');
      img.className = 'deal-card__cover';
      img.src = data.poster;
      img.alt = data.title;
      img.loading = 'eager';
      front.appendChild(img);

      let vid = null;
      if (data.type === 'video') {
        vid = document.createElement('video');
        vid.className = 'deal-card__video';
        vid.src = data.src;
        vid.preload = 'none';
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        front.appendChild(vid);

        vid.addEventListener('playing', () => {
          vid.classList.add('is-playing');
        });
      }

      const badge = document.createElement('div');
      badge.className = 'deal-card__badge';
      badge.innerHTML = `<span>${data.cat === 'mobile' ? 'Mobile 9:16' : 'Poster'}</span>`;
      front.appendChild(badge);

      const shine = document.createElement('div');
      shine.className = 'deal-card__shine';
      front.appendChild(shine);

      // Back (Ink panel with serif monogram 'T' / THORAT)
      const back = document.createElement('div');
      back.className = 'deal-card__back';
      back.innerHTML = `
        <div class="deal-card__back-border">
          <div class="deal-card__monogram">T</div>
          <div class="deal-card__name">THORAT</div>
          <div class="deal-card__ornament">✦ 9:16 ✦</div>
        </div>
      `;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      wheelEl.appendChild(card);

      cardNodes.push({ el: card, inner: inner, vid: vid, lastTransform: '', lastVis: '' });
    });

    // Motion State
    let deal = 0; // 0 to 1
    let lift = 0; // 0 to 1
    let spin = 0; // current smoothed angle
    let targetSpin = 0; // target angle from user / drift
    let velocity = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let hasStartedDeal = false;
    let startTime = null;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      deal = 1;
      lift = 1;
    }

    // IntersectionObserver to trigger deal when section 1.1 comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasStartedDeal && !reducedMotion) {
          hasStartedDeal = true;
          startTime = performance.now();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(stage);

    // Expand / Dock Fullscreen Mode
    let isExpanded = false;
    function toggleExpand() {
      isExpanded = !isExpanded;
      stage.classList.toggle('is-expanded', isExpanded);
      document.body.classList.toggle('has-deal-expanded', isExpanded);
      if (expandBtn) {
        expandBtn.innerHTML = isExpanded
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 10H4m6 0V4m0 6L3 3m11 7h6m-6 0V4m0 6l7-7"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
      }
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpand();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isExpanded) {
        toggleExpand();
      }
    });

    // Hook up chips in 1.1 text
    const mobileChip = document.querySelector('.spec-item--mobile');
    const posterChip = document.querySelector('.spec-item--poster');
    if (mobileChip) {
      mobileChip.addEventListener('click', () => {
        // Spin to next mobile card
        targetSpin += 45;
      });
    }
    if (posterChip) {
      posterChip.addEventListener('click', () => {
        // Spin to next poster card
        targetSpin -= 45;
      });
    }

    // Pointer Interaction (Drag, Swipe, Wheel)
    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerTime = performance.now();
      velocity = 0;
      stage.classList.add('is-interacting');
      stage.setPointerCapture(e.pointerId);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const now = performance.now();
      const dx = e.clientX - lastPointerX;
      const dtPtr = Math.max((now - lastPointerTime) / 1000, 0.001);
      const stageW = stage.offsetWidth || 340;
      
      const angleDelta = (dx / stageW) * 110;
      targetSpin -= angleDelta;
      velocity = -angleDelta / dtPtr;

      lastPointerX = e.clientX;
      lastPointerTime = now;
    });

    function endPointer() {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-interacting');
      // If paused for > 80ms before release, kill flick
      if (performance.now() - lastPointerTime > 80) {
        velocity = 0;
      } else {
        // Clamp flick velocity
        velocity = clamp(velocity, -360, 360);
      }
    }

    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);

    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      targetSpin += delta * 0.08;
    }, { passive: false });

    // RequestAnimationFrame Render Loop
    let lastTime = performance.now();

    function render(now) {
      requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Update deal and lift timelines
      if (hasStartedDeal && !reducedMotion) {
        const elapsed = (now - startTime) / 1000;
        // Deal: 0 to 1.4s (snappy, fast deal)
        deal = clamp(elapsed / 1.4, 0, 1);
        // Lift: 1.4s to 2.6s (fast 1.2s lift reveal)
        if (elapsed > 1.4) {
          lift = cubicEaseLift(clamp((elapsed - 1.4) / 1.2, 0, 1));
        }
      }

      // Physics: Exponential follow to target angle (1 - exp(-dt * 9))
      const follow = 1 - Math.exp(-dt * 9);
      spin += (targetSpin - spin) * follow;

      // Handle glide inertia & continuous idle drift
      if (!isDragging) {
        if (Math.abs(velocity) > 0.05) {
          targetSpin += velocity * dt;
          velocity *= Math.exp(-dt * 3.2); // exponential decay
        } else {
          // Idle drift: 6.5 degrees per second, ramped by lift
          const driftRate = (lift > 0.2 ? 6.5 * lift : 0);
          targetSpin += driftRate * dt;
        }
      }

      // Radii and pivot calculations (scaled dynamically based on normal vs expanded)
      const scaleFactor = isExpanded ? 1.2 : 1.0;
      // Bigger wheel radius
      const baseRadius = 380 * scaleFactor;
      const liftRadiusDelta = 190 * scaleFactor;
      const radius = baseRadius + liftRadiusDelta * lift;

      // Moved a bit lower: comfortably settled pivot
      const basePivot = 230 * scaleFactor;
      const liftPivotDelta = 110 * scaleFactor;
      const pivot = basePivot + liftPivotDelta * lift;

      const grow = (0.72 + 0.28 * deal) * (1 + 0.25 * lift);
      const kick = -28 * lift; // left opening turn matches drift

      // Scene stage transform: tilt back 12deg around X
      sceneEl.style.transform = `perspective(1200px) translateY(${-10 - 10 * lift}px) rotateX(${12 * lift}deg) scale(${1 + 0.12 * lift})`;

      // Render cards
      for (let i = 0; i < CARD_COUNT; i++) {
        const cardObj = cardNodes[i];
        const cardEl = cardObj.el;
        const vid = cardObj.vid;

        const home = wrap(i * STEP - spin + kick);
        const away = Math.abs(home);

        // Hide cards out of view past 86 degrees so ends never poke out
        const isVis = away < 86;
        const visStr = isVis ? 'visible' : 'hidden';
        if (cardObj.lastVis !== visStr) {
          cardEl.style.visibility = visStr;
          cardObj.lastVis = visStr;
        }

        if (!isVis) {
          if (vid && !vid.paused) {
            vid.pause();
            vid.classList.remove('is-playing');
          }
          cardEl.style.opacity = '0';
          continue;
        }

        // Smooth opacity falloff between 62deg and 84deg so cards dissolve seamlessly
        const fadeStart = 62;
        const fadeEnd = 84;
        let cardOpacity = 1;
        if (away > fadeStart) {
          cardOpacity = Math.max(0, 1 - (away - fadeStart) / (fadeEnd - fadeStart));
        }
        cardEl.style.opacity = cardOpacity.toFixed(3);

        // Deal curve per card: order from top (0) to edge (1)
        const order = Math.min(away, 100) / 100;
        const p = easeOutCubic(clamp((deal - order * 0.6) / 0.4, 0, 1));

        // Flip from 180deg (face down) to 0deg (face up)
        const flip = (1 - p) * 180;
        const sweep = (1 - p) * 70;
        const currentDist = -radius * p + (1 - p) * 80;

        // Avi's exact transform formula:
        // translate3d(0, pivot, depth) rotateZ(angle) translate3d(0, -radius, 0) rotateY(flip) scale(s)
        const depth = -away * 0.45;
        const tf = `translate3d(0px, ${pivot.toFixed(1)}px, ${depth.toFixed(1)}px) ` +
                   `rotateZ(${(home + sweep).toFixed(2)}deg) ` +
                   `translate3d(0px, ${currentDist.toFixed(1)}px, 0px) ` +
                   `rotateY(${flip.toFixed(1)}deg) ` +
                   `scale(${grow.toFixed(3)})`;

        if (cardObj.lastTransform !== tf) {
          cardEl.style.transform = tf;
          cardObj.lastTransform = tf;
        }

        // Top card has highest z-index
        cardEl.style.zIndex = Math.round(150 - away);

        // Video playback: cards within 36 degrees of the top play
        if (vid) {
          if (away < 36 && lift > 0.4 && p > 0.8) {
            if (vid.paused) {
              vid.play().catch(() => {});
            }
          } else {
            if (!vid.paused) {
              vid.pause();
              vid.classList.remove('is-playing');
            }
          }
        }
      }
    }

    requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDealHero);
  } else {
    initDealHero();
  }
})();
