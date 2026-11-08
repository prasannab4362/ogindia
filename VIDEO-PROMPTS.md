# OG India: video prompts and delivery files

These prompts target **10-second source clips**, subject to the selected generator's supported duration. The existing site uses assembled films, not the source-part filenames below. See the delivery table for the actual playback paths. The new seven-still walkthrough and its matching ending are in [HERO-SEQUENCE-PROMPTS.md](HERO-SEQUENCE-PROMPTS.md).

**Delivery target:** 10 s per source shot, 1080p where supported, MP4 (H.264) with fast-start metadata. For the hero and film clips, use 16:9. For the reels, use 9:16. Preserve native detail; upscaling does not add it.
**Rules for every clip:** no text, no logos, no watermarks, no price tags, no morphing or distorted hands. Real fabric physics. Warm, natural colour grade with ivory, maroon, temple gold and walnut tones. Subtle instrumental ambience only, no voices.

Use one main garment gesture and one restrained camera movement per shot. Keep faces, hands, the garment hem and feet within safe framing. End on a calm, steady pose. Where supported, use the previous final frame as the next starting image; crossfading alone does not create continuity. Use the same approved model, outfit, jewellery and lighting across related shots. Review the loop seam and export a matching poster for every replacement.

---

## 1. Existing showroom film: source shots
16:9 · muted · assembled as `assets/video/hero-film.mp4`

The scroll hero currently uses its counter segment from 20.5 seconds. A new `assets/video/scene-final.mp4` takes priority and should start from scene 07, as described in the hero guide. Source clips `hero-01` through `hero-03` only play separately if you explicitly configure `js/data.js` → `hero.videos` with those paths.

**hero-01.mp4: the zari close-up**
> Extreme macro, slow dolly across a folded red Kanchipuram silk saree with a thick gold zari temple border, light glinting off the gold threads. A hand with gold bangles gently runs its fingertips along the border. Shallow depth of field, warm tungsten light, a soft bokeh of shelves behind. Ends on a still close-up of the gold border.

**hero-02.mp4: walking the silk wall**
> Smooth sideways tracking shot along a tall wooden wall of shelves in an Indian silk saree showroom. The shelves are neatly stacked with folded silk sarees in jewel colours: maroon, peacock blue, parrot green, mustard and magenta, with gold borders facing the camera. Brass lamps glow. The camera glides slowly from left to right. Ends looking at the stacked shelves.

**hero-03.mp4: the grand reveal**
> Slow pull-back to a wide shot of a grand, heritage-style Indian saree showroom: carved wooden arches, a brass chandelier, a white mattress seating area, mannequins draped in bridal silk sarees, and shelves of silks along every wall. A saleswoman unfolds a red and gold silk saree in a wide arc across the counter, and it settles softly. The camera settles and holds still for the final 2 seconds.

---

## 2. The Muse Film: "Feel the drape" (the gold-framed film)
16:9 · sound toggle · assembled as `assets/video/muse-film.mp4`

Use the same adult model, green and gold saree, blouse, jewellery and jasmine across all three source shots. Treat the location changes as editorial cuts. Replace the assembled film and its poster together; the source-part paths below are not currently configured for playback.

**film-01.mp4: the pleats**
> Close-up of an adult Indian woman's hands smoothing one section of a parrot-green silk pallu with a gold temple border in front of a tall mirror. Soft window light, locked camera, one slow movement with realistic folds, then a still hold. No needle, pinning action or additional hands.

**film-02.mp4: the walk**
> Medium shot of a young South Indian woman in a green and gold Kanchipuram silk saree, jasmine flowers in her hair, walking slowly through a sunlit palace corridor with carved pillars. The pallu flows behind her in a light breeze. The camera tracks backwards in front of her. Ends as she pauses and looks to the side.

**film-03.mp4: the turn**
> The same adult woman makes one gentle quarter-turn in a temple courtyard at golden hour. The saree's pallu follows with natural weight and settles, with marigold garlands in the background. Locked medium-wide camera; keep the full garment visible. End on a natural smile held still. No exaggerated flare or fast spin.

---

## 3. The Muse Reels: "Silk, in motion" (5 vertical reels)
9:16 · each reel is one 10-second clip

