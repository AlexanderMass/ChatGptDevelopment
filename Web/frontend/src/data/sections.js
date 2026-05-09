export const useCases = [
  {
    id: "uc-use-dashboard",
    label: "Dashboard nutzen",
    actor: "Anwender",
    goal: "Den Entwicklungszustand der verwalteten ChatGPT-Projekte überblicken und auswerten.",
    summary:
      "Der Anwender nutzt das Dashboard als zentralen Einstieg. Der Use Case umfasst das Pflegen der Projekte und die Präsentation der erfassten Projektdaten.",
    steps: [
      "Dashboard öffnen",
      "Projektübersicht und vorhandene Daten erfassen",
      "In Projektpflege oder Präsentationsansichten wechseln",
    ],
    includes: ["uc-maintain-projects", "uc-present-project-data"],
  },
  {
    id: "uc-maintain-projects",
    label: "Projekte pflegen",
    actor: "Anwender",
    goal: "ChatGPT-Projekte als auswertbare Einheiten anlegen, bearbeiten und aktuell halten.",
    summary:
      "Der Anwender erfasst und aktualisiert Projekte mit Name, Beschreibung, Status und optionalem Repository-Bezug. Das Projekt bildet den Anker für Dashboard, Sessions und spätere Auswertungen.",
    steps: [
      "Projekt anlegen oder aus vorhandenen Daten übernehmen",
      "Beschreibung, Ziel und technische Bezüge dokumentieren",
      "Projektstatus im Dashboard sichtbar machen",
    ],
  },
  {
    id: "uc-present-project-data",
    label: "Projektdaten präsentieren",
    actor: "Anwender",
    goal: "Erfasste Projektdaten so darstellen, dass Zustand und Entwicklung sichtbar werden.",
    summary:
      "Das Dashboard präsentiert Projektdaten in unterschiedlichen Sichten. Die Präsentation kann zunächst tabellarisch oder grafisch erfolgen.",
    steps: [
      "Projekt oder Projektgruppe auswählen",
      "Gewünschte Präsentationsform wählen",
      "Daten als Tabelle oder Grafik auswerten",
    ],
    includes: ["uc-present-table", "uc-present-graph"],
  },
  {
    id: "uc-present-table",
    label: "Präsentation in Tabellenform",
    actor: "Anwender",
    goal: "Projekt- und Aktivitätsdaten vergleichbar und filterbar als Tabelle anzeigen.",
    summary:
      "Die Tabellenform eignet sich für kontrollierte Detailarbeit: Projekte vergleichen, Aktivitäten scannen, Spalten sortieren und später Filter anwenden.",
    steps: [
      "Tabellarische Ansicht öffnen",
      "Relevante Spalten und Projektdaten anzeigen",
      "Daten vergleichen, sortieren oder filtern",
    ],
  },
  {
    id: "uc-present-graph",
    label: "Präsentation in grafischer Form",
    actor: "Anwender",
    goal: "Projektverläufe, Aktivitäten oder Kennzahlen visuell erfassbar machen.",
    summary:
      "Die grafische Form verdichtet Projektdaten zu Diagrammen oder Verlaufssichten. Sie hilft, Aktivitätsmuster und Entwicklungen schneller zu erkennen.",
    steps: [
      "Grafische Ansicht öffnen",
      "Diagrammtyp oder Auswertungsfokus wählen",
      "Verlauf, Verteilung oder Vergleich visuell auswerten",
    ],
  },
];

