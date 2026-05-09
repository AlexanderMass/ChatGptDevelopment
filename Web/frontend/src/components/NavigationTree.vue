<template>
  <nav class="nav-tree" aria-label="Projektbereiche">
    <p class="nav-tree__title">Administrationsbereich</p>

    <div v-for="section in rootSections" :key="section.id" class="nav-tree__branch">
      <button
        class="nav-tree__item"
        :class="{
          'nav-tree__item--active': activeSection === section.id,
          'nav-tree__item--active-path': hasActiveDescendant(section),
        }"
        type="button"
        @click="$emit('select-section', section.id)"
      >
        <span class="nav-tree__item-label">{{ section.label }}</span>
      </button>

      <div v-if="section.children" class="nav-tree__children">
        <div
          v-for="child in section.children"
          :key="child.id"
          class="nav-tree__branch"
        >
          <button
            class="nav-tree__item nav-tree__item--child"
            :class="{
              'nav-tree__item--active': activeSection === child.id,
              'nav-tree__item--active-path': hasActiveDescendant(child),
              'nav-tree__item--folder': child.children,
              'nav-tree__item--expanded': isExpanded(child.id),
            }"
            type="button"
            @click="handleChildSelect(child)"
          >
            <span class="nav-tree__item-label">{{ child.label }}</span>
          </button>

          <div v-if="child.children && isExpanded(child.id)" class="nav-tree__grandchildren">
            <button
              v-for="grandchild in child.children"
              :key="grandchild.id"
              class="nav-tree__item nav-tree__item--grandchild"
              :class="{ 'nav-tree__item--active': activeSection === grandchild.id }"
              type="button"
              @click="$emit('select-section', grandchild.id)"
            >
              <span class="nav-tree__item-label">{{ grandchild.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { sections } from "../data/sections.js";

const childIds = new Set(
  sections.flatMap((section) => section.children?.map((child) => child.id) ?? []),
);

const rootSections = sections.filter((section) => !childIds.has(section.id));
const expandableChildIds = new Set(
  sections.flatMap((section) =>
    section.children?.filter((child) => child.children).map((child) => child.id) ?? [],
  ),
);
const grandchildIdsByParent = new Map(
  sections.flatMap((section) =>
    section.children
      ?.filter((child) => child.children)
      .map((child) => [child.id, new Set(child.children.map((grandchild) => grandchild.id))]) ?? [],
  ),
);

const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["select-section"]);
const expandedNodes = ref(new Set());

watch(
  () => props.activeSection,
  (sectionId) => expandActiveSectionPath(sectionId),
  { immediate: true },
);

function handleChildSelect(child) {
  emit("select-section", child.id);

  if (expandableChildIds.has(child.id)) {
    toggleNode(child.id);
  }
}

function isExpanded(sectionId) {
  return expandedNodes.value.has(sectionId);
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

  for (const [parentId, grandchildIds] of grandchildIdsByParent) {
    if (grandchildIds.has(sectionId)) {
      nextExpandedNodes.add(parentId);
    }
  }

  expandedNodes.value = nextExpandedNodes;
}

function hasActiveDescendant(section) {
  return Boolean(
    section.children?.some(
      (child) => child.id === props.activeSection || hasActiveDescendant(child),
    ),
  );
}
</script>
