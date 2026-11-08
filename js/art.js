/* Procedural textile artwork — silk, zari borders, hangers, garments.
   Every visual here is drawn on canvas so the site works without photography.
   Swap any item for a real photo by giving it an `img` URL in js/data.js. */
window.Art = (() => {
  const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  function paisley(ctx, x, y, s, rot, fill, inner) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.bezierCurveTo(-s * 1.05, s * 0.75, -s * 0.95, -s * 0.85, 0.05 * s, -s * 0.85);
    ctx.bezierCurveTo(s * 0.55, -s * 0.85, s * 0.75, -s * 1.25, s * 0.35, -s * 1.45);
    ctx.bezierCurveTo(s * 1.15, -s * 1.1, s * 1.0, s * 0.1, s * 0.35, s * 0.55);
    ctx.bezierCurveTo(s * 0.2, s * 0.7, s * 0.1, s * 0.85, 0, s);
    const path = new Path2D();
    path.moveTo(0, s);
    path.bezierCurveTo(-s * 1.05, s * 0.75, -s * 0.95, -s * 0.85, 0.05 * s, -s * 0.85);
    path.bezierCurveTo(s * 0.55, -s * 0.85, s * 0.75, -s * 1.25, s * 0.35, -s * 1.45);
    path.bezierCurveTo(s * 1.15, -s * 1.1, s * 1.0, s * 0.1, s * 0.35, s * 0.55);
    path.bezierCurveTo(s * 0.2, s * 0.7, s * 0.1, s * 0.85, 0, s);
    // zari: translucent gold body, crisp outlines, inner rings and dotted lace
    ctx.globalAlpha = 0.28; ctx.fillStyle = fill; ctx.fill(path);
    ctx.globalAlpha = 1; ctx.lineWidth = Math.max(1, s * 0.07); ctx.strokeStyle = fill; ctx.stroke(path);
    ctx.save(); ctx.scale(0.72, 0.72); ctx.lineWidth = Math.max(1, s * 0.05); ctx.stroke(path); ctx.restore();
    ctx.save(); ctx.scale(0.45, 0.45); ctx.globalAlpha = 0.85; ctx.fill(path); ctx.restore();
    ctx.globalAlpha = 1;
    ctx.fillStyle = inner;
    ctx.beginPath(); ctx.arc(-s * 0.04, -s * 0.02, s * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = fill;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * s * 0.95 * (a > Math.PI ? 0.9 : 1) - s * 0.05, Math.sin(a) * s * 0.9 + s * 0.05, s * 0.045, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function butta(ctx, x, y, s, fill) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = fill;
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.55, s * 0.22, s * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function goldGrad(ctx, y0, y1, gold) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, shade(gold, -0.25));
    g.addColorStop(0.35, shade(gold, 0.35));
    g.addColorStop(0.6, gold);
    g.addColorStop(1, shade(gold, -0.35));
    return g;
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return `rgb(${r},${g},${b})`;
  }

  /* Temple (kovil) border band — triangles, diamonds and fine zari lines. */
  function templeBorder(ctx, x, y, w, h, gold, base, flip = false) {
    ctx.save();
    ctx.fillStyle = goldGrad(ctx, y, y + h, gold);
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = base;
    const tw = h * 0.42;
    const ty = flip ? y + h * 0.18 : y + h * 0.82;
    for (let i = x; i < x + w + tw; i += tw) {
      ctx.beginPath();
      ctx.moveTo(i, ty);
      ctx.lineTo(i + tw / 2, flip ? ty + h * 0.32 : ty - h * 0.32);
      ctx.lineTo(i + tw, ty);
      ctx.fill();
    }
    ctx.fillStyle = shade(gold, -0.45);
    const dy = y + h * 0.42;
    for (let i = x + tw / 2; i < x + w; i += tw) {
      ctx.beginPath();
      ctx.moveTo(i, dy - h * 0.1);
      ctx.lineTo(i + h * 0.08, dy);
      ctx.lineTo(i, dy + h * 0.1);
      ctx.lineTo(i - h * 0.08, dy);
      ctx.fill();
    }
    ctx.fillStyle = base;
    ctx.fillRect(x, y + h * 0.05, w, Math.max(1, h * 0.025));
    ctx.fillRect(x, y + h * 0.92, w, Math.max(1, h * 0.025));
    ctx.restore();
  }

  function weave(ctx, w, h, alpha = 0.06) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#000';
    for (let x = 0; x < w; x += 3) ctx.fillRect(x, 0, 1, h);
    ctx.fillStyle = '#fff';
    for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1);
    ctx.restore();
  }

  /* A flat silk length: body + motif + borders. Used for 3D textures and cards. */
  function silk(o = {}) {
    const w = o.w || 1024, h = o.h || 1024;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const base = o.base || '#b3121f', base2 = o.base2 || shade(base, -0.3), gold = o.gold || '#e0a93b';
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, base); g.addColorStop(0.5, base2); g.addColorStop(1, base);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    weave(ctx, w, h, 0.05);
    const r = rng(o.seed || 7);
    const motif = o.motif || 'paisley';
    const step = o.step || w / 6;
    if (motif === 'check') {
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = o.accent || gold;
      for (let x = 0; x < w; x += step) ctx.fillRect(x, 0, step * 0.12, h);
      for (let y = 0; y < h; y += step) ctx.fillRect(0, y, w, step * 0.12);
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = shade(base, 0.4);
      for (let x = step / 2; x < w; x += step) ctx.fillRect(x, 0, step * 0.05, h);
      for (let y = step / 2; y < h; y += step) ctx.fillRect(0, y, w, step * 0.05);
      ctx.globalAlpha = 1;
    } else if (motif === 'stripe') {
      for (let x = 0, i = 0; x < w; x += step * 0.5, i++) {
        ctx.fillStyle = i % 2 ? (o.accent || gold) : shade(base, 0.18);
        ctx.globalAlpha = i % 2 ? 0.75 : 0.5;
        ctx.fillRect(x, 0, step * (i % 2 ? 0.08 : 0.2), h);
      }
      ctx.globalAlpha = 1;
    } else {
      if (motif === 'paisley') {
        // fine diagonal jaal lattice behind the motifs
        ctx.save();
        ctx.globalAlpha = 0.22; ctx.strokeStyle = gold; ctx.lineWidth = Math.max(1, step * 0.012);
        for (let d = -h; d < w + h; d += step * 0.5) {
          ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d + h, h); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(d, h); ctx.lineTo(d + h, 0); ctx.stroke();
        }
        ctx.restore();
      }
      for (let y = step * 0.6, row = 0; y < h; y += step * 0.95, row++) {
        for (let x = (row % 2 ? step / 2 : 0) + step * 0.3; x < w; x += step) {
          if (motif === 'butta') butta(ctx, x, y, step * 0.16, gold);
          else paisley(ctx, x, y, step * 0.26, -0.5 + r() * 0.3, gold, base2);
        }
      }
    }
    if (o.border !== false) {
      const bh = o.borderH || h * 0.16;
      templeBorder(ctx, 0, h - bh, w, bh, gold, base2);
      if (o.topBorder) templeBorder(ctx, 0, 0, w, bh * 0.55, gold, base2, true);
    }
    return c;
  }

  /* Folded saree hanging on a wooden hanger — the "rack" piece. */
  function hanger(o = {}) {
    const w = 360, h = 640;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const fabric = silk({ w: 300, h: 480, base: o.base, base2: o.base2, gold: o.gold, motif: o.motif, seed: o.seed, step: 70, borderH: 90, accent: o.accent });
    // hook
    ctx.strokeStyle = '#8c8c8c'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(w / 2, 70); ctx.lineTo(w / 2, 40); ctx.arc(w / 2 + 16, 40, 16, Math.PI, Math.PI * 1.9); ctx.stroke();
    // wooden bar
    const wood = ctx.createLinearGradient(0, 70, 0, 100);
    wood.addColorStop(0, '#c58a4a'); wood.addColorStop(1, '#7a4a22');
    ctx.fillStyle = wood;
    ctx.beginPath();
    ctx.moveTo(w / 2, 66); ctx.quadraticCurveTo(w * 0.2, 82, 18, 112); ctx.lineTo(30, 122);
    ctx.quadraticCurveTo(w / 2, 98, w - 30, 122); ctx.lineTo(w - 18, 112); ctx.quadraticCurveTo(w * 0.8, 82, w / 2, 66);
    ctx.fill();
    // folded saree body
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(40, 104); ctx.quadraticCurveTo(w / 2, 90, w - 40, 104);
    ctx.lineTo(w - 30, h - 60); ctx.quadraticCurveTo(w / 2, h - 30, 30, h - 60); ctx.closePath();
    ctx.clip();
    ctx.drawImage(fabric, 30, 100, w - 60, h - 130);
    // pleat shading
    for (let i = 0; i < 9; i++) {
      const x = 30 + (i / 9) * (w - 60);
      const pg = ctx.createLinearGradient(x, 0, x + (w - 60) / 9, 0);
      pg.addColorStop(0, 'rgba(0,0,0,0.28)'); pg.addColorStop(0.45, 'rgba(255,255,255,0.14)'); pg.addColorStop(1, 'rgba(0,0,0,0.2)');
      ctx.fillStyle = pg;
      ctx.fillRect(x, 100, (w - 60) / 9 + 1, h);
    }
    const top = ctx.createLinearGradient(0, 100, 0, 170);
    top.addColorStop(0, 'rgba(0,0,0,0.45)'); top.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = top; ctx.fillRect(0, 100, w, 70);
    ctx.restore();
    return c.toDataURL('image/png');
  }

  /* Portrait "drape" art for arches, cards and the bridal arc. */
  function drape(o = {}) {
    const w = o.w || 600, h = o.h || 820;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, o.bg || '#f6e9d4'); bg.addColorStop(1, shade(o.bg || '#f6e9d4', -0.12));
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const fabric = silk({ w: 900, h: 900, base: o.base, base2: o.base2, gold: o.gold, motif: o.motif, seed: o.seed, step: 120, borderH: 130, accent: o.accent });
    ctx.save();
    ctx.translate(w * 0.5, h * 0.55);
    ctx.rotate(o.angle ?? -0.42);
    ctx.drawImage(fabric, -w * 0.9, -h * 0.55, w * 1.8, h * 1.1);
    ctx.restore();
    // soft folds
    for (let i = 0; i < 7; i++) {
      ctx.save();
      ctx.translate(w * (0.1 + i * 0.14), 0);
      ctx.rotate(-0.42);
      const fg = ctx.createLinearGradient(0, 0, w * 0.14, 0);
      fg.addColorStop(0, 'rgba(0,0,0,0.25)'); fg.addColorStop(0.5, 'rgba(255,255,255,0.12)'); fg.addColorStop(1, 'rgba(0,0,0,0.18)');
      ctx.fillStyle = fg; ctx.fillRect(0, -h, w * 0.14, h * 3);
      ctx.restore();
    }
    const v = ctx.createRadialGradient(w / 2, h * 0.4, w * 0.2, w / 2, h / 2, w);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(30,0,5,0.45)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
    return c.toDataURL('image/jpeg', 0.86);
  }

  /* Readymade garment silhouettes filled with fabric. */
  function garment(o = {}) {
    const w = 360, h = 460;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const fabric = silk({ w: 400, h: 500, base: o.base, base2: o.base2, gold: o.gold, motif: o.motif, seed: o.seed, step: 60, border: o.type !== 'shirt', borderH: 60, accent: o.accent });
    const pat = ctx.createPattern(fabric, 'no-repeat');
    ctx.beginPath();
    const t = o.type;
    if (t === 'shirt') {
      ctx.moveTo(130, 40); ctx.lineTo(60, 70); ctx.lineTo(10, 180); ctx.lineTo(55, 200); ctx.lineTo(85, 140);
      ctx.lineTo(85, 430); ctx.lineTo(275, 430); ctx.lineTo(275, 140); ctx.lineTo(305, 200); ctx.lineTo(350, 180);
      ctx.lineTo(300, 70); ctx.lineTo(230, 40); ctx.quadraticCurveTo(180, 70, 130, 40);
    } else if (t === 'frock') {
      ctx.moveTo(135, 40); ctx.lineTo(90, 60); ctx.lineTo(60, 120); ctx.lineTo(100, 135); ctx.lineTo(115, 170);
      ctx.lineTo(25, 430); ctx.quadraticCurveTo(180, 455, 335, 430); ctx.lineTo(245, 170); ctx.lineTo(260, 135);
      ctx.lineTo(300, 120); ctx.lineTo(270, 60); ctx.lineTo(225, 40); ctx.quadraticCurveTo(180, 75, 135, 40);
    } else if (t === 'blouse') {
      ctx.moveTo(125, 70); ctx.lineTo(55, 95); ctx.lineTo(30, 190); ctx.lineTo(85, 200); ctx.lineTo(95, 160);
      ctx.lineTo(95, 330); ctx.quadraticCurveTo(180, 350, 265, 330); ctx.lineTo(265, 160); ctx.lineTo(275, 200);
      ctx.lineTo(330, 190); ctx.lineTo(305, 95); ctx.lineTo(235, 70); ctx.quadraticCurveTo(180, 150, 125, 70);
    } else { // kurti
      ctx.moveTo(135, 30); ctx.lineTo(80, 50); ctx.lineTo(40, 200); ctx.lineTo(80, 210); ctx.lineTo(105, 120);
      ctx.lineTo(95, 445); ctx.lineTo(265, 445); ctx.lineTo(255, 120); ctx.lineTo(280, 210); ctx.lineTo(320, 200);
      ctx.lineTo(280, 50); ctx.lineTo(225, 30); ctx.quadraticCurveTo(180, 95, 135, 30);
    }
    ctx.closePath();
    ctx.save();
    ctx.shadowColor = 'rgba(60,10,20,0.35)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 14;
    ctx.fillStyle = pat; ctx.fill();
    ctx.restore();
    ctx.save(); ctx.clip();
    const sh = ctx.createLinearGradient(0, 0, w, 0);
    sh.addColorStop(0, 'rgba(0,0,0,0.25)'); sh.addColorStop(0.5, 'rgba(255,255,255,0.12)'); sh.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = sh; ctx.fillRect(0, 0, w, h);
    if (t === 'shirt') {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let y = 110; y < 420; y += 48) { ctx.beginPath(); ctx.arc(180, y, 5, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(178, 60, 4, 380);
    }
    ctx.restore();
    // clothes peg
    ctx.fillStyle = '#c89356';
    ctx.fillRect(t === 'blouse' ? 170 : 170, t === 'blouse' ? 50 : 10, 20, 40);
    return c.toDataURL('image/png');
  }

  return { silk, hanger, drape, garment, shade };
})();