export const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    meta: "Development-Zustand",
    eyebrow: "Applikation",
    title: "Dashboard für Projektaktivitäten",
    lead:
      "Hier entsteht die kleine Anwendung, die den Entwicklungszustand der verwalteten ChatGPT-Projekte sichtbar macht.",
    chips: ["Projekte", "Aktivitäten", "Status"],
    focusTitle: "Operative Sicht",
    focusText:
      "Das Dashboard ist die Arbeitsansicht für laufende Projekte. Es soll später zeigen, welche Projekte existieren, welche Sitzungen oder Aktivitäten zuletzt erfasst wurden und wo sich auswertbare Daten ergeben.",
    focusPoints: [
      "Projektübersicht und aktuelle Aktivitäten darstellen",
      "Entwicklungszustand und einfache Kennzahlen sichtbar machen",
      "Später Daten aus API und Datenbank als kompakte Arbeitsansicht anzeigen",
    ],
    nextStep:
      "Ein sinnvoller nächster Ausbau ist eine erste Statusübersicht mit Beispielprojekten, Sitzungen und Aktivitätszählern.",
  },
  {
    id: "analysis",
    label: "Analyse",
    meta: "Dokumentation",
    eyebrow: "Projektstruktur",
    title: "Analyse und Projektdokumentation",
    lead:
      "Diese Ansicht sammelt die fachlichen Merker: Use Cases, Datenmodell, Tabellenstruktur, Diagramme und Entscheidungen zur Projektarchitektur.",
    chips: ["Use Cases", "Datenmodell", "UML"],
    focusTitle: "Reflektierende Sicht",
    focusText:
      "Die Analyseansicht hält fest, wie dieses Projekt gedacht ist. Sie ist der Ort für die Modellierung der Datenbanktabellen, die spätere Mermaid- oder UML-Dokumentation und die fachliche Begriffsarbeit.",
    focusPoints: [
      "Use Cases für die kleine Datenbankapplikation dokumentieren",
      "Tabellenstruktur als fachliches Modell und Diagramm vorbereiten",
      "Entscheidungen zu Dashboard, API und Datenhaltung nachvollziehbar ablegen",
    ],
    nextStep:
      "Als nächstes können die Unterpunkte Use Cases und Datenmodellierung mit echten Dokumentationsartefakten gefüllt werden.",
    children: [
      {
        id: "use-cases",
        label: "Use Cases",
        meta: "UML-Sicht",
        children: useCases.map((useCase) => ({
          id: useCase.id,
          label: useCase.label,
          meta: useCase.actor,
        })),
      },
      {
        id: "data-modeling",
        label: "Datenmodellierung",
        meta: "Tabellenstruktur",
      },
    ],
  },
  {
    id: "use-cases",
    label: "Use Cases",
    meta: "UML-Sicht",
    eyebrow: "Analyse",
    title: "Use-Case-Design",
    lead:
      "Hier entsteht die grafische Use-Case-Sicht. Die Bubbles sind als Einstieg in die spätere Dokumentation der einzelnen Use Cases gedacht.",
    chips: ["Akteure", "Use Cases", "Dokumentation"],
    focusTitle: "Interaktive Modellierung",
    focusText:
      "Die Use-Case-Seite verbindet eine grafische Übersicht mit Detailseiten. Der Haupt-Use-Case Dashboard nutzen inkludiert Projektpflege und Präsentation, wobei die Präsentation in Tabellen- und Grafikform weiter aufgeteilt wird.",
    focusPoints: [
      "Use Cases gemeinsam fachlich schneiden",
      "Akteure, Ziele und Hauptabläufe dokumentieren",
      "Später daraus Datenmodell und API-Aufgaben ableiten",
    ],
    nextStep:
      "Der nächste sinnvolle Schritt ist, die ersten Use Cases gemeinsam zu benennen und ihre Hauptabläufe zu schärfen.",
    children: useCases.map((useCase) => ({
      id: useCase.id,
      label: useCase.label,
      meta: useCase.actor,
    })),
  },
  {
    id: "data-modeling",
    label: "Datenmodellierung",
    meta: "Tabellenstruktur",
    eyebrow: "Analyse",
    title: "Datenmodellierung und Tabellenstruktur",
    lead:
      "Dieser Bereich nimmt das fachliche Modell auf und übersetzt es schrittweise in Tabellen, Relationen und spätere Diagramme.",
    chips: ["Tabellen", "Relationen", "Mermaid"],
    focusTitle: "Vom Use Case zur Tabelle",
    focusText:
      "Die Datenmodellierung soll sichtbar machen, welche Entitäten für den MVP wirklich gebraucht werden und wie Projekte, Aktivitäten, Sessions und Auswertungen zusammenhängen.",
    focusPoints: [
      "Kernentitäten und Attribute aus den Use Cases ableiten",
      "Tabellenstruktur als Klassendiagramm oder ER-Diagramm ablegen",
      "Datenmodell später mit API und Dashboard verbinden",
    ],
    nextStep:
      "Nach der Use-Case-Schärfung kann hier ein erstes Mermaid-Diagramm für Project, WorkSession und ActivityEvent entstehen.",
  },
  ...useCases.map((useCase) => ({
    id: useCase.id,
    label: useCase.label,
    meta: useCase.actor,
    eyebrow: "Use Case",
    title: useCase.label,
    lead: useCase.goal,
    chips: [useCase.actor, "Ablauf", "Dokumentation"],
    focusTitle: "Kurzbeschreibung",
    focusText: useCase.summary,
    focusPoints: useCase.steps,
    nextStep:
      "Diesen Use Case können wir als nächstes mit Vorbedingungen, Hauptablauf, Varianten und betroffenen Tabellen ausformulieren.",
  })),
];
