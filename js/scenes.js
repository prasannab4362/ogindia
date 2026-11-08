/* WebGL scenes (three.js r128): the flowing silk hero and the braided weave. */
window.Scenes = (() => {
  const hasGL = (() => {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  })();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hasGL) document.documentElement.classList.add('no-gl');

  function makeRenderer(canvas) {
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.outputEncoding = THREE.sRGBEncoding;
    return r;
  }

  function texFrom(canvas, renderer) {
    const t = new THREE.CanvasTexture(canvas);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  /* Visible-only render loop. */
  function loop(el, fn) {
    let on = false, id = 0;
    const tick = (t) => { fn(t / 1000); if (on) id = requestAnimationFrame(tick); };
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; id = requestAnimationFrame(tick); }
      else if (!e.isIntersecting) { on = false; cancelAnimationFrame(id); }
    }).observe(el);
  }

  /* ---------- Hero: a sheet of zari silk rippling, lifting like a curtain ---------- */
  function silkHero(canvas) {
    if (!hasGL) return { setProgress() {} };
    const renderer = makeRenderer(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const tex = texFrom(Art.silk({ w: 2048, h: 1024, base: '#c2121c', base2: '#7d0710', gold: '#f2b23e', motif: 'paisley', step: 120, borderH: 150, topBorder: true, seed: 9 }), renderer);
    tex.repeat.set(1, 1);
    const geo = new THREE.PlaneGeometry(18, 10.5, 160, 90);
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.35, side: THREE.DoubleSide });
    const cloth = new THREE.Mesh(geo, mat);
    scene.add(cloth);

    scene.add(new THREE.AmbientLight(0xffe2c4, 0.55));
    const key = new THREE.DirectionalLight(0xfff0d0, 1.1); key.position.set(-4, 5, 6); scene.add(key);
    const sheen = new THREE.PointLight(0xffc66b, 2.2, 22); sheen.position.set(2, 1, 4); scene.add(sheen);

    const pos = geo.attributes.position;
    const base = pos.array.slice();
    let progress = 0, mx = 0, my = 0;
    window.addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 15 : 9.5;
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener('resize', resize);

    loop(canvas, (t) => {
      const T = reduced ? 0 : t;
      const p = progress;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1];
        const u = (x + 9) / 18, v = (y + 5.25) / 10.5; // 0..1
        let z = Math.sin(x * 0.55 + T * 1.1) * 0.35 + Math.sin(y * 0.8 + x * 0.3 + T * 0.8) * 0.22 + Math.sin(x * 1.7 - T * 1.6) * 0.06;
        // curtain lift: bottom edge rolls up & away as you scroll
        const lift = p * p * (1 - v * 0.65);
        const curl = Math.max(0, p * 1.6 - v) * 3.2;
        z += curl * curl * 0.6 + lift * 2.4 * Math.sin(u * Math.PI);
        const ny = y + lift * 9.5;
        pos.array[i * 3 + 1] = ny;
        pos.array[i * 3 + 2] = z;
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      sheen.position.x = mx * 10; sheen.position.y = -my * 6;
      cloth.rotation.x = -my * 0.08 - p * 0.35;
      cloth.rotation.y = mx * 0.1;
      cloth.position.y = p * 1.5;
      mat.opacity = 1;
      renderer.render(scene, camera);
    });

    return { setProgress(p) { progress = p; } };
  }

  /* ---------- Weave: three silk ribbons braiding into one ---------- */
  function braid(canvas) {
    if (!hasGL) return { setProgress() {} };
    const renderer = makeRenderer(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const d = new THREE.DirectionalLight(0xffffff, 0.9); d.position.set(3, 6, 8); scene.add(d);
    const p2 = new THREE.PointLight(0xffd27a, 1.4, 30); p2.position.set(-4, -2, 6); scene.add(p2);

    const specs = [
      { base: '#b0101d', base2: '#6b0610', gold: '#f0c15a', motif: 'paisley' },
      { base: '#0e7c6b', base2: '#06493f', gold: '#e9a93c', motif: 'check', accent: '#e9a93c' },
      { base: '#6a1b9a', base2: '#3e0d5e', gold: '#f2c14e', motif: 'butta' },
    ];
    const L = 26, W = 1.25, SEG = 360;
    const ribbons = specs.map((s, k) => {
      const tex = texFrom(Art.silk({ w: 2048, h: 256, ...s, step: 120, borderH: 40, topBorder: true, seed: 400 + k }), renderer);
      const geo = new THREE.PlaneGeometry(L, W, SEG, 6);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      scene.add(m);
      return { m, geo, base: geo.attributes.position.array.slice(), phase: (k * Math.PI * 2) / 3, k };
    });

    let progress = 0;
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 26 : 14;
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener('resize', resize);

    loop(canvas, (t) => {
      const T = reduced ? 0 : t * 0.6;
      const p = progress;
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      ribbons.forEach((r) => {
        const pos = r.geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = r.base[i * 3], yl = r.base[i * 3 + 1];
          // apart: three parallel flowing ribbons → together: a tight braid
          const sep = (r.k - 1) * 2.4 * (1 - ease);
          const R = 0.15 + 1.05 * ease;
          const a = x * (0.35 + 0.35 * ease) + r.phase + T;
          const wave = Math.sin(x * 0.4 + T + r.k) * 0.5 * (1 - ease);
          const cy = sep + wave + Math.sin(a) * R;
          const cz = Math.cos(a) * R;
          const tw = a * ease + Math.sin(x * 0.3 + T) * 0.4;
          pos.array[i * 3] = x;
          pos.array[i * 3 + 1] = cy + yl * Math.cos(tw);
          pos.array[i * 3 + 2] = cz + yl * Math.sin(tw);
        }
        pos.needsUpdate = true;
        r.geo.computeVertexNormals();
        r.m.rotation.z = -0.18 + 0.18 * ease;
      });
      scene.rotation.x = 0.15 - 0.15 * ease;
      renderer.render(scene, camera);
    });

    return { setProgress(p) { progress = p; } };
  }

  return { silkHero, braid, hasGL };
})();
