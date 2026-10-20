# Soham Thorat Portfolio: Website Specification

Oct 18, 2026 · @Soham

This is the single source of truth for building Soham Thorat's portfolio: a heavy, dark-purple and gold story-scroll site that gets him hired for creative work, wins freelance clients and grows his audience. Where this doc disagrees with the older blueprint or prompt pack, this doc wins.

## 1. Overview

**Goal.** A visitor should know who he is, what he does and what to click within 5 seconds.

**Positioning, in this order:**

1. Creative first: video editing and graphic design (posters, thumbnails, everything in between).
2. Full-stack builds made with AI-assisted "vibe coding" (Claude Code, Gemini, ChatGPT), stated confidently and honestly.
3. Tech Lab, growing: data science, machine learning, deep learning and computer vision, shown as real projects plus "coming soon" cards.

**Three visitor types, three buttons:** a client ("Hire me for creative work"), a recruiter or collaborator ("See what I build") and a fan ("Follow the content").

**Tone:** professional with small jokes. Never claim a skill, number or result that is not real.

### Rules locked in this conversation

| Topic | Decision |
| --- | --- |
| 3D | None. No Three.js, no WebGL, no GLB. The star is one illustrated portrait cutout. |
| Portrait | One portrait only. No pose swaps, no extra poses. Anything else would look gimmicky. |
| Reference | meermohsin.me for ideas only (gate, chapters, cursor, stats, process, journal). No copied text, images or code. |
| Instagram | 7 posts, all made by Soham. Link or click-to-load official embed only. Nothing downloaded or re-hosted. |
| Tech Lab | TextHumaniser, Telco Churn Prediction, Mentor Marketplace (repo: Consult), plus 3 "coming soon" cards. UPI Shield and Soham-Traders are out. |
| Sound | None anywhere. Strip audio from every clip. |
| Languages | English and Japanese with a toggle. Japanese is also a learning tool for Soham, so the doc includes readings. |
| Fonts | Bold and heavy. |
| Hosting | GitHub Pages, repo ThoratSoham.github.io, custom domain later. |
| Quality | No deadline. Quality first. |

## 2. Visual system

The look is royal matte dark purple with black at the edges, loud heavy type, and gold as the only loud colour. It is chaotic on the surface and strict underneath: one grid, one border style, one shadow style.

### Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| --black | #0B0A10 | Page background, side areas |
| --purple-deep | #1E1033 | Section backgrounds |
| --purple-royal | #3A1D63 | Cards, panels, matte surfaces |
| --purple-glow | #8A5CD6 | Hover, soft highlights, borders |
| --gold | #F2B134 | Buttons, key words, stickers, the only loud colour |
| --ink | #F3EEFF | Body text |

Text on --black or --purple-deep must pass WCAG AA (4.5:1 for body). Flat matte fills only, no glossy gradients.

### Fonts: bold and heavy

| Role | Font | Weight | Notes |
| --- | --- | --- | --- |
| Display (English) | Archivo Black | 400 (already heavy) | Chapter words, hero name, big stats. Uppercase, tight leading. |
| Display alternative | Anton | 400 | Condensed option for the marquee and tags. Pick one display font after a look at both. |
| Body (English) | Space Grotesk or Inter | 500 and 700 | Never below 500 weight on dark backgrounds. |
| Japanese display | Dela Gothic One | 400 (heavy) | Loaded only when Japanese is selected. |
| Japanese body | Noto Sans JP | 500 and 700 | Loaded only when Japanese is selected. |

Type scale: fluid with clamp(). Hero name about 12vw on desktop, chapter words about 10vw, body 16 to 18px, minimum 16px on phones. Japanese lines run longer, so give headings extra room.

### Chaos toolkit (use a few per screen, never all)

- Stickers and badges rotated 2 to 4 degrees, in gold.
- Thick 3px borders and one hard offset shadow style (6px 6px 0 black) everywhere.
- Low-opacity halftone and grain overlay (about 6 percent).
- Numbered tags in the portrait-card style (01, 02, 03).
- Scalloped stamp-frame edges for cards and clip frames.
- Marquee strips, overlapping huge type, outlined text.

### Allowed decoration: only from his own story

Gold sunflowers, gold paisley, the scalloped stamp frame and numbered tags, all as SVG. No generic floating shapes or random orbs. The two motion clips (black hole, flame) are allowed because they are purple and tie to the Learn and Create ideas.

### Chaos rules

