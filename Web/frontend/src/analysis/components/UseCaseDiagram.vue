<template>
  <section class="use-case-diagram" aria-label="Use-Case-Design">
    <div ref="diagramElement" class="use-case-diagram__canvas"></div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import cytoscape from "cytoscape";

const props = defineProps({
  useCases: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["select-section"]);

const diagramElement = ref(null);
let graph = null;
let renderRetry = null;

const useCasePositions = {
  "uc-use-dashboard": { x: 460, y: 90 },
  "uc-maintain-projects": { x: 295, y: 245 },
  "uc-present-project-data": { x: 625, y: 245 },
  "uc-create-project": { x: 130, y: 430 },
  "uc-administer-projects": { x: 295, y: 430 },
  "uc-analyze-git-data": { x: 460, y: 430 },
  "uc-present-table": { x: 625, y: 430 },
  "uc-present-graph": { x: 790, y: 430 },
};

const defaultPosition = { x: 790, y: 250 };

function getGraphElements() {
  const nodes = props.useCases.map((useCase) => ({
      data: {
        id: useCase.id,
        label: useCase.label,
        type: "useCase",
        targetSection: useCase.id,
      },
      position: useCasePositions[useCase.id] ?? defaultPosition,
      classes: "use-case-node",
    }));

  const includeEdges = props.useCases.flatMap((useCase) =>
    (useCase.includes ?? []).map((includedUseCaseId) => ({
      data: {
        id: `${useCase.id}-${includedUseCaseId}`,
        source: useCase.id,
        target: includedUseCaseId,
        label: "<<include>>",
        type: "include",
      },
    })),
  );

  return [...nodes, ...includeEdges];
}

onMounted(() => {
  nextTick(() => {
    scheduleGraphCreation();
  });
});

onBeforeUnmount(() => {
  if (renderRetry) {
    window.clearTimeout(renderRetry);
  }

  graph?.destroy();
});

function scheduleGraphCreation() {
  if (!diagramElement.value) {
    return;
  }

  const { height, width } = diagramElement.value.getBoundingClientRect();

  if (width <= 0 || height <= 0) {
    renderRetry = window.setTimeout(scheduleGraphCreation, 60);
    return;
  }

  createGraph();
}

function createGraph() {
  if (!diagramElement.value) {
    return;
  }

  graph = cytoscape({
    container: diagramElement.value,
    elements: getGraphElements(),
    layout: { name: "preset" },
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#f4c792",
          "border-color": "#b35c2e",
          "border-width": 2,
          "color": "#1f2a2e",
          "font-size": 16,
          "font-weight": 800,
          "height": "82px",
          "label": "data(label)",
          "shape": "ellipse",
          "text-halign": "center",
          "text-max-width": 140,
          "text-valign": "center",
          "text-wrap": "wrap",
          "width": "170px",
        },
      },
      {
        selector: "node[targetSection]",
        style: {
          "cursor": "pointer",
        },
      },
      {
        selector: "edge[type = 'include']",
        style: {
          "curve-style": "bezier",
          "font-size": 11,
          "font-weight": 800,
          "label": "data(label)",
          "line-color": "#7d3b18",
          "line-style": "dashed",
          "source-endpoint": "outside-to-node",
          "target-arrow-color": "#7d3b18",
          "target-endpoint": "outside-to-node",
          "target-arrow-shape": "triangle",
          "text-background-color": "#fff8ed",
          "text-background-opacity": 1,
          "text-background-padding": 3,
          "text-rotation": "none",
          "width": 2,
          "color": "#7d3b18",
        },
      },
    ],
  });

  graph.on("tap", "node[type = 'useCase']", (event) => {
    emit("select-section", event.target.id());
  });

  graph.userPanningEnabled(false);
  graph.userZoomingEnabled(false);
  graph.resize();
  graph.zoom(1);
  graph.pan({ x: 0, y: 0 });
}

function renderGraphElements() {
  graph.elements().remove();
  graph.add(getGraphElements());
  graph.layout({ name: "preset" }).run();
  graph.resize();
  graph.zoom(1);
  graph.pan({ x: 0, y: 0 });
}
</script>
