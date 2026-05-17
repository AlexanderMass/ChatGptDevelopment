<template>
  <section class="hero-card">
    <p class="hero-card__eyebrow">{{ activeItem.eyebrow }}</p>
    <h1>{{ activeItem.title }}</h1>
    <p v-if="activeItem.lead" class="hero-card__lead">{{ activeItem.lead }}</p>

    <div v-if="activeItem.chips?.length" class="hero-card__chips">
      <span v-for="chip in activeItem.chips" :key="chip" class="hero-card__chip">{{ chip }}</span>
    </div>
  </section>

  <UseCaseDiagram
    v-if="activeItem.id === 'uc-use-dashboard'"
    :use-cases="dashboardUseCases"
    @select-section="$emit('select-section', $event)"
  />

  <UseCaseWorksheet
    v-if="activeSection === 'use-cases'"
    @select-section="$emit('select-section', $event)"
  />

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
      <p v-for="paragraph in contentSection.paragraphs" :key="getParagraphKey(paragraph)">
        <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
        <button
          v-else-if="paragraph.linkTarget"
          class="content-link"
          type="button"
          @click="$emit('select-target', paragraph.linkTarget)"
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
              @click="$emit('select-target', part.linkTarget)"
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
              @click="$emit('select-target', paragraph.linkTarget)"
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
                  @click="$emit('select-target', paragraph.linkTarget)"
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
</template>

<script setup>
import { computed } from "vue";
import UseCaseDiagram from "./UseCaseDiagram.vue";
import UseCaseWorksheet from "./UseCaseWorksheet.vue";

const props = defineProps({
  activeItem: {
    type: Object,
    required: true,
  },
  activeSection: {
    type: String,
    required: true,
  },
  useCases: {
    type: Array,
    required: true,
  },
});

defineEmits(["select-section", "select-target"]);

const dashboardUseCases = computed(() => {
  const dashboardUseCase = props.useCases.find((useCase) => useCase.id === "uc-use-dashboard");

  if (!dashboardUseCase) {
    return [];
  }

  const dashboardUseCaseIds = collectIncludedUseCaseIds(dashboardUseCase);
  return props.useCases.filter((useCase) => dashboardUseCaseIds.has(useCase.id));
});

function collectIncludedUseCaseIds(useCase, collectedUseCaseIds = new Set()) {
  if (collectedUseCaseIds.has(useCase.id)) {
    return collectedUseCaseIds;
  }

  collectedUseCaseIds.add(useCase.id);

  for (const includedUseCaseId of useCase.includes ?? []) {
    const includedUseCase = props.useCases.find((candidate) => candidate.id === includedUseCaseId);

    if (includedUseCase) {
      collectIncludedUseCaseIds(includedUseCase, collectedUseCaseIds);
    }
  }

  return collectedUseCaseIds;
}

function getParagraphKey(paragraph) {
  if (typeof paragraph === "string") {
    return paragraph;
  }

  return paragraph.text ?? paragraph.parts?.map((part) => part.text).join("") ?? "";
}
</script>