1. One wild element per screen area.
2. Body text and buttons stay calm, aligned and legible.
3. 8px spacing scale, one corner radius (4px), one border width.
4. Anything wild can be turned off with Calm mode.

## 3. Tech stack, folders and placeholder files

The site is static: plain HTML, CSS and vanilla JavaScript (ES modules), no framework and no build step, so it deploys to GitHub Pages as it is. Google Fonts are the only external resource.

```
ThoratSoham.github.io/
  index.html
  404.html
  README.md   CONTENT.md
  sitemap.xml   robots.txt
  css/   tokens.css  base.css  components.css  sections.css
  js/    main.js  gate.js  i18n.js  parallax.js  cursor.js
         calm.js  reveal.js  instagram.js  journal.js  stats.js
  i18n/  en.json  ja.json
  data/  instagram.json  projects.json  stats.json
         posts.json  about.json
  assets/
    images/  portrait-cutout.png  portrait-card.webp
             favicon.png  og-image.jpg  cover-01.webp ... cover-07.webp
    video/   learn-blackhole.mp4  learn-blackhole.jpg
             transition-flame.mp4  transition-flame.jpg
    svg/     sunflower.svg  paisley.svg  stamp-frame.svg
    Soham-Thorat-CV.pdf
```

### Placeholder files

The build tool creates every file below as a purple-and-gold placeholder at the exact name and size, with the word "REPLACE" on it. Soham drops his real file over the placeholder, and nothing in the code changes.

| File | Size and format | Soham provides | Placeholder shows |
| --- | --- | --- | --- |
| assets/images/portrait-cutout.png | about 1400px tall, transparent PNG or WebP, under 300 KB | Illustrated portrait, background removed, halo checked on a dark background | Gold silhouette with "REPLACE" |
| assets/images/portrait-card.webp | about 1080x1350, under 300 KB | Portrait card without the "BRAND BRAND" text and the sparkle watermark | Purple card with scalloped frame |
| assets/images/favicon.png | 512x512 | Gold "S" or sunglasses icon | Gold "S" |
| assets/images/og-image.jpg | 1200x630 | Share image | Purple banner with the name |
| assets/images/cover-01.webp to cover-07.webp | 1080x1350 (4:5), under 150 KB each | One cover per Instagram post, exported from his own work | Purple card with "01" to "07" |
| assets/video/learn-blackhole.mp4 | 720p, no audio, loop, under 2 MB | Black hole clip, compressed | Dark purple still |
| assets/video/transition-flame.mp4 | 720p, no audio, loop, under 2 MB | Flame clip, compressed | Dark purple still |
| assets/video/\*.jpg | first frame, about 1280 wide | Poster for each clip | Same as above |
| assets/Soham-Thorat-CV.pdf | PDF | His CV, later | One-page "CV coming soon" PDF |

The red-and-blue chrome skull clip is not used, because it breaks the gold-only rule and is not part of his story. Soham confirmed he has the right to publish the black hole and flame clips. His scroll-scene frames go in assets/scene/ and get placeholders too.

## 4. Page order, entry gate and hero

One long scroll tells the story in this order. The nav links jump to each section.

| # | Section | Job | Nav label |
| --- | --- | --- | --- |
| 0 | Entry gate | Preload, set the mood, ask for the click | none |
| 1 | Hero | Name, portrait, pitch, three buttons | Home |
| 2 | Skills marquee | Instant summary of what he does | none |
| 3 | CREATE chapter and Creative Studio | Win creative clients | Create |
| 4 | BUILD chapter and Tech Lab | Win recruiters and web clients | Build |
| 5 | LEARN chapter | Show the growth path honestly | Learn |
| 6 | Stats strip | Real numbers | none |
| 7 | About and experience | Trust: clubs, certificates, publication | About |
| 8 | Client process | Reduce hiring friction | none |
| 9 | Journal | Show he publishes and learns | Journal |
| 10 | Contact and footer | Close with one big action | Contact |

### Entry gate

- Full screen, deep purple, huge gold counter from 0 to 100 that tracks real preloading of the portrait, fonts and first clip.
- A small joke line under the counter, a visible Skip link, and a "Click to enter" button that appears at 100.
- On click, a gold scalloped-stamp wipe reveals the hero. Remember the entry for the session so refreshes skip the gate.
- Calm mode and reduced motion get an instant fade. If JavaScript fails, the gate never appears and the page loads normally.
- The click is also the moment to request the iPhone tilt permission, by offering an "Enable tilt" button after entering.

