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
          <div class="shell__server-status-row">
            <span>Serverstatus:</span>
            <strong>{{ serverStatus }}</strong>
            <button class="shell__server-status-refresh" type="button" @click="$emit('refresh-server-status')">
              Refresh
            </button>
          </div>
          <label class="shell__server-log-toggle">
            <input
              :checked="showServerLog"
              type="checkbox"
              @change="$emit('update:show-server-log', $event.target.checked)"
            />
            Show Server Log
          </label>
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
  showServerLog: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["refresh-server-status", "select-section", "update:show-server-log"]);
</script>
