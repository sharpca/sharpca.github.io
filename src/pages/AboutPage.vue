<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>关于</h1>
    <div class="glass rounded-2xl p-7 mt-6" v-reveal>
      <p class="text-lg leading-relaxed">我做病理图像表征学习方法的构建与压力测试，关注的是监督信号到底编码了什么——
      以及它悄悄摧毁了什么。</p>
      <p class="mt-4 text-slate-600 dark:text-slate-300">近期工作：细胞级 SSL 中 teacher 设计的预注册、经对抗审计的多臂对照研究；
      最近邻代码库的 repo 取证；能在患者级配对推断下存活下来的评测方法学。</p>
    </div>
    <div class="grid md:grid-cols-2 gap-5 mt-5">
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3">兴趣方向</h2>
        <ul class="list-disc ml-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          <li>多视图 / 多尺度 SSL 中的信息边界</li>
          <li>病理的核级与细胞级 foundation model</li>
          <li>作为一等公民的阴性结果与预注册</li>
          <li>面向可复现性的 paper↔code 取证</li>
        </ul>
      </div>
      <div class="glass rounded-2xl p-6" v-reveal>
        <h2 class="font-semibold mb-3">本站技术栈</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="t in ['Vue 3', 'vue-router', 'Tailwind CSS 4', 'axios', 'Vite 6', 'GitHub Pages', 'GitHub Actions']" :key="t"
            class="text-xs px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