### Hero

- Layout on desktop: huge "SOHAM THORAT" in the display font behind and partly overlapping the portrait, which floats in the centre-right with no box. Pitch, sticker and buttons sit on the left.
- Layers at different depths: portrait (front), gold sunflowers and paisley (behind), name (mid), halftone grain (top, low opacity). Each layer moves by a different amount.
- Parallax follows the mouse on desktop and phone tilt on mobile. On iPhone it needs the "Enable tilt" button; if denied, a slow automatic sway runs instead. A very subtle idle float runs all the time.
- One detail: a gold glint sweeps across the sunglasses on hover or tap.
- The flat bottom edge of the portrait fades into the page, or the portrait sits inside a gold scalloped stamp frame.
- Headline: "Video editor and designer who also ships code." Gold sticker: "Deep learning, ML and computer vision: loading..."
- Buttons: "Hire me for creative work" (gold, primary), "See what I build" and "Follow the content" (outlined).
- Mobile: portrait first, name overlapping its lower part, pitch and the three buttons stacked below with 44px tap targets.
- Only one portrait is used on the whole site, at different sizes (hero large, About smaller). No swapping.

### Skills marquee

A continuous gold-on-black strip: video editing, graphic design, posters, thumbnails, full-stack builds, data science (loading). It pauses on hover and stops in Calm mode.

## 5. Chapters and content sections

Each chapter opens with one huge word, one strong statement and its own gold sunflower or paisley transition drawn in SVG. Chapter content follows below.

### 5.1 CREATE and the Creative Studio

- Statement: "I turn rough ideas into reels, posters and thumbnails people actually stop scrolling for."
- Gallery of the 7 Instagram posts, all made by Soham, in an aligned but slightly chaotic masonry layout. Reels and posts are mixed.
- Filter chips appear only for categories that have items: All, Video, Poster, Thumbnail, Design. Until Soham sets categories, only "All" shows.
- Each card shows the cover (cover-01 to cover-07), title, role, year and an "Open on Instagram" link. Empty fields are hidden, never shown as "null".
- Click-to-load: tapping a card first shows a short cookie notice, then loads the official Instagram embed inside the card. If it fails or an ad blocker stops it, the plain link stays.
- Nothing from Instagram is downloaded or re-hosted. A "See all on Instagram" button links to instagram.com/sohamthorat\_.
- Background: the flame clip behind the chapter title, with the screen blend mode.

### 5.2 BUILD and the Tech Lab

- Statement: "I build full-stack web apps with AI-assisted workflows (Claude Code, Gemini, ChatGPT). I direct the tools, review what matters, and deploy."
- Three project cards, each with title, one-line description, tech tags, a status chip, a GitHub link and an optional demo link.
- Use these descriptions exactly, and do not invent metrics:

| Project | Description | Tags | Status | Repo |
| --- | --- | --- | --- | --- |
| TextHumaniser | Offline, rule-based NLP pipeline that restructures long-form text while preserving meaning. Classical NLP only, no paid APIs. | Python, spaCy, WordNet, NLTK | In progress | github.com/ThoratSoham/TextHumaniser |
| Telco Customer Churn Prediction | End-to-end churn classifier with XGBoost and Random Forest, SMOTE for class imbalance, randomized hyperparameter search and SHAP explainability. | Python, scikit-learn, XGBoost, SHAP | Complete | github.com/ThoratSoham/data-science-projects |
| Mentor Marketplace | Mentor and mentee marketplace MVP with passwordless magic-link login, role selection, protected dashboards and row-level security. | Next.js, TypeScript, Tailwind, Supabase | MVP in progress | github.com/ThoratSoham/Consult |

- Describe TextHumaniser as a stylistic NLP pipeline. Never claim it beats AI detectors.
- The stats strip may show TextHumaniser's real star count, which is 18 today.

### 5.3 LEARN

- Statement: "Data science, machine learning, deep learning and computer vision. Still training. Results get posted when they are real."
- Background: the black hole clip, slowly looping, screen blend, as a visual for "loading".
- Three "Coming soon" cards: Deep Learning, Machine Learning, Computer Vision. Each has a status of "loading...", a playful teaser line and no fake progress numbers.

### 5.4 Stats strip

Large count-up numbers in the display font, read from data/stats.json. A stat with no value is hidden. Real values today: 7 works featured, 140 Instagram followers, 1 year creating, 12K views on his best reel, 5 certificates, 3 communities, 18 GitHub stars on TextHumaniser and 1 publication. Show the reel figure as best reel views, never as a total.

