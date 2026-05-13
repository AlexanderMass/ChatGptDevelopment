<template>
  <section class="dashboard-app" aria-label="Dashboard">
    <section class="dashboard-hero">
      <div class="dashboard-hero__row">
        <h1>{{ activeItem.title }}</h1>
        <p>Projektadministration und spätere Auswertung der verwalteten ChatGPT-Projekte.</p>
      </div>

      <div class="dashboard-hero__status">
        <span>Status:</span>
        <p><strong>Oberflächendesign der Hauptseite.</strong> Projektpflegeanteil.</p>
      </div>
    </section>

    <article class="dashboard-app__workspace">
      <section class="project-maintenance-panel" @click="closeProjectContextMenu">
        <div class="project-maintenance-panel__table-wrap">
          <table class="project-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Projektstart</th>
                <th>Projektende</th>
                <th>Repositories</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in projects"
                :key="project.projectId"
                :data-project-row-id="project.projectId"
                :class="{ 'project-table__row--selected': selectedProject?.projectId === project.projectId }"
                @click.stop="selectProject(project)"
                @contextmenu.prevent="openProjectContextMenu($event, project)"
                @mouseenter="openProjectTooltip($event, project)"
                @mousemove="moveProjectTooltip($event)"
                @mouseleave="closeProjectTooltip"
              >
                <td>{{ project.name }}</td>
                <td>{{ project.status }}</td>
                <td>{{ formatDate(project.startDate) }}</td>
                <td>{{ formatDate(project.endDate) }}</td>
                <td>{{ project.repositories?.length ?? 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="project-maintenance-panel__actions">
          <button class="dashboard-action" type="button" @click.stop="openDialog('create')">
            Projekt anlegen
          </button>
          <button
            class="dashboard-action dashboard-action--secondary"
            type="button"
            :disabled="isAnalyzing"
            @click.stop="analyzeGitData"
          >
            {{ isAnalyzing ? "Analyse läuft..." : "Git-Daten analysieren" }}
          </button>
        </aside>

        <Teleport to="body">
          <div
            v-if="projectContextMenu"
            class="project-context-menu"
            :style="{ left: `${projectContextMenu.x}px`, top: `${projectContextMenu.y}px` }"
            @click.stop
          >
            <button type="button" @click="administerContextProject">
              Projekt administrieren
            </button>
          </div>
        </Teleport>

        <Teleport to="body">
          <div
            v-if="projectTooltip"
            class="project-tooltip"
            :style="{ left: `${projectTooltip.x}px`, top: `${projectTooltip.y}px` }"
          >
            <table>
              <tbody>
                <tr
                  v-for="repository in projectTooltip.project.repositories"
                  :key="repository.repositoryId ?? repository.path"
                >
                  <td>{{ repositoryName(repository) }}</td>
                  <td>{{ formatDateOnly(repository.firstCheckInDate) }}</td>
                  <td>{{ formatDateOnly(repository.lastCommitDate) }}</td>
                  <td>{{ repository.checkInCount ?? 0 }} Commits</td>
                </tr>
                <tr v-if="!projectTooltip.project.repositories?.length">
                  <td colspan="4">Keine Repositories zugeordnet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Teleport>
      </section>

      <p v-if="statusMessage" class="dashboard-app__status">{{ statusMessage }}</p>
      <p v-if="errorMessage" class="dashboard-app__error">{{ errorMessage }}</p>
    </article>

    <ProjectDialog
      v-if="dialogMode"
      :config="dialogConfig"
      :form="projectForm"
      :is-saving="isSaving"
      :error-message="errorMessage"
      :repositories="repositories"
      :today="today"
      @close="closeDialog"
      @confirm="handleConfirmDialog"
      @toggle-repository="toggleRepository"
      @update-field="updateProjectForm"
    />

    <MessageBox
      v-if="pendingRepositoryRemovalWarning"
      title="Repositories entfernen"
      message="Es wurden Repositories entfernt. Beim Speichern werden diese Repository-Zuordnungen sofort entfernt. Zugehoerige Check-in-Metriken werden dabei ebenfalls geloescht."
      confirm-label="Speichern"
      cancel-label="Abbrechen"
      @confirm="confirmRepositoryRemoval"
      @cancel="cancelRepositoryRemoval"
    />

    <Teleport to="body">
      <div v-if="gitAnalysisResult" class="message-box-backdrop" role="presentation">
        <section class="message-box git-analysis-result" role="alertdialog" aria-modal="true">
          <header class="message-box__header">
            <h2>Git-Datenanalyse abgeschlossen</h2>
          </header>

          <div v-if="gitAnalysisResult.newCheckInMetrics > 0" class="git-analysis-result__content">
            <article
              v-for="project in gitAnalysisResult.projects"
              :key="project.projectId"
              class="git-analysis-result__project"
            >
              <h3>{{ project.name }}</h3>
              <ul>
                <li
                  v-for="repository in project.repositories"
                  :key="repository.repositoryId"
                >
                  {{ repository.name }}: {{ repository.newCheckInMetrics }} neue Check-ins
                </li>
                <li v-if="!project.repositories.length">Keine Repositories zugeordnet</li>
              </ul>
            </article>
          </div>

          <p v-else>Es wurden keine neuen Check-ins gefunden.</p>

          <p class="git-analysis-result__total">
            Gesamt: {{ gitAnalysisResult.newCheckInMetrics }} neue Check-ins
          </p>

          <div class="message-box__actions">
            <button
              class="message-box__button message-box__button--primary"
              type="button"
              @click="closeGitAnalysisResult"
            >
              OK
            </button>
          </div>
        </section>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from "vue";
import MessageBox from "../../shared/components/MessageBox.vue";
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
  repositories,
  projects,
  selectedProject,
  isSaving,
  isAnalyzing,
  pendingRepositoryRemovalWarning,
  gitAnalysisResult,
  statusMessage,
  errorMessage,
  openDialog,
  closeDialog,
  confirmDialog,
  analyzeGitData,
  closeGitAnalysisResult,
  hasRemovedRepositories,
  updateProjectForm,
} = useProjectAdministration();

const projectContextMenu = ref(null);
const projectTooltip = ref(null);
let selectedProjectRowElement;

function selectProject(project) {
  selectedProject.value = project;
}

function openProjectContextMenu(event, project) {
  selectProject(project);
  selectedProjectRowElement = event.currentTarget;

  projectContextMenu.value = {
    project,
    x: event.clientX + 1,
    y: event.clientY + 1,
  };

  window.addEventListener("mousemove", closeContextMenuOutsideHoverAreas);
}

function closeProjectContextMenu() {
  projectContextMenu.value = null;
  selectedProjectRowElement = null;
  window.removeEventListener("mousemove", closeContextMenuOutsideHoverAreas);
}

function openProjectTooltip(event, project) {
  projectTooltip.value = {
    project,
    x: event.clientX + 12,
    y: event.clientY - 6,
  };
}

function moveProjectTooltip(event) {
  if (!projectTooltip.value) {
    return;
  }

  projectTooltip.value = {
    ...projectTooltip.value,
    x: event.clientX + 12,
    y: event.clientY - 6,
  };
}

function closeProjectTooltip() {
  projectTooltip.value = null;
}

function closeContextMenuOutsideHoverAreas(event) {
  const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
  const contextMenuElement = document.querySelector(".project-context-menu");
  const isOverSelectedRow = Boolean(selectedProjectRowElement?.contains(hoveredElement));
  const isOverContextMenu = Boolean(contextMenuElement?.contains(hoveredElement));

  if (!isOverSelectedRow && !isOverContextMenu) {
    closeProjectContextMenu();
  }
}

function administerContextProject() {
  if (!projectContextMenu.value?.project) {
    return;
  }

  openDialog("admin", projectContextMenu.value.project);
  closeProjectContextMenu();
}

function toggleRepository(repositoryPath, isSelected) {
  const nextRepositoryPaths = isSelected
    ? [...projectForm.repositoryPaths, repositoryPath]
    : projectForm.repositoryPaths.filter((path) => path !== repositoryPath);

  updateProjectForm("repositoryPaths", nextRepositoryPaths);
}

function handleConfirmDialog() {
  if (
    dialogMode.value === "admin" &&
    !pendingRepositoryRemovalWarning.value &&
    hasRemovedRepositories(selectedProject.value, projectForm)
  ) {
    pendingRepositoryRemovalWarning.value = true;
    return;
  }

  confirmDialog();
}

function confirmRepositoryRemoval() {
  pendingRepositoryRemovalWarning.value = false;
  confirmDialog();
}

function cancelRepositoryRemoval() {
  pendingRepositoryRemovalWarning.value = false;
}

function formatDate(value) {
  return value || "nicht gesetzt";
}

function formatDateOnly(value) {
  if (!value) {
    return "nicht gesetzt";
  }

  return new Date(value).toLocaleDateString("de-DE");
}

function repositoryName(repository) {
  const pathParts = repository.path.split(/[\\/]/);
  return pathParts[pathParts.length - 1] || repository.path;
}
</script>
