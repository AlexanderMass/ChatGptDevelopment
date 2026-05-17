<template>
  <section class="dashboard-app" aria-label="Dashboard">
    <article class="dashboard-app__workspace">
      <section class="dashboard-bubble dashboard-bubble--project-admin">
        <section class="project-maintenance-panel" @click="closeProjectContextMenu">
          <div class="project-maintenance-panel__table-wrap">
            <table class="project-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Projektstart</th>
                  <th>Projektende</th>
                  <th class="project-table__number">Repositories</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="project in projects"
                  :key="project.projectId"
                  :data-project-row-id="project.projectId"
                  :class="{ 'project-table__row--selected': selectedProject?.projectId === project.projectId }"
                  @click.stop="selectProject(project)"
                  @contextmenu.prevent="openProjectContextMenu($event, project)"
                  @mouseenter="openProjectTooltip($event, project)"
                  @mousemove="moveProjectTooltip($event)"
                  @mouseleave="closeProjectTooltip"
                >
                  <td>{{ project.name }}</td>
                  <td>{{ project.status }}</td>
                  <td>{{ formatDate(project.startDate) }}</td>
                  <td>{{ formatDate(project.endDate) }}</td>
                  <td class="project-table__number">{{ project.repositories?.length ?? 0 }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <aside class="project-maintenance-panel__actions">
            <button class="dashboard-action" type="button" @click.stop="openDialog('create')">
              Projekt anlegen
            </button>
            <button
              class="dashboard-action dashboard-action--secondary"
              type="button"
              :disabled="isAnalyzing"
              @click.stop="analyzeGitData"
            >
              {{ isAnalyzing ? "Analyse läuft..." : "Git-Daten analysieren" }}
            </button>
          </aside>

          <Teleport to="body">
            <div
              v-if="projectContextMenu"
              class="project-context-menu"
              :style="{ left: `${projectContextMenu.x}px`, top: `${projectContextMenu.y}px` }"
              @click.stop
            >
              <button type="button" @click="administerContextProject">
                Projekt administrieren
              </button>
            </div>
          </Teleport>

          <Teleport to="body">
            <div
              v-if="projectTooltip"
              class="project-tooltip"
              :style="{ left: `${projectTooltip.x}px`, top: `${projectTooltip.y}px` }"
            >
              <table>
                <tbody>
                  <tr
                    v-for="repository in projectTooltip.project.repositories"
                    :key="repository.repositoryId ?? repository.path"
                  >
                    <td>{{ repositoryName(repository) }}</td>
                    <td>{{ formatDateOnly(repository.firstCheckInDate) }}</td>
                    <td>{{ formatDateOnly(repository.lastCommitDate) }}</td>
                    <td>{{ repository.checkInCount ?? 0 }} Commits</td>
                  </tr>
                  <tr v-if="!projectTooltip.project.repositories?.length">
                    <td colspan="4">Keine Repositories zugeordnet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Teleport>
        </section>
      </section>

      <section class="dashboard-bubble dashboard-bubble--project-presentation">
        <div class="project-presentation-tabs" role="tablist" aria-label="Projektpräsentation">
          <button
            :class="[
              'project-presentation-tabs__tab',
              { 'project-presentation-tabs__tab--active': activePresentationTab === 'table' },
            ]"
            type="button"
            role="tab"
            :aria-selected="activePresentationTab === 'table'"
            @click="activePresentationTab = 'table'"
          >
            Tabellarische Sicht
          </button>
          <button
            :class="[
              'project-presentation-tabs__tab',
              { 'project-presentation-tabs__tab--active': activePresentationTab === 'graph' },
            ]"
            type="button"
            role="tab"
            :aria-selected="activePresentationTab === 'graph'"
            @click="activePresentationTab = 'graph'"
          >
            Grafische Sicht
          </button>
        </div>

        <div v-if="activePresentationTab === 'table'" class="project-presentation-panel">
          <div class="project-presentation-panel__toolbar">
            <label class="project-selector project-selector--inline">
              <span>Projekt:</span>
              <select v-model="selectedPresentationProjectId">
                <option
                  v-for="project in projects"
                  :key="project.projectId"
                  :value="project.projectId"
                >
                  {{ project.name }}
                </option>
              </select>
            </label>

            <label class="project-selector project-selector--inline">
              <span>Repository-Filter:</span>
              <select v-model="selectedRepositoryFilter">
                <option value="">Keiner</option>
                <option
                  v-for="repository in selectedPresentationRepositories"
                  :key="repository.repositoryId"
                  :value="repository.repositoryId"
                >
                  {{ repositoryName(repository) }}
                </option>
              </select>
            </label>

            <label class="project-time-toggle">
              <input v-model="showCheckInTime" type="checkbox" />
              <span>Uhrzeit</span>
            </label>
          </div>

          <div class="check-in-metric-table-wrap">
            <table class="check-in-metric-table">
              <thead>
                <tr>
                  <th>Check-in</th>
                  <th>Message Subject</th>
                  <th class="check-in-metric-table__number">Dateien</th>
                  <th class="check-in-metric-table__number">Added</th>
                  <th class="check-in-metric-table__number">Deleted</th>
                  <th class="check-in-metric-table__number">Net</th>
                  <th class="check-in-metric-table__number">Churn</th>
                  <th class="check-in-metric-table__number">Files</th>
                  <th>Merge</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoadingCheckInMetrics">
                  <td colspan="9">Check-in-Metriken werden geladen.</td>
                </tr>
                <tr v-else-if="!filteredCheckInMetrics.length">
                  <td colspan="9">Für dieses Projekt sind keine Check-in-Metriken vorhanden.</td>
                </tr>
                <template v-else>
                  <tr
                    v-for="metric in filteredCheckInMetrics"
                    :key="metric.checkInMetricId"
                  >
                    <td>{{ formatCheckInDate(metric.commitDate) }}</td>
                    <td>{{ metric.messageSubject }}</td>
                    <td class="check-in-metric-table__number">{{ metric.changedFileCount }}</td>
                    <td class="check-in-metric-table__number">{{ metric.addedLineCount }}</td>
                    <td class="check-in-metric-table__number">{{ metric.deletedLineCount }}</td>
                    <td class="check-in-metric-table__number">{{ metric.netLineChange }}</td>
                    <td class="check-in-metric-table__number">{{ metric.churnLineCount }}</td>
                    <td class="check-in-metric-table__number">{{ metric.trackedFileCount }}</td>
                    <td>{{ formatBoolean(metric.isMergeCommit) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="project-presentation-panel project-presentation-panel--graph">
          <div class="project-presentation-panel__toolbar project-presentation-panel__toolbar--graph">
            <label class="project-selector">
              <span>Graphentyp</span>
              <select v-model="selectedGraphType">
                <option value="checkInCount">Check-in-Count</option>
                <option value="trackedFileCount">Anzahl der Files</option>
                <option value="netLineChange">Net Line Change</option>
                <option value="sourceCodeGrowth">Sourcecode-Wachstum</option>
              </select>
            </label>

            <label class="project-selector">
              <span>Projekt</span>
              <select v-model="selectedPresentationProjectId" :disabled="!selectedGraphTypeRequiresProject">
                <option
                  v-for="project in projects"
                  :key="project.projectId"
                  :value="project.projectId"
                >
                  {{ project.name }}
                </option>
              </select>
            </label>

            <label class="project-selector">
              <span>Gruppierung</span>
              <select v-model="selectedGraphGrouping">
                <option value="daily">Tägliche Gruppierung</option>
                <option value="weekly">Wöchentliche Gruppierung</option>
              </select>
            </label>
          </div>

          <div ref="metricChartElement" class="graph-presentation-area">
            <p v-if="!checkInMetrics.length">Für dieses Projekt sind keine Graphdaten vorhanden.</p>
          </div>
        </div>
      </section>

      <p v-if="statusMessage" class="dashboard-app__status">{{ statusMessage }}</p>
      <p v-if="errorMessage" class="dashboard-app__error">{{ errorMessage }}</p>
    </article>

    <ProjectDialog
      v-if="dialogMode"
      :config="dialogConfig"
      :form="projectForm"
      :is-saving="isSaving"
      :error-message="errorMessage"
      :repositories="repositories"
      :today="today"
      @close="closeDialog"
      @confirm="handleConfirmDialog"
      @toggle-repository="toggleRepository"
      @update-field="updateProjectForm"
    />

    <MessageBox
      v-if="pendingRepositoryRemovalWarning"
      title="Repositories entfernen"
      message="Es wurden Repositories entfernt. Beim Speichern werden diese Repository-Zuordnungen sofort entfernt. Zugehoerige Check-in-Metriken werden dabei ebenfalls geloescht."
      confirm-label="Speichern"
      cancel-label="Abbrechen"
      @confirm="confirmRepositoryRemoval"
      @cancel="cancelRepositoryRemoval"
    />

    <Teleport to="body">
      <div v-if="gitAnalysisResult" class="message-box-backdrop" role="presentation">
        <section class="message-box git-analysis-result" role="alertdialog" aria-modal="true">
          <header class="message-box__header">
            <h2>Git-Datenanalyse abgeschlossen</h2>
          </header>

          <div v-if="gitAnalysisResult.newCheckInMetrics > 0" class="git-analysis-result__content">
            <article
              v-for="project in gitAnalysisResult.projects"
              :key="project.projectId"
              class="git-analysis-result__project"
            >
              <h3>{{ project.name }}</h3>
              <ul>
                <li
                  v-for="repository in project.repositories"
                  :key="repository.repositoryId"
                >
                  {{ repository.name }}: {{ repository.newCheckInMetrics }} neue Check-ins
                </li>
                <li v-if="!project.repositories.length">Keine Repositories zugeordnet</li>
              </ul>
            </article>
          </div>

          <p v-else>Es wurden keine neuen Check-ins gefunden.</p>

          <p class="git-analysis-result__total">
            Gesamt: {{ gitAnalysisResult.newCheckInMetrics }} neue Check-ins
          </p>

          <div class="message-box__actions">
            <button
              class="message-box__button message-box__button--primary"
              type="button"
              @click="closeGitAnalysisResult"
            >
              OK
            </button>
          </div>
        </section>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import MessageBox from "../../shared/components/MessageBox.vue";
import ProjectDialog from "../components/ProjectDialog.vue";
import { useProjectAdministration } from "../composables/useProjectAdministration.js";

use([CanvasRenderer, GridComponent, LineChart, TooltipComponent]);

defineProps({
  activeItem: {
    type: Object,
    required: true,
  },
});

const {
  today,
  dialogMode,
  dialogConfig,
  projectForm,
  repositories,
  projects,
  checkInMetrics,
  selectedProject,
  selectedPresentationProjectId,
  isSaving,
  isAnalyzing,
  isLoadingCheckInMetrics,
  pendingRepositoryRemovalWarning,
  gitAnalysisResult,
  statusMessage,
  errorMessage,
  openDialog,
  closeDialog,
  confirmDialog,
  analyzeGitData,
  closeGitAnalysisResult,
  hasRemovedRepositories,
  updateProjectForm,
} = useProjectAdministration();

const projectContextMenu = ref(null);
const projectTooltip = ref(null);
const activePresentationTab = ref("table");
const selectedGraphType = ref("checkInCount");
const selectedGraphGrouping = ref("daily");
const selectedGraphTypeRequiresProject = true;
const showCheckInTime = ref(false);
const selectedRepositoryFilter = ref("");
const metricChartElement = ref(null);
let metricChart;
let selectedProjectRowElement;

const selectedPresentationProject = computed(() =>
  projects.value.find((project) => String(project.projectId) === String(selectedPresentationProjectId.value))
);
const selectedPresentationRepositories = computed(() => selectedPresentationProject.value?.repositories ?? []);
const filteredCheckInMetrics = computed(() => {
  if (!selectedRepositoryFilter.value) {
    return checkInMetrics.value;
  }

  return checkInMetrics.value.filter(
    (metric) => String(metric.repositoryId) === String(selectedRepositoryFilter.value)
  );
});
const metricChartData = computed(() =>
  buildMetricChartData(filteredCheckInMetrics.value, selectedGraphType.value, selectedGraphGrouping.value)
);

watch(selectedPresentationProjectId, () => {
  selectedRepositoryFilter.value = "";
});

watch(
  [activePresentationTab, metricChartData],
  () => {
    renderMetricChart();
  },
  { deep: true }
);

window.addEventListener("resize", resizeMetricChart);

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeMetricChart);
  metricChart?.dispose();
});