### 5.5 About and experience

- Short bio of 3 to 4 sentences in Soham's voice, plus the portrait (smaller, same image).
- Timeline: MLSC NMIET, Content Creator, October 2026 to present. GDGoC NMIET, Content Creator, May 2026 to October 2026. Institution's Innovation Council (IIC), Content Creator, start date to be added.
- Education: B.Tech Computer Engineering, NMIET, 2025 to 2029.
- Certificates grid (text cards): Introduction to Retrieval Augmented Generation; Claude Code in Action; Claude Code 101; Claude with the Anthropic API; Introduction to Claude Cowork.
- Publication card: "Perceptions of AI-Based Conversational Therapy Versus Human Talk-Based Therapy".
- An honest language line: "Japanese: Elementary. I am learning, so please be kind to my grammar."
- Download CV button, always visible. The file is a placeholder until Soham provides his CV.
- Hidden easter egg: click the portrait 5 times for a small gold sunflower burst.

### 5.6 Client process

Four numbered steps in the portrait-card tag style: 01 Brief, 02 Concept, 03 Create, 04 Deliver. Each has one line of copy (see the copy deck).

### 5.7 Journal

The journal is a small blog: a few short dated posts that show he publishes and learns in public. It starts with three drafted posts (see the starter data), written as Markdown, rendered in the browser, each on its own anchor. Soham edits the drafts before publishing and adds new posts by adding one entry to data/posts.json.

### 5.8 Contact and footer

- Closing line in huge type: "Let's make something loud (in gold)."
- One big gold button: email djsoham02@gmail.com (mailto link).
- Social links: GitHub github.com/ThoratSoham, LinkedIn linkedin.com/in/soham-thorat-8505531b6, Instagram instagram.com/sohamthorat\_, X x.com/SohamThorat\_.
- Availability line: "Open for freelance creative work."
- Footer: "Made in Pune." plus the language and Calm mode toggles.

## 6. Motion, clips and fallbacks

Motion is a seasoning, not the meal. Everything animates with transform and opacity only, and every effect has a Calm-mode version.

### Motion clips

| Clip | Where | How it plays |
| --- | --- | --- |
| learn-blackhole.mp4 | LEARN chapter and the "coming soon" cards | Muted, looped, starts when in view, pauses when out of view |
| transition-flame.mp4 | Behind the CREATE chapter title, and as the divider between Hero and CREATE | Muted, looped, same rules |

Both clips sit on pure black, so the page applies mix-blend-mode: screen. The black becomes transparent and the glow sits directly on the purple page. Video tags use muted, playsinline, loop, preload="none" and a poster. Skip both clips on very slow connections and very small screens, and show the poster only.

Prepare each clip with: ffmpeg -i in.mp4 -an -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4

### Scroll scene from hero to About, built from his frames

Soham has frames of himself walking in from the left and sitting at a table on the right, in a white room with purple elements. The page plays them as a scroll animation on a canvas, as follows. If the frames are missing, the scene is skipped.

- Hero: the walk-in. CREATE: sitting down. BUILD: typing. About: the head turn and zoom.
- Frames are numbered in order: assets/scene/scene-001.webp, scene-002.webp and so on. The canvas draws the frame that matches the scroll position, so there is no video decoding and scrubbing stays smooth on phones.
- Target 60 to 90 frames, about 960px wide, WebP at about 30 KB each, around 3 MB in total. Load the first frame at once and the rest in the background in scroll order. On phones use every second frame. Calm mode and slow connections show one still frame.

### Cursor, tilt and reveals

- Custom cursor: a small gold dot that grows over clickable things and shows labels such as View and Open. Desktop with a fine pointer only, hidden on touch.
- Parallax: mouse on desktop; device orientation on phones with an "Enable tilt" button for iPhone and a slow sway if permission is denied.
- Reveals: elements rise and fade in once when they enter the view, with snappy easing.
- Transitions between chapters: gold sunflower and paisley SVG blooms, scalloped stamp-edge wipes.

### Calm mode and fallbacks

