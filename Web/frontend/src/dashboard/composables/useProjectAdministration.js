import { computed, reactive, ref } from "vue";

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
    startDateEditable: false,
    endDateEditable: true,
    hint: "Beim Administrieren sind Name und Projektstart gesperrt. Das Projektende kann gesetzt oder geändert werden.",
  },
};

export function useProjectAdministration() {
  const today = getToday();
  const dialogMode = ref(null);
  const projects = ref([]);
  const projectForm = reactive(createEmptyProjectForm(today));

  const lastProject = computed(() => projects.value[projects.value.length - 1] ?? null);
  const dialogConfig = computed(() => DIALOG_CONFIG[dialogMode.value] ?? DIALOG_CONFIG.create);

  function openDialog(mode) {
    dialogMode.value = mode;

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

  function confirmDialog() {
    if (dialogMode.value === "create") {
      projects.value = [
        ...projects.value,
        {
          id: `${Date.now()}`,
          name: projectForm.name.trim(),
          description: projectForm.description.trim(),
          startDate: projectForm.startDate,
          endDate: "",
        },
      ];
    } else if (lastProject.value) {
      projects.value = projects.value.map((project) =>
        project.id === lastProject.value.id
          ? {
              ...project,
              description: projectForm.description.trim(),
              endDate: projectForm.endDate,
            }
          : project,
      );
    }

    closeDialog();
  }

  return {
    today,
    dialogMode,
    dialogConfig,
    projectForm,
    lastProject,
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
