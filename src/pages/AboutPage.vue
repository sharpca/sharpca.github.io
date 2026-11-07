<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>About</h1>
    <div class="glass rounded-2xl p-7 mt-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
      <p class="text-lg leading-relaxed">I build and stress-test representation-learning methods for histopathology
      images, with a focus on what supervision signals actually encode — and what they silently destroy.</p>
      <p class="mt-4 text-slate-600 dark:text-slate-300">Recent work: pre-registered, adversarially audited
      multi-arm studies on teacher design for cell-level self-supervised learning; repo forensics on the closest
      codebases; evaluation methodology that survives paired patient-level inference.</p>
    </div>
    <div class="grid md:grid-cols-2 gap-5 mt-5">
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3">Interests</h2>
        <ul class="list-disc ml-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          <li>Information boundaries in multi-view / multi-scale SSL</li>
          <li>Nucleus- and cell-level foundation models for pathology</li>
          <li>Negative results &amp; preregistration as first-class outputs</li>
          <li>Paper↔code forensics for reproducibility</li>
        </ul>
      </div>
      <div class="glass rounded-2xl p-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700" v-reveal>
        <h2 class="font-semibold mb-3">Tooling this site</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="t in ['Vue 3', 'vue-router', 'Tailwind CSS 4', 'axios', 'Vite 6', 'GitHub Pages', 'GitHub Actions']" :key="t"
            class="text-xs px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