| Situation | Behaviour |
| --- | --- |
| Calm mode on, or prefers-reduced-motion | No parallax, cursor effects, reveals, wipes or autoplay. Posters and the still portrait only. |
| JavaScript fails or is blocked | noscript fallback: the page content is readable, the hero shows the still portrait, the gate never appears. |
| A video file is missing or fails | Hide the video, show its poster. Never show a broken player. |
| The Instagram embed is blocked | Show the plain "Open on Instagram" link. |
| Slow connection or small screen | Skip the clips, use posters or a plain divider. |

The Calm toggle is always visible in the nav and the footer, and it remembers the visitor's choice.

## 7. Copy deck: English and Japanese

Every visible string lives in i18n/en.json and i18n/ja.json under the key shown here. The Japanese is a careful first draft with readings so Soham can learn from it. A native speaker should check it before launch, because awkward Japanese hurts a professional portfolio.

### Navigation, gate and hero

| Key | English | Japanese | Reading |
| --- | --- | --- | --- |
| nav.create | Create | 作る | Tsukuru |
| nav.build | Build | 開発 | Kaihatsu |
| nav.learn | Learn | 学ぶ | Manabu |
| nav.about | About | 私について | Watashi ni tsuite |
| nav.journal | Journal | ジャーナル | Jānaru |
| nav.contact | Contact | お問い合わせ | O-toiawase |
| nav.skip | Skip to content | 本文へスキップ | Honbun e sukippu |
| gate.enter | Click to enter | クリックして入る | Kurikku shite hairu |
| gate.loading | Loading | 読み込み中 | Yomikomi-chū |
| gate.skip | Skip | スキップ | Sukippu |
| gate.joke | Loading pixels. Please do not feed the sunflowers. | ピクセルを読み込み中。ひまわりにエサをあげないでください。 | Pikuseru o yomikomi-chū. Himawari ni esa o agenaide kudasai. |
| hero.headline | Video editor and designer who also ships code. | 動画編集者でデザイナー。コードも書いて公開します。 | Dōga henshūsha de dezainā. Kōdo mo kaite kōkai shimasu. |
| hero.sticker | Deep learning, ML and computer vision: loading... | ディープラーニング、機械学習、コンピュータビジョン：読み込み中… | Dīpu rāningu, kikai gakushū, konpyūtā bijon: yomikomi-chū |
| hero.hire | Hire me for creative work | クリエイティブ制作を依頼する | Kurieitibu seisaku o irai suru |
| hero.build | See what I build | 作ったものを見る | Tsukutta mono o miru |
| hero.follow | Follow the content | コンテンツをフォローする | Kontentsu o forō suru |
| hero.tilt | Enable tilt | 傾き操作をオンにする | Katamuki sōsa o on ni suru |

### Marquee and chapters

| Key | English | Japanese | Reading |
| --- | --- | --- | --- |
| marquee.1 | Video editing | 動画編集 | Dōga henshū |
| marquee.2 | Graphic design | グラフィックデザイン | Gurafikku dezain |
| marquee.3 | Posters | ポスター | Posutā |
| marquee.4 | Thumbnails | サムネイル | Samuneiru |
| marquee.5 | Full-stack builds | フルスタック開発 | Furusutakku kaihatsu |
| marquee.6 | Data science (loading) | データサイエンス（準備中） | Dēta saiensu (junbi-chū) |
| create.statement | I turn rough ideas into reels, posters and thumbnails people actually stop scrolling for. | ラフなアイデアを、思わず指が止まるリール、ポスター、サムネイルに仕上げます。 | Rafu na aidea o, omowazu yubi ga tomaru rīru, posutā, samuneiru ni shiagemasu. |
| build.statement | I build full-stack web apps with AI-assisted workflows (Claude Code, Gemini, ChatGPT). I direct the tools, review what matters, and deploy. | Claude Code、Gemini、ChatGPTなどのAI支援ワークフローで、フルスタックのウェブアプリを作ります。ツールを指揮し、大事な部分を確認し、公開まで行います。 | Kurōdo Kōdo, Jemini, Chatto Jī Pī Tī nado no ēai-shien wākufurō de, furusutakku no webu apuri o tsukurimasu. Tsūru o shiki shi, daiji na bubun o kakunin shi, kōkai made okonaimasu. |
| learn.statement | Data science, machine learning, deep learning and computer vision. Still training. Results get posted when they are real. | データサイエンス、機械学習、ディープラーニング、コンピュータビジョン。まだ学習中。成果は本物になったら公開します。 | Dēta saiensu, kikai gakushū, dīpu rāningu, konpyūtā bijon. Mada gakushū-chū. Seika wa honmono ni nattara kōkai shimasu. |
| card.dl | Deep Learning: neurons are warming up. | ディープラーニング：ニューロンがウォームアップ中。 | Dīpu rāningu: nyūron ga uōmuappu-chū. |
| card.ml | Machine Learning: fitting the model. The jokes are overfitting. | 機械学習：モデルを学習中。ジョークは過学習気味。 | Kikai gakushū: moderu o gakushū-chū. Jōku wa kagakushū-gimi. |
| card.cv | Computer Vision: teaching a computer to see. It already likes the sunglasses. | コンピュータビジョン：コンピュータに見ることを教え中。サングラスはもう気に入ったようです。 | Konpyūtā bijon: konpyūtā ni miru koto o oshie-chū. Sangurasu wa mō ki ni itta yō desu. |