**reel-01.mp4: Kanchipuram**
> A woman in a pink and orange Kanchipuram silk saree with gold jewellery stands at the base of a colourful South Indian temple gopuram in the early morning. She adjusts her pallu and smiles at the camera. Handheld, gentle push-in, soft morning light.

**reel-02.mp4: Mahabalipuram**
> A woman in a coral soft-silk saree walks barefoot on the sand near the Shore Temple in Mahabalipuram. Sea breeze lifts the pallu, waves roll in the background, warm sunset light. Slow tracking shot beside her.

**reel-03.mp4: Chettinad**
> A woman in a mustard and maroon checked Chettinad cotton saree sits on the steps of a Chettinad mansion courtyard with Athangudi tiles and tall wooden pillars. Sunbeams fall across her as she turns her head. Slow arc around her.

**reel-04.mp4: Pondicherry**
> A woman in a purple and olive handloom silk saree walks away from the camera along a bougainvillea-lined yellow street in Pondicherry, then glances back over her shoulder. Soft afternoon light, gentle follow shot.

**reel-05.mp4: Thanjavur**
> A woman in a multicolour Banarasi silk saree twirls slowly in a dark heritage room lit by rows of brass oil lamps. The saree flares out and gold zari sparkles in the lamp light. Low-angle slow motion.

---

## 4. Existing extra films: replacement prompts

**look-360.mp4** (9:16, Try the Look; already integrated)
> Use `assets/products/look-01.webp` as the identity and wardrobe reference. An adult model on a plain red studio background in the same purple Kanchipuram saree, red blouse, temple jhumkas and gold bangles makes one slow complete rotation, ending facing forward in the starting pose. Soft even light, locked full-length camera with margins above the head and below the feet. Keep hands controlled and preserve the face, jewellery and saree pattern through front, side and back views. No camera orbit or cropped feet.

Review the unseen back carefully. If only a smaller turn is usable, relabel the site's 360-degree card to match the actual clip.

**bridal-film.mp4** (16:9, The Muhurtham Moment; already integrated)
> An adult South Indian bride in deep red and gold Kanchipuram silk, temple jewellery and jasmine sits under a marigold mandap during the thali moment. Her adult partner is partly visible beside her, with the priest guiding nearby. One restrained gesture, warm lamp light, a gentle minimal push-in, then a still hold. Keep all participating hands clearly separated and jewellery consistent. Respectful medium-wide framing, no extreme facial close-up or extra arms.

Review ritual details before approving the clip; the replacement should match the existing thali-moment copy.

**rack-lift.mp4** (16:9, The Rack)
> On a clean white set, a row of silk sarees and kurtis hangs on wooden hangers from a chrome rail. A single visible adult hand enters from above, grasps the centre hanger and lifts it a few centimetres off the rail toward the camera. The rest remain hanging and gently fall out of focus. Locked camera, even studio light, natural fabric weight, steady final hold. No unsupported floating hanger or extra hands.

---

## Where each file goes

| Status | Active file | Section | Shape |
|---|---|---|---|
| Done | `assets/video/hero-film.mp4` | Existing hero counter ending | 16:9 |
| Pending | `assets/video/scene-final.mp4` | Preferred new ending from scene 07 | 16:9 |
| Done | `assets/video/muse-film.mp4` | The Muse Film | 16:9 |
| Done | `assets/video/reel-01.mp4` … `reel-05.mp4` | The Muse Reels | 9:16 |
| Done | `assets/video/look-360.mp4` | Try the Look | 9:16 |
| Done | `assets/video/bridal-film.mp4` | The Muhurtham Moment | 16:9 |
| Done | `assets/video/rack-lift.mp4` | On the rail | 16:9 |

The existing files are present; new scene frames and `scene-final.mp4` remain pending. Keep approved versions and editing sources separately before replacing an active file. Every existing film has a matching `-poster.jpg`; regenerate that poster when replacing its video.

The site checks for files through the preview server (`npm.cmd start` on Windows). Opening `index.html` directly does not reproduce asset discovery. Before delivery, review faces, fingers, fabric patterns, loop seams, sound and mobile cropping. Existing completed clips do not need regeneration to use the new hero still sequence.
