<template>
  <nav class="nav-tree" aria-label="Projektbereiche">
    <p class="nav-tree__title">Administrationsbereich</p>

    <button
      v-for="section in sections"
      :key="section.id"
      class="nav-tree__item"
      :class="{ 'nav-tree__item--active': activeSection === section.id }"
      type="button"
      @click="$emit('select-section', section.id)"
    >
      <span class="nav-tree__item-label">{{ section.label }}</span>
      <span class="nav-tree__item-meta">{{ section.meta }}</span>
    </button>
  </nav>
</template>

<script setup>
import { sections } from "../data/sections.js";

defineProps({
  activeSection: {
    type: String,
    required: true,
  },
});

defineEmits(["select-section"]);
</script>
