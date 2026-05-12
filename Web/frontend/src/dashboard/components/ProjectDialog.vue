<template>
  <Teleport to="body">
    <div class="project-dialog-backdrop" role="presentation" @click.self="$emit('close')">
      <section class="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <header class="project-dialog__header-bubble">
          <h2 id="project-dialog-title">{{ config.title }}</h2>
          <button class="project-dialog__close" type="button" aria-label="Dialog schliessen" @click="$emit('close')">
            x
          </button>
        </header>

        <form class="project-dialog__form" @submit.prevent="$emit('confirm')">
          <section class="project-dialog__bubble">
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
          </section>

          <section class="project-dialog__bubble project-dialog__bubble--repositories">
            <span>Repository-Zuordnung</span>
          </section>
          <p v-if="errorMessage" class="project-dialog__error">{{ errorMessage }}</p>

          <div class="project-dialog__actions">
            <button class="project-dialog__button project-dialog__button--primary" type="submit" :disabled="isSaving">
              {{ isSaving ? "Speichern..." : "OK" }}
            </button>
            <button class="project-dialog__button" type="button" :disabled="isSaving" @click="$emit('close')">
              Abbrechen
            </button>
          </div>
        </form>
      </section>
    </div>
  </Teleport>
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
  isSaving: {
    type: Boolean,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits(["close", "confirm", "update-field"]);
</script>
