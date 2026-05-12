<template>
  <section class="server-log-view">
    <header class="server-log-view__header">
      <div>
        <h1>Server Log</h1>
      </div>
      <div class="server-log-view__controls" aria-label="Server Log Filter">
        <label class="server-log-view__control-bubble server-log-view__limit">
          <span>Zeilen</span>
          <input v-model.number="lineLimit" min="1" max="1000" type="number" />
        </label>

        <fieldset class="server-log-view__control-bubble server-log-view__levels">
          <legend>Level:</legend>
          <label v-for="level in logLevels" :key="level.value">
            <input
              v-model="selectedLevels"
              :value="level.value"
              type="checkbox"
            />
            {{ level.label }}
          </label>
        </fieldset>

        <div class="server-log-view__control-bubble">
          <button class="server-log-view__refresh" type="button" @click="loadServerLog">
            Refresh
          </button>
        </div>
      </div>
    </header>

    <p v-if="errorMessage" class="server-log-view__error">{{ errorMessage }}</p>

    <ol class="server-log-view__lines">
      <li v-for="(line, index) in filteredLogLines" :key="`${index}-${line}`">
        <code>{{ line }}</code>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchServerLog } from "../../shared/api/serverLogApi.js";

const logLevels = [
  { label: "Info", value: "INFO" },
  { label: "Warning", value: "WARNING" },
  { label: "Error", value: "ERROR" },
  { label: "Debug", value: "DEBUG" },
];

const loadedLogLines = ref([]);
const errorMessage = ref("");
const lineLimit = ref(100);
const selectedLevels = ref(logLevels.map((level) => level.value));

const filteredLogLines = computed(() =>
  loadedLogLines.value.filter((line) => selectedLevels.value.includes(readLogLevel(line))),
);

onMounted(loadServerLog);

async function loadServerLog() {
  try {
    errorMessage.value = "";
    loadedLogLines.value = await fetchServerLog({
      limit: lineLimit.value,
    });
  } catch (error) {
    errorMessage.value = error.message;
    loadedLogLines.value = [];
  }
}

function readLogLevel(line) {
  try {
    return JSON.parse(line).level ?? "INFO";
  } catch {
    return "INFO";
  }
}
</script>