function selectProject(project) {
  selectedProject.value = project;
}

function openProjectContextMenu(event, project) {
  selectProject(project);
  selectedProjectRowElement = event.currentTarget;

  projectContextMenu.value = {
    project,
    x: event.clientX + 1,
    y: event.clientY + 1,
  };

  window.addEventListener("mousemove", closeContextMenuOutsideHoverAreas);
}

function closeProjectContextMenu() {
  projectContextMenu.value = null;
  selectedProjectRowElement = null;
  window.removeEventListener("mousemove", closeContextMenuOutsideHoverAreas);
}

function openProjectTooltip(event, project) {
  projectTooltip.value = {
    project,
    x: event.clientX + 12,
    y: event.clientY - 6,
  };
}

function moveProjectTooltip(event) {
  if (!projectTooltip.value) {
    return;
  }

  projectTooltip.value = {
    ...projectTooltip.value,
    x: event.clientX + 12,
    y: event.clientY - 6,
  };
}

function closeProjectTooltip() {
  projectTooltip.value = null;
}

function closeContextMenuOutsideHoverAreas(event) {
  const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
  const contextMenuElement = document.querySelector(".project-context-menu");
  const isOverSelectedRow = Boolean(selectedProjectRowElement?.contains(hoveredElement));
  const isOverContextMenu = Boolean(contextMenuElement?.contains(hoveredElement));

  if (!isOverSelectedRow && !isOverContextMenu) {
    closeProjectContextMenu();
  }
}

