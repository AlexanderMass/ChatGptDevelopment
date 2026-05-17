<template>
  <section class="cockpit-app" aria-label="Cockpit">
    <article class="cockpit-app__workspace">
      <section class="cockpit-bubble">
        <div class="cockpit-panel">
          <div class="cockpit-panel__toolbar">
            <label class="cockpit-project-selector">
              <span>Projects:</span>
              <select v-model="selectedProjectId" :disabled="isLoadingProjects || !projects.length">
                <option
                  v-for="project in projects"
                  :key="project.projectId"
                  :value="project.projectId"
                >
                  {{ project.name }}
                </option>
              </select>
            </label>
            <p v-if="statusText" class="cockpit-panel__status">{{ statusText }}</p>
            <p v-if="errorMessage" class="cockpit-panel__error">{{ errorMessage }}</p>
          </div>

          <div class="cockpit-panel__body">
            <section class="cockpit-panel__tree" aria-label="Cockpit Directory Tree">
              <ul v-if="contextTree?.children?.length" class="cockpit-tree">
                <CockpitTreeNode
                  v-for="node in contextTree.children"
                  :key="node.id"
                  :node="node"
                  :active-file-id="selectedFile?.id"
                  @select-file="selectFile"
                />
              </ul>
              <p v-else class="cockpit-empty-state">
                Kein Kontextordner gefunden.
              </p>
            </section>

            <section class="cockpit-panel__file" aria-label="Cockpit File Presenter">
              <header v-if="selectedFileContent" class="cockpit-file__header">
                <strong>{{ selectedFileContent.fileName }}</strong>
              </header>
              <pre v-if="selectedFileContent" class="cockpit-file__content">{{ selectedFileContent.content }}</pre>
              <p v-else class="cockpit-empty-state">
                Datei im Kontextbaum auswählen.
              </p>
            </section>
          </div>
        </div>
      </section>
    </article>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref, watch } from "vue";
import {
  fetchCockpitProjects,
  fetchContextFile,
  fetchProjectContextTree
} from "../api/cockpitApi.js";

const selectedProjectId = ref("");
const selectedFile = ref(null);
const selectedFileContent = ref(null);
const projects = ref([]);
const contextTree = ref(null);
const isLoadingProjects = ref(false);
const isLoadingContextTree = ref(false);
const isLoadingFile = ref(false);
const errorMessage = ref("");

const statusText = computed(() => {
  if (isLoadingProjects.value) {
    return "Projekte werden geladen.";
  }

  if (isLoadingContextTree.value) {
    return "Kontextordner wird geladen.";
  }

  if (isLoadingFile.value) {
    return "Datei wird geladen.";
  }

  if (!projects.value.length) {
    return "Keine Cockpit-Projekte vorhanden.";
  }

  return "";
});

const CockpitTreeNode = defineComponent({
  name: "CockpitTreeNode",
  props: {
    node: {
      type: Object,
      required: true
    },
    activeFileId: {
      type: String,
      default: ""
    }
  },
  emits: ["select-file"],
  setup(props, { emit }) {
    return () =>
      h("li", { class: ["cockpit-tree__item", `cockpit-tree__item--${props.node.type}`] }, [
        h(
          "button",
          {
            class: [
              "cockpit-tree__button",
              props.node.id === props.activeFileId ? "cockpit-tree__button--active" : ""
            ],
            type: "button",
            disabled: props.node.type !== "file",
            onClick: () => props.node.type === "file" && emit("select-file", props.node)
          },
          props.node.label
        ),
        props.node.children?.length
          ? h(
              "ul",
              { class: "cockpit-tree cockpit-tree--nested" },
              props.node.children.map((child) =>
                h(CockpitTreeNode, {
                  key: child.id,
                  node: child,
                  activeFileId: props.activeFileId,
                  onSelectFile: (fileNode) => emit("select-file", fileNode)
                })
              )
            )
          : null
      ]);
  }
});

onMounted(loadCockpitProjects);

watch(selectedProjectId, (projectId) => {
  if (projectId) {
    loadProjectContextTree(projectId);
  } else {
    contextTree.value = null;
    selectedFile.value = null;
    selectedFileContent.value = null;
  }
});

async function loadCockpitProjects() {
  isLoadingProjects.value = true;
  errorMessage.value = "";

  try {
    projects.value = await fetchCockpitProjects();
    selectedProjectId.value = projects.value[0]?.projectId ?? "";
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoadingProjects.value = false;
  }
}

async function loadProjectContextTree(projectId) {
  isLoadingContextTree.value = true;
  errorMessage.value = "";
  selectedFile.value = null;
  selectedFileContent.value = null;

  try {
    contextTree.value = await fetchProjectContextTree(projectId);
  } catch (error) {
    errorMessage.value = error.message;
    contextTree.value = null;
  } finally {
    isLoadingContextTree.value = false;
  }
}

async function selectFile(fileNode) {
  selectedFile.value = fileNode;
  selectedFileContent.value = null;
  isLoadingFile.value = true;
  errorMessage.value = "";

  try {
    selectedFileContent.value = await fetchContextFile(fileNode.repositoryId, fileNode.gitPath);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoadingFile.value = false;
  }
}
</script>
