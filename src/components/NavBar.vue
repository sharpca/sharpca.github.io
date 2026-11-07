<script setup>
import { ref } from "vue";
const links = [
  { to: "/", label: "Home" },
  { to: "/study", label: "Study" },
  { to: "/forensics", label: "Forensics" },
  { to: "/notes", label: "Notes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
const open = ref(false);
function toggle() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-950/60">
    <div class="max-w-5xl mx-auto flex items-center gap-6 px-5 h-14">
      <router-link to="/" class="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">C<span class="text-accent">.</span></router-link>
      <div class="hidden md:flex gap-5 ml-auto text-sm">
        <router-link v-for="l in links" :key="l.to" :to="l.to"
          class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          :class="{ 'text-accent!': $route.path === l.to }">{{ l.label }}</router-link>
      </div>
      <button @click="toggle" aria-label="Toggle theme"
        class="ml-auto md:ml-2 w-9 h-9 rounded-full border border-slate-300 dark:border-slate-600 hover:rotate-45 transition-transform">◐</button>
      <button @click="open = !open" class="md:hidden text-xl" aria-label="Menu">☰</button>
    </div>
    <div v-if="open" class="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-950/95 px-5 py-3 flex flex-col gap-2">
      <router-link v-for="l in links" :key="l.to" :to="l.to" @click="open = false"
        class="text-slate-600 dark:text-slate-300 py-1">{{ l.label }}</router-link>
    </div>
  </nav>
</template>
