<template>
  <AppShell @select-section="selectSection">
    <template #sidebar>
      <NavigationTree
        :active-section="activeSection"
        @select-section="selectSection"
      />
    </template>

    <section class="hero-card">
      <p class="hero-card__eyebrow">{{ activeItem.eyebrow }}</p>
      <h1>{{ activeItem.title }}</h1>
      <p class="hero-card__lead">{{ activeItem.lead }}</p>

      <div class="hero-card__chips">
        <span v-for="chip in activeItem.chips" :key="chip" class="hero-card__chip">{{ chip }}</span>
      </div>
    </section>

    <section class="detail-grid">
      <article class="detail-card detail-card--primary">
        <p class="detail-card__label">Rolle im Projekt</p>
        <h2>{{ activeItem.focusTitle }}</h2>
        <p>{{ activeItem.focusText }}</p>
      </article>

      <article class="detail-card">
        <p class="detail-card__label">Aktueller Fokus</p>
        <ul class="detail-list">
          <li v-for="point in activeItem.focusPoints" :key="point">{{ point }}</li>
        </ul>
      </article>

      <article class="detail-card">
        <p class="detail-card__label">Naechster Ausbauschritt</p>
        <p>{{ activeItem.nextStep }}</p>
      </article>
    </section>
  </AppShell>
</template>

<script setup>
import { computed, ref } from "vue";
import AppShell from "./components/AppShell.vue";
import NavigationTree from "./components/NavigationTree.vue";
import { sections } from "./data/sections.js";

const activeSection = ref("dashboard");

const activeItem = computed(
  () => sections.find((section) => section.id === activeSection.value) ?? sections[0],
);

function selectSection(sectionId) {
  activeSection.value = sectionId;
}
</script>
