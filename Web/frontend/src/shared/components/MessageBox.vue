<template>
  <Teleport to="body">
    <div class="message-box-backdrop" role="presentation">
      <section class="message-box" role="alertdialog" aria-modal="true" :aria-labelledby="titleId">
        <header class="message-box__header">
          <h2 :id="titleId">{{ title }}</h2>
        </header>

        <p>{{ message }}</p>

        <div class="message-box__actions">
          <button class="message-box__button message-box__button--primary" type="button" @click="$emit('confirm')">
            {{ confirmLabel }}
          </button>
          <button class="message-box__button" type="button" @click="$emit('cancel')">
            {{ cancelLabel }}
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup>
const titleId = `message-box-title-${Math.random().toString(36).slice(2)}`;

defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmLabel: {
    type: String,
    default: "Speichern",
  },
  cancelLabel: {
    type: String,
    default: "Abbrechen",
  },
});

defineEmits(["cancel", "confirm"]);
</script>
