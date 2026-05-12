<template>
  <AppShell
    :server-status="serverStatus"
    :show-server-log="showServerLog"
    @refresh-server-status="refreshServerStatus"
    @select-section="selectSection"
    @update:show-server-log="setShowServerLog"
  >
    <template #sidebar>
      <NavigationTree
        :active-section="activeSection"
        :show-server-log="showServerLog"
        @select-section="selectSection"
      />
    </template>

    <DashboardApplication v-if="activeSection === 'dashboard'" :active-item="activeItem" />
    <ServerLogView v-else-if="activeSection === 'server-log'" />
    <AnalysisWorkspace
      v-else
      :active-item="activeItem"
      :active-section="activeSection"
      :use-cases="useCases"
      @select-section="selectSection"
      @select-target="selectContentTarget"
    />
  </AppShell>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import AnalysisWorkspace from "./analysis/components/AnalysisWorkspace.vue";
import { sections, useCases } from "./analysis/data/sections.js";
import AppShell from "./app-shell/components/AppShell.vue";
import NavigationTree from "./app-shell/components/NavigationTree.vue";
import ServerLogView from "./app-shell/components/ServerLogView.vue";
import DashboardApplication from "./dashboard/views/DashboardApplication.vue";
import { fetchServerStatus } from "./shared/api/serverStatusApi.js";

const activeSection = ref("dashboard");
const serverStatus = ref("stopped");
const showServerLog = ref(true);

const activeItem = computed(
  () => sections.find((section) => section.id === activeSection.value) ?? sections[0],
);

function selectSection(sectionId) {
  if (sectionId === "server-log" && !showServerLog.value) {
    return;
  }

  activeSection.value = sectionId;
}

function setShowServerLog(value) {
  showServerLog.value = value;

  if (!value && activeSection.value === "server-log") {
    activeSection.value = "dashboard";
  }
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
  refreshServerStatus();

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

async function refreshServerStatus() {
  serverStatus.value = await fetchServerStatus();
}
</script>
