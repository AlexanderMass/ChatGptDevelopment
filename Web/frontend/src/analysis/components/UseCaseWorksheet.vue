<template>
  <section class="use-case-worksheet" aria-label="Cytoscape-Arbeitsblatt Use Cases">
    <div ref="worksheetElement" class="use-case-worksheet__canvas"></div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import cytoscape from "cytoscape";

const worksheetElement = ref(null);
let graph = null;
let renderRetry = null;

const emit = defineEmits(["select-section"]);

onMounted(() => {
  nextTick(scheduleGraphCreation);
});

onBeforeUnmount(() => {
  if (renderRetry) {
    window.clearTimeout(renderRetry);
  }

  graph?.destroy();
});

function scheduleGraphCreation() {
  if (!worksheetElement.value) {
    return;
  }

  const { height, width } = worksheetElement.value.getBoundingClientRect();

  if (width <= 0 || height <= 0) {
    renderRetry = window.setTimeout(scheduleGraphCreation, 60);
    return;
  }

  createGraph();
}

function createGraph() {
  graph = cytoscape({
    container: worksheetElement.value,
    elements: [
      {
        data: {
          id: "worksheet-use-cases",
          label: "Use-Cases",
        },
        position: {
          x: 320,
          y: 90,
        },
      },
      {
        data: {
          id: "worksheet-dashboard",
          label: "Dashboard nutzen",
          targetSection: "uc-use-dashboard",
        },
        position: {
          x: 190,
          y: 230,
        },
      },
      {
        data: {
          id: "worksheet-cockpit",
          label: "Cockpit nutzen",
          targetSection: "uc-use-cockpit",
        },
        position: {
          x: 450,
          y: 230,
        },
      },
      {
        data: {
          id: "include-dashboard",
          source: "worksheet-use-cases",
          target: "worksheet-dashboard",
          label: "<<include>>",
        },
      },
      {
        data: {
          id: "include-cockpit",
          source: "worksheet-use-cases",
          target: "worksheet-cockpit",
          label: "<<include>>",
        },
      },
    ],
    layout: {
      name: "preset",
    },
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#f4c792",
          "border-color": "#b35c2e",
          "border-width": 2,
          "color": "#1f2a2e",
          "font-size": 20,
          "font-weight": 800,
          "height": "100px",
          "label": "data(label)",
          "shape": "ellipse",
          "text-halign": "center",
          "text-valign": "center",
          "width": "220px",
        },
      },
      {
        selector: "node[targetSection]",
        style: {
          "border-width": 3,
          "cursor": "pointer",
        },
      },
      {
        selector: "edge",
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

  graph.userPanningEnabled(false);
  graph.userZoomingEnabled(false);
  graph.on("tap", "node[targetSection]", (event) => {
    emit("select-section", event.target.data("targetSection"));
  });
  graph.resize();
  graph.zoom(1);
  graph.pan({ x: 0, y: 0 });
}
</script>
