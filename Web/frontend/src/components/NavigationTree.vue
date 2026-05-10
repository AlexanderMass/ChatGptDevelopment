<template>
  <nav class="nav-tree" aria-label="Projektbereiche">
    <p class="nav-tree__title">Administrationsbereich</p>

    <NavigationTreeNode
      v-for="section in rootSections"
      :key="section.id"
      :node="section"
      :active-section="activeSection"
      :expanded-nodes="expandedNodes"
      @select-section="$emit('select-section', $event)"
      @toggle-node="toggleNode"
    />
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import NavigationTreeNode from "./NavigationTreeNode.vue";
import { sections } from "../data/sections.js";

const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
});

defineEmits(["select-section"]);

const childIds = new Set();
const parentIdsByChild = new Map();

for (const section of sections) {
  collectTreeRelations(section);
}

const rootSections = sections.filter((section) => !childIds.has(section.id));
const expandedNodes = ref(new Set());

watch(
  () => props.activeSection,
  (sectionId) => expandActiveSectionPath(sectionId),
  { immediate: true },
);

function collectTreeRelations(section) {
  for (const child of section.children ?? []) {
    childIds.add(child.id);
    parentIdsByChild.set(child.id, section.id);
    collectTreeRelations(child);
  }
}

function toggleNode(sectionId) {
  const nextExpandedNodes = new Set(expandedNodes.value);

  if (nextExpandedNodes.has(sectionId)) {
    nextExpandedNodes.delete(sectionId);
  } else {
    nextExpandedNodes.add(sectionId);
  }

  expandedNodes.value = nextExpandedNodes;
}

function expandActiveSectionPath(sectionId) {
  const nextExpandedNodes = new Set(expandedNodes.value);
  let parentId = parentIdsByChild.get(sectionId);

  while (parentId) {
    nextExpandedNodes.add(parentId);
    parentId = parentIdsByChild.get(parentId);
  }

  expandedNodes.value = nextExpandedNodes;
}
</script>
