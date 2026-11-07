/* Celine (sharpca) — research notes SPA. Zero dependencies. */
"use strict";
const CFG = window.SITE_CONFIG || {};
const $ = (s) => document.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- theme ---------- */
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) root.dataset.theme = saved;
else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
$("#theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  drawBg();
});

/* ---------- background canvas ---------- */
const cv = $("#bg-canvas"), ctx = cv.getContext("2d");
let pts = [], W = 0, H = 0;
function resizeBg() {
  W = cv.width = innerWidth * devicePixelRatio;
  H = cv.height = innerHeight * devicePixelRatio;
  const n = Math.min(70, Math.floor(innerWidth / 22));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .22 * devicePixelRatio,
    vy: (Math.random() - .5) * .22 * devicePixelRatio,
    r: (Math.random() * 1.6 + .5) * devicePixelRatio
  }));
}
function drawBg() {
  const dark = root.dataset.theme === "dark";
  ctx.clearRect(0, 0, W, H);
  const dot = dark ? "rgba(122,167,255,.5)" : "rgba(36,86,166,.34)";
  const line = dark ? "rgba(122,167,255,.10)" : "rgba(36,86,166,.09)";
  for (const p of pts) {
    if (!reduced) { p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1; }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = dot; ctx.fill();
  }
  const R = 150 * devicePixelRatio;
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < R) { ctx.strokeStyle = line; ctx.lineWidth = devicePixelRatio;
      ctx.globalAlpha = 1 - d / R; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.globalAlpha = 1; }
  }
}
addEventListener("resize", () => { resizeBg(); drawBg(); });
resizeBg(); drawBg();
if (!reduced) setInterval(() => { if (!document.hidden) drawBg(); }, 60);

/* ---------- reveal ---------- */
const io = new IntersectionObserver((es) =>
  es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- typewriter ---------- */
const phrases = ["pre-registered experiments.", "adversarially audited claims.", "teacher-design forensics.", "negative results, reported honestly."];
let pi = 0, ci = 0, del = false;
(function type() {
  const t = phrases[pi];
  $("#typewriter").textContent = t.slice(0, ci);
  if (!del && ci < t.length) ci++;
  else if (!del && ci === t.length) { del = true; return setTimeout(type, 1700); }
  else if (del && ci > 0) ci--;
  else { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 26 : 52);
})();

/* ---------- data layer: local JSON now, Supabase-ready ---------- */
async function loadData(name) {
  const s = CFG.supabase;
  if (s && s.url && s.anonKey && s.table && s.table[name]) {
    const r = await fetch(`${s.url}/rest/v1/${s.table[name]}?select=*`,
      { headers: { apikey: s.anonKey, Authorization: `Bearer ${s.anonKey}` } });
    if (!r.ok) throw new Error("supabase " + r.status);
    const rows = await r.json();
    return name === "results" ? rows[0] : rows;
  }
  const r = await fetch(CFG.sources[name]);
  if (!r.ok) throw new Error(r.status);
  return r.json();
}

/* ---------- renderers ---------- */
function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

function renderStats(R) {
  const items = [
    ["3", "supervision contracts"], [R.meta.cells, "training cells"],
    [R.meta.audit_models, "-model confusion audit"], [R.meta.gates, "pre-registered gates"]];
  $("#stats").innerHTML = items.map(([n, l]) => `<div class="stat"><b data-n="${n}">0</b><span>${l}</span></div>`).join("");
  document.querySelectorAll(".stat b").forEach((el) => {
    const target = el.dataset.n; if (isNaN(target)) { el.textContent = target; return; }
    let v = 0; const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => { v = Math.min(target, v + step); el.textContent = v;
      if (v >= target) clearInterval(t); }, reduced ? 0 : 34);
  });
}