function administerContextProject() {
  if (!projectContextMenu.value?.project) {
    return;
  }

  openDialog("admin", projectContextMenu.value.project);
  closeProjectContextMenu();
}

function toggleRepository(repositoryPath, isSelected) {
  const nextRepositoryPaths = isSelected
    ? [...projectForm.repositoryPaths, repositoryPath]
    : projectForm.repositoryPaths.filter((path) => path !== repositoryPath);

  updateProjectForm("repositoryPaths", nextRepositoryPaths);
}

function handleConfirmDialog() {
  if (
    dialogMode.value === "admin" &&
    !pendingRepositoryRemovalWarning.value &&
    hasRemovedRepositories(selectedProject.value, projectForm)
  ) {
    pendingRepositoryRemovalWarning.value = true;
    return;
  }

  confirmDialog();
}

function confirmRepositoryRemoval() {
  pendingRepositoryRemovalWarning.value = false;
  confirmDialog();
}

function cancelRepositoryRemoval() {
  pendingRepositoryRemovalWarning.value = false;
}

function formatDate(value) {
  return value || "nicht gesetzt";
}

function formatDateOnly(value) {
  if (!value) {
    return "nicht gesetzt";
  }

  return new Date(value).toLocaleDateString("de-DE");
}

function formatCheckInDate(value) {
  if (!value) {
    return "nicht gesetzt";
  }

  const date = new Date(value);
  const dateText = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  if (showCheckInTime.value) {
    const timeText = new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
    return `${dateText}, ${timeText}`;
  }

  return dateText;
}

