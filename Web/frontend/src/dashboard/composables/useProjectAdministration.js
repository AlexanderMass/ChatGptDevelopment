import { computed, onMounted, reactive, ref } from "vue";
import {
  createProject,
  fetchProjects,
  fetchRepositories,
  runGitAnalysis,
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
  const repositories = ref([]);
  const selectedProject = ref(null);
  const isSaving = ref(false);
  const isAnalyzing = ref(false);
  const pendingRepositoryRemovalWarning = ref(false);
  const gitAnalysisResult = ref(null);
  const statusMessage = ref("");
  const errorMessage = ref("");
  const projectForm = reactive(createEmptyProjectForm(today));

  const lastProject = computed(() => projects.value[0] ?? null);
  const dialogConfig = computed(() => DIALOG_CONFIG[dialogMode.value] ?? DIALOG_CONFIG.create);

  onMounted(loadProjects);
  onMounted(loadRepositories);

  async function loadProjects() {
    try {
      errorMessage.value = "";
      projects.value = await fetchProjects();
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  async function loadRepositories() {
    try {
      errorMessage.value = "";
      repositories.value = await fetchRepositories();
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  function openDialog(mode, project = null) {
    dialogMode.value = mode;
    selectedProject.value = project;
    statusMessage.value = "";
    errorMessage.value = "";
    pendingRepositoryRemovalWarning.value = false;

    if (mode === "create") {
      resetForm(today, projectForm);
      return;
    }

    loadProject(project ?? lastProject.value, projectForm, today);
  }

  function closeDialog() {
    dialogMode.value = null;
    pendingRepositoryRemovalWarning.value = false;
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
          repositories: selectedRepositories(projectForm.repositoryPaths, repositories.value),
        });

        projects.value = [createdProject, ...projects.value];
        statusMessage.value = `Projekt "${createdProject.name}" wurde angelegt.`;
      } else if (selectedProject.value) {
        const updatedProject = await updateProject(selectedProject.value.projectId, {
          description: projectForm.description.trim(),
          startDate: projectForm.startDate,
          endDate: projectForm.endDate,
          repositories: selectedRepositories(projectForm.repositoryPaths, repositories.value),
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

  async function analyzeGitData() {
    isAnalyzing.value = true;
    errorMessage.value = "";
    statusMessage.value = "";
    gitAnalysisResult.value = null;

    try {
      gitAnalysisResult.value = await runGitAnalysis();
      statusMessage.value = "Git-Datenanalyse wurde abgeschlossen.";
      await loadProjects();
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      isAnalyzing.value = false;
    }
  }

  function closeGitAnalysisResult() {
    gitAnalysisResult.value = null;
  }

  return {
    today,
    dialogMode,
    dialogConfig,
    projectForm,
    repositories,
    projects,
    lastProject,
    selectedProject,
    isSaving,
    isAnalyzing,
    pendingRepositoryRemovalWarning,
    gitAnalysisResult,
    statusMessage,
    errorMessage,
    hasRemovedRepositories,
    openDialog,
    closeDialog,
    confirmDialog,
    analyzeGitData,
    closeGitAnalysisResult,
    updateProjectForm,
  };
}

function hasRemovedRepositories(project, projectForm) {
  if (!project) {
    return false;
  }

  const nextRepositoryPaths = new Set(projectForm.repositoryPaths);
  return Boolean(project.repositories?.some((repository) => !nextRepositoryPaths.has(repository.path)));
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
    repositoryPaths: [],
  };
}

function resetForm(today, projectForm) {
  projectForm.name = "";
  projectForm.description = "";
  projectForm.startDate = today;
  projectForm.endDate = "";
  projectForm.repositoryPaths = [];
}

function loadProject(project, projectForm, today) {
  projectForm.name = project?.name ?? "Noch kein Projekt angelegt";
  projectForm.description = project?.description ?? "";
  projectForm.startDate = project?.startDate ?? today;
  projectForm.endDate = project?.endDate ?? "";
  projectForm.repositoryPaths = project?.repositories?.map((repository) => repository.path) ?? [];
}

function selectedRepositories(repositoryPaths, repositories) {
  const selectedRepositoryPaths = new Set(repositoryPaths);
  return repositories.filter((repository) => selectedRepositoryPaths.has(repository.path));
}
