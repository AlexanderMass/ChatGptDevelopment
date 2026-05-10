<template>
  <div class="nav-tree__branch">
    <button
      class="nav-tree__item"
      :class="{
        'nav-tree__item--active': activeSection === node.id,
        'nav-tree__item--active-path': hasActiveDescendant(node),
        'nav-tree__item--folder': node.children,
        'nav-tree__item--expanded': isExpanded(node.id),
      }"
      :style="{ '--tree-depth': depth }"
      type="button"
      @click="handleSelect"
    >
      <span class="nav-tree__item-label">{{ node.label }}</span>
    </button>

    <div v-if="node.children && isExpanded(node.id)" class="nav-tree__children">
      <NavigationTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :active-section="activeSection"
        :expanded-nodes="expandedNodes"
        :depth="depth + 1"
        @select-section="$emit('select-section', $event)"
        @toggle-node="$emit('toggle-node', $event)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
  expandedNodes: {
    type: Set,
    required: true,
  },
  node: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select-section", "toggle-node"]);

function handleSelect() {
  emit("select-section", props.node.id);

  if (props.node.children) {
    emit("toggle-node", props.node.id);
  }
}

function isExpanded(sectionId) {
  return props.expandedNodes.has(sectionId);
}

function hasActiveDescendant(node) {
  return Boolean(
    node.children?.some(
      (child) => child.id === props.activeSection || hasActiveDescendant(child),
    ),
  );
}
</script>
