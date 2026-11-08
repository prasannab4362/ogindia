/* Only Garments India — site content.
   `photo` = Unsplash photo id (free Unsplash licence, hot-linked; illustrative, not actual stock).
   Use your own photo with `img: 'assets/name.jpg'` — it overrides `photo`.
   Videos live in assets/video/ — see VIDEO-PROMPTS.md for what each clip should be. */
window.KDATA = {
  photo: (id, w = 900, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`,
  whatsapp: '919443408708',

  hero: {
    poster: '1759405327498-9cdb5313d078',
    // hero-film.mp4 = the three Omni Flash parts (zari close-up → silk wall → saleswoman reveal),
    // crossfaded into one 28 s film with the Gemini watermark cropped out. Separate parts also work:
    // ['assets/video/hero-01.mp4', 'assets/video/hero-02.mp4', 'assets/video/hero-03.mp4']
    videos: ['assets/video/hero-film.mp4'],
  },

  moods: [
    { name: 'Wedding Edit', ta: 'திருமணம்', photo: '1705164454907-a04fe248f675' },
    { name: 'Kanchipuram Icons', ta: 'காஞ்சிப் பட்டு', photo: '1614880886886-9314ce0323c5' },
    { name: 'Soft Silk Daily', ta: 'சாஃப்ட் சில்க்', photo: '1609748341932-f0206c09412b' },
    { name: 'Handloom Cotton', ta: 'கைத்தறி', photo: '1742287724816-4a8a1cc7ad5c' },
    { name: 'Half Saree & Lehenga', ta: 'தாவணி', photo: '1767955694884-d4bf352c23c2' },
    { name: 'Kurtis & Readymades', ta: 'ரெடிமேட்ஸ்', photo: '1741847639057-b51a25d42892' },
  ],

  // Try the Look — eight full-length looks on the same red studio stage
  looks: [
    { name: 'Temple Purple', photo: '1610030469983-98e550d6193c', saree: 'Purple pattu, gold korvai border', blouse: 'Contrast red silk blouse' },
    { name: 'Royal Blue', photo: '1610189012906-4c0aa9b9781e', saree: 'Blue silk, yellow-red ganga-jamuna border', blouse: 'White cotton-silk blouse' },
    { name: 'Mint Kora', photo: '1609748340041-f5d61e061ebc', saree: 'Mint kora silk, silver zari buttas', blouse: 'Olive brocade blouse' },
    { name: 'Peach Tissue', photo: '1610189338175-0782dfdb0c04', saree: 'Peach tissue silk, rich pallu', blouse: 'Self-colour tissue blouse' },
    { name: 'Rani & Mango', photo: '1610030469069-cb6620bea733', saree: 'Red silk, mango-green border', blouse: 'Green silk blouse' },
    { name: 'Violet Bloom', photo: '1610189026297-df356264479c', saree: 'Violet floral jacquard silk', blouse: 'Purple elbow-sleeve blouse' },
    { name: 'Navy Paithani', photo: '1609748513078-9ff6232781c5', saree: 'Navy silk, peacock pallu', blouse: 'Red contrast blouse' },
    { name: 'Black Rose', photo: '1610030469839-f909584b43f1', saree: 'Black silk, rose-pink pallu', blouse: 'Pink silk blouse' },
  ],
  accessories: [
    { name: 'Temple jhumkas', photo: '1762686130435-897de4b26aac' },
    { name: 'Gold bangles set', photo: '1763578590148-fbac0711f3b2' },
    { name: 'Kundan choker', photo: '1787831398033-d70495c1e8a4' },
  ],

  // Pick a Silk — bold solid cards, huge condensed title behind the model
  silks: [
    { title: 'KANCHI RANI', sub: 'Purple pattu · gold zari', photo: '1614855918624-d184f79a112a', color: '#6c2bd9' },
    { title: 'PEACOCK PATTU', sub: 'Blue-green · korvai border', photo: '1614881064213-180b1c28f743', color: '#0d6e8a' },
    { title: 'ROSE ZARI', sub: 'Magenta soft silk', photo: '1696233473130-cf169462a52d', color: '#d6246e' },
    { title: 'TEMPLE GREEN', sub: 'Parrot green · temple border', photo: '1753981031189-27bb7bd1c079', color: '#2f8a3a' },
    { title: 'RUBY BORDER', sub: 'Red & gold kanchi', photo: '1727430228383-aa1fb59db8bf', color: '#c0272d' },
    { title: 'MANGO GOLD', sub: 'Yellow tissue silk', photo: '1610313462169-3a5e5d5d3423', color: '#e0a000' },
    { title: 'IVORY SILK', sub: 'Ivory & gold half-fine zari', photo: '1729146768775-3662af38016e', color: '#b08a5a' },
    { title: 'MIDNIGHT', sub: 'Navy-teal pattu', photo: '1776005395798-9fc7c1c50e95', color: '#1d2a6b' },
  ],

  // The Rack — products on hangers
  rackFilters: ['All pieces', 'Silk Sarees', 'Kurtis', "Men's Wear"],
  rack: [
    { name: 'Violet Silver Zari', cat: 'Silk Sarees', photo: '1698657169585-0fce00d3ad9c', fabric: 'Pure silk · silver zari buttas', size: '6.2 m with blouse' },
    { name: 'Peach Brocade', cat: 'Silk Sarees', photo: '1698657169582-64ec02a333f7', fabric: 'Soft silk · copper zari', size: '6.2 m with blouse' },
    { name: 'Red Temple Zari', cat: 'Silk Sarees', photo: '1588140686379-1b76a52103dc', fabric: 'Kanchipuram silk · temple border', size: '6.2 m with blouse' },
    { name: 'Bridal Embroidery', cat: 'Silk Sarees', photo: '1724856605022-106d6dd6e842', fabric: 'Velvet silk · zardozi work', size: '6.2 m with blouse' },
    { name: 'Teal Satin Silk', cat: 'Silk Sarees', photo: '1676696706907-0e04665b80bd', fabric: 'Satin silk · plain body', size: '6.2 m with blouse' },
    { name: 'White Kurta Set', cat: 'Kurtis', photo: '1745313452052-0e4e341f326c', fabric: 'Cotton · block print', size: 'S · M · L · XL · XXL' },
    { name: 'Yellow Anarkali', cat: 'Kurtis', photo: '1760287363878-1a09af715b80', fabric: 'Rayon · embroidered yoke', size: 'S · M · L · XL · XXL' },
    { name: 'Paisley Frock Kurti', cat: 'Kurtis', photo: '1760287364219-160c234ded00', fabric: 'Cotton · paisley print', size: 'S · M · L · XL · XXL' },
    { name: 'Grey Shirt Kurti', cat: 'Kurtis', photo: '1760287363750-1c888c75578f', fabric: 'Cotton-linen', size: 'S · M · L · XL · XXL' },
    { name: 'Yellow Kurta', cat: "Men's Wear", photo: '1768807478287-9e7953cfdca3', fabric: 'Cotton silk · festive', size: '38 · 40 · 42 · 44 · 46' },
    { name: 'Lilac Kurta & Jacket', cat: "Men's Wear", photo: '1774267230662-575d1f4ec1bd', fabric: 'Art silk · embroidered jacket', size: '38 · 40 · 42 · 44 · 46' },
    { name: 'Pink Kurta Set', cat: "Men's Wear", photo: '1774267230654-ad5335ecd6f0', fabric: 'Cotton silk', size: '38 · 40 · 42 · 44 · 46' },
  ],

  film: {
    poster: '1753981031189-27bb7bd1c079',
    // muse-film.mp4 = pleating the green pallu → palace corridor walk → turn on the temple step,
    // crossfaded (video + audio) into one 28 s film, Gemini watermark cropped out.
    videos: ['assets/video/muse-film.mp4'],
    posterImg: 'assets/video/muse-film-poster.jpg',
    colA: ['1617627143750-d86bc21e42bb', '1778148046574-c1509f5a40d4', '1610313462169-3a5e5d5d3423', '1729101143873-d80050bae219', '1692992193981-d3d92fabd9cb', '1679006831648-7c9ea12e5807'],
    colB: ['1779475546066-742c9a580de1', '1619516388835-2b60acc4049e', '1610276580899-53d1af1a1359', '1769275061202-cf3ef67d7279', '1641699862936-be9f49b1c38d', '1678705730064-a7ecbab4b3fb'],
  },

  reels: [
    { title: 'Morning at the gopuram', place: 'Kanchipuram', fabric: 'Kanchipuram silk', photo: '1617627143750-d86bc21e42bb', video: 'assets/video/reel-01.mp4', poster: 'assets/video/reel-01-poster.jpg' },
    { title: 'Sea breeze drape', place: 'Shore Temple, Mahabalipuram', fabric: 'Soft silk', photo: '1778148046667-ec1b619d5064', video: 'assets/video/reel-02.mp4', poster: 'assets/video/reel-02-poster.jpg' },
    { title: 'Courtyard light', place: 'Chettinad mansion', fabric: 'Chettinad cotton', photo: '1753981031189-27bb7bd1c079', video: 'assets/video/reel-03.mp4', poster: 'assets/video/reel-03-poster.jpg' },
    { title: 'Bougainvillea lane', place: 'White Town, Pondicherry', fabric: 'Handloom silk', photo: '1612273882937-44c5313400e5', video: 'assets/video/reel-04.mp4', poster: 'assets/video/reel-04-poster.jpg' },
    { title: 'Lamp room twirl', place: 'Thanjavur', fabric: 'Banarasi silk', photo: '1610276580899-53d1af1a1359', video: 'assets/video/reel-05.mp4', poster: 'assets/video/reel-05-poster.jpg' },
  ],

  bridal: [
    { name: 'Nischayam Red', ta: 'நிச்சயம்', fabric: 'Kanchipuram silk', pallu: 'Gold korvai pallu', tag: 'New', photo: '1610173827043-9db50e0d8ef9' },
    { name: 'Nalangu Rose', ta: 'நலுங்கு', fabric: 'Bridal lehenga', pallu: 'Zardozi dupatta', photo: '1600685890506-593fdf55949b' },
    { name: 'Muhurtham Maroon', ta: 'முகூர்த்தம்', fabric: 'Pure zari silk', pallu: 'Temple-border pallu', tag: 'Bestseller', photo: '1610047614301-13c63f00c032' },
    { name: 'Reception Ruby', ta: 'வரவேற்பு', fabric: 'Velvet lehenga', pallu: 'Embroidered veil', photo: '1759906760638-eeffcb471e53' },
    { name: 'Valaikappu Pink', ta: 'வளைகாப்பு', fabric: 'Soft silk', pallu: 'Rich brocade pallu', tag: 'New', photo: '1756483571456-6fa86cb1ae53' },
    { name: 'Seemantham Gold', ta: 'சீமந்தம்', fabric: 'Tissue silk', pallu: 'Gold tissue pallu', photo: '1684868268327-7e5590bcfbd6' },
    { name: 'Engagement Coral', ta: 'நிச்சயதார்த்தம்', fabric: 'Kanchipuram silk', pallu: 'Contrast pallu', photo: '1726981448126-c7fc9237cdb5' },
  ],

  // Hero scroll sequence: each scroll step zooms deeper into the shop. A frame shows when its file exists
  // in assets/products/ (scene-01 … scene-07, .webp/.jpg/.png); `fallback` is used until then
  // ('zoom' = keep zooming the previous picture). Prompts: HERO-SEQUENCE-PROMPTS.md
  scenes: [
    { file: 'scene-01', fallback: 'assets/products/hero-showroom.webp', origin: '52% 54%', pos: '52% 54%', cap: 'Step inside OG India', sub: 'KCM Tower, Kurinjipadi' },
    { file: 'scene-02', fallback: 'assets/video/seq-shelves.jpg', loop: [10.4, 17.8], origin: '55% 45%', cap: 'Walls of silk, shelf after shelf', sub: 'Kanchipuram · Soft silk · Tissue · Cotton' },
    { file: 'scene-03', fallback: 'assets/video/seq-counter-wide.jpg', loop: [23.2, 28.0], origin: '57% 58%', cap: 'The counter ahead', sub: 'Our saleswomen unfold every saree for you' },
    { file: 'scene-04', cap: 'Readymades, size by size', sub: 'Kurtis · Kurta sets · S–XXL' },
    { file: 'scene-05', cap: 'Festive wear for the family', sub: 'Kurtas · Jacket sets · Pattu pavadai' },
    { file: 'scene-06', fallback: 'assets/video/seq-zari.jpg', loop: [1.0, 8.6], origin: '62% 40%', cap: 'Feel the zari', sub: 'Customers check every border by hand' },
    { file: 'scene-07', fallback: 'assets/video/counter-still.jpg', loop: [19.6, 28.0], origin: '50% 0%', pos: '50% 15%', counter: true, cap: 'At the counter', sub: 'Every saree unfolded for you' },
  ],

  // (unused) Hero walk-in: the aisle you walk down after the doors open (side -1 = left wall, 1 = right wall).
  // Names are files in assets/products/ (without .webp).
  aisle: [
    { sign: 'SILK SAREES', ta: 'பட்டுப் புடவைகள்', side: -1, items: ['rack-01', 'rack-02', 'rack-03'], mannequin: 'look-02' },
    { sign: 'KURTIS & SETS', ta: 'குர்தி செட்', side: 1, items: ['rack-06', 'rack-07', 'rack-08'] },
    { sign: "MEN'S WEAR", ta: 'ஆண்கள் ஆடைகள்', side: -1, items: ['rack-10', 'rack-11', 'rack-12'], mannequin: 'silk-04' },
    { sign: 'BRIDAL', ta: 'மணப்பெண்', side: 1, frames: ['bridal-01', 'bridal-03'] },
    { sign: 'READYMADES', ta: 'ரெடிமேட்ஸ்', side: -1, items: ['rack-09', 'rack-04', 'rack-05'], mannequin: 'look-07' },
    { sign: 'KIDS & PAVADAI', ta: 'குழந்தைகள்', side: 1, frames: ['mood-05', 'mood-02'] },
  ],

  // Departments lift: one floor per department.
  floors: [
    { n: 'G', name: 'Silk Sarees', ta: 'பட்டுப் புடவைகள்', copy: 'Kanchipuram, soft silk, Arani and tissue — from muhurtham silks to daily wear, by the bundle.', chips: ['Kanchipuram', 'Soft silk', 'Tissue', 'Cotton'], items: ['silk-01', 'silk-05', 'silk-07'], bg: '#7a0f1e' },
    { n: '1', name: "Women's Readymades", ta: 'பெண்கள் ரெடிமேட்ஸ்', copy: 'Kurtis, kurta sets and anarkalis packed in S–XXL size-sets, ready for your shelves.', chips: ['Kurtis', 'Kurta sets', 'Anarkali', 'Shirt kurtis'], items: ['rack-06', 'rack-07', 'rack-08'], bg: '#0d5c63' },
    { n: '2', name: "Men's Wear", ta: 'ஆண்கள் ஆடைகள்', copy: 'Festive kurtas, jacket sets and cotton-silk shirts in sizes 38–46.', chips: ['Kurtas', 'Jacket sets', 'Shirts', 'Dhotis'], items: ['rack-10', 'rack-11', 'rack-12'], bg: '#26365f' },
    { n: '3', name: 'Bridal & Occasion', ta: 'மணப்பெண் & விழா', copy: 'Muhurtham silks, reception lehengas and engagement sarees — styled head to toe.', chips: ['Muhurtham', 'Lehenga', 'Reception', 'Engagement'], items: ['look-01', 'look-07', 'look-05'], bg: '#8a1424' },
    { n: '4', name: 'Kids & Pattu Pavadai', ta: 'குழந்தைகள் ஆடைகள்', copy: 'Pattu pavadai, half sarees and festive kids wear in age-sets.', chips: ['Pattu pavadai', 'Half saree', 'Frocks', 'Age-sets'], photos: ['mood-05'], bg: '#9a5a00' },
  ],
};