### Studio, Tech Lab and statuses

| Key | English | Japanese | Reading |
| --- | --- | --- | --- |
| studio.open | Open on Instagram | Instagramで開く | Instagram de hiraku |
| studio.all | See all on Instagram | Instagramで全部見る | Instagram de zenbu miru |
| studio.load | Load post | 投稿を読み込む | Tōkō o yomikomu |
| studio.notice | Loading this post connects to Instagram, which may set cookies. | この投稿を読み込むとInstagramに接続し、Cookieが設定される場合があります。 | Kono tōkō o yomikomu to Instagram ni setsuzoku shi, kukī ga settei sareru baai ga arimasu. |
| lab.title | Tech Lab | テックラボ | Tekku rabo |
| status.progress | In progress | 進行中 | Shinkō-chū |
| status.done | Complete | 完了 | Kanryō |
| status.mvp | MVP in progress | MVP開発中 | Emu-bui-pī kaihatsu-chū |
| status.soon | Coming soon | 近日公開 | Kinjitsu kōkai |
| lab.repo | View on GitHub | GitHubで見る | GitHub de miru |

### About, process, journal and contact

| Key | English | Japanese | Reading |
| --- | --- | --- | --- |
| about.experience | Experience | 経歴 | Keireki |
| about.certs | Certificates | 修了証 | Shūryōshō |
| about.publication | Publication | 論文 | Ronbun |
| about.japanese | Japanese: Elementary. I am learning, so please be kind to my grammar. | 日本語：初級。勉強中なので、文法にはやさしくお願いします。 | Nihongo: shokyū. Benkyō-chū na node, bunpō ni wa yasashiku onegai shimasu. |
| about.cv | Download CV | CVをダウンロード | CV o daunrōdo |
| process.title | How I work with clients | 進め方 | Susumekata |
| process.1 | Brief: you tell me the goal, the audience and the deadline. | ヒアリング：目的、ターゲット、締め切りを教えてください。 | Hiaringu: mokuteki, tāgetto, shimekiri o oshiete kudasai. |
| process.2 | Concept: a quick sketch or moodboard for a yes or a tweak. | コンセプト：ラフスケッチかムードボードを送るので、OKか修正をください。 | Konseputo: rafu sukecchi ka mūdo bōdo o okuru node, ōkē ka shūsei o kudasai. |
| process.3 | Create: I edit, design or build, with check-ins along the way. | 制作：編集、デザイン、開発を進め、途中で確認を取ります。 | Seisaku: henshū, dezain, kaihatsu o susume, tochū de kakunin o torimasu. |
| process.4 | Deliver: final files, revisions and handover in one place. | 納品：最終データ、修正対応、引き渡しまで一括で行います。 | Nōhin: saishū dēta, shūsei taiō, hikiwatashi made ikkatsu de okonaimasu. |
| journal.title | Journal | ジャーナル | Jānaru |
| contact.closing | Let's make something loud (in gold). | 一緒に、ちょっと派手なものを作りましょう（ゴールドで）。 | Issho ni, chotto hade na mono o tsukurimashō (gōrudo de). |
| contact.email | Email me | メールを送る | Mēru o okuru |
| contact.available | Open for freelance creative work. | フリーランスのクリエイティブ案件を受付中。 | Furīransu no kurieitibu anken o uketsuke-chū. |
| footer.made | Made in Pune. | プネーで制作。 | Punē de seisaku. |
| calm.toggle | Calm mode (less motion) | カームモード（動きを減らす） | Kāmu mōdo (ugoki o herasu) |
| lang.toggle | EN / JP | EN / 日本語 | none |

## 8. Data files and starter content

