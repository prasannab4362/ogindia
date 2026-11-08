# OG India: showroom scroll sequence

Seven coordinated stills lead from the entrance to the saree counter, followed by a short film. The effect comes from consistent architecture, modest forward zooms and overlapping crossfades. These are discrete editorial views, not a reconstructed 3D shop; the zari detail is an intentional insert.

## Current status

The five fallback images already exist. None of `scene-01` through `scene-07`, or `scene-final.mp4`, exists yet. The completed 42 product images are a separate collection.

| Step | Subject | Existing fallback |
|---|---|---|
| 01 | Entrance | `assets/products/hero-showroom.webp` |
| 02 | Moving down the aisle | `assets/video/seq-shelves.jpg` |
| 03 | Choosing at the silk wall | `assets/video/seq-counter-wide.jpg` (counter view until replaced) |
| 04 | Women's readymades | No fallback; skipped until supplied |
| 05 | Family festive wear | No fallback; skipped until supplied |
| 06 | Zari detail | `assets/video/seq-zari.jpg` |
| 07 | Counter, matching the film | `assets/video/counter-still.jpg` |

The existing `hero-film.mp4` supplies the counter ending from 20.5 seconds. A new `scene-final.mp4` takes priority automatically. An older `scene-counter.mp4` is also accepted. Missing frames are skipped and captions retain their original step numbers.

## Reference and continuity rules

- Start with `assets/products/hero-showroom.webp` as the architectural reference. Approve scene 01 before generating the other six. Attach scene 01 to every subsequent request.
- Use scene 07 as the starting image for the final video. Also reference scene 07 when generating the zari insert, so the red saree, green blouse sleeves and jewellery match.
- Preserve the carved teak arch, shelf heights, central brass chandelier, marble floor with brown inlay, brass lamps and white mattress with gold cushions. Do not invent extra doors or change the corridor width between views.
- Keep a level camera and consistent lens perspective. Scenes 01-05 move forward along the same aisle, with browsing activity at its sides. Scene 06 is a deliberate close-up; scene 07 returns to a medium-wide counter view.
- Repeat the same adult saleswoman in a green silk saree with jasmine braid, and the same adult customer in a pastel half saree, in scenes 06-07 and the ending film. Other families can appear in the department views.
- Leave the lower-left area relatively quiet for captions. Keep important faces, hands and the main garment within the central 60% so mobile cropping remains usable.
- Export landscape 16:9. Target 2400 x 1350 if the generator supports it; record actual native resolution rather than claiming an upscale adds detail. Prefer compressed WebP for delivery, keeping originals separately.
- These generated scenes are illustrative; review architecture and department placement against the actual shop before presenting them as a documentary walkthrough.

**Shared suffix for every still:** Photorealistic Indian garment retail photography, warm golden interior light, natural skin tones, true silk weave and metallic zari, same showroom architecture as the attached reference, level camera, consistent perspective, anatomically natural hands and faces. No captions, readable labels, price tags, logos or watermark. No duplicated people, warped shelves or floating garments.

## 01 - Entrance: `scene-01.webp`

> Wide view from the entrance of the referenced South Indian garments showroom. A long marble corridor leads to the existing carved teak arch and white mattress seating with gold cushions. Preserve the teak shelves of jewel-coloured folded silks, chandelier and brass lamps in their reference positions. Red and gold saree mannequins stand at the left; a rail of silk sarees sits at the right. A small number of customers browse deeper inside. Level eye-height camera, centred corridor, welcoming warm light. Leave room around the central aisle and lower-left foreground for website copy.

## 02 - Into the aisle: `scene-02.webp`

> The identical showroom, camera a short distance forward along the same centre line. Foreground mannequins are partly outside the left edge and the hanging silks are nearer the right edge. The same arch, white seat and floor inlay remain aligned ahead. On the left, a mother and adult daughter browse folded silk sarees while a salesman presents one folded piece. Keep the central aisle open; do not move the camera sideways or change the architecture. Medium-wide view with the same lens perspective and lighting as scene 01.

## 03 - Choosing silk: `scene-03.webp`

> Another small forward step in the same showroom. Keep the central corridor and far arch visible in the middle-right background. At the left shelves, an adult customer holds a magenta Kanchipuram pallu against her shoulder while her mother feels its border. A salesman beside them holds a folded parrot-green saree. Natural restrained gestures, one garment in each person's hands, no extra limbs or repeated faces. Medium-wide eye-height view, unchanged warm light and architecture.

## 04 - Readymades: `scene-04.webp`

