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

      <div v-if="activeItem.chips?.length" class="hero-card__chips">
        <span v-for="chip in activeItem.chips" :key="chip" class="hero-card__chip">{{ chip }}</span>
      </div>
    </section>

    <section v-if="activeSection === 'use-cases'" class="use-case-map" aria-label="Use-Case-Design">
      <div class="use-case-map__actor">Anwender</div>
      <div class="use-case-map__system">
        <p class="use-case-map__system-label">ChatGptDevelopment</p>
        <button
          v-for="useCase in useCases"
          :key="useCase.id"
          class="use-case-map__bubble"
          :class="`use-case-map__bubble--${useCase.id}`"
          type="button"
          @click="selectSection(useCase.id)"
        >
          <span>{{ useCase.label }}</span>
          <small>{{ useCase.goal }}</small>
        </button>
        <svg class="use-case-map__relations" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <marker
              id="include-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          <path class="use-case-map__relation" d="M 50 24 L 25 43" />
          <path class="use-case-map__relation" d="M 50 24 L 75 43" />
          <path class="use-case-map__relation" d="M 25 62 L 13 82" />
          <path class="use-case-map__relation" d="M 25 62 L 37 82" />
          <path class="use-case-map__relation" d="M 75 62 L 63 82" />
          <path class="use-case-map__relation" d="M 75 62 L 88 82" />
          <text class="use-case-map__relation-label" x="32" y="34">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="57" y="34">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="8" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="28" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="57" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="78" y="74">&lt;&lt;include&gt;&gt;</text>
        </svg>
      </div>
    </section>

    <section
      v-if="activeItem.modelClasses"
      class="model-diagram"
      aria-label="Klassendiagramm der Datenbankstruktur"
    >
      <div class="model-diagram__canvas">
        <article
          v-for="modelClass in activeItem.modelClasses"
          :key="modelClass.id"
          class="model-class"
          :class="`model-class--${modelClass.id}`"
        >
          <h2>{{ modelClass.name }}</h2>
          <ul>
            <li v-for="attribute in modelClass.attributes" :key="attribute">{{ attribute }}</li>
          </ul>
        </article>

        <div class="model-diagram__connector model-diagram__connector--project">
          <span>projectId</span>
        </div>
        <div class="model-diagram__connector model-diagram__connector--repository">
          <span>repositoryId</span>
        </div>
      </div>
    </section>

    <section v-if="activeItem.contentSections" class="content-sections">
      <article
        v-for="contentSection in activeItem.contentSections"
        :key="contentSection.title"
        class="content-section"
      >
        <h2>{{ contentSection.title }}</h2>
        <p v-for="paragraph in contentSection.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <div v-if="contentSection.subsections?.length" class="content-section__subsections">
          <article
            v-for="subsection in contentSection.subsections"
            :key="subsection.title"
            class="content-subsection"
        >
          <h3>{{ subsection.title }}</h3>
          <p v-for="paragraph in subsection.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <pre v-if="subsection.code" class="content-code"><code>{{ subsection.code }}</code></pre>
        </article>
      </div>
      <pre v-if="contentSection.code" class="content-code"><code>{{ contentSection.code }}</code></pre>
    </article>
  </section>

    <section v-else class="detail-grid">
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
        <p class="detail-card__label">Nächster Ausbauschritt</p>
        <p>{{ activeItem.nextStep }}</p>
      </article>
    </section>
  </AppShell>
</template>

<script setup>
import { computed, ref } from "vue";
import AppShell from "./components/AppShell.vue";
import NavigationTree from "./components/NavigationTree.vue";
import { sections, useCases } from "./data/sections.js";

const activeSection = ref("dashboard");

const activeItem = computed(
  () => sections.find((section) => section.id === activeSection.value) ?? sections[0],
);

function selectSection(sectionId) {
  activeSection.value = sectionId;
}
</script>
