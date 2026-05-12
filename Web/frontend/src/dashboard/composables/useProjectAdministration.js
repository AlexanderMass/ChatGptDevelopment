import { computed, onMounted, reactive, ref } from "vue";
import {
  createProject,
  fetchProjects,
  updateProject
} from "../api/projectApi.js";

const DIALOG_CONFIG = {
  create: {
    title: "Projekt anlegen",
    nameEditable: true,
    startDateEditable: true,
    endDateEditable: false,
    hint: "Beim Anlegen sind Name, Beschreibung und Projektstart administrierbar. Das Projektende bleibt gesperrt.",
  },
  admin: {
    title: "Projekt administrieren",
    nameEditable: false,
    startDateEditable: true,
    endDateEditable: true,
    hint: "Beim Administrieren sind Name und Projektstart gesperrt. Das Projektende kann gesetzt oder geändert werden.",
  },
};

DIALOG_CONFIG.admin.hint = "Beim Administrieren bleibt der Name gesperrt. Projektstart und Projektende koennen gesetzt oder geaendert werden.";

export function useProjectAdministration() {
  const today = getToday();
  const dialogMode = ref(null);
  const projects = ref([]);
  const isSaving = ref(false);
  const statusMessage = ref("");
  const errorMessage = ref("");
  const projectForm = reactive(createEmptyProjectForm(today));

  const lastProject = computed(() => projects.value[0] ?? null);
  const dialogConfig = computed(() => DIALOG_CONFIG[dialogMode.value] ?? DIALOG_CONFIG.create);

  onMounted(loadProjects);

  async function loadProjects() {
    try {
      errorMessage.value = "";
      projects.value = await fetchProjects();
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  function openDialog(mode) {
    dialogMode.value = mode;
    statusMessage.value = "";
    errorMessage.value = "";

    if (mode === "create") {
      resetForm(today, projectForm);
      return;
    }

    loadLastProject(lastProject.value, projectForm, today);
  }

  function closeDialog() {
    dialogMode.value = null;
  }

  function updateProjectForm(field, value) {
    projectForm[field] = value;
  }

  async function confirmDialog() {
    isSaving.value = true;
    errorMessage.value = "";

    try {
      if (dialogMode.value === "create") {
        const createdProject = await createProject({
          name: projectForm.name.trim(),
          description: projectForm.description.trim(),
          startDate: projectForm.startDate,
        });

        projects.value = [createdProject, ...projects.value];
        statusMessage.value = `Projekt "${createdProject.name}" wurde angelegt.`;
      } else if (lastProject.value) {
        const updatedProject = await updateProject(lastProject.value.projectId, {
          description: projectForm.description.trim(),
          startDate: projectForm.startDate,
          endDate: projectForm.endDate,
        });

        projects.value = projects.value.map((project) =>
          project.projectId === updatedProject.projectId ? updatedProject : project,
        );
        statusMessage.value = `Projekt "${updatedProject.name}" wurde aktualisiert.`;
      }

      closeDialog();
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      isSaving.value = false;
    }
  }

  return {
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
  };
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyProjectForm(today) {
  return {
    name: "",
    description: "",
    startDate: today,
    endDate: "",
  };
}

function resetForm(today, projectForm) {
  projectForm.name = "";
  projectForm.description = "";
  projectForm.startDate = today;
  projectForm.endDate = "";
}

function loadLastProject(project, projectForm, today) {
  projectForm.name = project?.name ?? "Noch kein Projekt angelegt";
  projectForm.description = project?.description ?? "";
  projectForm.startDate = project?.startDate ?? today;
  projectForm.endDate = project?.endDate ?? "";
}
