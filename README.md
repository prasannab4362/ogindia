# OG India: garments wholesale, a motion website

A scroll-driven 3D website for **OG India**, a wholesale garments shop for sarees, kurtis, men's wear, kids wear and bridal, at KCM Tower, Kurinjipadi. The colours are maroon, temple gold and ivory.

## Preview
Double-click `START-PREVIEW.cmd`, or run `npm start`, then open http://localhost:8080. It needs internet access for GSAP 3.12.5 and Google Fonts. The `/api/assets` list that switches on your own images and videos needs the preview server.

## Sections
1. **Hero: a photo-first zoom sequence (up to 7 motion frames).** Frames come from `D.scenes` in `js/data.js` and `assets/products/scene-01 … scene-07`, then `assets/video/scene-final.mp4` rolls; see HERO-SEQUENCE-PROMPTS.md. The page opens on the showroom photo with "Every garment. One wholesale address." and the Try the Look / Browse the Rack buttons, like the reference. As you scroll:
   - **01 Step inside OG India:** the showroom pushes in.
   - **02 Rails of silk, racks of readymades:** you zoom down the corridor to the white seat. A soft motion blur follows scroll speed.
   - **03 At the counter:** the saleswoman holds open a red and gold saree.
   - **The film rolls** from that exact moment and keeps looping the counter scene, with "Take the lift" and "WhatsApp for rates" buttons.
   - A gold progress line runs along the bottom.
   - **Live steps:** the shelves, counter, zari and saleswoman steps each loop their own segment of `hero-film.mp4` (set by `loop: [from, to]` in `D.scenes`). Only the step on screen plays. Still photos drift slowly so nothing looks frozen.
   - **Your own frames slot in automatically:** `assets/products/scene-01.webp` through `scene-07.webp` (JPG/PNG also accepted). The preferred ending is `assets/video/scene-final.mp4`; `scene-counter.mp4` remains accepted. The prompts are in **HERO-SEQUENCE-PROMPTS.md**.
   - Currently five fallbacks exist: showroom, shelves, wide counter, zari detail and counter still. New scene frames and the matching ending film remain pending. Missing steps are skipped without renumbering later captions.
   - Forward zooms remain restrained with no alternating camera rotation. Mobile scroll distance is shorter. The existing hero film supplies the counter segment until a dedicated ending is added; playback pauses outside the hero and when the tab is hidden.
   - If the visitor's system asks for reduced motion, the hero shows its first still and headline without pinning or automatic hero playback.
2. **Six Moods: expanding panels.** Six tall photo panels; the open one widens to show the full look, with English and Tamil names. They open one after another in a loop (every 3.2 s) while the section is on screen; hovering or tapping opens one. On phones they stack vertically. Faces are always in frame.
3. **Try the Look**: eight full-length looks, an "In this look" panel and a 360° turntable card.
4. **Pick a Silk**: a fanned arc of colour cards.
5. **The Rack: a 3D rotating garment carousel.** It has a round chrome rail with every piece hanging around it. Scrolling turns the rail; the front piece is sharp and named, and the back pieces are smaller and blurred. Filter chips re-space the ring, the arrows step through pieces, clicking lifts a piece into the detail view, and the "On the rail" clip sits top-right.
6. **The Muse Film**: a 16:9 film in a gold frame with corner brackets and a sound toggle, photo columns scrolling in opposite directions on each side, and Purchase the Collection. 7. **The Muse Reels**: five vertical reels on a 3D arc.
8. **Bridal Collection**: arch cards on a curved carousel with name, details, Add to enquiry and a heart, followed by **The Muhurtham Moment** bride film ("Silk that remembers the vow"). This was restored to match the 15:28 recording.

**Navigation fix:** the hero's scroll trigger is created after its frames load, so `ScrollTrigger.sort()` and `refreshPriority` re-measure every later section. Menu links land exactly on their sections, and the highlight is computed live from what is in the middle of the screen.
9. **Departments: take the lift.** A brass lift panel (G, 1–4) with an LED floor display. The lift doors close between floors and open on each department: Silk Sarees, Women's Readymades, Men's Wear, Bridal & Occasion, Kids & Pattu Pavadai. Each floor has its own colour, products and an "Ask … rates" WhatsApp button. Edit the floors in `D.floors` in `js/data.js`, and the aisle in `D.aisle`.
10. **Visit**: address, call, WhatsApp, Maps and GSTIN, then the footer.

Enquiry bag (top-right icon): pieces added anywhere collect here and are sent as one WhatsApp message to 94434 08708.

