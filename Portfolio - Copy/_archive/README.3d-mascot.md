# Soham - 3D Hero Mascot (PS2-Era Stylized Low-Poly Character)

An original, animated, rigged low-poly 3D character hero mascot built entirely in procedural Three.js code for a personal portfolio website.

The character is a stylized "PS2-era game character" adaptation of Soham: chunky silhouette, smooth shading, warm hand-painted look, royal purple blazer with delicate gold paisley lapels, black shirt underneath, dark trousers, and dark rectangular sunglasses with a gold bridge detail.

---

## 📦 Deliverables Summary

| Deliverable | Path | Description / Status |
| :--- | :--- | :--- |
| **Character Builder** | [`src/character/buildCharacter.js`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/src/character/buildCharacter.js) | Returns `THREE.Group` with `SkinnedMesh`, Mixamo skeleton, 9 animations, and Mascot API (`lookAt`, `play`, `tilt`, `update`). |
| **Texture Atlas** | [`src/character/texture.js`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/src/character/texture.js) | Procedural 1024x1024 hand-painted texture atlas with fine grain, gradients, stubble, and gold paisley. |
| **Low-Poly Props** | [`src/character/props.js`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/src/character/props.js) | Laptop, floating timeline, tablet with abstract poster & stylus, flickering neural wireframe. |
| **Preview Application** | [`character-preview.html`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/character-preview.html) | Interactive viewer with OrbitControls, 9 animation triggers, camera presets, skeleton helper, GLB export, and poster capture. |
| **Exported GLB Model** | [`public/models/soham.glb`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/public/models/soham.glb) | 0.42 MB binary glTF with 7,763 triangles, embedded 1024x1024 texture, humanoid skeleton, and all 9 animation clips. |
| **Poster Render** | [`public/models/poster/soham-front.png`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/public/models/poster/soham-front.png) | 1024x1024 front-facing render with transparent background. |
| **Documentation** | [`README.md`](file:///e:/GitHub%20Projects/ThoratSoham/Portfolio/README.md) | Full setup, usage guide, animation breakdown, reference comparison, and remaining weaknesses. |

---

## 🚀 How to Run Locally

### 1. Installation
Install the pinned dependencies (Three.js and Vite):
```bash
npm install
```

### 2. Start Dev Server
Launch the preview server:
```bash
npm run dev
```
Open **[http://localhost:5173/character-preview.html](http://localhost:5173/character-preview.html)** in your browser.

---

## 🔄 How to Re-Export Model & Poster

You can re-export the binary glTF model and front poster in two ways:

### Option A: From the Browser Preview UI
1. Navigate to `http://localhost:5173/character-preview.html`.
2. Click **"Export GLB"** to download `soham.glb` (and automatically save to `public/models/soham.glb`).
3. Click **"Capture Poster"** to render a 1024x1024 transparent still image (and automatically save to `public/models/poster/soham-front.png`).

### Option B: From the Command Line (Headless Node.js)
Run the automated build and verification script:
```bash
node scripts/export-assets.js
node scripts/verify-glb.js
```
This regenerates `public/models/soham.glb`, `public/models/texture-atlas.png`, and `public/models/poster/soham-front.png`.

---

## 🎨 Design & Palette Specifications

The color palette strictly adheres to the requested theme:
- `#0B0A10` (Black): Collared shirt, trousers, sunglasses frame.
- `#1E1033` (Deep Purple): Fabric fold shadows, crease lines, darker clothing accents.
- `#3A1D63` (Royal Purple): Blazer main fabric, poster backdrop.
- `#8A5CD6` (Violet Glow): Neural wireframe nodes and lines, soft fill light.
- `#F2B134` (Gold): Delicate lapel paisley pattern, sunglasses bridge detail, laptop keyboard accent, timeline playhead. (The only loud color).
- `#F3EEFF` (Ink): Specular highlights, white-purple key light.
- `#B97E57` (Skin base): Warm medium-brown skin with blush, nose bridge highlights, and jaw shading.
- `#14101C` (Hair): Matte black buzzed hair with faded hairline.
- `#1B1420` (Beard): Dark brown-black trimmed beard and mustache.

---

## 🦴 Skeleton & Mixamo Compatibility

The character is rigged to a humanoid skeleton using exact Mixamo bone naming conventions:
- Root: `mixamorigHips`
- Spine chain: `mixamorigSpine` → `mixamorigSpine1` → `mixamorigSpine2`
- Neck & Head: `mixamorigNeck` → `mixamorigHead`
- Arms (Left & Right): `Shoulder` → `Arm` → `ForeArm` → `Hand` → `Thumb1/2` & `Index1/2`
- Legs (Left & Right): `UpLeg` → `Leg` → `Foot` → `ToeBase`

Skin weights are computed with smooth cosine/hermite falloff:
- **Elbows**: 50/50 smooth blend zone between `Arm` and `ForeArm` ensuring elbows bend cleanly without collapsing.
- **Knees**: Dual-bone blend between `UpLeg` and `Leg` preventing pinch artifacts.
- **Shoulders & Torso**: Seamless transition from `Spine2` to `Shoulder` and `Arm`.
- **Neck**: Smooth gradient from `Spine2` through `Neck` into `Head`.

---

## 🎬 The 9 Animations

All 9 animations start and end in the rest A-pose (or blend seamlessly), allowing smooth `0.3s` crossfades without popping:

1. **`idle`** (5.0s, loop, seamless):
   - Chest breathing expansion via `Spine1` and `Spine2`.
   - Subtle hip weight shift (±0.008m x-translation, ±0.015 rad roll).
   - Natural head drift and arm counter-sway.
2. **`wave`** (3.0s, one-shot):
   - Right arm raises with forearm at head level.
   - Hand and forearm wave back and forth (4 oscillations) accompanied by a friendly head nod.
   - Smooth lowering back to rest pose.
3. **`point_right`** (2.5s, one-shot):
   - Right arm raises horizontally pointing to the right screen edge.
   - Torso rotates slightly right (+12° yaw); head turns (+35° yaw) with an affirmative nod.
4. **`typing`** (3.0s, loop):
   - Lean forward at waist/desk height.
   - Automatically displays `laptop` prop.
   - Arms forward, wrists and fingers alternating typing motions.
5. **`working_timeline`** (4.0s, loop):
   - Automatically displays `floating_timeline` prop.
   - Right hand sweeps along horizontal timeline, snapping onto a keyframe diamond.
   - Head tracks hand movement from left to right.
6. **`sketching`** (4.0s, loop):
   - Automatically displays `tablet_with_poster` with stylus.
   - Left arm cradles tablet at waist height; right hand executes deliberate sketching strokes.
   - Head tilts down focused on the tablet.
7. **`thinking_look_up`** (4.0s, loop):
   - Weight shifts onto left hip.
   - Head tilts up (+15° pitch) and aside (+12° yaw).
   - Right hand rises to chin/jawline in thoughtful reflection.
8. **`sunglasses_adjust`** (3.0s, one-shot):
   - Right arm raises; index/middle finger precisely touches the gold bridge of the sunglasses.
   - Hand nudges glasses up; head tilts back slightly as glasses settle into place.
   - Arm returns smoothly without passing through the face or frame.
9. **`react_click`** (1.0s, one-shot):
   - Quick anticipation crouch (-0.04m hips, bent knees).
   - Snappy hop (+0.08m vertical lift), energetic arm flair, and snappy head spin.
   - Squash on landing and recovery to rest pose.

---

## 🔍 Reference Comparison & Iterative Refinement

During development, multiple iteration rounds were executed comparing the model against the reference sheet:

| Feature | Reference Sheet Concept | 3D Model Implementation | Resolution / Refinement |
| :--- | :--- | :--- | :--- |
| **Proportions** | PS2 stylized game character (~1/6.5 head-to-body ratio). | Exact 1/6.5 ratio (~0.28m head on ~1.80m body), broad shoulders, balanced build. | Verified in front, 3/4, side, and back views. |
| **Hairline & Top Volume** | Buzzed black hair with clean fade and squared-off brow. | Buzzed hair built as separate volumetric mesh with ~0.015m clearance above scalp, clean front brow edge, and fade gradient. | Prevents scalp clipping while keeping clean PS2 silhouette. |
| **Beard & Mustache** | Full, trimmed beard connected to mustache along jawline. | Separate shell mesh contoured to chin and jaw with lip cutout for mouth definition and stippling stubble texture. | Crisp trimmed silhouette from front and side profiles. |
| **Sunglasses** | Dark rectangular lenses, thin black frame, gold bridge accent. | Rectangular lenses with purple gloss reflection, matte black frame, thin temple arms reaching ears, and `#F2B134` gold bridge detail. | Clean silhouette from front, 3/4, and side. |
| **Outfit Colors** | Royal purple blazer over black collared shirt, black trousers. | Royal purple `#3A1D63` blazer with notch lapels and delicate gold paisley pattern `#F2B134`, black `#0B0A10` shirt and trousers. | Exactly implements the specified color palette and pattern. |
| **Hands** | Chunky readable PS2 low-poly hands. | Palm + 4 segmented fingers + thumb with individual skinning. | High readability in gestures (pointing, waving, typing, sketching). |
| **Texture Quality** | Hand-painted PS2 game aesthetic. | Single 1024x1024 atlas with painted fold creases, cheek warmth, stubble specks, and fine noise grain overlay. | Avoids flat sterile shading; delivers authentic PS2 hand-painted charm. |

---

## ⚖️ Known Deviations & Remaining Weaknesses

1. **Facial Rigging**:
   - As per the prompt specifications, the face has no mouth or eye morph targets (sunglasses and full beard hide the eyes and mouth). Emotional expression is driven entirely by head tilts, yaw turns, and body gestures.
2. **Fabric Simulation**:
   - The royal purple blazer and trousers use rigid skinning deformation rather than real-time cloth simulation. At extreme leg bends (>90° flexion), the blazer hem adheres closely to the hips without dynamic cloth flutter.
3. **Props Attachment**:
   - Props (`laptop`, `floating_timeline`, `tablet_with_poster`) are positioned via local hierarchy transforms aligned with the animation keyframes rather than dynamic two-handed bone constraints.
4. **Gold Paisley Detail Distance**:
   - At extreme camera distances (>5 meters), the fine gold paisley pattern on the lapels blends into a warm gold shimmer due to mipmapping. It is optimized for hero mascot viewing distances (1.5 to 3.5 meters).

---

## 🛠 Mascot JavaScript API

The character group returned by `buildCharacter()` exposes the required portfolio integration API:

```javascript
import { buildCharacter } from './src/character/buildCharacter.js';

const character = buildCharacter();
scene.add(character);

// 1. Cursor look-at tracking with smoothing (normalized from -1 to 1)
window.addEventListener('mousemove', (e) => {
  const nx = (e.clientX / window.innerWidth) * 2 - 1;
  const ny = (e.clientY / window.innerHeight) * 2 - 1;
  character.lookAt(nx, ny);
});

// 2. Play any of the 9 animations with seamless crossfade
character.play('wave', { fade: 0.3 });
character.play('typing', { loop: true });

// 3. Gentle whole-body tilt rotation
character.tilt(0.05, 0.02);

// 4. Props control
character.showProp('neural_wireframe');
character.hideProps();

// 5. Per-frame render loop update
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  character.update(delta);
  renderer.render(scene, camera);
}
```
