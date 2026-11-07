<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>Contact</h1>
    <div class="glass rounded-2xl p-7 mt-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700 max-w-xl" v-reveal>
      <p>Fastest route is GitHub — issues and discussions on
        <a class="text-accent hover:underline" href="https://github.com/sharpca" target="_blank" rel="noopener">@sharpca</a>.</p>
      <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">A contact form (backed by Supabase) activates once
        the backend credentials are configured — see
        <router-link class="text-accent hover:underline" to="/about">About</router-link> for the stack.</p>
    </div>
  </section>
</template>
