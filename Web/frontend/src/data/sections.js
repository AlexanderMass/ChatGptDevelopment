export const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    meta: "Development-Zustand",
    eyebrow: "Applikation",
    title: "Dashboard fuer Projektaktivitaeten",
    lead:
      "Hier entsteht die kleine Anwendung, die den Entwicklungszustand der verwalteten ChatGPT-Projekte sichtbar macht.",
    chips: ["Projekte", "Aktivitaeten", "Status"],
    focusTitle: "Operative Sicht",
    focusText:
      "Das Dashboard ist die Arbeitsansicht fuer laufende Projekte. Es soll spaeter zeigen, welche Projekte existieren, welche Sitzungen oder Aktivitaeten zuletzt erfasst wurden und wo sich auswertbare Daten ergeben.",
    focusPoints: [
      "Projektuebersicht und aktuelle Aktivitaeten darstellen",
      "Entwicklungszustand und einfache Kennzahlen sichtbar machen",
      "Spaeter Daten aus API und Datenbank als kompakte Arbeitsansicht anzeigen",
    ],
    nextStep:
      "Ein sinnvoller naechster Ausbau ist eine erste Statusuebersicht mit Beispielprojekten, Sitzungen und Aktivitaetszaehlern.",
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
      "Die Analyseansicht haelt fest, wie dieses Projekt gedacht ist. Sie ist der Ort fuer die Modellierung der Datenbanktabellen, die spaetere Mermaid- oder UML-Dokumentation und die fachliche Begriffsarbeit.",
    focusPoints: [
      "Use Cases fuer die kleine Datenbankapplikation dokumentieren",
      "Tabellenstruktur als fachliches Modell und Diagramm vorbereiten",
      "Entscheidungen zu Dashboard, API und Datenhaltung nachvollziehbar ablegen",
    ],
    nextStep:
      "Als naechstes bietet sich eine erste Use-Case-Datei plus ein Mermaid-Klassendiagramm fuer die minimale Tabellenstruktur an.",
  },
];
