<template>
  <section class="dashboard-app" aria-label="Dashboard">
    <section class="dashboard-hero">
      <div class="dashboard-hero__row">
        <h1>{{ activeItem.title }}</h1>
        <p>Projektadministration und spätere Auswertung der verwalteten ChatGPT-Projekte.</p>
      </div>

      <div class="dashboard-hero__status">
        <span>Status:</span>
        <p>
          <strong>Erster vertikaler Oberflächenschnitt.</strong> Der Projektdialog ist zunächst rein
          oberflächenseitig angebunden; die spätere Node/API- und Datenbankanbindung
          ersetzt die lokale Simulation beim Klick auf OK.
        </p>
      </div>
    </section>

    <article class="dashboard-app__workspace">
      <div class="dashboard-app__toolbar">
        <button class="dashboard-action" type="button" @click="openDialog('create')">
          Projekt anlegen
        </button>
        <button class="dashboard-action dashboard-action--secondary" type="button" @click="openDialog('admin')">
          Projekt administrieren
        </button>
      </div>

      <dl v-if="lastProject" class="dashboard-app__summary">
        <div>
          <dt>Letztes Projekt</dt>
          <dd>{{ lastProject.name }}</dd>
        </div>
        <div>
          <dt>Projektstart</dt>
          <dd>{{ formatDate(lastProject.startDate) }}</dd>
        </div>
        <div>
          <dt>Projektende</dt>
          <dd>{{ formatDate(lastProject.endDate) }}</dd>
        </div>
      </dl>

      <p v-if="statusMessage" class="dashboard-app__status">{{ statusMessage }}</p>
      <p v-if="errorMessage" class="dashboard-app__error">{{ errorMessage }}</p>
    </article>

    <ProjectDialog
      v-if="dialogMode"
      :config="dialogConfig"
      :form="projectForm"
      :is-saving="isSaving"
      :error-message="errorMessage"
      :today="today"
      @close="closeDialog"
      @confirm="confirmDialog"
      @update-field="updateProjectForm"
    />
  </section>
</template>

<script setup>
import ProjectDialog from "../components/ProjectDialog.vue";
import { useProjectAdministration } from "../composables/useProjectAdministration.js";

defineProps({
  activeItem: {
    type: Object,
    required: true,
  },
});

const {
  today,
  dialogMode,
  dialogConfig,
  projectForm,
  lastProject,
  isSaving,
  statusMessage,
  errorMessage,
  openDialog,
  closeDialog,
  confirmDialog,
  updateProjectForm,
} = useProjectAdministration();

function formatDate(value) {
  return value || "nicht gesetzt";
}
</script>