All content lives in JSON files, so Soham can add a post, a project or a stat without touching the code. A field set to null is simply hidden on the page. Nothing here is invented: unknown values stay null until Soham fills them.

### data/instagram.json (all 7 posts, made by Soham)

```json
[
  {"id":1,"url":"https://www.instagram.com/p/DaigQXijSDZ/","type":"post","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-01.webp"},
  {"id":2,"url":"https://www.instagram.com/p/DaifwiLDaGO/","type":"post","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-02.webp"},
  {"id":3,"url":"https://www.instagram.com/reel/DcrI3Xbp3ox/","type":"reel","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-03.webp"},
  {"id":4,"url":"https://www.instagram.com/reel/Dcg5IkjJ94N/","type":"reel","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-04.webp"},
  {"id":5,"url":"https://www.instagram.com/reel/Ddq7zg7s_wQ/","type":"reel","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-05.webp"},
  {"id":6,"url":"https://www.instagram.com/reel/DcgCE-HM2dP/","type":"reel","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-06.webp"},
  {"id":7,"url":"https://www.instagram.com/p/DbTf0I1DMOo/","type":"post","title":null,"role":null,"category":null,"year":null,"cover":"assets/images/cover-07.webp"}
]
```

Category is one of video, poster, thumbnail or design. When a title is null the card shows "Work 01" to "Work 07".

### data/stats.json (real values only)

```json
[
  {"key":"works","value":7},
  {"key":"certificates","value":5},
  {"key":"communities","value":3},
  {"key":"github_stars","value":18},
  {"key":"publications","value":1},
  {"key":"instagram_followers","value":null},
  {"key":"years_creating","value":null}
]
```

The 18 stars are TextHumaniser's count on October 18, 2026, and are updated by hand. Followers (140), years creating (1) and the best reel's 12,000 views were given by Soham on October 18, 2026. Entries with a null value are hidden.

### data/projects.json and data/about.json

projects.json holds the three cards from section 5.2 with the fields title, description, tags, status, repo and demo. about.json holds the timeline, certificates and publication from section 5.5:

```json
{"timeline":[
  {"org":"MLSC NMIET","role":"Content Creator","start":"2026-10","end":"present"},
  {"org":"GDGoC NMIET","role":"Content Creator","start":"2026-05","end":"2026-10"},
  {"org":"Institution's Innovation Council (IIC)","role":"Content Creator","start":null,"end":null}
]}
```

### data/posts.json: three journal drafts for Soham to edit

Each entry has a slug, a date (null until published), a draft flag and English and Japanese text. The build tool shows only entries with draft set to false.

```json
[
  {"slug":"one-site-edits-and-code","date":null,"draft":true,
   "title":{"en":"One site for edits and code","ja":"編集もコードも、ひとつのサイトに"},
   "body":{"en":"I edit videos and design posters. I also build web apps. For a long time those lived in separate corners. This site puts them side by side, because both start the same way: a rough idea and an unforgiving deadline.",
           "ja":"私は動画を編集し、ポスターをデザインします。ウェブアプリも作ります。これまでは別々の場所にありましたが、このサイトでは並べて見せます。どちらも、ざっくりしたアイデアと容赦ない締め切りから始まるからです。"}},
  {"slug":"building-with-ai-tools","date":null,"draft":true,
   "title":{"en":"Building with AI tools without losing the plot","ja":"AIツールに使われずに作る"},
   "body":{"en":"I build full-stack apps with Claude Code, Gemini and ChatGPT. My rule: I decide what gets built, I read the parts that matter, and I can explain every project on this site. The tools type fast. The judgment is mine.",
           "ja":"Claude Code、Gemini、ChatGPTでフルスタックのアプリを作っています。ルールはひとつ。何を作るかは自分で決め、大事な部分は自分で読み、このサイトのすべてのプロジェクトを説明できること。ツールは速く打てますが、判断は私のものです。"}},
  {"slug":"what-i-learn-next","date":null,"draft":true,
   "title":{"en":"What I am learning next","ja":"次に学ぶこと"},
   "body":{"en":"Data science, machine learning, deep learning and computer vision are loading. I will post projects when they have real results, and not before.",
           "ja":"データサイエンス、機械学習、ディープラーニング、コンピュータビジョンは読み込み中です。本物の成果が出たときに公開します。それまでは公開しません。"}}
]
```

The journal heading and these drafts are the only copy written for Soham without his words. He should read each one aloud and change anything that does not sound like him.

