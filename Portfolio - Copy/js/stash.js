/**
 * Stash Directory Interactive Engine
 * Faithfully mirrors stash.cool micro-interactions, retro Mac OS modals,
 * carousel controls, search/filtering, and dark/light theme switching.
 */

(function () {
  'use strict';

  // 28 Complete Portfolio Items
  const STASH_ITEMS = [
    // 1. REELS & MOTION (9:16 High Retention)
    {
      id: '001',
      title: 'Retention Motion Reel 01',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Dynamic vertical edit engineered for maximum viewer retention. Features fast cutaways, matched audio pacing, and punchy typography.',
      src: 'portfolio_vids/Portfolio_vid_1.mp4',
      poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Premiere Pro · After Effects',
      retention: '84% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '002',
      title: 'Audio-Paced Rhythm Reel 02',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Sound design-led retention pacing with micro-animations and zero dead space in the critical first 3 seconds.',
      src: 'portfolio_vids/Portfolio_vid_2.mp4',
      poster: 'portfolio_img/SaveClip.App_741395706_18099442355521521_1424516651156152427_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Premiere Pro · Audition',
      retention: '88% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '003',
      title: 'Commercial Short 03',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'High-impact visual product cut with cinematic speed ramps and snappy transitions.',
      src: 'portfolio_vids/Portfolio_vid_3.mp4',
      poster: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'DaVinci Resolve · After Effects',
      retention: '81% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '004',
      title: 'Viral Hook Narrative 04',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Hook-driven narrative editing with kinetic subtitles and immersive visual sound design.',
      src: 'portfolio_vids/Portfolio_vid_4.mp4',
      poster: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Premiere Pro · After Effects',
      retention: '92% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '005',
      title: 'Kinetic Motion Cut 05',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Rhythmic beats synchronized with color-graded action footage and optical flares.',
      src: 'portfolio_vids/Portfolio_vid_5.mp4',
      poster: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'After Effects · Premiere Pro',
      retention: '85% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '006',
      title: 'Color Grade & Flow 06',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Custom color LUT grading with atmospheric soundscapes and high dynamic range tuning.',
      src: 'portfolio_vids/Portfolio_vid_6.mp4',
      poster: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'DaVinci Resolve',
      retention: '79% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '007',
      title: 'Cinematic Narrative 07',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Story-led cinematic reel combining raw footage, tight editorial pacing, and emotional music cues.',
      src: 'portfolio_vids/Portfolio_vid_7.mp4',
      poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Premiere Pro · After Effects',
      retention: '87% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '008',
      title: 'Vertical Hook 08',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'High-energy intro sequence designed to convert casual scrollers into engaged viewers.',
      src: 'portfolio_vids/Portfolio_vid_8.mp4',
      poster: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Premiere Pro',
      retention: '90% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '009',
      title: 'Foley & Sound Design 09',
      cat: 'Reels & Motion',
      format: '9:16 Mobile Reel',
      desc: 'Detailed bespoke sound effects: swooshes, impacts, vinyl crackle, and punchy bass drops.',
      src: 'portfolio_vids/Portfolio_vid_9.mp4',
      poster: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg',
      type: 'video',
      year: '2026',
      tools: 'Audition · Premiere Pro',
      retention: '94% past 3s',
      link: 'https://www.instagram.com/sohamthorat_/'
    },

    // 2. CAROUSEL DECKS (5 items)
    {
      id: '010',
      title: 'Visual Brand Strategy Deck 01',
      cat: 'Carousel Decks',
      format: '1:1 / 4:5 Carousel',
      desc: 'Multi-slide storytelling deck engineered for high save and share rates on Instagram and LinkedIn.',
      src: 'portfolio_img/caraousal_01.jpg',
      poster: 'portfolio_img/caraousal_01.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Illustrator',
      retention: '4.8x Save Rate',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '011',
      title: 'Growth Blueprint Deck 02',
      cat: 'Carousel Decks',
      format: '1:1 / 4:5 Carousel',
      desc: 'Structured informational breakdown with high-contrast typography and clear chapter markers.',
      src: 'portfolio_img/caraousal_02.jpg',
      poster: 'portfolio_img/caraousal_02.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Illustrator',
      retention: '3.9x Save Rate',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '012',
      title: 'Creative Strategy Slide 03',
      cat: 'Carousel Decks',
      format: '1:1 / 4:5 Carousel',
      desc: 'Design system slide deck showcasing layout consistency, whitespace management, and visual hierarchy.',
      src: 'portfolio_img/caraousal_03.jpg',
      poster: 'portfolio_img/caraousal_03.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Figma',
      retention: '5.1x Save Rate',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '013',
      title: 'Viral Breakdown Deck 04',
      cat: 'Carousel Decks',
      format: '1:1 / 4:5 Carousel',
      desc: 'Infographic slide series balancing data density with bold visual callouts and clean typography.',
      src: 'portfolio_img/caraousal_04.jpg',
      poster: 'portfolio_img/caraousal_04.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Illustrator',
      retention: '4.2x Save Rate',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '014',
      title: 'Design Masterclass Deck 12',
      cat: 'Carousel Decks',
      format: '1:1 / 4:5 Carousel',
      desc: 'Detailed editorial deck showcasing actionable design principles, color harmony, and type pairing.',
      src: 'portfolio_img/caraousal_12.jpg',
      poster: 'portfolio_img/caraousal_12.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Illustrator',
      retention: '4.7x Save Rate',
      link: 'https://www.instagram.com/sohamthorat_/'
    },

    // 3. POSTERS & BRAND (11 items)
    {
      id: '015',
      title: 'Typographic Impact Poster 01',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Bold typographic composition with experimental layer blending and high-contrast color scheme.',
      src: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg',
      poster: 'portfolio_img/SaveClip.App_735801647_18099442373521521_5640099348570135804_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Illustrator',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '016',
      title: 'Minimalist Dark Aesthetic 02',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Dark aesthetic visual artwork playing with negative space, subtle textures, and sharp grid alignment.',
      src: 'portfolio_img/SaveClip.App_741099411_18099442382521521_991808803393734881_n.jpg',
      poster: 'portfolio_img/SaveClip.App_741099411_18099442382521521_991808803393734881_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '017',
      title: 'Editorial Magazine Cut 03',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Editorial magazine-style poster featuring cutouts, dithered grain, and Swiss typography.',
      src: 'portfolio_img/SaveClip.App_741395706_18099442355521521_1424516651156152427_n.jpg',
      poster: 'portfolio_img/SaveClip.App_741395706_18099442355521521_1424516651156152427_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · InDesign',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '018',
      title: 'Geometric Vector Composition 04',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Structured geometric poster exploring depth, color layering, and mathematical vector spacing.',
      src: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg',
      poster: 'portfolio_img/SaveClip.App_741454167_18099442364521521_6159243008881840267_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Illustrator',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '019',
      title: 'Cyberpunk Neon Glow 05',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'High-contrast digital art poster with purple glow accents and futuristic futuristic framing.',
      src: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg',
      poster: 'portfolio_img/SaveClip.App_742208666_18099442406521521_8733214214320992672_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '020',
      title: 'Vintage Halftone Poster 06',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Retro-inspired poster art with heavy grain overlay, muted halftone shades, and bold headline typography.',
      src: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg',
      poster: 'portfolio_img/SaveClip.App_758368228_17897899863559531_7967120900980634937_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '021',
      title: 'Experimental Street Graphic 07',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Abstract design experiment balancing raw street-style typography with refined modern spacing.',
      src: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg',
      poster: 'portfolio_img/SaveClip.App_758469158_17897899803559531_5205716356111480165_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '022',
      title: 'Chromatic Aberration Shift 08',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'RGB split distortion poster featuring glitch textures and high-saturation highlights.',
      src: 'portfolio_img/SaveClip.App_758573430_17897899854559531_7838646958684505089_n.jpg',
      poster: 'portfolio_img/SaveClip.App_758573430_17897899854559531_7838646958684505089_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '023',
      title: 'Acid Graphic Exploration 09',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Avant-garde poster design using warped grids, fluid paths, and expressive typographic rhythm.',
      src: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg',
      poster: 'portfolio_img/SaveClip.App_758690790_17897899818559531_879915959403471347_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Illustrator · Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '024',
      title: 'Monochrome Brutalist Print 10',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Black & white high-contrast art print with clean brutalist layout, monospaced details, and crisp linework.',
      src: 'portfolio_img/SaveClip.App_759477753_17897899836559531_3003339110223252816_n.jpg',
      poster: 'portfolio_img/SaveClip.App_759477753_17897899836559531_3003339110223252816_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Illustrator · Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },
    {
      id: '025',
      title: 'Royal Dark Purple Emblem 11',
      cat: 'Posters & Brand',
      format: '9:16 Poster Artwork',
      desc: 'Deep royal purple signature poster capturing Soham Thorat personal brand identity and gold accents.',
      src: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg',
      poster: 'portfolio_img/SaveClip.App_759574841_17897899845559531_6067993113898304394_n.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop',
      retention: 'Original Art',
      link: 'https://www.instagram.com/sohamthorat_/'
    },

    // 4. TECH LAB BUILDS (3 items)
    {
      id: '026',
      title: 'TextHumaniser — AI Content Bypass',
      cat: 'Tech Builds',
      format: 'Full-Stack Web App',
      desc: 'AI-assisted tool that rewrites machine-generated text into authentic human cadence. Shipped with Next.js, FastAPI & Claude Code.',
      src: 'portfolio_img/caraousal_01.jpg',
      poster: 'portfolio_img/caraousal_01.jpg',
      type: 'image',
      year: '2026',
      tools: 'Python · Next.js · FastAPI · Claude',
      retention: 'Production Shipped',
      link: 'https://github.com/ThoratSoham'
    },
    {
      id: '027',
      title: 'Telco Churn Prediction Engine',
      cat: 'Tech Builds',
      format: 'Machine Learning Model',
      desc: 'Machine learning classifier analyzing customer retention metrics with XGBoost and Scikit-Learn. High precision feature attribution.',
      src: 'portfolio_img/caraousal_02.jpg',
      poster: 'portfolio_img/caraousal_02.jpg',
      type: 'image',
      year: '2026',
      tools: 'Python · Scikit-Learn · XGBoost',
      retention: '91.4% Accuracy',
      link: 'https://github.com/ThoratSoham'
    },
    {
      id: '028',
      title: 'Mentor Marketplace (Consult)',
      cat: 'Tech Builds',
      format: 'Full-Stack Platform',
      desc: 'End-to-end booking and peer consultation platform with automated calendar syncing and secure payment routing.',
      src: 'portfolio_img/caraousal_03.jpg',
      poster: 'portfolio_img/caraousal_03.jpg',
      type: 'image',
      year: '2026',
      tools: 'TypeScript · Node.js · PostgreSQL',
      retention: 'Active Repo',
      link: 'https://github.com/ThoratSoham/Consult'
    },

    // 5. YOUTUBE THUMBNAILS & PACKAGING (15 items)
    {
      id: '029',
      title: 'Gains vs Retention Blueprint (Fitness & Health)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Torn paper split contrast, curiosity question hook (GAINS?), and high-contrast gym lighting.',
      src: 'thumbnails/remakes/1.jpg',
      poster: 'thumbnails/remakes/1.jpg',
      original: 'thumbnails/originals/1.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '030',
      title: 'Psychology of Money (Finance)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Currency-textured human brain focal point on dark blueprint grid with bold neon lime typography.',
      src: 'thumbnails/remakes/2.jpg',
      poster: 'thumbnails/remakes/2.jpg',
      original: 'thumbnails/originals/2.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '031',
      title: "Japan's Strangest Mystery (Mystery & True Crime)",
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Black armor silhouette against vibrant red celestial sphere with censored eyes for intense intrigue.',
      src: 'thumbnails/remakes/3.jpg',
      poster: 'thumbnails/remakes/3.jpg',
      original: 'thumbnails/originals/3.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '032',
      title: 'Hapunan Horror Night (Gaming & Horror)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Expressive wide-eyed panic, glowing red blood typography, and glowing-eyed ghost in moonlight.',
      src: 'thumbnails/remakes/4.jpg',
      poster: 'thumbnails/remakes/4.jpg',
      original: 'thumbnails/originals/4.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '033',
      title: 'The Money Rules Checklist (Finance)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Creator checklist framing turning complex financial advice into high-CTR curiosity with cash backdrop.',
      src: 'thumbnails/remakes/5.jpg',
      poster: 'thumbnails/remakes/5.jpg',
      original: 'thumbnails/originals/5.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '034',
      title: 'Untold Truth About Money (Finance)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Secret-keeping gesture, glowing neon green typography, rising skyline stock graph, and money stacks.',
      src: 'thumbnails/remakes/6.jpg',
      poster: 'thumbnails/remakes/6.jpg',
      original: 'thumbnails/originals/6.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '035',
      title: '100 Lost Cargo Unboxing (Challenges)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Massive warehouse stacked with shipping crates (DHL, FedEx, Amazon), shocked facial expression, and 3D yellow type.',
      src: 'thumbnails/remakes/7.jpg',
      poster: 'thumbnails/remakes/7.jpg',
      original: 'thumbnails/originals/7.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '036',
      title: 'Deep Sea Secrets Revealed (Mystery & True Crime)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Colossal underwater predator jaw beneath a fragile wooden rowboat, stark red typography, and cyan light beam.',
      src: 'thumbnails/remakes/8.jpg',
      poster: 'thumbnails/remakes/8.jpg',
      original: 'thumbnails/originals/8.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '037',
      title: 'Gaming Is Boring! The Industry Crisis (Gaming)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Bored creator reaction sandwiched between iconic modern protagonists (COD Ghost skull & GTA 6 Lucia).',
      src: 'thumbnails/remakes/9.jpg',
      poster: 'thumbnails/remakes/9.jpg',
      original: 'thumbnails/originals/9.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '038',
      title: "Super Shoes: Running's Secret Advantage (Fitness)",
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Runner mid-stride with cyan glowing boost soles, cartoon reaction head, and clean tech pointer callout.',
      src: 'thumbnails/remakes/10.jpg',
      poster: 'thumbnails/remakes/10.jpg',
      original: 'thumbnails/originals/10.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '039',
      title: 'Valorant Radiant Gameplay (Gaming)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Glowing purple soul orb reaching toward viewer, high-contrast character art, and clean official game logo.',
      src: 'thumbnails/remakes/11.jpg',
      poster: 'thumbnails/remakes/11.jpg',
      original: 'thumbnails/originals/11.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '040',
      title: "India's Scariest Temples (Mystery & True Crime)",
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Haunted ancient stone pagoda in mist, glowing red typography, red investigative circle and directional arrow.',
      src: 'thumbnails/remakes/12.jpg',
      poster: 'thumbnails/remakes/12.jpg',
      original: 'thumbnails/originals/12.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '041',
      title: "Paranoia.com: The Web's Darkest Rabbit Hole (Mystery)",
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Distressed anime-style curled figure, textured scarlet wallpaper, and stark glowing neon white-red headline.',
      src: 'thumbnails/remakes/13.jpg',
      poster: 'thumbnails/remakes/13.jpg',
      original: 'thumbnails/originals/13.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '042',
      title: '+$75,678 Under 27 Hours Passive Income (Finance)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Real-life contrast: sleeping on couch while automated PayPal deposits roll in on smartphone foreground.',
      src: 'thumbnails/remakes/14.jpg',
      poster: 'thumbnails/remakes/14.jpg',
      original: 'thumbnails/originals/14.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    },
    {
      id: '043',
      title: 'Surviving 5 Deadliest Places on Earth (Challenges)',
      cat: 'Thumbnails',
      format: '16:9 Remake',
      desc: 'Dynamic 5-column action split: cliffhanging, shark encounter, mob chase, tiger pursuit, and cave crawl.',
      src: 'thumbnails/remakes/15.jpg',
      poster: 'thumbnails/remakes/15.jpg',
      original: 'thumbnails/originals/15.jpg',
      type: 'image',
      year: '2026',
      tools: 'Photoshop · Hooksmith Psychology',
      retention: 'High-CTR Remake',
      link: 'thumbnails.html'
    }
  ];

  // DOM Elements
  let state = {
    filter: 'all',
    search: '',
    view: 'table', // 'table' | 'grid'
    activeItem: null
  };

  function init() {
    initTheme();
    initCarousel();
    initDirectory();
    initModal();
    initTime();
  }

  // 1. Theme Management (Light / Dark)
  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Check stored preference or system preference
    const savedTheme = localStorage.getItem('thorat_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('thorat_theme', next);
    });
  }

  // 2. Carousel Controls & Slide Snapping
  function initCarousel() {
    const track = document.getElementById('feat-track');
    const prevBtn = document.getElementById('feat-prev');
    const nextBtn = document.getElementById('feat-next');
    const posLabel = document.getElementById('feat-pos');
    if (!track || !prevBtn || !nextBtn || !posLabel) return;

    const cards = track.querySelectorAll('.card');
    const total = cards.length;

    function updatePos() {
      const scrollLeft = track.scrollLeft;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 320;
      const index = Math.min(total - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
      const formattedCur = String(index + 1).padStart(2, '0');
      const formattedTotal = String(total).padStart(2, '0');
      posLabel.textContent = `${formattedCur} / ${formattedTotal}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= total - 1;
    }

    prevBtn.addEventListener('click', () => {
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 320;
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 320;
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updatePos, { passive: true });
    updatePos();

    // Auto-play / pause video on hover in carousel cards
    cards.forEach(card => {
      const vid = card.querySelector('video');
      if (vid) {
        card.addEventListener('mouseenter', () => {
          vid.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
          vid.pause();
          vid.currentTime = 0;
        });
      }

      // Card click opens modal
      card.addEventListener('click', (e) => {
        const id = card.dataset.id;
        if (id) {
          e.preventDefault();
          openModal(id);
        }
      });
    });
  }

  // 3. Directory Archive (Filter, Search, Table / Grid View)
  function initDirectory() {
    const rowsContainer = document.getElementById('stash-rows');
    const searchInput = document.getElementById('stash-search-input');
    const pillButtons = document.querySelectorAll('.pill-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const tableEl = document.getElementById('stash-table');
    const totalCountEl = document.getElementById('stash-total-count');

    if (!rowsContainer) return;

    function render() {
      // Filter items
      const query = state.search.toLowerCase().trim();
      const filtered = STASH_ITEMS.filter(item => {
        const matchesFilter = state.filter === 'all' || item.cat === state.filter;
        const matchesSearch = !query || 
          item.title.toLowerCase().includes(query) ||
          item.cat.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.tools.toLowerCase().includes(query) ||
          item.id.includes(query);
        return matchesFilter && matchesSearch;
      });

      if (totalCountEl) {
        totalCountEl.textContent = `${filtered.length} of ${STASH_ITEMS.length} items`;
      }

      if (filtered.length === 0) {
        rowsContainer.innerHTML = `
          <div style="padding: 48px 0; text-align: center; color: var(--muted); font-family: var(--mono); font-size: calc(12 * var(--u));">
            [ NO ENTRIES MATCHING "${state.search.toUpperCase()}" IN "${state.filter.toUpperCase()}" ]
          </div>
        `;
        return;
      }

      // Group items by category if state.filter === 'all'
      let html = '';
      const categories = state.filter === 'all' 
        ? ['Reels & Motion', 'Thumbnails', 'Carousel Decks', 'Posters & Brand', 'Tech Builds']
        : [state.filter];

      categories.forEach(cat => {
        const catItems = filtered.filter(it => it.cat === cat);
        if (catItems.length === 0) return;

        html += `
          <div class="group-header">
            <span>${cat}</span>
            <sup>(${catItems.length})</sup>
          </div>
        `;

        catItems.forEach(item => {
          html += `
            <div class="tr" data-id="${item.id}">
              <div class="c-shot-thumb">
                ${item.type === 'video'
                  ? `<video src="${item.src}" muted loop playsinline preload="none"></video>`
                  : `<img src="${item.poster}" alt="${item.title}" loading="lazy">`
                }
              </div>
              <button class="row" type="button" aria-label="View ${item.title}">
                <span class="c-n">${item.id}</span>
                <span class="c-name">${item.title}</span>
                <span class="c-cat">${item.format}</span>
                <span class="c-desc">${item.desc}</span>
                <span class="c-dom">${item.tools}</span>
                <span class="c-x">↗</span>
              </button>
            </div>
          `;
        });
      });

      rowsContainer.innerHTML = html;

      // Attach row events
      const trElements = rowsContainer.querySelectorAll('.tr');
      trElements.forEach(tr => {
        const id = tr.dataset.id;
        const vid = tr.querySelector('video');

        // Play video thumbnail on hover
        if (vid) {
          tr.addEventListener('mouseenter', () => {
            vid.play().catch(() => {});
          });
          tr.addEventListener('mouseleave', () => {
            vid.pause();
            vid.currentTime = 0;
          });
        }

        tr.addEventListener('click', () => {
          openModal(id);
        });
      });
    }

    // Search event
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        render();
      });
    }

    // Filter pills
    pillButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        pillButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filter = btn.dataset.filter;
        render();
      });
    });

    // View toggle (table vs grid)
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        state.view = view;
        if (tableEl) {
          if (view === 'grid') {
            tableEl.classList.add('is-grid');
          } else {
            tableEl.classList.remove('is-grid');
          }
        }
      });
    });

    render();
  }

  // 4. Retro Mac OS Window Modal (.d-win)
  let modalElements = {};

  function initModal() {
    const overlay = document.getElementById('preview-modal');
    if (!overlay) return;

    modalElements = {
      overlay,
      title: document.getElementById('modal-title'),
      id: document.getElementById('modal-id'),
      cat: document.getElementById('modal-cat'),
      format: document.getElementById('modal-format'),
      desc: document.getElementById('modal-desc'),
      tools: document.getElementById('modal-tools'),
      year: document.getElementById('modal-year'),
      retention: document.getElementById('modal-retention'),
      mediaFrame: document.getElementById('modal-media-frame'),
      actionBtn: document.getElementById('modal-action-btn'),
      closeBtn: document.getElementById('modal-close-btn')
    };

    if (modalElements.closeBtn) {
      modalElements.closeBtn.addEventListener('click', closeModal);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function openModal(id) {
    const item = STASH_ITEMS.find(it => it.id === id);
    if (!item || !modalElements.overlay) return;

    state.activeItem = item;

    // Fill metadata
    if (modalElements.title) modalElements.title.textContent = item.title;
    if (modalElements.id) modalElements.id.textContent = `ITEM [ ${item.id} ]`;
    if (modalElements.cat) modalElements.cat.textContent = item.cat.toUpperCase();
    if (modalElements.format) modalElements.format.textContent = item.format;
    if (modalElements.desc) modalElements.desc.textContent = item.desc;
    if (modalElements.tools) modalElements.tools.textContent = item.tools;
    if (modalElements.year) modalElements.year.textContent = item.year;
    if (modalElements.retention) modalElements.retention.textContent = item.retention;

    if (modalElements.actionBtn) {
      modalElements.actionBtn.href = item.link;
      if (item.cat === 'Thumbnails') {
        modalElements.actionBtn.textContent = 'Open in Split-Slider Studio ↗';
      } else if (item.type === 'video') {
        modalElements.actionBtn.textContent = 'View Full Reel ↗';
      } else {
        modalElements.actionBtn.textContent = 'View Source / Project ↗';
      }
    }

    // Media Frame
    if (modalElements.mediaFrame) {
      if (item.type === 'video') {
        modalElements.mediaFrame.innerHTML = `
          <video src="${item.src}" controls autoplay loop playsinline style="width: 100%; height: 100%; object-fit: contain; background: #000;"></video>
        `;
      } else if (item.original) {
        modalElements.mediaFrame.innerHTML = `
          <div style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; align-items: center; gap: 10px;">
            <div style="position: relative; width: 100%; aspect-ratio: 16 / 9; max-height: 82%;">
              <img id="modal-img-active" src="${item.src}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain; background: #000;">
              <span id="modal-img-label" style="position: absolute; bottom: 8px; right: 8px; background: rgba(9, 5, 20, 0.9); border: 1px solid var(--accent); color: var(--accent); font-family: var(--mono); font-size: 10px; padding: 2px 8px; letter-spacing: 0.05em;">ENHANCED REMAKE</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" id="btn-toggle-remake" class="pill-btn active" style="font-size: 11px; padding: 4px 12px;">Remake (After)</button>
              <button type="button" id="btn-toggle-original" class="pill-btn" style="font-size: 11px; padding: 4px 12px;">Original (Before)</button>
            </div>
          </div>
        `;

        setTimeout(() => {
          const btnRemake = document.getElementById('btn-toggle-remake');
          const btnOrig = document.getElementById('btn-toggle-original');
          const imgEl = document.getElementById('modal-img-active');
          const lblEl = document.getElementById('modal-img-label');
          if (btnRemake && btnOrig && imgEl && lblEl) {
            btnRemake.addEventListener('click', () => {
              imgEl.src = item.src;
              lblEl.textContent = 'ENHANCED REMAKE';
              lblEl.style.borderColor = 'var(--accent)';
              lblEl.style.color = 'var(--accent)';
              btnRemake.classList.add('active');
              btnOrig.classList.remove('active');
            });
            btnOrig.addEventListener('click', () => {
              imgEl.src = item.original;
              lblEl.textContent = 'ORIGINAL (BEFORE)';
              lblEl.style.borderColor = 'var(--gold)';
              lblEl.style.color = 'var(--gold)';
              btnOrig.classList.add('active');
              btnRemake.classList.remove('active');
            });
          }
        }, 20);
      } else {
        modalElements.mediaFrame.innerHTML = `
          <img src="${item.src}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain; background: #000;">
        `;
      }
    }

    modalElements.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalElements.overlay) return;
    modalElements.overlay.classList.remove('open');
    document.body.style.overflow = '';

    // Stop video playback
    if (modalElements.mediaFrame) {
      const vid = modalElements.mediaFrame.querySelector('video');
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
      modalElements.mediaFrame.innerHTML = '';
    }
  }

  // 5. Live Clock & Coordinates
  function initTime() {
    const timeEls = document.querySelectorAll('.live-time');
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds} IST`;
      timeEls.forEach(el => el.textContent = timeStr);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Bootstrap when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
