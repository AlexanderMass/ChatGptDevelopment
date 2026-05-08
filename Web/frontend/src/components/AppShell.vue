<template>
  <div class="shell">
    <header class="shell__header">
      <div>
        <p class="shell__eyebrow">Projektplattform</p>
        <button class="shell__brand" type="button" @click="$emit('select-section', 'overview')">
          ChatGptDevelopment
        </button>
      </div>
      <div class="shell__header-meta">
        <div class="shell__pill">Vue Initialaufbau</div>
        <div class="shell__pill shell__pill--accent">KI-Entwicklungsprozesse</div>
      </div>
    </header>

    <div class="shell__body">
      <aside class="shell__sidebar">
        <slot name="sidebar" />
      </aside>

      <main class="shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
defineEmits(["select-section"]);
</script>