function renderArms(R) {
  const arms = R.arms.filter((a) => a.t1 != null);
  const series = [["T1", "t1", 0], ["T2", "t2", 1], ["T3", "t3", 2]];
  const W = 460, Hh = 250, padL = 46, padB = 52, padT = 14;
  const iw = W - padL - 12, ih = Hh - padT - padB;
  const ymax = 0.85, ymin = 0.58;
  const y = (v) => padT + ih * (1 - (v - ymin) / (ymax - ymin));
  const gw = iw / arms.length, bw = Math.min(20, gw / 4.4);
  let s = "";
  for (let g = 0; g <= 5; g++) { const v = ymin + (ymax - ymin) * g / 5;
    s += `<line x1="${padL}" y1="${y(v)}" x2="${W - 10}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/>
          <text class="axis-t" x="${padL - 7}" y="${y(v) + 3}" text-anchor="end">${v.toFixed(2)}</text>`; }
  arms.forEach((a, i) => {
    const x0 = padL + gw * i + (gw - bw * 3 - 8) / 2;
    series.forEach(([lbl, key, si]) => {
      const v = a[key]; if (v == null) return;
      const h = y(ymin) - y(v);
      s += `<rect class="bar" x="${x0 + si * (bw + 3)}" y="${y(v)}" width="${bw}" height="${h}" rx="3"
             fill="${["var(--accent)", "var(--accent2)", "#8a94a8"][si]}"><title>${esc(a.label)} · ${lbl} = ${v.toFixed(4)}</title></rect>`;
      if (si === 0) s += `<text class="axis-t" x="${x0 + bw * 1.6}" y="${Hh - padB + 16}" text-anchor="middle">${esc(a.id)}</text>`;
    });
  });
  series.forEach(([lbl, , si]) => {
    s += `<rect x="${padL + si * 74}" y="${Hh - 26}" width="10" height="10" rx="2" fill="${["var(--accent)", "var(--accent2)", "#8a94a8"][si]}"/>
          <text class="axis-t" x="${padL + si * 74 + 14}" y="${Hh - 17}">${lbl}</text>`;
  });
  $("#chart-arms").innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" role="img">${s}</svg>`;
}

function renderForest(R) {
  const cs = R.contrasts, W = 460, rowH = 30, padL = 118, padR = 26, padT = 8;
  const Hh = padT + cs.length * rowH + 34;
  const xmin = -2, xmax = 9;
  const x = (v) => padL + (W - padL - padR) * (v - xmin) / (xmax - xmin);
  let s = `<line x1="${x(0)}" y1="${padT}" x2="${x(0)}" y2="${Hh - 26}" stroke="var(--muted)" stroke-dasharray="4 4" stroke-width="1"/>
           <text class="axis-t" x="${x(0)}" y="${Hh - 12}" text-anchor="middle">0 pp</text>`;
  cs.forEach((c, i) => {
    const yy = padT + rowH * i + rowH / 2, sig = c.lo > 0;
    const col = sig ? "var(--good)" : "var(--muted)";
    s += `<text class="axis-t" x="${padL - 10}" y="${yy + 4}" text-anchor="end" style="fill:var(--ink)">${esc(c.name)}</text>
          <line class="ci-line" x1="${x(c.lo)}" y1="${yy}" x2="${x(c.hi)}" y2="${yy}" stroke="${col}"/>
          <line x1="${x(c.lo)}" y1="${yy - 5}" x2="${x(c.lo)}" y2="${yy + 5}" stroke="${col}"/>
          <line x1="${x(c.hi)}" y1="${yy - 5}" x2="${x(c.hi)}" y2="${yy + 5}" stroke="${col}"/>
          <circle class="ci-dot" cx="${x(c.t1)}" cy="${yy}" r="4.5" fill="${col}"><title>${esc(c.name)}: +${c.t1} pp [${c.lo}, ${c.hi}]</title></circle>
          <text class="axis-t" x="${W - padR + 2}" y="${yy + 4}" style="fill:${col}">+${c.t1.toFixed(2)}</text>`;
  });
  $("#chart-forest").innerHTML = `<svg viewBox="0 0 ${W} ${Hh}" role="img">${s}</svg>`;
}

function renderGates(R) {
  $("#gates").innerHTML = R.gates.map((g) => {
    const cls = g.verdict === "PASS" ? "pass" : g.verdict === "FAIL" ? "fail" : "mixed";
    return `<li>${esc(g.name)} — ${esc(g.detail)}<span class="verdict ${cls}">${esc(g.verdict)}</span></li>`;
  }).join("");
}
function renderMech(R) {
  $("#gain-list").innerHTML = R.mechanism.gain.map((m) => `<li>${esc(m)}</li>`).join("");
  $("#cost-list").innerHTML = R.mechanism.cost.map((m) => `<li>${esc(m)}</li>`).join("");
}
function renderNotes(notes) {
  $("#timeline").innerHTML = notes.map((n) =>
    `<div class="note reveal visible"><time>${esc(n.date)}</time><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p></div>`).join("");
}

/* ---------- boot ---------- */
(async () => {
  try {
    const [R, notes] = await Promise.all([loadData("results"), loadData("notes")]);
    renderStats(R); renderGates(R); renderMech(R);
    renderArms(R); renderForest(R); renderNotes(notes);
  } catch (e) {
    ["#chart-arms", "#chart-forest"].forEach((s) => { const el = $(s); if (el) el.textContent = "chart unavailable (" + e.message + ")"; });
  }
})();
