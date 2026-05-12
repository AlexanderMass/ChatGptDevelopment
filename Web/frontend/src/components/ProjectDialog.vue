<template>
  <div class="project-dialog-backdrop" role="presentation" @click.self="$emit('close')">
    <section class="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
      <button class="project-dialog__close" type="button" aria-label="Dialog schließen" @click="$emit('close')">
        ×
      </button>

      <p class="project-dialog__eyebrow">Projektadministration</p>
      <h2 id="project-dialog-title">{{ config.title }}</h2>

      <form class="project-dialog__form" @submit.prevent="$emit('confirm')">
        <div class="project-dialog__data">
          <div class="project-dialog__fields">
            <label class="project-field">
              <span>Name</span>
              <input
                :value="form.name"
                type="text"
                :readonly="!config.nameEditable"
                :required="config.nameEditable"
                @input="$emit('update-field', 'name', $event.target.value)"
              />
            </label>

            <label class="project-field">
              <span>Projektstart</span>
              <input
                :value="form.startDate"
                type="date"
                :readonly="!config.startDateEditable"
                :max="today"
                required
                @input="$emit('update-field', 'startDate', $event.target.value)"
              />
            </label>

            <label class="project-field">
              <span>Projektende</span>
              <input
                :value="form.endDate"
                type="date"
                :readonly="!config.endDateEditable"
                :disabled="!config.endDateEditable"
                @input="$emit('update-field', 'endDate', $event.target.value)"
              />
            </label>
          </div>

          <label class="project-field project-field--description">
            <span>Beschreibung</span>
            <textarea
              :value="form.description"
              rows="7"
              @input="$emit('update-field', 'description', $event.target.value)"
            ></textarea>
          </label>
        </div>

        <p class="project-dialog__hint">{{ config.hint }}</p>

        <div class="project-dialog__actions">
          <button class="project-dialog__button project-dialog__button--primary" type="submit">OK</button>
          <button class="project-dialog__button" type="button" @click="$emit('close')">Abbrechen</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  today: {
    type: String,
    required: true,
  },
});

defineEmits(["close", "confirm", "update-field"]);
</script>
