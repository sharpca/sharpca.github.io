<script setup>
import { computed, onMounted, ref } from "vue";
import NoteTimeline from "../components/NoteTimeline.vue";
import { loadData } from "../api";
const notes = ref([]); const tag = ref("全部"); const err = ref("");
onMounted(async () => { try { notes.value = await loadData("notes"); } catch (e) { err.value = String(e); } });
const tags = computed(() => ["全部", ...new Set(notes.value.flatMap((n) => n.tags || []))]);
const shown = computed(() => tag.value === "全部" ? notes.value : notes.value.filter((n) => (n.tags || []).includes(tag.value)));
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 pt-24 pb-16">
    <h1 class="font-serif text-3xl" v-reveal>笔记时间线</h1>
    <div class="flex gap-2 flex-wrap mt-4 mb-8" v-reveal>
      <button v-for="t in tags" :key="t" @click="tag = t"
        class="px-3.5 py-1 rounded-full text-xs border transition"
        :class="tag === t ? 'bg-accent text-white border-accent' : 'border-slate-300 dark:border-slate-600 text-slate-500 hover:border-accent'">{{ t }}</button>
    </div>
    <p v-if="err" class="text-rose-600">数据加载失败：{{ err }}</p>
    <NoteTimeline v-else :notes="shown" />
  </section>
</template>