## 9. Performance, accessibility, SEO and deploy

Half the visitors will be on phones, so the heavy look has to load fast and degrade gracefully.

### Targets

| Measure | Target |
| --- | --- |
| First readable content | Under 2 seconds on a mid-range phone on 4G |
| Initial download | Under about 3 MB, fonts and first image included |
| Each clip | Under 2 MB, 720p, no audio |
| Each image | Under 300 KB, WebP where possible, width and height set |
| Layout shift | Near zero |
| Frame rate | Smooth on a mid-range phone; animate only transform and opacity |
| Lighthouse | 90 or above for performance, accessibility and SEO |

Load the portrait and display font first. Lazy-load everything below the first screen. Load the Japanese fonts only when Japanese is chosen.

### Accessibility

- Semantic HTML, headings in order, buttons that are buttons, links that are links, and a skip-to-content link.
- Alt text on every image and a text description for each clip.
- Visible focus outlines, full keyboard navigation, 44px minimum tap targets.
- WCAG AA contrast, with text never below 16px.
- No flashing or strobing. Calm mode and prefers-reduced-motion are respected everywhere.
- Hover is never the only way to reach information. Every hover effect has a tap or scroll equivalent.

### SEO and sharing

- Unique title and description, Open Graph and Twitter cards using og-image.jpg, a favicon, sitemap.xml, robots.txt and a custom 404 page.
- Real text in the HTML for the name, role and project descriptions, never only inside images.
- lang attribute and hreflang tags for English and Japanese.
- Optional privacy-friendly analytics later, with a notice if cookies are used.

### Deploy

Create the public repo ThoratSoham.github.io, push the site to the main branch, then enable Pages from the root of main in the repo settings. The site goes live at https://thoratsoham.github.io. A custom domain is added later with a CNAME file and DNS records, then HTTPS is enforced. The README gets a Deploy section, and CONTENT.md explains how to add an Instagram item, project or journal post by editing JSON only.

### Before launch, on GitHub (later, not now)

- Add a description, topics and a README with screenshots to TextHumaniser, data-science-projects and Consult.
- Fix the typo "Hyperparameter tunin" in data-science-projects and add a results section with charts.
- Edit the profile README: remove UPI Shield and the "Quant Trader" wording, and delete or clearly label the trading table, because its return figures read as real results.

## 10. Open questions and build order

The build can start now with placeholders. These items fill in later without changing any code.

### Questions for Soham

| # | Question | Why it matters |
| --- | --- | --- |
| 1 | What is the title, category (video, poster, thumbnail, design) and year of each of the 7 Instagram posts? | Cards, filter chips and the stats strip |
| 2 | How many Instagram followers do you have, and how many years have you been creating? | Two stats that can only come from you |
| 3 | Any other real numbers: total views on one reel, posts made, clubs led? | Stats strip. Only real numbers are shown. |
| 4 | What is the full name of IIC, and your start date there? | About timeline |
| 5 | Do you have the right to publish the black hole and flame clips? | They came from a downloader site |
| 6 | Do you want the walk-in-and-sit scroll scene? If yes, it is generated separately. | Optional hero-to-About clip |
| 7 | Archivo Black or Anton for the English display font? | One heavy display font, picked after a look |
| 8 | Who will check the Japanese before launch? | Quality of the JP copy |

### Build order

1. Scaffold the folders, design tokens, fonts, nav, footer and the EN/JP and Calm toggles, with all placeholder files.
2. Entry gate with the real loading counter and Skip.
3. Hero with the portrait cutout, layered parallax, tilt and the sunglasses glint.
4. Skills marquee and the three chapters with their SVG transitions and clips.
5. Creative Studio with click-to-load Instagram cards.
6. Tech Lab and the Learn cards.
7. Stats strip, About, client process, journal, contact.
8. Full English and Japanese pass, Calm mode and the no-JavaScript fallback.
9. Audit for speed, accessibility, small screens and real phones, then SEO files.
10. Deploy to GitHub Pages.

Check each step in a browser and on a phone before starting the next.

### Paste this into Antigravity first

```
Build the portfolio website described in the attached specification document. Follow it exactly. Where it disagrees with any older blueprint or prompt pack, this specification wins. Do not add 3D, extra portraits, sound or generic floating shapes. Use placeholders for every missing asset at the exact file names listed. Do not invent stats, titles, dates or results: leave unknown values null. Before writing code, reply with the folder structure and any questions, then wait for my go.
```
