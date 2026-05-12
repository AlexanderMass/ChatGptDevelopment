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
          <path class="use-case-map__relation" d="M 50 20 L 30 40" />
          <path class="use-case-map__relation" d="M 50 20 L 78 40" />
          <path class="use-case-map__relation" d="M 30 58 L 10 78" />
          <path class="use-case-map__relation" d="M 30 58 L 30 78" />
          <path class="use-case-map__relation" d="M 30 58 L 50 78" />
          <path class="use-case-map__relation" d="M 78 58 L 70 78" />
          <path class="use-case-map__relation" d="M 78 58 L 90 78" />
          <text class="use-case-map__relation-label" x="31" y="34">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="59" y="34">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="7" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="29" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="47" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="64" y="74">&lt;&lt;include&gt;&gt;</text>
          <text class="use-case-map__relation-label" x="83" y="74">&lt;&lt;include&gt;&gt;</text>
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

    <DashboardApplication v-if="activeSection === 'dashboard'" />

    <section v-if="activeItem.contentSections" class="content-sections">
      <article
        v-for="contentSection in activeItem.contentSections"
        :key="contentSection.title"
        class="content-section"
      >
        <h2>{{ contentSection.title }}</h2>
        <p v-for="paragraph in contentSection.paragraphs" :key="getParagraphKey(paragraph)">
          <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
          <button
            v-else-if="paragraph.linkTarget"
            class="content-link"
            type="button"
            @click="selectContentTarget(paragraph.linkTarget)"
          >
            {{ paragraph.text }}
          </button>
          <template v-else-if="paragraph.parts">
            <template
              v-for="(part, index) in paragraph.parts"
              :key="`${getParagraphKey(paragraph)}-${index}`"
            >
              <button
                v-if="part.linkTarget"
                class="content-link"
                type="button"
                @click="selectContentTarget(part.linkTarget)"
              >
                {{ part.text }}
              </button>
              <span v-else>{{ part.text }}</span>
            </template>
          </template>
        </p>
        <div v-if="contentSection.table" class="content-table-wrap">
          <table class="content-table">
            <thead>
              <tr>
                <th v-for="column in contentSection.table.columns" :key="column">{{ column }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in contentSection.table.rows" :key="row.join('|')">
                <td v-for="cell in row" :key="cell">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="contentSection.subsections?.length" class="content-section__subsections">
          <article
            v-for="subsection in contentSection.subsections"
            :id="subsection.id"
            :key="subsection.title"
            class="content-subsection"
          >
            <h3>{{ subsection.title }}</h3>
            <p v-for="paragraph in subsection.paragraphs" :key="getParagraphKey(paragraph)">
              <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
              <button
                v-else-if="paragraph.linkTarget"
                class="content-link"
                type="button"
                @click="selectContentTarget(paragraph.linkTarget)"
              >
                {{ paragraph.text }}
              </button>
            </p>
            <div v-if="subsection.table" class="content-table-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th v-for="column in subsection.table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in subsection.table.rows" :key="row.join('|')">
                    <td v-for="cell in row" :key="cell">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="subsection.subsections?.length" class="content-subsection__children">
              <article
                v-for="childSubsection in subsection.subsections"
                :id="childSubsection.id"
                :key="childSubsection.title"
                class="content-subsection content-subsection--nested"
              >
                <h4>{{ childSubsection.title }}</h4>
                <p
                  v-for="paragraph in childSubsection.paragraphs"
                  :key="getParagraphKey(paragraph)"
                >
                  <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
                  <button
                    v-else-if="paragraph.linkTarget"
                    class="content-link"
                    type="button"
                    @click="selectContentTarget(paragraph.linkTarget)"
                  >
                    {{ paragraph.text }}
                  </button>
                </p>
              </article>
            </div>
            <pre v-if="subsection.code" class="content-code"><code>{{ subsection.code }}</code></pre>
          </article>
        </div>
        <pre v-if="contentSection.code" class="content-code"><code>{{ contentSection.code }}</code></pre>
      </article>
    </section>

    <section v-else-if="activeSection !== 'dashboard'" class="detail-grid">
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
import { computed, nextTick, onMounted, ref } from "vue";
import AppShell from "./components/AppShell.vue";
import NavigationTree from "./components/NavigationTree.vue";
import DashboardApplication from "./views/DashboardApplication.vue";
import { sections, useCases } from "./data/sections.js";

const activeSection = ref("dashboard");

const activeItem = computed(
  () => sections.find((section) => section.id === activeSection.value) ?? sections[0],
);

function selectSection(sectionId) {
  activeSection.value = sectionId;
}

function findSectionBySubsectionId(subsectionId) {
  return sections.find((section) =>
    section.contentSections?.some((contentSection) =>
      hasSubsectionWithId(contentSection.subsections, subsectionId),
    ),
  );
}

function selectContentTarget(targetId) {
  const sectionById = sections.find((section) => section.id === targetId);

  if (sectionById) {
    activeSection.value = sectionById.id;
    return;
  }

  const sectionBySubsection = findSectionBySubsectionId(targetId);

  if (!sectionBySubsection) {
    return;
  }

  activeSection.value = sectionBySubsection.id;

  nextTick(() => {
    document.getElementById(targetId)?.scrollIntoView({ block: "start" });
  });
}

function hasSubsectionWithId(subsections, id) {
  return subsections?.some(
    (subsection) =>
      subsection.id === id || hasSubsectionWithId(subsection.subsections, id),
  );
}

onMounted(() => {
  const hash = decodeURIComponent(window.location.hash.replace("#", ""));

  if (!hash) {
    return;
  }

  const sectionById = sections.find((section) => section.id === hash);
  const sectionBySubsection = findSectionBySubsectionId(hash);

  const targetSection = sectionById ?? sectionBySubsection;

  if (!targetSection) {
    return;
  }

  activeSection.value = targetSection.id;

  nextTick(() => {
    document.getElementById(hash)?.scrollIntoView({ block: "start" });
  });
});

function getParagraphKey(paragraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  return paragraph.text ?? paragraph.parts?.map((part) => part.text).join("") ?? "";
}
</script>
