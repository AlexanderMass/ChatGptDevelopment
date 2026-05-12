<template>
  <div class="shell">
    <header class="shell__header">
      <div>
        <button class="shell__brand" type="button" @click="$emit('select-section', 'dashboard')">
          ChatGptDevelopment
        </button>
      </div>
      <div class="shell__header-meta">
        <div class="shell__server-status" :class="`shell__server-status--${serverStatus}`">
          <span>Serverstatus</span>
          <strong>{{ serverStatus }}</strong>
        </div>
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
defineProps({
  serverStatus: {
    type: String,
    required: true,
  },
});

defineEmits(["select-section"]);
</script>
