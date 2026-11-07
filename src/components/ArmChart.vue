<script setup>
import { computed } from "vue";
const props = defineProps({ arms: { type: Array, required: true } });
const series = [["T1", "t1", "fill-accent"], ["T2", "t2", "fill-teal-600 dark:fill-teal-400"], ["T3", "t3", "fill-slate-400"]];
const W = 460, H = 250, padL = 46, padB = 52, padT = 14, ymin = 0.58, ymax = 0.85;
const vis = computed(() => props.arms.filter((a) => a.t1 != null));
const y = (v) => padT + (H - padT - padB) * (1 - (v - ymin) / (ymax - ymin));
const grid = computed(() => Array.from({ length: 6 }, (_, g) => ymin + ((ymax - ymin) * g) / 5));
</script>

<template>
  <svg viewBox="0 0 460 250" class="w-full h-auto">
    <line v-for="v in grid" :key="v" :x1="padL" :y1="y(v)" :x2="W - 10" :y2="y(v)" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1" />
    <text v-for="v in grid" :key="'t' + v" class="fill-slate-500 text-[10px]" :x="padL - 7" :y="y(v) + 3" text-anchor="end">{{ v.toFixed(2) }}</text>
    <g v-for="(a, i) in vis" :key="a.id">
      <template v-for="([lbl, key, cls], si) in series" :key="key">
        <rect v-if="a[key] != null" class="bar cursor-pointer" :class="cls"
          :x="padL + (W - padL - 12) / vis.length * i + si * 23 + 4" :y="y(a[key])" width="20" :height="y(ymin) - y(a[key])" rx="3">
          <title>{{ a.label }} · {{ lbl }} = {{ a[key].toFixed(4) }}</title>
        </rect>
      </template>
      <text class="fill-slate-500 text-[10px]" :x="padL + (W - padL - 12) / vis.length * (i + 0.5)" :y="H - padB + 16" text-anchor="middle">{{ a.id }}</text>
    </g>
    <g v-for="([lbl, , cls], si) in series" :key="'lg' + lbl">
      <rect :x="padL + si * 74" :y="H - 26" width="10" height="10" rx="2" :class="cls.replace('fill-', 'fill-')" />
      <text class="fill-slate-500 text-[10px]" :x="padL + si * 74 + 14" :y="H - 17">{{ lbl }}</text>
    </g>
  </svg>
</template>