function formatBoolean(value) {
  return value ? "Ja" : "Nein";
}

async function renderMetricChart() {
  if (activePresentationTab.value !== "graph") {
    metricChart?.dispose();
    metricChart = undefined;
    return;
  }

  await nextTick();

  if (!metricChartElement.value || !checkInMetrics.value.length) {
    metricChart?.dispose();
    metricChart = undefined;
    return;
  }

  metricChart?.dispose();
  metricChart = init(metricChartElement.value);
  metricChart.setOption({
    animationDuration: 450,
    grid: {
      top: 28,
      right: 26,
      bottom: 42,
      left: 54,
    },
    tooltip: {
      trigger: "axis",
      appendToBody: true,
      className: "metric-chart-tooltip",
      confine: true,
      formatter: formatMetricChartTooltip,
      position(point, _params, _dom, _rect, size) {
        const tooltipWidth = size.contentSize[0];
        const tooltipHeight = size.contentSize[1];
        return [point[0] - tooltipWidth / 2, point[1] - tooltipHeight - 12];
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: metricChartData.value.labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: graphTypeLabel(selectedGraphType.value),
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: metricChartData.value.values,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.08,
        },
      },
    ],
  });
}

function resizeMetricChart() {
  metricChart?.resize();
}

function buildMetricChartData(metrics, graphType, grouping) {
  const buckets = new Map();

  for (const metric of metrics) {
    const bucketKey = grouping === "weekly"
      ? weekBucketKey(metric.commitDate)
      : dayBucketKey(metric.commitDate);

    if (!bucketKey) {
      continue;
    }

    const bucket = buckets.get(bucketKey) ?? {
      label: bucketKey,
      count: 0,
      maxTrackedFileCount: 0,
      netLineChange: 0,
      metrics: [],
    };

    bucket.count += 1;
    bucket.maxTrackedFileCount = Math.max(bucket.maxTrackedFileCount, metric.trackedFileCount ?? 0);
    bucket.netLineChange += metric.netLineChange ?? 0;
    bucket.metrics.push(metric);
    buckets.set(bucketKey, bucket);
  }

  const orderedBuckets = [...buckets.values()].sort((left, right) => left.label.localeCompare(right.label));
  let cumulativeNetLineChange = 0;
  const values = [];

  for (const bucket of orderedBuckets) {
    bucket.metrics.sort((left, right) => String(left.commitDate).localeCompare(String(right.commitDate)));

    if (graphType === "trackedFileCount") {
      values.push(bucket.maxTrackedFileCount);
      continue;
    }

    if (graphType === "netLineChange") {
      values.push(bucket.netLineChange);
      continue;
    }

    if (graphType === "sourceCodeGrowth") {
      cumulativeNetLineChange += bucket.netLineChange;
      values.push(cumulativeNetLineChange);
      continue;
    }

    values.push(bucket.count);
  }

  return {
    labels: orderedBuckets.map((bucket) => bucket.label),
    values,
    buckets: orderedBuckets,
  };
}

