/* OG India — interactions & scroll choreography (GSAP ScrollTrigger). */
(() => {
  const D = window.KDATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const src = (o, w, h) => o.img || D.photo(o.photo, w, h);
  const wa = (text) => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(text)}`;
  $('#year').textContent = new Date().getFullYear();

  /* ---------- storage (best effort) ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  };
  let bag = store.get('og-bag', []);
  let wish = new Set(store.get('og-wish', []));

  const toast = (msg) => {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove('show'), 2200);
  };
  function renderBag() {
    $('#bagCount').textContent = bag.length;
    $('#wishCount').textContent = wish.size;
    $('#bagEmpty').style.display = bag.length ? 'none' : 'block';
    $('#bagList').innerHTML = bag.map((b, i) => `<li><img src="${b.thumb}" alt=""><div><b>${b.name}</b><small>${b.note || ''}</small></div><button data-rm="${i}" aria-label="Remove ${b.name}">×</button></li>`).join('');
    const text = `Hello OG India, I would like wholesale rates for:\n${bag.map((b, i) => `${i + 1}. ${b.name}${b.note ? ` (${b.note})` : ''}`).join('\n')}`;
    $('#bagSend').href = wa(text);
    $('#bagSend').classList.toggle('disabled', !bag.length);
    store.set('og-bag', bag);
    store.set('og-wish', [...wish]);
  }
  function addToBag(item) {
    if (!bag.some((b) => b.name === item.name)) bag.push(item);
    renderBag();
    toast(`Added “${item.name}” to your enquiry`);
    gsap && gsap.fromTo('#bagBtn', { scale: 1.35 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
  }
  function toggleWish(name, btn) {
    wish.has(name) ? wish.delete(name) : wish.add(name);
    if (btn) { btn.classList.toggle('on', wish.has(name)); btn.textContent = wish.has(name) ? '♥' : '♡'; }
    renderBag();
  }
  $('#bagList').addEventListener('click', (e) => { const i = e.target.dataset.rm; if (i != null) { bag.splice(+i, 1); renderBag(); } });
  const drawer = $('#drawer');
  const openDrawer = (open) => { drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', !open); };
  $('#bagBtn').addEventListener('click', () => openDrawer(true));
  $('#wishBtn').addEventListener('click', () => toast(wish.size ? `${wish.size} piece(s) saved: ${[...wish].join(', ')}` : 'Tap ♡ on any piece to save it'));
  $('#drawerClose').addEventListener('click', () => openDrawer(false));
  drawer.addEventListener('click', (e) => { if (e.target === drawer) openDrawer(false); });
  renderBag();

  /* ---------- video playlists: plays clips part-by-part, falls back to poster ---------- */
  // one request lists every file in assets/ — no 404 noise for clips you haven't made yet
  const assetList = fetch('/api/assets').then((r) => (r.ok ? r.json() : [])).catch(() => []);
  const hasAsset = async (u) => (await assetList).includes(u.replace(/^assets\//, ''));
  async function playlist(video, urls, poster, { loop = true, autoplay = true } = {}) {
    video.poster = poster;
    const ok = [];
    for (const u of urls) if (await hasAsset(u)) ok.push(u);
    if (!ok.length) return { has: false };
    let i = 0;
    video.src = ok[0];
    if (ok.length === 1) { video.loop = loop; if (autoplay) video.play().catch(() => {}); return { has: true }; } // one file: native seamless loop
    video.addEventListener('ended', () => {
      if (!loop && i === ok.length - 1) return;
      i = (i + 1) % ok.length; video.src = ok[i]; video.play().catch(() => {});
    });
    if (autoplay) video.play().catch(() => {});
    return { has: true };
  }
  // The hero sequence owns playback: load its film only after the frames are resolved.
  playlist($('#filmVideo'), D.film.videos, D.film.posterImg || D.photo(D.film.poster, 1600, 900), { autoplay: false });
  $('#filmSound').addEventListener('click', (e) => {
    const v = $('#filmVideo');
    v.muted = !v.muted;
    const btn = e.currentTarget;
    btn.textContent = v.muted ? 'Sound off' : 'Sound on';
    // if the browser refuses sound, fall back to muted rather than leaving the film paused
    if (!v.muted) v.play().catch(() => { v.muted = true; btn.textContent = 'Sound off'; v.play().catch(() => {}); });
  });

  /* ---------- build sections ---------- */
  $('#gopurams').innerHTML = D.moods.map((m, i) => `
    <button class="mood${i === 0 ? ' on' : ''}" data-i="${i}" aria-label="${m.name}">
      <img alt="${m.name}" data-local="mood-0${i + 1}" src="${src(m, 900, 1200)}">
      <i class="mood-shade"></i>
      <span class="mood-no">0${i + 1}</span>
      <span class="mood-spine">${m.name}</span>
      <span class="mood-copy"><b>${m.name}</b><span class="ta">${m.ta}</span></span>
    </button>`).join('');

  $('#lookTrack').innerHTML = D.looks.map((l, i) => `
    <figure class="model" data-i="${i}"><img alt="${l.name} — styled saree look" data-local="look-0${i + 1}" data-cutout="1" src="${src(l, 520, 860)}"></figure>`).join('');

  $('#fan').innerHTML = D.silks.map((s, i) => `
    <article class="silk-card" data-i="${i}" style="--c:${s.color}">
      <div class="sc-inner">
        <h3 class="sc-title">${s.title}</h3>
        <img class="sc-model" alt="${s.title} silk saree" data-local="silk-0${i + 1}" data-cutout="1" src="${src(s, 560, 760)}">
        <button class="sc-heart" aria-label="Save ${s.title}">♡</button>
        <div class="sc-foot"><span>${s.sub}</span><button class="sc-plus" aria-label="Add ${s.title} to enquiry">+</button></div>
        <i class="ripple"></i>
      </div>
    </article>`).join('');

  const counts = (f) => (f === 'All pieces' ? D.rack.length : D.rack.filter((r) => r.cat === f).length);
  $('#chips').innerHTML = D.rackFilters.map((f, i) => `<button class="chip${i ? '' : ' on'}" data-f="${f}">${f} <small>${counts(f)}</small></button>`).join('');
  $('#rail').innerHTML = D.rack.map((r, i) => `
    <button class="hanger" data-i="${i}" data-cat="${r.cat}" aria-label="${r.name}">
      <svg class="hook" viewBox="0 0 200 60" aria-hidden="true"><path d="M100 4a10 10 0 1 1 10 10v12M20 56Q100 18 180 56" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>
      <span class="garm"><img alt="" data-local="rack-${String(i + 1).padStart(2, '0')}" data-cutout="1" src="${src(r, 420, 560)}"></span>
    </button>`).join('');

  const colImgs = (ids) => [...ids, ...ids].map((id) => `<img alt="" src="${D.photo(id, 360, 480)}">`).join('');
  if ($('#colA')) $('#colA').innerHTML = `<div class="col-track">${colImgs(D.film.colA)}</div>`;
  if ($('#colB')) $('#colB').innerHTML = `<div class="col-track">${colImgs(D.film.colB)}</div>`;

  // three copies of the five reels make a fuller arc; scroll travels the middle copy
  const REEL_COPIES = 3;
  $('#reelArc').innerHTML = Array.from({ length: REEL_COPIES }, () => D.reels).flat().map((r, k) => ({ r, i: k % D.reels.length })).map(({ r, i }) => `
    <figure class="reel" data-i="${i}">
      <video muted playsinline loop preload="none" poster="${r.poster || src(r, 540, 960)}" data-src="${r.video}"></video>
      <div class="reel-top"><span>REEL 0${i + 1}</span><span>0:10</span></div>
      <figcaption><small>${r.fabric}</small><b>${r.title}</b><span>📍 ${r.place}</span></figcaption>
      <button class="reel-play" aria-label="Play ${r.title}">▶</button>
      <i class="reel-bar"><i></i></i>
    </figure>`).join('');

  if ($('#arc')) $('#arc').innerHTML = D.bridal.map((b, i) => `
    <figure class="arc-card" data-i="${i}">${b.tag ? `<span class="tag">${b.tag}</span>` : ''}<img alt="${b.name} bridal look" data-local="bridal-0${i + 1}" src="${src(b, 560, 780)}"></figure>`).join('');

  /* ---------- your own images: assets/products/<name>.png|jpg|webp replace the stock photo ---------- */
  assetList.then((files) => {
    const map = {};
    files.forEach((f) => { const m = f.match(/^products\/([^/]+)\.(png|jpe?g|webp)$/i); if (m) map[m[1].toLowerCase()] = `assets/${f}`; });
    $$('img[data-local]').forEach((im) => {
      const p = map[im.dataset.local]; if (!p) return;
      im.src = p;
      if (im.dataset.cutout && /\.(png|webp)$/i.test(p)) { im.classList.add('cutout'); im.closest('.model, .garm')?.classList.add('cutout'); }
    });
    D.rack.forEach((r, i) => { const p = map[`rack-${String(i + 1).padStart(2, '0')}`]; if (p) r.localImg = p; });
    D.looks.forEach((l, i) => { l.localImg = map[`look-0${i + 1}`]; });
    D.silks.forEach((s, i) => { s.localImg = map[`silk-0${i + 1}`]; });
    D.bridal.forEach((b, i) => { b.localImg = map[`bridal-0${i + 1}`]; });
    const hero = map['hero-showroom']; if (hero) $('#heroVideo').poster = hero;
    // film side columns: use the generated mood + bridal portraits so the style stays consistent
    const moodsL = D.moods.map((m, i) => map[`mood-0${i + 1}`]).filter(Boolean);
    const bridalL = D.bridal.map((b) => b.localImg).filter(Boolean);
    const col = (list) => `<div class="col-track">${[...list, ...list].map((p) => `<img alt="" src="${p}">`).join('')}</div>`;
    if (moodsL.length >= 4 && $('#colA')) $('#colA').innerHTML = col(moodsL);
    if (bridalL.length >= 4 && $('#colB')) $('#colB').innerHTML = col(bridalL);
    dispatchEvent(new Event('og-local'));
  }).catch(() => { /* opened from file:// — stock photos stay */ });

  /* ---------- nav ---------- */
  const menuBtn = $('.nav-menu');
  menuBtn.addEventListener('click', () => { const o = document.body.classList.toggle('menu-open'); menuBtn.setAttribute('aria-expanded', o); });
  $$('.nav nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* ---------- tilt ---------- */
  function tilt(el, target = el, amt = 12) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      target.style.setProperty('--ry', `${x * amt}deg`);
      target.style.setProperty('--rx', `${-y * amt}deg`);
      target.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      target.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    });
    el.addEventListener('pointerleave', () => { target.style.setProperty('--ry', '0deg'); target.style.setProperty('--rx', '0deg'); });
  }
  $$('.tilt').forEach((el) => tilt(el, el, 10));

  /* ---------- Pick a Silk card actions ---------- */
  $$('.silk-card').forEach((card) => {
    const inner = card.querySelector('.sc-inner');
    const s = D.silks[+card.dataset.i];
    tilt(card, inner, 16);
    inner.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      const r = inner.getBoundingClientRect();
      const rip = inner.querySelector('.ripple');
      rip.style.left = `${e.clientX - r.left}px`; rip.style.top = `${e.clientY - r.top}px`;
      rip.classList.remove('go'); void rip.offsetWidth; rip.classList.add('go');
    });
    card.querySelector('.sc-plus').addEventListener('click', () => addToBag({ name: `${s.title} silk saree`, note: s.sub, thumb: s.localImg || src(s, 120, 120) }));
    const h = card.querySelector('.sc-heart');
    if (wish.has(s.title)) { h.classList.add('on'); h.textContent = '♥'; }
    h.addEventListener('click', () => toggleWish(s.title, h));
  });

  /* ---------- The Rack: filter, hover, detail ---------- */
  let filter = 'All pieces';
  const visible = () => D.rack.map((r, i) => i).filter((i) => filter === 'All pieces' || D.rack[i].cat === filter);
  const hangers = $$('.hanger');
  $('#chips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    filter = c.dataset.f;
    $$('.chip').forEach((x) => x.classList.toggle('on', x === c));
    $('#rackTotal').textContent = visible().length;
    if (window.__rackRelayout) window.__rackRelayout();
    else hangers.forEach((h) => (h.hidden = !visible().includes(+h.dataset.i)));
  });
  hangers.forEach((h) => {
    const r = D.rack[+h.dataset.i];
    h.addEventListener('mouseenter', () => { $('#rackHover').innerHTML = `<b>${r.name}</b> · ${r.fabric}`; });
    h.addEventListener('focus', () => { $('#rackHover').innerHTML = `<b>${r.name}</b> · ${r.fabric}`; });
    h.addEventListener('click', () => openDetail(+h.dataset.i));
  });
  $('#rail').addEventListener('mouseleave', () => { if (window.__rackFront) window.__rackFront(); });

  const detail = $('#detail');
  let dIndex = 0;
  function fillDetail(i) {
    dIndex = i;
    const r = D.rack[i];
    $('#dImg').src = r.localImg || src(r, 700, 940);
    $('#dImg').classList.toggle('cutout', !!r.localImg && /\.(png|webp)$/i.test(r.localImg));
    $('#dImg').alt = r.name;
    $('#dCat').textContent = r.cat.toUpperCase();
    $('#dName').textContent = r.name;
    $('#dFabric').textContent = r.fabric;
    $('#dSizes').innerHTML = r.size.split('·').map((s, k) => `<button class="size${k === 0 ? ' on' : ''}">${s.trim()}</button>`).join('');
    $('#dAvail').href = wa(`Hello OG India, is "${r.name}" (${r.cat}) available in wholesale?`);
    const w = $('#dWish'); w.classList.toggle('on', wish.has(r.name)); w.textContent = wish.has(r.name) ? '♥' : '♡';
    $$('.toggle button').forEach((b, k) => b.classList.toggle('on', k === 0));
    detail.classList.remove('zoom');
  }
  function openDetail(i) {
    fillDetail(i);
    const from = hangers[i].getBoundingClientRect();
    detail.classList.add('open');
    detail.setAttribute('aria-hidden', 'false');
    if (window.gsap) {
      const to = $('.detail-hanger').getBoundingClientRect();
      gsap.fromTo('.detail-hanger', { x: from.left - to.left, y: from.top - to.top, scale: from.width / to.width, rotate: -6 },
        { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.7, ease: 'expo.out' });
      gsap.fromTo('.detail-info > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.04, delay: 0.2 });
    }
    $('#dClose').focus();
  }
  const closeDetail = () => { detail.classList.remove('open'); detail.setAttribute('aria-hidden', 'true'); };
  const stepDetail = (d) => { const v = visible(); const k = v.indexOf(dIndex); fillDetail(v[(k + d + v.length) % v.length]);
    window.gsap && gsap.fromTo('.detail-hanger', { x: d * 80, opacity: 0, rotate: d * 6 }, { x: 0, opacity: 1, rotate: 0, duration: 0.5, ease: 'power3.out' }); };
  $('#dClose').addEventListener('click', closeDetail);
  $('.detail-blur').addEventListener('click', closeDetail);
  $('#dPrev').addEventListener('click', () => stepDetail(-1));
  $('#dNext').addEventListener('click', () => stepDetail(1));
  $('#dSizes').addEventListener('click', (e) => { const b = e.target.closest('.size'); if (!b) return; $$('.size').forEach((x) => x.classList.toggle('on', x === b)); });
  $$('.toggle button').forEach((b) => b.addEventListener('click', () => { $$('.toggle button').forEach((x) => x.classList.toggle('on', x === b)); detail.classList.toggle('zoom', b.dataset.view === 'close'); }));
  $('#dAdd').addEventListener('click', () => { const r = D.rack[dIndex]; addToBag({ name: r.name, note: `${r.cat} · ${$('.size.on')?.textContent || ''}`, thumb: r.localImg || src(r, 120, 120) }); });
  $('#dWish').addEventListener('click', (e) => toggleWish(D.rack[dIndex].name, e.currentTarget));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDetail(); openDrawer(false); }
    if (detail.classList.contains('open') && e.key === 'ArrowRight') stepDetail(1);
    if (detail.classList.contains('open') && e.key === 'ArrowLeft') stepDetail(-1);
  });

  if (!window.gsap || !window.ScrollTrigger) { document.documentElement.classList.add('no-motion'); return; }
  gsap.registerPlugin(ScrollTrigger);
  const mobile = () => innerWidth < 760;
  const goTo = (st, idx, n) => scrollTo({ top: st.start + (st.end - st.start) * (idx / (n - 1)) + 2, behavior: 'smooth' });

  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => ($('.progress i').style.transform = `scaleX(${s.progress})`) });

  /* ---------- 1 · Hero: photo-first zoom sequence (up to 7 frames from D.scenes, then the film rolls) ---------- */
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = (name) => `assets/products/${name}.webp`;
  const SEQ = { clip: null, seekTo: 0, n: 0 };

  // motion blur that follows scroll speed (like the reference's camera move)
  let mblur = 0, mblurTarget = 0, mblurLast = '';
  const updateBlur = () => {
    mblur += (mblurTarget - mblur) * 0.15; mblurTarget *= 0.88;
    if (mblur < 0.05 && mblurTarget < 0.05) mblur = mblurTarget = 0;
    const value = `${mblur.toFixed(2)}px`;
    if (value !== mblurLast) { $('.seq-stage').style.setProperty('--mblur', value); mblurLast = value; }
  };

  const heroV = $('#heroVideo');
  let heroWantsPlayback = false;
  const setHeroPlayback = (active) => {
    const play = Boolean(active && SEQ.clip && !document.hidden && !reducedMotion);
    if (play === heroWantsPlayback) return;
    heroWantsPlayback = play;
    if (play) heroV.play().catch(() => { heroWantsPlayback = false; });
    else heroV.pause();
  };
  // while you're at the counter, keep looping the counter scene (not back to the zari close-up)
  heroV.addEventListener('timeupdate', () => {
    if (heroWantsPlayback && SEQ.seekTo && heroV.duration > SEQ.seekTo + 1 && heroV.currentTime > heroV.duration - 0.6) heroV.currentTime = SEQ.seekTo;
  });
  let heroTL;
  document.addEventListener('visibilitychange', () => {
    const st = heroTL?.scrollTrigger;
    setHeroPlayback(st?.isActive && st.progress >= 0.8);
  });

  function buildSequence(files) {
    const find = (base) => files.find((f) => new RegExp(`^products/${base}\\.(webp|jpe?g|png)$`, 'i').test(f));
    const frames = [];
    D.scenes.forEach((sc, index) => {
      const own = find(sc.file);
      const prev = frames[frames.length - 1];
      const number = String(frames.length + 1).padStart(2, '0');
      if (own) frames.push({ ...sc, number, src: `assets/${own}`, origin: '50% 50%', pos: '50% 50%', real: true });
      else if (sc.fallback === 'zoom' && prev) frames.push({ ...sc, number, src: prev.src, origin: prev.origin, pos: prev.pos, zoom: true });
      else if (sc.fallback && files.includes(sc.fallback.replace(/^assets\//, ''))) frames.push({ ...sc, number, src: sc.fallback });
    });
    if (files.includes('video/scene-final.mp4')) SEQ.clip = 'assets/video/scene-final.mp4';
    else if (files.includes('video/scene-counter.mp4')) SEQ.clip = 'assets/video/scene-counter.mp4';
    else SEQ.clip = D.hero.videos.find((url) => files.includes(url.replace(/^assets\//, ''))) || null;
    SEQ.seekTo = SEQ.clip === 'assets/video/hero-film.mp4' ? 20.5 : 0;
    SEQ.n = frames.length;

    const FILM = files.includes('video/hero-film.mp4') ? 'assets/video/hero-film.mp4' : null;
    $('#seqFrames').innerHTML = frames.map((f) => {
      const vid = FILM && f.loop && !f.real
        ? `<video class="seq-loop" muted playsinline preload="none" data-from="${f.loop[0]}" data-to="${f.loop[1]}" poster="${f.src}"></video>` : '';
      return `<div class="seq-frame" style="transform-origin:${f.origin || '50% 50%'}"><div class="seq-media" style="background-image:url('${f.src}');background-position:${f.pos || '50% 50%'}"></div>${vid}</div>`;
    }).join('');
    // only the step on screen plays its loop; the rest stay paused (light on phones)
    const loops = $$('#seqFrames .seq-frame').map((el) => el.querySelector('video.seq-loop'));
    loops.forEach((v) => {
      if (!v) return;
      v.addEventListener('timeupdate', () => { if (v.currentTime >= +v.dataset.to || v.currentTime < +v.dataset.from - 0.5) v.currentTime = +v.dataset.from; });
    });
    let activeLoop = -1;
    const playStep = (k) => {
      if (k === activeLoop) return;
      activeLoop = k;
      loops.forEach((v, i) => {
        if (!v) return;
        if (i === k) {
          if (!v.src) { v.src = `${FILM}#t=${v.dataset.from}`; v.preload = 'auto'; }
          if (v.readyState >= 1 && (v.currentTime < +v.dataset.from || v.currentTime > +v.dataset.to)) v.currentTime = +v.dataset.from;
          v.play().catch(() => {});
        } else v.pause();
      });
    };
    $('#seqCaps').innerHTML = frames.map((f) => `<div class="seq-caption"><span>${f.number}</span><b>${f.cap}</b><small>${f.sub}</small></div>`).join('');
    const els = $$('#seqFrames .seq-frame'), caps = $$('#seqCaps .seq-caption');
    gsap.set(els.slice(1), { autoAlpha: 0 });
    gsap.set(caps, { autoAlpha: 0 });
    gsap.set(['.hero-media', '#seqEnd'], { autoAlpha: 0 });
    if (reducedMotion || !frames.length) { gsap.set('#walkCue', { autoAlpha: 0 }); return; }

    if (SEQ.clip) {
      heroV.poster = frames[frames.length - 1].src;
      heroV.loop = true;
      heroV.preload = 'metadata';
      heroV.addEventListener('loadedmetadata', () => {
        if (SEQ.seekTo && heroV.duration > SEQ.seekTo + 1) heroV.currentTime = SEQ.seekTo;
      }, { once: true });
      heroV.src = SEQ.clip;
    }
    gsap.ticker.add(updateBlur);
    heroTL = gsap.timeline({
      scrollTrigger: { trigger: '#hero', refreshPriority: 10, start: 'top top', end: () => `+=${(SEQ.n + 1.5) * (mobile() ? 55 : 70)}%`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (s) => {
          const p = s.progress;
          $('#seqBar').style.transform = `scaleX(${p})`;
          mblurTarget = p > 0.04 && p < 0.8 ? Math.min(1.5, Math.abs(s.getVelocity()) / 1400) : 0;
          setHeroPlayback(s.isActive && p >= 0.8);
          playStep(s.isActive ? Math.max(0, Math.min(SEQ.n - 1, Math.floor((p - 0.03) / ((0.82 - 0.05) / SEQ.n)))) : -1);
        },
        onToggle: (s) => { setHeroPlayback(s.isActive && s.progress >= 0.8); if (!s.isActive) playStep(-1); } },
    });
    heroTL.to({}, { duration: 1 }, 0)
      .to('#walkCue', { autoAlpha: 0, duration: 0.03 }, 0.01)
      .to('.hero-copy', { autoAlpha: 0, y: -45, duration: 0.07, ease: 'power1.in' }, 0.02);
    const START = 0.05, END = 0.82, seg = (END - START) / frames.length;
    let last = 1;
    frames.forEach((f, i) => {
      const t = START + i * seg;
      let s0 = 1, s1 = 1.12, ease = 'none';
      if (i === 0) { s1 = 1.18; ease = 'power1.in'; }
      if (f.zoom) { s0 = last; s1 = last * 1.12; }
      if (f.counter) { s0 = 1; s1 = 1; }
      last = s1;
      if (i > 0) heroTL.to(els[i], { autoAlpha: 1, duration: 0.035 }, t - 0.02);
      // Keep the optical axis stable: depth comes from the images and a restrained push-in.
      heroTL.fromTo(els[i], { scale: s0 }, { scale: s1, ease, duration: seg + 0.04 }, t - 0.02);
      if (i < frames.length - 1) heroTL.to(els[i], { autoAlpha: 0, duration: 0.035 }, t + seg - 0.015);
      heroTL.to(caps[i], { autoAlpha: 1, duration: 0.025 }, t + seg * 0.15);
      if (i < frames.length - 1) heroTL.to(caps[i], { autoAlpha: 0, duration: 0.025 }, t + seg * 0.82);
    });
    if (SEQ.clip) heroTL.to('.hero-media', { autoAlpha: 1, duration: 0.05 }, 0.84);
    heroTL.to('#seqEnd', { autoAlpha: 1, duration: 0.05 }, 0.91);
    ScrollTrigger.sort();      // the hero trigger is created last but sits first on the page
    ScrollTrigger.refresh();
  }
  assetList.then(buildSequence, () => buildSequence([]));

  /* ---------- 2 · Six moods: expanding panels that open one by one in a loop ---------- */
  const moods = $$('.mood');
  let moodIdx = 0, moodTimer = null, moodHover = false;
  const openMood = (i) => { moodIdx = i; moods.forEach((m, k) => m.classList.toggle('on', k === i)); };
  const moodLoop = (on) => {
    clearInterval(moodTimer);
    if (on && !reducedMotion) moodTimer = setInterval(() => { if (!moodHover) openMood((moodIdx + 1) % moods.length); }, 3200);
  };
  moods.forEach((m, i) => {
    m.addEventListener('mouseenter', () => { moodHover = true; openMood(i); });
    m.addEventListener('mouseleave', () => { moodHover = false; });
    m.addEventListener('click', () => openMood(i));
    m.addEventListener('focus', () => openMood(i));
  });
  ScrollTrigger.create({ trigger: '#moods', start: 'top 80%', end: 'bottom 20%', onToggle: (s) => moodLoop(s.isActive) });
  gsap.fromTo('.mood', { y: 120, rotateX: -35, opacity: 0, transformOrigin: '50% 100%' }, { y: 0, rotateX: 0, opacity: 1, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '#gopurams', start: 'top 92%', end: 'top 45%', scrub: 0.8 } });

  /* ---------- 3 · Try the Look ---------- */
  const models = $$('.model');
  const lookTrack = $('#lookTrack');
  let lookIdx = -1;
  function lookPanel(i) {
    if (i === lookIdx) return;
    lookIdx = i;
    const l = D.looks[i];
    $('#lookCount').textContent = `${i + 1} of ${D.looks.length} · ${l.name}`;
    const pieces = [
      { name: `${l.name} saree`, note: l.saree, thumb: l.localImg || src(l, 140, 140) },
      { name: 'Blouse', note: l.blouse, thumb: l.localImg || D.photo(l.photo, 140, 140) + '&crop=top', top: true },
      ...D.accessories.map((a) => ({ name: a.name, note: 'Matching accessory', thumb: D.photo(a.photo, 140, 140) })),
    ];
    $('#lookItems').innerHTML = pieces.map((p, k) => `<li><img src="${p.thumb}" alt=""${p.top ? ' class="top"' : ''}><div><b>${p.name}</b><small>${p.note}</small></div><button class="heart${wish.has(p.name) ? ' on' : ''}" data-w="${k}" aria-label="Save ${p.name}">${wish.has(p.name) ? '♥' : '♡'}</button><button class="plus" data-a="${k}" aria-label="Add ${p.name}">+</button></li>`).join('');
    $('#lookItems').onclick = (e) => {
      const a = e.target.dataset.a, w = e.target.dataset.w;
      if (a != null) addToBag({ ...pieces[a], name: a === '0' ? pieces[0].name : `${pieces[a].name} (${l.name} look)` });
      if (w != null) toggleWish(pieces[w].name, e.target);
    };
    $('#lookAdd').onclick = () => addToBag({ name: `Full look: ${l.name}`, note: '10% bundle offer', thumb: l.localImg || src(l, 140, 140) });
    gsap.fromTo('#lookItems li', { opacity: 0, x: 24 }, { opacity: 1, x: 0, stagger: 0.04, duration: 0.35, overwrite: true });
  }
  addEventListener('og-local', () => { const i = Math.max(lookIdx, 0); lookIdx = -1; lookPanel(i); });
  function lookLayout(p) {
    const w = models[0].offsetWidth, vw = innerWidth;
    const centre = mobile() ? vw / 2 : vw * 0.4;
    const x = lerp(centre - w / 2, centre - w / 2 - (models.length - 1) * w, p);
    lookTrack.style.transform = `translate3d(${x}px,0,0)`;
    models.forEach((m, i) => {
      const d = (x + i * w + w / 2 - centre) / w, ad = Math.abs(d);
      m.style.transform = `translateZ(${-ad * 160}px) rotateY(${clamp(-d * 20, -45, 45)}deg) scale(${1.08 - Math.min(ad, 3) * 0.12})`;
      m.style.filter = `blur(${Math.min(ad * 3.5, 8)}px)`;
      m.style.opacity = 1 - Math.min(ad, 3) * 0.22;
      m.style.zIndex = 100 - Math.round(ad * 10);
    });
    lookPanel(clamp(Math.round(p * (models.length - 1)), 0, models.length - 1));
  }
  const lookST = ScrollTrigger.create({ trigger: '#look', start: 'top top', end: () => `+=${models.length * 50}%`, pin: true, scrub: 0.6,
    onUpdate: (s) => lookLayout(s.progress), onRefresh: (s) => lookLayout(s.progress) });
  $('#lookPrev').addEventListener('click', () => goTo(lookST, Math.max(0, lookIdx - 1), models.length));
  $('#lookNext').addEventListener('click', () => goTo(lookST, Math.min(models.length - 1, lookIdx + 1), models.length));

  /* ---------- 4 · Pick a Silk: fan rotates with scroll ---------- */
  const cards = $$('.silk-card');
  function fanLayout(p) {
    const n = cards.length, w = cards[0].offsetWidth;
    const R = Math.max(innerWidth * 1.1, 1100);
    const step = (w * (mobile() ? 0.92 : 0.78)) / R;
    const c = p * (n - 1);
    cards.forEach((el, i) => {
      const a = (i - c) * step, near = Math.max(0, 1 - Math.abs(i - c));
      el.style.transform = `translate3d(${Math.sin(a) * R}px, ${(1 - Math.cos(a)) * R}px, ${near * 60}px) rotate(${a}rad) scale(${0.9 + near * 0.14})`;
      el.style.zIndex = 50 + Math.round(near * 20) - Math.abs(i - Math.round(c));
    });
  }
  ScrollTrigger.create({ trigger: '#silks', start: 'top top', end: '+=240%', pin: true, scrub: 0.8,
    onUpdate: (s) => fanLayout(s.progress), onRefresh: (s) => fanLayout(s.progress) });
  gsap.fromTo('#fan', { y: 300, rotateX: 40 }, { y: 0, rotateX: 0, ease: 'power2.out', scrollTrigger: { trigger: '#silks', start: 'top bottom', end: 'top top', scrub: true } });

  /* ---------- 5 · Rack: a 3D rotating garment carousel — scroll turns the rail ---------- */
  const RK = { rot: 0, front: -1 };
  const ringR = () => Math.min(innerWidth * (mobile() ? 0.42 : 0.38), 620);
  function rackLayout() {
    const vis = visible(), n = vis.length, step = 360 / n, R = ringR();
    const rod = $('#ringRod');
    rod.style.width = rod.style.height = `${R * 2}px`;
    rod.style.margin = `${-R}px 0 0 ${-R}px`;
    hangers.forEach((h) => { if (!vis.includes(+h.dataset.i)) h.hidden = true; });
    vis.forEach((idx, k) => {
      const h = hangers[idx];
      h.hidden = false;
      const a = ((k * step - RK.rot) * Math.PI) / 180;
      const x = Math.sin(a) * R, z = Math.cos(a) * R, near = (z / R + 1) / 2;   // near: 0 back → 1 front
      h.style.transform = `translate3d(${x}px, 0, ${z}px)`;
      h.style.zIndex = Math.round(near * 100);
      h.style.opacity = (0.3 + near * 0.7).toFixed(3);
      h.style.filter = near > 0.97 ? 'none' : `blur(${((1 - near) * 2.4).toFixed(2)}px)`;
    });
    const fk = ((Math.round(RK.rot / step) % n) + n) % n, fi = vis[fk];
    if (fi !== RK.front) {
      RK.front = fi;
      hangers.forEach((h) => h.classList.toggle('front', +h.dataset.i === fi));
      window.__rackFront();
    }
  }
  window.__rackFront = () => { const r = D.rack[RK.front]; if (r) $('#rackHover').innerHTML = `<b>${r.name}</b> · ${r.fabric}`; };
  const rackST = ScrollTrigger.create({ trigger: '#rack', start: 'top top', end: '+=240%', pin: true, scrub: 0.8,
    onUpdate: (s) => { const n = visible().length; RK.rot = s.progress * (n - 1) * (360 / n); rackLayout(); },
    onRefresh: (s) => { const n = visible().length; RK.rot = s.progress * (n - 1) * (360 / n); rackLayout(); } });
  window.__rackRelayout = () => {
    $('#rail').classList.add('turning');                 // smooth re-spacing when a filter changes the count
    const n = visible().length; RK.rot = rackST.progress * (n - 1) * (360 / n); RK.front = -1; rackLayout();
    setTimeout(() => $('#rail').classList.remove('turning'), 700);
  };
  const rackStep = (d) => { const vis = visible(), n = vis.length; const k = vis.indexOf(RK.front); goTo(rackST, clamp(k + d, 0, n - 1), n); };
  $('#rackPrev').addEventListener('click', () => rackStep(-1));
  $('#rackNext').addEventListener('click', () => rackStep(1));
  gsap.fromTo('#carousel3d', { rotateX: -55, y: 180, autoAlpha: 0 }, { rotateX: 0, y: 0, autoAlpha: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '#rack', start: 'top bottom', end: 'top 25%', scrub: true } });
  rackLayout();

  /* ---------- 6 · Film: frame opens from a tilted card ---------- */
  gsap.fromTo('.frame', { rotateX: 35, scale: 0.8, y: 80 }, { rotateX: 0, scale: 1, y: 0, ease: 'power2.out',
    scrollTrigger: { trigger: '#film', start: 'top 85%', end: 'top 15%', scrub: 0.8 } });
  ScrollTrigger.create({ trigger: '#film', start: 'top 60%', end: 'bottom top', onEnter: () => $('#filmVideo').play().catch(() => {}), onLeave: () => $('#filmVideo').pause(), onEnterBack: () => $('#filmVideo').play().catch(() => {}) });

  /* ---------- 7 · Reels: 3D curved arc ---------- */
  const reels = $$('.reel');
  let reelIdx = -1, reelPaused = false;
  async function reelPlay(i) {
    reels.forEach((r, k) => { const v = r.querySelector('video'); if (k !== i) { v.pause(); r.classList.remove('playing'); } });
    const r = reels[i], v = r.querySelector('video');
    if (!v.dataset.checked) {
      v.dataset.checked = '1';
      if (await hasAsset(v.dataset.src)) v.src = v.dataset.src;
    }
    if (v.src && !reelPaused) { v.play().then(() => r.classList.add('playing')).catch(() => {}); }
  }
  const RN = D.reels.length, R0 = RN * Math.floor(REEL_COPIES / 2); // middle copy
  function reelLayout(p) {
    const c = R0 + p * (RN - 1);
    const w = reels[0].offsetWidth;
    reels.forEach((r, i) => {
      const d = i - c, ad = Math.abs(d);
      r.style.transform = `translateX(${d * w * (mobile() ? 0.78 : 0.86)}px) translateZ(${-ad * 260}px) rotateY(${-d * 28}deg) scale(${1 - Math.min(ad, 2) * 0.08})`;
      r.style.zIndex = 50 - Math.round(ad * 10);
      r.style.opacity = 1 - Math.min(ad, 2.5) * 0.25;
      r.classList.toggle('centre', ad < 0.5);
    });
    const idx = Math.round(c);
    if (idx !== reelIdx) { reelIdx = idx; reelPlay(idx); }
  }
  const reelST = ScrollTrigger.create({ trigger: '#reels', start: 'top top', end: '+=180%', pin: true, scrub: 0.8,
    onUpdate: (s) => reelLayout(s.progress), onRefresh: (s) => reelLayout(s.progress),
    onLeave: () => reels.forEach((r) => r.querySelector('video').pause()), onLeaveBack: () => reels.forEach((r) => r.querySelector('video').pause()) });
  $('#reelPrev').addEventListener('click', () => goTo(reelST, clamp(reelIdx - R0 - 1, 0, RN - 1), RN));
  $('#reelNext').addEventListener('click', () => goTo(reelST, clamp(reelIdx - R0 + 1, 0, RN - 1), RN));
  $('#reelPause').addEventListener('click', (e) => {
    reelPaused = !reelPaused;
    e.currentTarget.textContent = reelPaused ? '▶' : '❚❚';
    const v = reels[reelIdx].querySelector('video');
    reelPaused ? v.pause() : reelPlay(reelIdx);
  });
  reels.forEach((r, i) => {
    r.querySelector('video').addEventListener('timeupdate', (e) => { const v = e.target; r.querySelector('.reel-bar i').style.width = `${(v.currentTime / (v.duration || 10)) * 100}%`; });
    r.addEventListener('click', () => {
      if (i !== reelIdx) return goTo(reelST, clamp(i - R0, 0, RN - 1), RN);
      const v = r.querySelector('video');
      if (!v.src) return toast('This reel will play once its clip is added (see VIDEO-PROMPTS.md)');
      v.muted = false; v.play();
      (r.requestFullscreen || r.webkitRequestFullscreen || (() => {})).call(r);
    });
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) reels.forEach((r) => (r.querySelector('video').muted = true)); });

  /* ---------- 8 · Bridal arc ---------- */
  const arcCards = $$('.arc-card');
  let brIdx = -1;
  function arcLayout(p) {
    const n = arcCards.length, w = arcCards[0].offsetWidth;
    const R = Math.max(innerWidth * 0.9, 900), step = (w * 0.95) / R, c = p * (n - 1);
    arcCards.forEach((el, i) => {
      const a = (i - c) * step, near = Math.max(0, 1 - Math.abs(i - c));
      el.style.transform = `translate3d(${Math.sin(a) * R}px, ${(1 - Math.cos(a)) * R}px, ${near * 80}px) rotate(${a}rad) rotateY(${(i - c) * -12}deg) scale(${0.84 + near * 0.26})`;
      el.style.zIndex = 50 + Math.round(near * 20) - Math.abs(i - Math.round(c));
      el.style.opacity = 1 - Math.min(Math.abs(i - c), 3) * 0.18;
      el.classList.toggle('centre', near > 0.5);
    });
    const idx = Math.round(c);
    if (idx !== brIdx) {
      brIdx = idx;
      const b = D.bridal[idx];
      $('#brName').textContent = b.name;
      $('#brMeta').innerHTML = `${b.fabric} · ${b.pallu} · <b>Wholesale rate on request</b>`;
      const w2 = $('#brWish'); w2.classList.toggle('on', wish.has(b.name)); w2.textContent = wish.has(b.name) ? '♥' : '♡';
    }
  }
  const brST = ScrollTrigger.create({ trigger: '#bridal', start: 'top top', end: '+=220%', pin: true, scrub: 0.8,
    onUpdate: (s) => arcLayout(s.progress), onRefresh: (s) => arcLayout(s.progress) });
  $('#brPrev').addEventListener('click', () => goTo(brST, Math.max(0, brIdx - 1), arcCards.length));
  $('#brNext').addEventListener('click', () => goTo(brST, Math.min(arcCards.length - 1, brIdx + 1), arcCards.length));
  $('#brAdd').addEventListener('click', () => { const b = D.bridal[brIdx]; addToBag({ name: b.name, note: `Bridal · ${b.fabric}`, thumb: b.localImg || src(b, 120, 120) }); });
  $('#brWish').addEventListener('click', (e) => toggleWish(D.bridal[brIdx].name, e.currentTarget));

  /* ---------- 9 · Departments: ride the lift — doors close between floors, open on each department ---------- */
  const FL = D.floors;
  $('#liftButtons').innerHTML = FL.map((f, i) => `<button data-i="${i}" aria-label="Go to ${f.name}">${f.n}</button>`).slice().reverse().join('');
  $('#floors').innerHTML = FL.map((f, i) => `
    <article class="floor" data-i="${i}" style="--fc:${f.bg}">
      <div class="floor-copy">
        <span class="floor-no">${f.n === 'G' ? 'Ground floor' : `Floor ${f.n}`}</span>
        <h3>${f.name}</h3><p class="ta">${f.ta}</p>
        <p>${f.copy}</p>
        <div class="floor-chips">${f.chips.map((c) => `<span>${c}</span>`).join('')}</div>
        <a class="btn white" href="https://wa.me/${D.whatsapp}?text=${encodeURIComponent(`Hello OG India, please share wholesale rates for ${f.name}.`)}" target="_blank" rel="noopener">Ask ${f.name} rates <span class="arr">➜</span></a>
      </div>
      <div class="floor-stage${f.photos ? ' photos' : ''}">${(f.items || f.photos).map((n) => `<img src="${P(n)}" alt="">`).join('')}</div>
    </article>`).join('');
  const floorEls = $$('.floor'), liftBtns = $$('#liftButtons button');
  let floorIdx = -1;
  function liftLayout(p) {
    const f = p * (FL.length - 1), idx = Math.round(f), d = Math.abs(f - idx);
    const closed = clamp((d - 0.1) / 0.28, 0, 1);
    gsap.set('.ld-l', { xPercent: -100 * (1 - closed) }); gsap.set('.ld-r', { xPercent: 100 * (1 - closed) }); gsap.set('.ld-logo', { opacity: closed > 0.92 ? 1 : 0 });
    gsap.set('#floors', { y: closed * 6 * Math.sin(f * 60) });
    if (idx !== floorIdx) {
      floorIdx = idx;
      floorEls.forEach((el, i) => el.classList.toggle('on', i === idx));
      liftBtns.forEach((b) => b.classList.toggle('on', +b.dataset.i === idx));
      $('#liftNum').textContent = FL[idx].n;
      gsap.fromTo(floorEls[idx].querySelectorAll('.floor-copy > *, .floor-stage img'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, overwrite: true });
    }
  }
  const liftST = ScrollTrigger.create({ trigger: '#departments', start: 'top top', end: () => `+=${FL.length * 90}%`, pin: true, scrub: 0.6,
    onUpdate: (s) => liftLayout(s.progress), onRefresh: (s) => liftLayout(s.progress) });
  liftBtns.forEach((b) => b.addEventListener('click', () => goTo(liftST, +b.dataset.i, FL.length)));

  /* ---------- 10 · Visit + footer ---------- */
  gsap.fromTo('.visit-brand', { rotateY: -35, rotateX: 15, opacity: 0, x: -60 }, { rotateY: 0, rotateX: 0, opacity: 1, x: 0, ease: 'power2.out',
    scrollTrigger: { trigger: '#visit', start: 'top 80%', end: 'top 30%', scrub: 0.8 } });
  gsap.fromTo('.foot-band', { rotateX: 40, y: 120, transformOrigin: '50% 100%' }, { rotateX: 0, y: 0, ease: 'power2.out',
    scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'top 40%', scrub: 0.8 } });

  /* ---------- extra films: play only while on screen (saves data), load on first view ---------- */
  const inviewIO = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); }
    else v.pause();
  }), { threshold: 0.25 });
  $$('video.inview').forEach((v) => inviewIO.observe(v));

  // 360° look → lightbox
  const lightbox = $('#lightbox'), lbVideo = $('#lightboxVideo');
  const openLB = (open) => {
    lightbox.classList.toggle('open', open); lightbox.setAttribute('aria-hidden', !open);
    if (open) { lbVideo.src = 'assets/video/look-360.mp4'; lbVideo.currentTime = 0; lbVideo.play().catch(() => {}); $('#lightboxClose').focus(); }
    else lbVideo.pause();
  };
  $('#look360').addEventListener('click', () => openLB(true));
  $('#lightboxClose').addEventListener('click', () => openLB(false));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) openLB(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') openLB(false); });

  // Muhurtham film: opens from a tilted card to full width, sound toggle
  gsap.fromTo('.vow-frame', { scale: 0.8, rotateX: 14, borderRadius: 36 }, { scale: 1, rotateX: 0, borderRadius: 0, ease: 'power2.out',
    scrollTrigger: { trigger: '#vow', start: 'top 90%', end: 'top 10%', scrub: 0.8 } });
  gsap.fromTo('.vow-copy > *', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08,
    scrollTrigger: { trigger: '#vow', start: 'top 55%', end: 'top 15%', scrub: 0.8 } });
  $('#vowSound').addEventListener('click', (e) => {
    const v = $('#vowVideo'), btn = e.currentTarget;
    if (!v.src) v.src = v.dataset.src;
    v.muted = !v.muted; btn.textContent = v.muted ? 'Sound off' : 'Sound on';
    v.play().catch(() => { v.muted = true; btn.textContent = 'Sound off'; v.play().catch(() => {}); });
  });

  /* nav state — last, so measurements include every pin spacer */
  // live check: whichever section (or its pin spacer) covers the middle of the screen is highlighted in the menu
  const secs = $$('section[data-sec]'), navLinks = $$('.nav nav a');
  let navSec = '';
  const navUpdate = () => {
    const mid = innerHeight / 2;
    const hit = secs.find((sec) => {
      const box = sec.parentElement.classList.contains('pin-spacer') ? sec.parentElement : sec;
      const r = box.getBoundingClientRect();
      return r.top <= mid && r.bottom > mid;
    });
    const key = hit ? hit.dataset.sec : navSec;
    if (key !== navSec) { navSec = key; navLinks.forEach((a) => a.classList.toggle('on', a.dataset.sec === key)); }
  };
  addEventListener('scroll', navUpdate, { passive: true });
  ScrollTrigger.addEventListener('refresh', navUpdate);
  navUpdate();
  addEventListener('load', () => ScrollTrigger.refresh());
})();
