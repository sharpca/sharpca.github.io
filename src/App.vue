<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import SiteFooter from "./components/SiteFooter.vue";

const saved = localStorage.getItem("theme");
if (saved) document.documentElement.classList.toggle("dark", saved === "dark");
else if (matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.add("dark");

const cv = ref(null);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let timer = null;
onMounted(() => {
  const ctx = cv.value.getContext("2d");
  const dpr = devicePixelRatio;
  let W, H, pts = [];
  const resize = () => {
    W = cv.value.width = innerWidth * dpr;
    H = cv.value.height = innerHeight * dpr;
    const n = Math.min(70, Math.floor(innerWidth / 22));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22 * dpr, vy: (Math.random() - 0.5) * 0.22 * dpr,
      r: (Math.random() * 1.6 + 0.5) * dpr,
    }));
  };
  const draw = () => {
    const dark = document.documentElement.classList.contains("dark");
    ctx.clearRect(0, 0, W, H);
    const dot = dark ? "rgba(122,167,255,.5)" : "rgba(36,86,166,.34)";
    const line = dark ? "rgba(122,167,255,.10)" : "rgba(36,86,166,.09)";
    const R = 150 * dpr;
    for (const p of pts) {
      if (!reduced) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = dot; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < R) {
          ctx.strokeStyle = line; ctx.lineWidth = dpr; ctx.globalAlpha = 1 - d / R;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
  };
  resize(); draw();
  addEventListener("resize", () => { resize(); draw(); });
  if (!reduced) timer = setInterval(() => { if (!document.hidden) draw(); }, 60);
});
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <canvas ref="cv" class="fixed inset-0 w-full h-full -z-10 opacity-55" aria-hidden="true"></canvas>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <SiteFooter />
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
