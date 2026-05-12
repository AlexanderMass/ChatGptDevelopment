<template>
  <section class="dashboard-app" aria-label="Dashboard">
    <div class="dashboard-app__toolbar">
      <button class="dashboard-action" type="button" @click="openDialog('create')">
        Projekt anlegen
      </button>
      <button class="dashboard-action dashboard-action--secondary" type="button" @click="openDialog('admin')">
        Projekt administrieren
      </button>
    </div>

    <article class="dashboard-app__panel">
      <p class="dashboard-app__eyebrow">Projektadministration</p>
      <h2>Erster vertikaler Oberflächen-Schnitt</h2>
      <p>
        Der Projektdialog ist hier zunächst rein oberflächenseitig angebunden.
        Die spätere Node/API- und Datenbankanbindung ersetzt die lokale Simulation beim Klick auf OK.
      </p>
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
    </article>

    <ProjectDialog
      v-if="dialogMode"
      :config="dialogConfig"
      :form="projectForm"
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

const {
  today,
  dialogMode,
  dialogConfig,
  projectForm,
  lastProject,
  openDialog,
  closeDialog,
  confirmDialog,
  updateProjectForm,
} = useProjectAdministration();

function formatDate(value) {
  return value || "nicht gesetzt";
}
</script>
