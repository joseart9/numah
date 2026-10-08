/* Numah landing — interactions & motion (vanilla, no deps). */
(() => {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const illu = (img) => 'assets/illustrations/' + img + '.webp';
  const SPRING = 'cubic-bezier(.34,1.56,.64,1)';
  const DATA = window.NUMAH_LANDING;
  const TONES = ['sage', 'latte', 'cream'];
  const BURST = ['#36583c', '#c99d6b', '#c47a2c', '#8fa893', '#b4553d'];

  /* ---------- Intro ---------- */
  const ready = () => {
    document.body.classList.add('is-ready');
    document.body.classList.remove('is-loading');
    setTimeout(() => { const i = $('.intro'); i && i.remove(); }, 1300);
  };
  let seen = false;
  try { seen = sessionStorage.getItem('numah-intro') === '1'; sessionStorage.setItem('numah-intro', '1'); } catch (e) {}
  if (RM || seen) { const i = $('.intro'); i && i.remove(); ready(); }
  else {
    const minWait = new Promise(r => setTimeout(r, 750));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([Promise.all([minWait, fonts]), new Promise(r => setTimeout(r, 1600))]).then(ready);
  }

  /* ---------- Particles ---------- */
  function burstDots(x, y, n = 14, dist = 90) {
    if (RM) return;
    for (let i = 0; i < n; i++) {
      const d = document.createElement('span');
      d.className = 'spark dot';
      d.style.background = pick(BURST);
      document.body.appendChild(d);
      const a = (i / n) * Math.PI * 2 + rand(-.2, .2), r = dist * rand(.6, 1.2);
      const s = rand(.5, 1.1);
      d.animate([
        { transform: `translate(${x}px,${y}px) scale(${s})`, opacity: 1 },
        { transform: `translate(${x + Math.cos(a) * r}px,${y + Math.sin(a) * r}px) scale(0)`, opacity: .9 },
      ], { duration: rand(550, 850), easing: 'cubic-bezier(.15,.8,.3,1)' }).onfinish = () => d.remove();
    }
  }
  function burstIllus(x, y, n = 7) {
    if (RM) return;
    const pool = ['menu/latte', 'menu/concha-vainilla', 'menu/chocochip-cookie', 'menu/turkey-croissant', 'menu/matcha-latte', 'menu/espresso', 'menu/brownie', 'menu/cappuccino'];
    for (let i = 0; i < n; i++) {
      const d = document.createElement('span');
      d.className = 'spark ill';
      d.style.setProperty('--img', `url(${illu(pick(pool))})`);
      document.body.appendChild(d);
      const dx = rand(-240, 240), dy = rand(-280, -110), rot = rand(-200, 200);
      d.animate([
        { transform: `translate(${x}px,${y}px) scale(.2)`, opacity: 1 },
        { transform: `translate(${x + dx}px,${y + dy}px) rotate(${rot / 2}deg) scale(1)`, opacity: 1, offset: .38 },
        { transform: `translate(${x + dx * 1.3}px,${y + dy + 360}px) rotate(${rot}deg) scale(.6)`, opacity: 0 },
      ], { duration: rand(1100, 1500), easing: 'cubic-bezier(.25,.7,.45,1)' }).onfinish = () => d.remove();
    }
  }

  /* ---------- Hero title split ---------- */
  const title = $('[data-split]');
  if (title) {
    const text = title.textContent.trim();
    title.textContent = '';
    let ci = 0;
    text.split(' ').forEach((word, wi) => {
      if (wi) title.appendChild(document.createTextNode(' '));
      const w = document.createElement('span');
      w.className = 'w'; w.setAttribute('aria-hidden', 'true');
      [...word].forEach(ch => {
        const c = document.createElement('span');
        c.className = 'c'; c.textContent = ch; c.style.setProperty('--ci', ci++);
        w.appendChild(c);
      });
      title.appendChild(w);
    });
    const jump = (c, delay = 0) => {
      if (RM || (c._a && c._a.playState === 'running')) return;
      c._a = c.animate([
        { translate: '0 0', scale: '1' },
        { translate: '0 -.22em', scale: '1.06 .94', rotate: (Math.random() > .5 ? 8 : -8) + 'deg' },
        { translate: '0 0', scale: '1', rotate: '0deg' },
      ], { duration: 560, delay, easing: SPRING });
    };
    const chars = $$('.c', title);
    if (FINE) chars.forEach(c => c.addEventListener('pointerenter', () => jump(c)));
    title.addEventListener('click', () => chars.forEach((c, i) => jump(c, i * 40)));
  }

  /* ---------- Section heading word split ---------- */
  $$('[data-split-words]').forEach(h => {
    const words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map((w, i) => `<span class="sw" aria-hidden="true"><span style="--wi:${i}">${w}</span></span>`).join(' ');
  });

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => {
    let k = 0;
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--rd', (k++ * .08) + 's');
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: .12 });
  $$('.reveal').forEach(el => revealIO.observe(el));

  /* ---------- Header: hide on scroll, progress, active link ---------- */
  const nav = $('[data-nav]');
  const prog = $('.nav-progress span');
  const navLinks = $$('.nav-links a');
  const secIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'favoritos', 'menu', 'club', 'visitanos'].forEach(id => { const s = document.getElementById(id); s && secIO.observe(s); });

  /* ---------- Mobile menu ---------- */
  const burger = $('.nav-burger'), mnav = $('#mnav');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mnav.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('a', mnav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) setMenu(false); });

  /* ---------- Hero isotipo click ---------- */
  const isoBtn = $('.hero-iso-wrap');
  isoBtn && isoBtn.addEventListener('click', (e) => {
    const r = isoBtn.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
    if (!RM) isoBtn.animate([{ scale: '1' }, { scale: '1.22 .78' }, { scale: '.88 1.14' }, { scale: '1.04 .97' }, { scale: '1' }], { duration: 700, easing: 'ease-out' });
    burstIllus(x, y);
    burstDots(x, y, 12, 120);
  });

  /* ---------- Hero parallax (pointer + scroll) ---------- */
  const hero = $('.hero');
  const depthEls = $$('[data-depth]');
  let ptr = { x: 0, y: 0 };
  if (FINE && !RM) hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    ptr.x = (e.clientX - r.left) / r.width - .5;
    ptr.y = (e.clientY - r.top) / r.height - .5;
  });
  if (FINE) hero.addEventListener('pointerleave', () => { ptr = { x: 0, y: 0 }; });

  /* ---------- Ticker ---------- */
  const tickers = $$('[data-ticker]').map(row => {
    const track = $('.ticker-track', row);
    const unit = track.innerHTML;
    track.innerHTML = '';
    const group = document.createElement('div');
    group.style.cssText = 'display:flex;align-items:center;gap:28px;padding-right:28px;flex:none';
    group.innerHTML = unit;
    track.appendChild(group);
    while (group.offsetWidth < row.offsetWidth + 200) group.insertAdjacentHTML('beforeend', unit);
    track.appendChild(group.cloneNode(true));
    $$('img', track.lastChild).forEach(i => i.setAttribute('alt', ''));
    track.lastChild.setAttribute('aria-hidden', 'true');
    return { track, group, dir: +row.dataset.ticker, x: 0 };
  });

  /* ---------- Favoritos rail ---------- */
  const rail = $('[data-rail]');
  const favNames = [['Latte', 'Favorito'], ['Matcha Latte', 'Nuevo'], ['Mango Matcha'], ['Concha Vainilla', 'Del día'], ['Taro Milk'], ['Avocado Toast'], ['Protein Macchiato'], ['Pistachio Cake'], ['Lemon Berry']];
  const heartSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 12.6 12 20l-7.5-7.4A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 7.5 6.3z"/></svg>';
  favNames.forEach(([n, badge], i) => {
    const it = DATA.items.find(x => x.name === n);
    if (!it) return;
    const c = document.createElement('article');
    c.className = 'fcard pre';
    c.style.setProperty('--tilt', (i % 2 ? 2 : -2) + 'deg');
    c.innerHTML = `<div class="fcard-tile tone-${TONES[i % 3]}"><img src="${illu(it.img)}" alt="Ilustración de ${it.name}" width="480" height="480" loading="lazy" decoding="async">${badge ? `<span class="badge badge-cream">${badge}</span>` : ''}</div>
      <div class="fcard-body"><h3 class="fcard-name"><button class="card-hit" type="button" data-item="${it.name}" data-tone="${TONES[i % 3]}">${it.name}</button></h3><span class="fcard-desc">${it.desc}</span></div>
      <div class="fcard-foot"><span class="price">$${it.price}</span><button class="heart" type="button" aria-pressed="false" aria-label="Me gusta ${it.name}">${heartSVG}</button></div>`;
    rail.appendChild(c);
  });
  const fcards = $$('.fcard', rail);
  new IntersectionObserver((entries, io) => {
    if (!entries[0].isIntersecting) return;
    fcards.forEach((c, i) => setTimeout(() => c.classList.remove('pre'), RM ? 0 : i * 90));
    io.disconnect();
  }, { threshold: .2 }).observe(rail);

  rail.addEventListener('click', e => {
    const h = e.target.closest('.heart');
    if (!h) return;
    const on = !h.classList.contains('on');
    h.classList.toggle('on', on);
    h.setAttribute('aria-pressed', on);
    if (on) {
      const r = h.getBoundingClientRect();
      if (!RM) h.animate([{ scale: '1' }, { scale: '1.35' }, { scale: '.9' }, { scale: '1' }], { duration: 500, easing: 'ease-out' });
      burstDots(r.left + r.width / 2, r.top + r.height / 2, 10, 50);
    }
  });

  // tilt on hover (desktop)
  if (FINE && !RM) fcards.forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(800px) rotateX(${-py * 10}deg) rotateY(${px * 12}deg)`;
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });

  // drag to scroll (mouse) with momentum
  (() => {
    let down = false, moved = false, sx = 0, sl = 0, lx = 0, vx = 0, raf = 0;
    rail.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; sx = lx = e.clientX; sl = rail.scrollLeft; vx = 0;
      cancelAnimationFrame(raf);
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; rail.classList.add('dragging'); }
      if (moved) { rail.scrollLeft = sl - dx; vx = e.clientX - lx; lx = e.clientX; }
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      const glide = () => {
        vx *= .93; rail.scrollLeft -= vx;
        if (Math.abs(vx) > .4) raf = requestAnimationFrame(glide);
        else rail.classList.remove('dragging');
      };
      raf = requestAnimationFrame(glide);
    });
    rail.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  })();
  const step = () => (fcards[0] ? fcards[0].offsetWidth + 22 : 320);
  $('[data-rail-prev]').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('[data-rail-next]').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));

  /* ---------- Manifesto scrub ---------- */
  const mani = $('[data-scrub]');
  const maniSeq = [];
  if (mani) {
    const splitInto = (parent) => {
      [...parent.childNodes].forEach(node => {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span'); s.className = 'mw'; s.textContent = part;
            frag.appendChild(s); maniSeq.push(s);
          });
          parent.replaceChild(frag, node);
        } else if (node.classList && node.classList.contains('mani-pic')) {
          maniSeq.push(node);
        } else if (node.nodeType === 1) splitInto(node);
      });
    };
    splitInto(mani);
    new IntersectionObserver((e, io) => {
      if (!e[0].isIntersecting) return;
      $$('[data-img]', mani).forEach(p => p.style.setProperty('--img', `url(${p.dataset.img})`));
      io.disconnect();
    }, { rootMargin: '300px' }).observe(mani);
  }

  /* ---------- Antojo shuffle ---------- */
  const pool = DATA.items.filter(i => i.cat !== 'Extras');
  const slot = $('.slot'), slotTile = $('[data-slot-tile]'), slotImg = $('[data-slot-img]');
  const shuffleBtn = $('[data-shuffle]');
  let rolling = false, cur = pool.find(i => i.name === 'Latte');
  const preload = () => pool.forEach(i => { const im = new Image(); im.src = illu(i.img); });
  new IntersectionObserver((e, io) => { if (e[0].isIntersecting) { preload(); io.disconnect(); } }, { rootMargin: '400px' }).observe(slot);
  const setTone = (k) => { slotTile.style.background = ['var(--green-100)', 'var(--latte-300)', 'var(--cream-100)', 'var(--croissant-200)'][k % 4]; };
  shuffleBtn.addEventListener('click', () => {
    if (rolling) return;
    rolling = true; slot.classList.add('rolling'); shuffleBtn.classList.add('spinning');
    let n = 0, delay = 55;
    const total = RM ? 1 : 16;
    const tick = () => {
      let next; do { next = pick(pool); } while (next === cur);
      cur = next; slotImg.src = illu(cur.img); setTone(n);
      if (!RM) slotImg.animate([{ transform: 'scale(.7) rotate(-10deg)' }, { transform: 'none' }], { duration: Math.min(delay * 2, 380), easing: SPRING });
      if (++n < total) { delay *= 1.17; setTimeout(tick, delay); return; }
      // landed
      $('[data-slot-cat]').textContent = cur.cat;
      $('[data-slot-name]').textContent = cur.name;
      $('[data-slot-desc]').textContent = cur.desc;
      $('[data-slot-price]').textContent = '$' + cur.price;
      $('[data-slot-more]').dataset.item = cur.name;
      slot.classList.remove('rolling'); shuffleBtn.classList.remove('spinning');
      if (!RM) slotTile.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06,.94)' }, { transform: 'scale(.97,1.03)' }, { transform: 'none' }], { duration: 600, easing: 'ease-out' });
      const r = slotTile.getBoundingClientRect();
      burstDots(r.left + r.width / 2, r.top + r.height / 2, 18, Math.min(r.width * .55, 200));
      rolling = false;
    };
    tick();
  });

  /* ---------- Menu tabs & grid ---------- */
  const tabs = $('[data-tabs]'), ind = $('.tabs-ind', tabs), grid = $('[data-menu-grid]');
  let activeCat = 'Latte', swapping = false;
  DATA.cats.forEach(cat => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'tab'; b.role = 'tab'; b.textContent = cat;
    b.setAttribute('aria-selected', cat === activeCat);
    b.addEventListener('click', () => selectCat(cat));
    tabs.appendChild(b);
  });
  const moveInd = (smooth = true) => {
    const b = $$('.tab', tabs).find(t => t.textContent === activeCat);
    if (!b) return;
    if (!smooth) ind.style.transition = 'none';
    ind.style.width = b.offsetWidth + 'px';
    ind.style.transform = `translateX(${b.offsetLeft}px)`;
    if (!smooth) { ind.offsetWidth; ind.style.transition = ''; }
    if (tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: b.offsetLeft - tabs.clientWidth / 2 + b.offsetWidth / 2, behavior: smooth ? 'smooth' : 'auto' });
  };
  const renderGrid = () => {
    const list = DATA.items.filter(i => i.cat === activeCat);
    grid.setAttribute('aria-label', activeCat);
    grid.innerHTML = list.map((it, i) => `<article class="mcard" style="--ci:${i};--cr:${i % 2 ? -5 : 5}deg">
      <div class="mcard-tile tone-${TONES[i % 3]}"><img src="${illu(it.img)}" alt="Ilustración de ${it.name}" width="480" height="480" loading="lazy" decoding="async"></div>
      <div class="mcard-body"><h3 class="mcard-name"><button class="card-hit" type="button" data-item="${it.name}" data-tone="${TONES[i % 3]}">${it.name}</button></h3><span class="mcard-desc">${it.desc}</span></div>
      <span class="price">$${it.price}</span></article>`).join('');
  };
  function selectCat(cat) {
    if (cat === activeCat || swapping) return;
    activeCat = cat;
    $$('.tab', tabs).forEach(t => t.setAttribute('aria-selected', t.textContent === cat));
    moveInd();
    const old = $$('.mcard', grid);
    if (RM || !old.length) { renderGrid(); return; }
    swapping = true;
    grid.style.minHeight = grid.offsetHeight + 'px';
    old.forEach(c => c.classList.add('out'));
    setTimeout(() => { renderGrid(); swapping = false; setTimeout(() => { grid.style.minHeight = ''; }, 500); }, 260);
  }
  renderGrid();
  requestAnimationFrame(() => moveInd(false));
  window.addEventListener('resize', () => moveInd(false));
  document.fonts && document.fonts.ready.then(() => moveInd(false));

  /* ---------- Club stamps ---------- */
  const stampsEl = $('[data-stamps]'), card = $('[data-stampcard]'), countEl = $('[data-stamp-count]'), noteEl = $('.club-note span');
  const WORDS = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez'];
  const iso = 'assets/logo/numah-isotipo-cream.webp';
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('button');
    s.type = 'button';
    s.className = 'stamp' + (i === 9 ? ' free' : '');
    s.setAttribute('aria-label', i === 9 ? 'Sello 10, café gratis' : 'Sello ' + (i + 1));
    s.innerHTML = (i === 9 ? '<span>gratis</span>' : '') + `<span class="ink"><img src="${iso}" alt="" loading="lazy"></span>`;
    stampsEl.appendChild(s);
  }
  const stamps = $$('.stamp', stampsEl);
  let count = 0;
  const renderCount = () => {
    countEl.textContent = count;
    countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
    const left = 10 - count;
    noteEl.textContent = left === 0 ? 'Listo, este va por nuestra cuenta.' : `${WORDS[left]} más y tu café va por nuestra cuenta.`;
  };
  const addStamp = () => {
    if (count >= 10) {
      count = 0; stamps.forEach(s => s.classList.remove('on')); renderCount(); return;
    }
    const s = stamps[count++];
    s.classList.add('on');
    renderCount();
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    if (count === 10) {
      card.classList.add('done');
      setTimeout(() => card.classList.remove('done'), 1000);
      const r = s.getBoundingClientRect();
      burstDots(r.left + r.width / 2, r.top + r.height / 2, 22, 140);
      burstIllus(r.left + r.width / 2, r.top + r.height / 2, 5);
    }
  };
  card.addEventListener('click', addStamp);
  new IntersectionObserver((e, io) => {
    if (!e[0].isIntersecting) return;
    io.disconnect();
    for (let i = 0; i < 7; i++) setTimeout(addStamp, RM ? 0 : 500 + i * 180);
  }, { threshold: .5 }).observe(card);

  /* ---------- Item detail (dialog on desktop, bottom sheet on mobile) ---------- */
  const sheet = $('[data-sheet]'), sheetCard = $('.sheet-card', sheet), sheetBody = $('[data-sheet-body]', sheet);
  const sheetArt = $('[data-sheet-art]', sheet), sheetImg = $('[data-sheet-img]', sheet);
  const TONE_BG = { sage: 'var(--green-100)', latte: 'var(--latte-300)', cream: 'var(--cream-100)' };
  const isSheet = () => window.matchMedia('(max-width: 760px)').matches;
  let sheetItem = null, sheetSize = 0, lastFocus = null, closeTimer = 0;

  const priceOf = () => sheetItem.price + (sheetItem.sizes ? sheetItem.sizes[sheetSize][1] : 0);
  function renderSheet() {
    const it = sheetItem;
    let k = 0;
    const K = () => `style="--k:${k++}"`;
    const extras = DATA.items.filter(i => i.cat === 'Extras');
    sheetBody.innerHTML = `
      <div class="sheet-head" ${K()}><span class="overline">${it.cat}</span><h2 class="sheet-title" id="sheet-title">${it.name}</h2></div>
      <p class="sheet-desc" ${K()}>${it.desc}</p>
      ${it.temp ? `<div class="sheet-row" ${K()}>${it.temp.map(t => `<span class="badge badge-brand">${t}</span>`).join('')}</div>` : ''}
      ${it.profile ? `<div class="sheet-profile" ${K()}>${it.profile.map(([v, l]) => `<span class="sp-label">${l}</span><span class="sp-bar" role="meter" aria-label="${l}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><i style="--v:${v}%"></i></span>`).join('')}</div>` : ''}
      ${it.ingredients ? `<div class="sheet-row" ${K()}>${it.ingredients.map((g, gi) => `<span class="pill" style="--g:${gi}">${g}</span>`).join('')}</div>` : ''}
      ${it.sizes ? `<div class="sheet-sizes" ${K()}><span class="sheet-label">Tamaño</span>
        <div class="seg" role="radiogroup" aria-label="Tamaño"><span class="seg-ind" aria-hidden="true"></span>
        ${it.sizes.map((z, zi) => `<button type="button" role="radio" class="seg-btn" data-size="${zi}" aria-checked="${zi === sheetSize}">${z[0]}</button>`).join('')}</div></div>` : ''}
      ${it.drink ? `<div class="sheet-extras" ${K()}><span class="sheet-label">Extras Numah</span>
        ${extras.map(x => `<div class="sx-row"><span>${x.name}</span><b>+$${x.price}</b></div>`).join('')}</div>` : ''}
      <div class="sheet-foot" ${K()}><span class="sheet-note">Pídelo en barra</span><span class="sheet-price" data-sheet-price>$${priceOf()}</span></div>`;
  }
  function moveSeg(smooth = true) {
    const seg = $('.seg', sheetBody);
    if (!seg) return;
    const b = $$('.seg-btn', seg)[sheetSize], ind = $('.seg-ind', seg);
    if (!smooth) ind.style.transition = 'none';
    ind.style.width = b.offsetWidth + 'px';
    ind.style.transform = `translateX(${b.offsetLeft}px)`;
    if (!smooth) { ind.offsetWidth; ind.style.transition = ''; }
  }
  sheetBody.addEventListener('click', e => {
    const b = e.target.closest('.seg-btn');
    if (!b || +b.dataset.size === sheetSize) return;
    sheetSize = +b.dataset.size;
    $$('.seg-btn', sheetBody).forEach(x => x.setAttribute('aria-checked', +x.dataset.size === sheetSize));
    moveSeg();
    const p = $('[data-sheet-price]', sheetBody);
    p.textContent = '$' + priceOf();
    if (!RM) p.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3) rotate(-4deg)' }, { transform: 'scale(1)' }], { duration: 450, easing: SPRING });
  });

  function openItem(name, origin, tone) {
    const it = DATA.items.find(i => i.name === name);
    if (!it) return;
    clearTimeout(closeTimer);
    sheetItem = it;
    sheetSize = it.sizes ? Math.min(1, it.sizes.length - 1) : 0;
    lastFocus = document.activeElement;
    sheetImg.src = illu(it.img);
    sheetImg.alt = 'Ilustración de ' + it.name;
    sheetArt.style.background = TONE_BG[tone] || TONE_BG.sage;
    renderSheet();
    // grow out of the clicked card (desktop)
    if (origin && !isSheet()) {
      const r = origin.getBoundingClientRect();
      sheetCard.style.setProperty('--ox', (r.left + r.width / 2 - window.innerWidth / 2).toFixed(0) + 'px');
      sheetCard.style.setProperty('--oy', (r.top + r.height / 2 - window.innerHeight / 2).toFixed(0) + 'px');
    } else { sheetCard.style.setProperty('--ox', '0px'); sheetCard.style.setProperty('--oy', '0px'); }
    sheetCard.style.translate = '';
    sheet.hidden = false;
    document.body.classList.add('is-locked');
    sheetCard.scrollTop = 0; sheetBody.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      sheet.classList.add('open');
      moveSeg(false);
      $('.sheet-x', sheet).focus({ preventScroll: true });
    }));
  }
  function closeItem() {
    if (sheet.hidden || !sheet.classList.contains('open')) return;
    sheet.classList.remove('open');
    document.body.classList.remove('is-locked');
    closeTimer = setTimeout(() => { sheet.hidden = true; sheetCard.style.translate = ''; }, RM ? 0 : 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-item]');
    if (!b) return;
    const card = b.closest('.fcard, .mcard, .slot');
    openItem(b.dataset.item, card, b.dataset.tone || (card && card.classList.contains('slot') ? null : 'sage'));
  });
  $$('[data-sheet-close]', sheet).forEach(el => el.addEventListener('click', closeItem));
  window.addEventListener('keydown', e => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { e.stopPropagation(); closeItem(); return; }
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = $$('button, [href], [tabindex]:not([tabindex="-1"])', sheetCard).filter(x => !x.disabled && x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  }, true);
  window.addEventListener('resize', () => { if (!sheet.hidden) moveSeg(false); });

  // swipe down to close (mobile sheet): drag the illustration area / handle
  (() => {
    let sy = 0, dy = 0, drag = false;
    sheetArt.addEventListener('pointerdown', e => {
      if (!isSheet() || e.target.closest('button')) return;
      drag = true; sy = e.clientY; dy = 0;
      sheetCard.classList.add('dragging');
      sheetArt.setPointerCapture(e.pointerId);
    });
    sheetArt.addEventListener('pointermove', e => {
      if (!drag) return;
      dy = Math.max(0, e.clientY - sy);
      sheetCard.style.translate = `0 ${dy}px`;
    });
    const end = () => {
      if (!drag) return;
      drag = false;
      sheetCard.classList.remove('dragging');
      if (dy > 110) closeItem(); else sheetCard.style.translate = '';
    };
    sheetArt.addEventListener('pointerup', end);
    sheetArt.addEventListener('pointercancel', end);
  })();

  /* ---------- Mobile sticky CTA ---------- */
  const mcta = $('.mcta'), menuSec = $('#menu'), foot = $('.foot');

  /* ---------- Cursor follower ---------- */
  const cur$ = $('.cursor'), curLabel = $('.cursor-label');
  let cx = -100, cy = -100, tx = -100, ty = -100;
  if (FINE && !RM) {
    window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur$.classList.add('on'); }, { passive: true });
    document.addEventListener('pointerleave', () => cur$.classList.remove('on'));
    document.addEventListener('pointerover', e => {
      const t = e.target;
      const lab = t.closest('[data-cursor]');
      const link = t.closest('a, button');
      cur$.classList.toggle('big', !!lab && !link);
      curLabel.textContent = lab && !link ? lab.dataset.cursor : '';
      cur$.classList.toggle('link', !!link);
      cur$.classList.toggle('on-dark', !!t.closest('.hero, .menu, .foot, .mnav, .r1'));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (FINE && !RM) $$('[data-magnet]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * .22}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });

  /* ---------- Main loop: scroll-linked motion ---------- */
  const badge = $('.hero-badge');
  const badgeAnim = () => badge && badge.getAnimations && badge.getAnimations()[0];
  const footWord = $('.foot-word');
  let lastY = window.scrollY, vel = 0, lastT = performance.now(), navHidden = false, sdir = 1;
  const pp = { x: 0, y: 0 };

  function frame(now) {
    const dt = Math.min(64, now - lastT) / 1000; lastT = now;
    const y = window.scrollY, vh = window.innerHeight;
    const dy = y - lastY; lastY = y;
    vel += (dy - vel) * .2;
    if (Math.abs(dy) > .5) sdir = dy > 0 ? 1 : -1;

    // header
    const max = document.documentElement.scrollHeight - vh;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const hide = y > 240 && vel > 1.2 && !document.body.classList.contains('menu-open');
    const show = vel < -1.2 || y < 120;
    if (hide && !navHidden) { nav.classList.add('is-hidden'); navHidden = true; }
    else if (show && navHidden) { nav.classList.remove('is-hidden'); navHidden = false; }

    if (!RM) {
      // hero parallax
      const hh = hero.offsetHeight;
      if (y < hh) {
        pp.x += (ptr.x - pp.x) * .08; pp.y += (ptr.y - pp.y) * .08;
        depthEls.forEach(el => {
          const d = +el.dataset.depth;
          el.style.setProperty('--px', (pp.x * d * 50).toFixed(2) + 'px');
          el.style.setProperty('--py', (pp.y * d * 50 - y * d * .18).toFixed(2) + 'px');
        });
      }
      const a = badgeAnim();
      if (a) a.playbackRate = 1 + Math.min(Math.abs(vel) * .35, 8);

      // tickers
      tickers.forEach(t => {
        const speed = (50 + Math.min(Math.abs(vel) * 18, 900)) * t.dir * sdir;
        t.x -= speed * dt;
        const w = t.group.offsetWidth;
        if (t.x <= -w) t.x += w; else if (t.x > 0) t.x -= w;
        t.track.style.transform = `translate3d(${t.x.toFixed(1)}px,0,0)`;
      });

      // cursor
      if (FINE) { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur$.style.transform = `translate3d(${cx}px,${cy}px,0)`; }

      // footer wordmark rise
      const fr = footWord.getBoundingClientRect();
      if (fr.top < vh) footWord.firstElementChild.style.setProperty('--fy', (clamp((fr.top - vh * .55) / (vh * .45), 0, 1) * 60).toFixed(1) + '%');
    }

    // manifesto
    if (mani) {
      const r = mani.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        const p = clamp((vh * .82 - r.top) / (r.height + vh * .25), 0, 1);
        const lit = RM ? maniSeq.length : Math.round(p * maniSeq.length);
        maniSeq.forEach((s, i) => s.classList.toggle('lit', i < lit));
      }
    }

    // mobile CTA
    const mr = menuSec.getBoundingClientRect(), fr2 = foot.getBoundingClientRect();
    const showCta = y > hero.offsetHeight * .7 && !(mr.top < vh * .6 && mr.bottom > vh * .3) && fr2.top > vh && !document.body.classList.contains('menu-open');
    if (showCta !== mcta.classList.contains('show')) {
      mcta.classList.toggle('show', showCta);
      mcta.setAttribute('aria-hidden', !showCta);
      mcta.tabIndex = showCta ? 0 : -1;
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