> Further forward in the same aisle, with the existing corridor and carved arch still visible. At the right side is a coordinated teak readymade display: wooden hangers carrying kurtis, anarkalis and kurta sets arranged by colour. A mother holds one yellow anarkali in front of her teenage daughter to compare its length, while a saleswoman presents a second folded option. Modest age-appropriate clothing. Neat stacks of kurtis sit on a side counter. No readable tags, lettering or size labels. Keep the aisle clear and preserve the reference floor, shelf materials and lighting.

## 05 - Family festive wear: `scene-05.webp`

> One step nearer the counter in the same showroom, with a family festive-wear display along the aisle edge. Cream, yellow and pink men's kurtas and embroidered jackets hang beside small pattu pavadai and children's kurta sets on child-size hangers. A father compares a lilac jacket against his torso while his young son points at a yellow kurta on the rail. A salesman stands nearby with empty hands. Natural modest family shopping scene, level medium-wide view, the same teak architecture and marble corridor. Do not imply a different floor or introduce a new room.

## 06 - Zari insert: `scene-06.webp`

> Detail insert at the same white mattress counter, using scene 07 as the garment and hand reference. A red Kanchipuram saree with a wide gold temple border lies across the mattress. The adult customer's hand with gold bangles lightly touches the zari; the saleswoman's green-sleeved hand holds the pallu edge steady. Two clearly separated hands, correct finger anatomy, visible realistic silk weave and gold thread. Soft shallow depth of field and a brass lamp in the background. This is a close-up editorial insert, not another forward camera step.

## 07 - Counter and video start: `scene-07.webp`

> Medium-wide view at the referenced white mattress counter. The same adult South Indian saleswoman in a green silk saree, gold jewellery and jasmine braid holds the edges of a partly opened red Kanchipuram pallu with a wide gold temple border. The same adult customer in a pastel half saree sits beside the mattress, one hand resting near the border. Both people are visible from the waist up with comfortable headroom; all hands are in frame. Preserve the teak arch, silk shelves, brass lamp and gold cushions. Level camera with unchanged warm exposure. Calm starting pose with enough slack in the fabric for one gentle unfolding motion. Keep the lower-left quiet for the final caption.

## Final film: `assets/video/scene-final.mp4`

**Input:** approved scene 07 as the exact first frame. **Delivery target:** 10 seconds, landscape 16:9, H.264 MP4, 1080p if supported, web playback enabled. Generate without baked-in text. The site plays the hero muted.

> Begin exactly on the attached counter image: preserve both faces, clothing, jewellery, hands, lighting and showroom geometry. Hold the starting composition for the first second. From seconds 1-7, the saleswoman gently opens the already-parted red and gold pallu a little wider and lets the fabric settle onto the mattress. The seated customer lightly traces a short section of the zari once, then rests her hand. From seconds 7-10, both hold a calm, natural smile and the cloth becomes still. Camera remains locked at eye height. Realistic fabric weight, subtle motion, no scene changes, no additional people or props, no shoulder draping, standing up or packaging action. No speech, lettering, logos or watermark. End near the original composition so a repeat is unobtrusive.

A single small action is easier to keep consistent than unfolding, touching, draping, standing, walking to a mirror and packing within one short clip. If the tool supports an end-frame reference, use the approved starting image as a near-matching end pose. Inspect the loop seam before delivery.

A longer mirror or packing scene should be a separately named edit kept outside the active `assets/video/` path. Do not overwrite the approved ending as a way to extend its duration.

## Integration and review checklist

- [ ] `assets/products/scene-01.webp` - entrance approved
- [ ] `assets/products/scene-02.webp` - aisle approved
- [ ] `assets/products/scene-03.webp` - silk selection approved
- [ ] `assets/products/scene-04.webp` - readymades approved
- [ ] `assets/products/scene-05.webp` - family festive wear approved
- [ ] `assets/products/scene-06.webp` - zari insert approved
- [ ] `assets/products/scene-07.webp` - counter approved
- [ ] `assets/video/scene-final.mp4` - generated from scene 07 and loop reviewed
- [ ] Architecture, recurring people, red saree and gold border match across frames
- [ ] Faces and hands survive desktop and narrow-screen cropping
- [ ] Final still and film first frame match without an exposure or framing jump

PNG and JPG stills with the same basenames also work. Only check a deliverable after the actual file exists and has been reviewed. Start the preview with `npm.cmd start` on Windows, then visit http://localhost:8080. Review forward scrolling, backward scrolling and the final film. Reduced-motion visitors get a static entrance image with no pinned hero or automatic hero playback; the ending pauses when leaving the hero or hiding the tab.
