export const sections = [
  {
    id: "overview",
    label: "Projektuebersicht",
    meta: "Scope",
    eyebrow: "Globaler Einstieg",
    title: "Plattform fuer KI-gestuetzte Entwicklungsprozesse",
    lead:
      "Diese Startansicht bildet den kuenftigen Arbeitsraum fuer die Zusammenfuehrung von Dialogdaten, Versionshistorie und analytischen Metriken.",
    chips: ["Projektkontext", "Metriken", "Entwicklungsverlaeufe"],
    focusTitle: "Zentrale Leitfrage",
    focusText:
      "Wie lassen sich KI-gestuetzte Entwicklungsprozesse so erfassen, dass Produktivitaet nicht nur gefuehlt, sondern empirisch vergleichbar beschrieben werden kann?",
    focusPoints: [
      "Projektstruktur fuer API, Datenbank und Web sichtbar machen",
      "Spaetere Verknuepfung von Prompts, Commits und Dateiaenderungen vorbereiten",
      "Ausbau als Analyseoberflaeche statt als reine Praesentationsseite denken",
    ],
    nextStep:
      "Als naechstes koennen wir diese Ansicht um echte Navigationsknoten, Datenquellen und erste Platzhalter fuer Analysestrecken erweitern.",
  },
  {
    id: "api",
    label: "API",
    meta: "Erfassung",
    eyebrow: "Teilprojekt Api",
    title: "Schnittstellen fuer Interaktions- und Entwicklungsdaten",
    lead:
      "Der API-Bereich wird spaeter Rohdaten erfassen, normalisieren und fuer Datenbank und Frontend in eine gemeinsame Form ueberfuehren.",
    chips: ["Import", "Normalisierung", "Bereitstellung"],
    focusTitle: "API-Aufgabe",
    focusText:
      "Die API bildet die technische Bruecke zwischen Erfassung, Persistenz und Auswertung. Sie soll Prozesse nachvollziehbar statt nur funktional abbilden.",
    focusPoints: [
      "Quellen fuer Prompts, Sessions und Zeitstempel definieren",
      "Entwicklungsereignisse in ein gemeinsames Austauschformat bringen",
      "Spaetere Analyse-Endpunkte vorbereiten",
    ],
    nextStep:
      "Ein erster sinnvoller Ausbau waere ein Konzept fuer Sessions, Promptfolgen und die Verknuepfung mit Git-Ereignissen.",
  },
  {
    id: "database",
    label: "Datenbank",
    meta: "Persistenz",
    eyebrow: "Teilprojekt Db",
    title: "Gemeinsame Datenbasis fuer Interaktion und Codeentwicklung",
    lead:
      "Hier entsteht die strukturierte Ablage fuer Dialoge, Zeitachsen, Commits, Dateiaenderungen und spaetere abgeleitete Projektmetriken.",
    chips: ["Schema", "Relationen", "Abfragen"],
    focusTitle: "Datenmodell",
    focusText:
      "Die Datenbank soll nicht nur speichern, sondern nachvollziehbare Beziehungen zwischen Interaktion, Codeveraenderung und Projektverlauf abbilden.",
    focusPoints: [
      "Basistabellen fuer Sessions, Nachrichten, Commits und Dateien anlegen",
      "Zeitliche und semantische Verknuepfungen modellieren",
      "Auswertungsfaehige Views fuer spaetere Metriken mitdenken",
    ],
    nextStep:
      "Als naechster Schritt bietet sich ein erstes relationales Kernschema fuer Chat- und Git-Daten an.",
  },
  {
    id: "web",
    label: "Webdesign",
    meta: "Exploration",
    eyebrow: "Teilprojekt Web",
    title: "Analytische Oberflaeche fuer Verlauf, Vergleich und Detailansicht",
    lead:
      "Die Webanwendung soll spaeter keine Marketinghuelle sein, sondern ein Arbeitsinstrument fuer Exploration, Vergleich und Rekonstruktion von Entwicklungsverlaeufen.",
    chips: ["Navigation", "Visualisierung", "Detailanalyse"],
    focusTitle: "Oberflaechenidee",
    focusText:
      "Links liegt die dauerhafte Projektadministration, rechts die inhaltliche Tiefe. So bleibt die Anwendung auch bei wachsender Komplexitaet orientierbar.",
    focusPoints: [
      "Projektbereiche und Datenquellen navigierbar halten",
      "Zeitverlaeufe, Metriken und Artefakte gemeinsam sichtbar machen",
      "Detailansichten fuer einzelne Sessions, Commits und Dateien vorbereiten",
    ],
    nextStep:
      "Im Ausbau koennen wir hier als Erstes echte Unterseiten oder komponentisierte Detailpanels fuer die Teilprojekte anlegen.",
  },
];