function formatMetricChartTooltip(params) {
  const point = Array.isArray(params) ? params[0] : params;
  const bucket = metricChartData.value.buckets?.[point?.dataIndex];

  if (!bucket) {
    return "";
  }

  const graphType = selectedGraphType.value;
  const graphLabel = graphTypeLabel(graphType);
  const totalText = metricTooltipTotalText(bucket, graphType, point?.value);
  const rows = bucket.metrics
    .map((metric) => metricTooltipRow(metric, graphType))
    .join("");

  return `
    <section class="metric-chart-tooltip__content">
      <header class="metric-chart-tooltip__header">
        <strong>${escapeHtml(bucket.label)}: ${escapeHtml(graphLabel)} ${escapeHtml(totalText)}</strong>
      </header>
      <div class="metric-chart-tooltip__list">
        ${rows || "<div class=\"metric-chart-tooltip__empty\">Keine Check-ins</div>"}
      </div>
    </section>
  `;
}

function metricTooltipTotalText(bucket, graphType, value) {
  if (graphType === "trackedFileCount") {
    return `${value ?? bucket.maxTrackedFileCount} Files`;
  }

  if (graphType === "netLineChange") {
    return formatSignedNumber(value ?? bucket.netLineChange);
  }

  if (graphType === "sourceCodeGrowth") {
    return `${formatSignedNumber(value ?? 0)} kumuliert`;
  }

  return `${bucket.count} Check-ins`;
}

function metricTooltipRow(metric, graphType) {
  const subject = metric.messageSubject || "(ohne Message)";
  const time = formatMetricTooltipTime(metric.commitDate);
  const detail = metricTooltipDetail(metric, graphType);

  return `
    <article class="metric-chart-tooltip__row">
      <span>${escapeHtml(time)}: <strong>${escapeHtml(subject)}</strong>${detail}</span>
    </article>
  `;
}

function metricTooltipDetail(metric, graphType) {
  if (graphType === "trackedFileCount") {
    return ` · Files ${escapeHtml(String(metric.trackedFileCount ?? 0))}`;
  }

  if (graphType === "netLineChange" || graphType === "sourceCodeGrowth") {
    return ` · Net ${escapeHtml(formatSignedNumber(metric.netLineChange ?? 0))} · Added ${escapeHtml(String(metric.addedLineCount ?? 0))} · Deleted ${escapeHtml(String(metric.deletedLineCount ?? 0))}`;
  }

  return "";
}

function formatMetricTooltipTime(value) {
  if (!value) {
    return "ohne Datum";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatSignedNumber(value) {
  const numberValue = Number(value) || 0;
  return numberValue > 0 ? `+${numberValue}` : String(numberValue);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function dayBucketKey(value) {
  const date = parseMetricDate(value);

  if (!date) {
    return "";
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function weekBucketKey(value) {
  const date = parseMetricDate(value);

  if (!date) {
    return "";
  }

  const weekDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = weekDate.getUTCDay() || 7;
  weekDate.setUTCDate(weekDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(weekDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((weekDate - yearStart) / 86400000) + 1) / 7);

  return `${weekDate.getUTCFullYear()}-KW${String(week).padStart(2, "0")}`;
}

function parseMetricDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(String(value).replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

function graphTypeLabel(graphType) {
  if (graphType === "trackedFileCount") {
    return "Anzahl der Files";
  }

  if (graphType === "netLineChange") {
    return "Net Line Change";
  }

  if (graphType === "sourceCodeGrowth") {
    return "Sourcecode-Wachstum";
  }

  return "Check-in-Count";
}

function repositoryName(repository) {
  const pathParts = repository.path.split(/[\\/]/);
  return pathParts[pathParts.length - 1] || repository.path;
}
</script>