## Logo
`assets/logo.svg` (full logo) and `assets/logo-mark.svg` (the OG gopuram monogram, also used as the favicon). They are drawn from scratch for OG India: the OG gopuram monogram with "OG INDIA · GARMENTS WHOLESALE · மொத்தவிலை ஜவுளி கடை".

## Hero film (done)
`assets/video/hero-film.mp4` (28 s, 1280×720, 8.4 MB, muted, loops) combines three Omni Flash clips: a hand on a gold zari border → the silk-saree shelf wall with brass lamps → the saleswoman unfolding a red silk saree. They are joined with 0.8 s crossfades. The Gemini sparkle watermark (bottom-right, x 1136–1184 / y 575–625) is removed by cropping a 1120×630 window and scaling it back to 720p. The rejected alternates are still in Downloads.

To rebuild it from new clips, use the same ffmpeg recipe: `crop=1120:630:8:45,scale=1280:720` on each clip, then `xfade=transition=fade:duration=0.8` between them.

## Muse Film (done)
`assets/video/muse-film.mp4` (28 s, 720p, 7.5 MB, with sound) joins three clips: pleating the green pallu → walking the palace corridor → turning on the temple step at golden hour. The video and audio are crossfaded with the same watermark crop. It plays muted when the section scrolls into view; "Sound off/on" toggles the audio, and if the browser refuses sound it falls back to muted. The poster is `muse-film-poster.jpg`.

## Muse Reels (done)
`assets/video/reel-01.mp4` … `reel-05.mp4` (9:16, 720×1280, 10 s each, about 3 MB, with sound):
1. Kanchipuram gopuram
2. Shore Temple beach, Mahabalipuram
3. Chettinad mansion courtyard
4. Bougainvillea lane, Pondicherry
5. Lamp-room twirl, Thanjavur

Each reel uses its own frame as the poster (`reel-0X-poster.jpg`). The Gemini sparkle sits at x 576–624, y 1136–1184 in the vertical frame:
- **Reels 1, 2 and 5:** removed with `delogo=x=568:y=1128:w=64:h=64`, which keeps the feet in frame on the beach and twirl shots.
- **Reels 3 and 4:** delogo left a visible smudge on the checks and paving, so these are cropped instead (`crop=636:1131:42:0,scale=720:1280`).

The centre reel plays muted in the arc; tapping it opens it full screen with sound.

**All site videos are done:** hero film, Muse Film and 5 reels.

## Extra films (done)
| File | Where it shows | Watermark fix |
|---|---|---|
| `look-360.mp4` (9:16, 540×960, 1.1 MB, muted) | Try the Look: a "360° view" card; tapping it opens a full-size lightbox | delogo over the plain red studio wall |
| `rack-lift.mp4` (16:9, 1.9 MB, muted) | The Rack header: a small "On the rail" clip | crop recipe |
| `bridal-film.mp4` (16:9, 3.2 MB, with sound) | New "The Muhurtham Moment" section after the Bridal arc. It opens from a tilted card to full width as you scroll and has a Sound toggle. | crop recipe |

These three load only when first scrolled into view and pause off-screen, which saves data on phones. Each has a `-poster.jpg`.

## Videos (Omni Flash, 10 seconds each)
See **VIDEO-PROMPTS.md** for active filenames and replacement prompts. Ten seconds is the production target for source shots, subject to the selected generator. The configured hero and Muse paths use the assembled `hero-film.mp4` and `muse-film.mp4`; source parts play separately only when configured in `js/data.js`. Asset discovery skips absent optional files. The new hero ending uses scene 07 as its first-frame reference.

## Generated product images
All 42 studio images (hero, moods, looks, silks, rack, bridal) are in `assets/products/` as compressed WebP: about 4.8 MB in total, with the cut-outs keeping their transparency. The full-size originals (57 MB) are in `assets/_originals/`. The site loads them automatically through the preview server (`/api/assets`). To replace one, save a new file with the same name. Avoid `filter: drop-shadow` on the cut-outs, because Chrome draws faint boxes around them; the site uses floor-shadow ellipses instead.

## Photos
The product and lifestyle photos are free-licence Unsplash images, linked from images.unsplash.com rather than saved in the project. They are **illustrative only, not actual stock**. To use your own photo, put it in `assets/` and set `img: 'assets/photo.jpg'` on that item in `js/data.js`.

## Files
`index.html` · `css/site.css` · `js/data.js` (all content, photos and videos) · `js/main.js` (interactions and scroll) · `js/scenes.js` (WebGL) · `js/art.js` (silk textures). The previous versions and the old Kumar's images are in `_previous-version/`.
