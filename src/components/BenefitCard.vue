<script setup>
defineProps({
  icon: String,
  title: String,
  description: String
});
</script>

<template>
  <div class="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <span class="material-symbols-outlined text-3xl">{{ icon }}</span>
    </div>
    <h3 class="mb-2 text-xl font-bold text-slate-900">{{ title }}</h3>
    <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
      {{ description }}
    </p>
    <button class="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
      Ver más <span class="material-symbols-outlined text-sm">arrow_forward</span>
    </button>
  </div>
</template>