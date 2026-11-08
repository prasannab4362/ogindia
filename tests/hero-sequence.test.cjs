const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual hero orchestration with a lightweight animation/media adapter.
const main = fs.readFileSync('js/main.js', 'utf8');
const hero = main.slice(main.indexOf('  const reducedMotion ='), main.indexOf('  /* ---------- 2 · Six moods:'));
async function setup({ reduced = false, files = [], narrow = false } = {}) {
  const data = {};
  vm.runInNewContext(fs.readFileSync('js/data.js', 'utf8'), { window: data });
  const nodes = new Map();
  const listeners = {};
  const videoEvents = {};
  const video = { playCount: 0, pauseCount: 0, duration: 28, currentTime: 0,
    play() { this.playCount++; return Promise.resolve(); }, pause() { this.pauseCount++; },
    addEventListener(name, fn) { videoEvents[name] = fn; } };
  const node = (selector) => {
    if (selector === '#heroVideo') return video;
    if (!nodes.has(selector)) nodes.set(selector, { innerHTML: '', style: { setProperty(k, v) { this[k] = v; } } });
    return nodes.get(selector);
  };
  const arrays = {};
  const all = (selector) => {
    const key = selector.includes('seq-frame') ? '#seqFrames' : '#seqCaps';
    const count = (node(key).innerHTML.match(/class="seq-/g) || []).length;
    return arrays[selector] ||= Array.from({ length: count }, () => ({ style: {} }));
  };
  const timelines = [], tickers = [];
  const gsap = {
    ticker: { add(fn) { tickers.push(fn); } },
    set(target, values) { (Array.isArray(target) ? target : [target]).forEach((el) => Object.assign(typeof el === 'string' ? node(el).style : el.style, values)); },
    timeline(options) {
      const tl = { options, scrollTrigger: { ...options.scrollTrigger, isActive: true, progress: 0 }, steps: [],
        to(...args) { this.steps.push(['to', ...args]); return this; },
        fromTo(...args) { this.steps.push(['fromTo', ...args]); return this; } };
      timelines.push(tl); return tl;
    },
  };
  const document = { hidden: false, addEventListener(name, fn) { listeners[name] = fn; } };
  vm.runInNewContext(hero, { D: data.KDATA, $: node, $$: all, gsap, document,
    ScrollTrigger: { refresh() {} }, mobile: () => narrow,
    matchMedia: () => ({ matches: reduced }), assetList: Promise.resolve(files),
    globalThis: {}, console });
  await new Promise(setImmediate);
  return { timelines, tickers, node, video, videoEvents, document, listeners };
}

const fallback = ['products/hero-showroom.webp', 'video/seq-shelves.jpg', 'video/seq-counter-wide.jpg', 'video/seq-zari.jpg', 'video/counter-still.jpg'];

test('missing frames keep their original step numbers; no film leaves the last still visible', async () => {
  const h = await setup({ files: fallback });
  assert.match(h.node('#seqCaps').innerHTML, /<span>06<\/span>/);
  assert.match(h.node('#seqCaps').innerHTML, /<span>07<\/span>/);
  assert.doesNotMatch(h.node('#seqCaps').innerHTML, /<span>04<\/span>/);
  assert.equal(h.timelines.length, 1);
  assert.equal(h.timelines[0].options.scrollTrigger.end(), '+=455%');
  assert.ok(!h.timelines[0].steps.some((step) => step[1] === '.hero-media'));
  assert.equal(h.video.src, undefined);
});

test('reduced motion has one visible still, no hero pin, ticker, or video request', async () => {
  const h = await setup({ reduced: true, files: [...fallback, 'video/hero-film.mp4'] });
  assert.equal(h.timelines.length, 0);
  assert.equal(h.tickers.length, 0);
  assert.equal(h.video.src, undefined);
  assert.equal(h.node('#walkCue').style.autoAlpha, 0);
});

test('an empty asset inventory creates no empty pinned sequence', async () => {
  const h = await setup();
  assert.equal(h.timelines.length, 0);
  assert.equal(h.video.playCount, 0);
});

test('preferred ending plays at arrival and pauses on rewind, section exit and hidden tab', async () => {
  const h = await setup({ files: [...fallback, 'video/hero-film.mp4', 'video/scene-final.mp4'] });
  assert.equal(h.video.src, 'assets/video/scene-final.mp4');
  const st = h.timelines[0].scrollTrigger;
  const update = (progress, isActive = true) => { Object.assign(st, { progress, isActive }); st.onUpdate({ ...st, getVelocity: () => 0 }); };
  update(0.9); assert.equal(h.video.playCount, 1);
  update(0.92); assert.equal(h.video.playCount, 1);
  update(0.4); assert.equal(h.video.pauseCount, 1);
  update(0.9); h.document.hidden = true; h.listeners.visibilitychange();
  assert.equal(h.video.pauseCount, 2);
  h.document.hidden = false; h.listeners.visibilitychange();
  assert.equal(h.video.playCount, 3);
  st.onToggle({ isActive: false, progress: 1 }); assert.equal(h.video.pauseCount, 3);
});

test('legacy film seeks to its counter segment, blur returns to zero, narrow screens scroll less', async () => {
  const h = await setup({ narrow: true, files: [...fallback, 'video/hero-film.mp4'] });
  h.videoEvents.loadedmetadata(); assert.equal(h.video.currentTime, 20.5);
  const st = h.timelines[0].scrollTrigger;
  assert.equal(st.end(), '+=357.5%');
  st.onUpdate({ isActive: true, progress: 0.5, getVelocity: () => 2000 });
  h.tickers[0]();
  assert.notEqual(h.node('.seq-stage').style['--mblur'], '0.00px');
  for (let i = 0; i < 120; i++) h.tickers[0]();
  assert.equal(h.node('.seq-stage').style['--mblur'], '0.00px');
  assert.ok(h.timelines[0].steps.filter((step) => step[0] === 'fromTo').every((step) => step[2].rotateY === undefined));
});
