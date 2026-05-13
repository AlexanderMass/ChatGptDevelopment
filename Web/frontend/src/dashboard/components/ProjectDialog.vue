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
              <label class="project-field project-field--project-data">
                <span>Projektdaten</span>
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
              </label>

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
            <div class="project-dialog__repository-shuttle">
              <label class="project-dialog__repository-column">
                <span>Zugeordnete Repositories</span>
                <select
                  v-model="selectedAssignedPath"
                  size="7"
                  @dblclick="removeSelectedRepository"
                >
                  <option
                    v-for="repository in assignedRepositories"
                    :key="repository.path"
                    :value="repository.path"
                  >
                    {{ repository.name }}
                  </option>
                </select>
              </label>

              <div class="project-dialog__repository-actions" aria-label="Repository-Auswahl verschieben">
                <button
                  class="project-dialog__repository-action"
                  type="button"
                  :disabled="!selectedAvailablePath"
                  @click="assignSelectedRepository"
                >
                  &lt;
                </button>
                <button
                  class="project-dialog__repository-action"
                  type="button"
                  :disabled="!selectedAssignedPath"
                  @click="removeSelectedRepository"
                >
                  &gt;
                </button>
              </div>

              <label class="project-dialog__repository-column">
                <span>Verfügbare Repositories</span>
                <select
                  v-model="selectedAvailablePath"
                  size="7"
                  @dblclick="assignSelectedRepository"
                >
                  <option
                    v-for="repository in availableRepositories"
                    :key="repository.path"
                    :value="repository.path"
                  >
                    {{ repository.name }}
                  </option>
                </select>
              </label>
            </div>
          </section>
          <p v-if="errorMessage" class="project-dialog__error">{{ errorMessage }}</p>
          <div class="project-dialog__actions">
            <button class="project-dialog__button project-dialog__button--primary" type="submit" :disabled="isSaving">
              {{ isSaving ? "Speichern..." : "Speichern" }}
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
import { computed, ref, watch } from "vue";

const props = defineProps({
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
  repositories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "confirm", "toggle-repository", "update-field"]);
const selectedAvailablePath = ref("");
const selectedAssignedPath = ref("");

const availableRepositories = computed(() =>
  props.repositories.filter((repository) => !props.form.repositoryPaths.includes(repository.path)),
);

const assignedRepositories = computed(() =>
  props.form.repositoryPaths.map((repositoryPath) =>
    props.repositories.find((repository) => repository.path === repositoryPath) ?? createRepositoryFallback(repositoryPath),
  ),
);

watch(
  () => props.form.repositoryPaths,
  () => {
    selectedAvailablePath.value = "";
    selectedAssignedPath.value = "";
  },
);

function assignSelectedRepository() {
  emit("toggle-repository", selectedAvailablePath.value, true);
}

function removeSelectedRepository() {
  emit("toggle-repository", selectedAssignedPath.value, false);
}

function createRepositoryFallback(repositoryPath) {
  const pathParts = repositoryPath.split(/[\\/]/);

  return {
    path: repositoryPath,
    name: pathParts[pathParts.length - 1] ?? repositoryPath,
    lastCommitDate: "",
  };
}
</script>
