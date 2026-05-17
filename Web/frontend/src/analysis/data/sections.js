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
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Das Dashboard ist der zentrale Einstieg in die spätere Anwendung. Es soll dem Anwender zeigen, welche ChatGPT-Projekte verwaltet werden und welche Projektdaten für eine Auswertung zur Verfügung stehen.",
          "Der Use Case bündelt zwei fachliche Aufgaben: Projekte müssen gepflegt werden können, und die vorhandenen Projektdaten müssen präsentiert werden. Die genauere Ausgestaltung dieser Aufgaben wird in den inkludierten Use Cases beschrieben.",
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          {
            text: "Das Oberflächendesign des Dashboards ist im Designobjekt Dashboard beschrieben.",
            linkTarget: "design-surfaces-dashboard",
          },
        ],
      },
    ],
  },
  {
    id: "uc-use-cockpit",
    label: "Cockpit nutzen",
    actor: "Anwender",
    goal: "Die Dokumentations- und Prozessstruktur verwalteter ChatGPT-Projekte überblicken.",
    summary:
      "Der Anwender nutzt das Cockpit als zentrale Projektintrospektion. Es soll sichtbar machen, wie die Kontextordner, Epics, Stories und Ressourcenbezüge der verwalteten ChatGPT-Projekte strukturiert sind.",
    steps: [
      "Cockpit öffnen",
      "Verwaltete Projekte und Kontextstrukturen erfassen",
      "Epics, Stories und Ressourcenbezüge prüfen",
    ],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Cockpit nutzen beschreibt eine übergreifende Sicht auf die verwalteten ChatGPT-Development-Projekte. Während das Dashboard die konkrete Projektarbeit und ihre Git-Metriken sichtbar macht, richtet sich das Cockpit stärker auf Projektstruktur, Kontextdokumentation und methodische Ordnung.",
          "Das Cockpit soll aus den bekannten Projekten und ihren zugeordneten Repositories ableiten, welche Kontextordner, Epic-Dokumente, Story-Strukturen und Ressourcenverweise vorhanden sind. Dadurch entsteht eine zentrale Stelle, an der die Qualität und Vollständigkeit der Projektdokumentation beurteilt werden kann.",
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          {
            text: "Das Oberflächendesign des Cockpits ist im Designobjekt Cockpit beschrieben.",
            linkTarget: "design-cockpit",
          },
        ],
      },
    ],
  },
  {
    id: "uc-maintain-projects",
    label: "Projekte pflegen",
    actor: "Anwender",
    goal: "ChatGPT-Projekte als auswertbare Einheiten anlegen, bearbeiten und aktuell halten.",
    summary:
      "Der Anwender pflegt die in der Applikation verfolgten Projekte. Dazu gehört nicht nur das Erfassen von Projektdaten, sondern auch das Einlesen projektbezogener Git-Daten.",
    steps: [
      "Neue Projekte anlegen",
      "Bestehende Projektinformationen aktualisieren",
      "Git-Daten für verwaltete Projekte einlesen",
    ],
    includes: ["uc-create-project", "uc-administer-projects", "uc-analyze-git-data"],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Projekte pflegen beschreibt den operativen Umgang mit den in der Datenbank verwalteten ChatGPT-Projekten. Der Nutzer soll sehen können, welche Projekte bereits angelegt sind und welche Repository-Informationen ihnen zugeordnet wurden.",
          "Zu jedem Projekt werden die gespeicherten Projektinformationen aus der Datenbank angezeigt. Dazu gehören auch verdichtete beziehungsweise aggregierte Metrikinformationen, die aus den zugeordneten Git-Repositories und Check-in-Metriken abgeleitet werden.",
          "Die Applikation bietet in diesem Bereich operative Funktionen für neue Projekte anlegen, Projekte administrieren und Git-Daten analysieren an. Diese Funktionen sprechen die jeweils referenzierten Use Cases an; ihre Detailbeschreibung erfolgt dort.",
          "Der Use Case bildet damit die fachliche Klammer für drei untergeordnete Aufgaben: neue Projekte anlegen, Projekte administrieren und Git-Daten analysieren. Die Detailregeln dieser Aufgaben werden in den inkludierten Use Cases weiter beschrieben.",
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          {
            text: "Das Oberflächendesign ist im Designobjekt Projektpflege-Panel beschrieben.",
            linkTarget: "design-surfaces-project-maintenance-panel",
          },
        ],
      },
    ],
  },
  {
    id: "uc-create-project",
    label: "Neue Projekte anlegen",
    actor: "Anwender",
    goal: "Ein neues ChatGPT-Projekt als verwaltbares Analyseobjekt anlegen.",
    summary:
      "Der Anwender erfasst ein neues Projekt mit Namen, Beschreibung und optionalem Repository-Bezug. Dadurch wird es im Dashboard sichtbar und kann später mit Aktivitäts- und Git-Daten verknüpft werden.",
    steps: [
      "Neues Projekt anlegen",
      "Grunddaten und Beschreibung erfassen",
      "Optional Repository- oder Arbeitsordnerbezug hinterlegen",
    ],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Neue Projekte anlegen beschreibt die Erfassung eines neuen ChatGPT-Projekts als verwaltbares Analyseobjekt.",
          "Der Nutzer kann einen Projektnamen eingeben und separat eine Projektbeschreibung erfassen. Neben dem Namen wird das Startdatum des Projekts gesetzt. Das Startdatum ist mit dem aktuellen Datum vorbelegt und kann vom Nutzer in die Vergangenheit verlegt werden; eine Administration in die Zukunft ist fachlich nicht sinnvoll.",
          "Das System liest aus dem Repository-Bereich eine Liste verfügbarer Git-Repositories aus und stellt sie zur Auswahl bereit. Dadurch können ein oder mehrere Repositories dem neu angelegten Projekt zugeordnet werden.",
          "Drückt der Nutzer auf den Button Projekt anlegen, werden die administrierten Daten in der Datenbank gespeichert. Dazu gehören die Projektdaten sowie die Relation zwischen dem neuen Projekt und den ausgewählten Repositories.",
          "Drückt der Nutzer auf den Button Abbrechen, wird der Pop-up-Dialog geschlossen, ohne ein neues Projekt zu speichern.",
        ],
        subsections: [
          {
            title: "Repository-Daten ermitteln",
            paragraphs: [
              "Damit ein neues Projekt korrekt angelegt werden kann, müssen die zuordenbaren Repository-Daten bereits verfügbar sein. Das System ermittelt deshalb aus den vorhandenen Git-Repositories die initial benötigten Informationen für die Datenbankpflege.",
              "Zu diesen Informationen gehören insbesondere der lokale Repository-Pfad, soweit vorhanden die Remote-URL sowie das Datum des ersten Check-ins. Diese Daten bilden die Grundlage dafür, Repositories im Dialog auswählbar zu machen und ihre Relation zum neuen Projekt zu speichern.",
              "Die Funktion Repository-Daten ermitteln ist damit eine vorbereitende Systemfunktion innerhalb des Use Cases Neue Projekte anlegen. Sie stellt sicher, dass beim Speichern des Projekts alle notwendigen Repository-Stammdaten und Zuordnungsinformationen vorliegen.",
            ],
          },
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          {
            text: "Das Oberflächendesign ist im Designobjekt Projektdialog beschrieben.",
            linkTarget: "design-surfaces-project-dialog",
          },
        ],
      },
    ],
  },
  {
    id: "uc-administer-projects",
    label: "Projekte administrieren",
    actor: "Anwender",
    goal: "Bestehende Projektstammdaten und Projektzuordnungen bearbeiten.",
    summary:
      "Der Anwender administriert bereits angelegte Projekte. Dazu gehören die Pflege der Projektdaten und die spätere Anpassung zugeordneter Repositories.",
    steps: [
      "Bestehendes Projekt auswählen",
      "Projektstammdaten bearbeiten",
      "Repository-Zuordnungen prüfen oder ändern",
    ],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Projekte administrieren beschreibt die Bearbeitung bereits angelegter ChatGPT-Projekte. Fachlich nutzt er denselben Projekt-Dialog wie der Use Case Neue Projekte anlegen, wird aber mit einer anderen Oberflächenkonfiguration geöffnet.",
          "Der Projektname kann in dieser Konfiguration nicht administriert werden. Auch das Startdatum des Projekts ist nicht administrierbar, weil es den fachlichen Beginn des Projekts beschreibt und beim Anlegen festgelegt wurde.",
          "Das Projektende kann administriert werden. Es wird initial aus der Datenbank geladen; ist dort kein Wert gespeichert, bleibt das Feld leer. Trägt der Nutzer ein Projektende ein oder ändert den bestehenden Wert, wird diese Änderung beim Beenden des Dialogs in der Datenbank gespeichert.",
          "Auch die dem Projekt zugewiesenen Repositories können administriert werden. Der Nutzer kann neue Repositories aufnehmen oder bereits im Projekt vermerkte Repositories entfernen.",
          "Drückt der Nutzer zum Abschluss des Dialogs auf OK, werden die geänderten Daten gespeichert. Stellt das System dabei fest, dass ein oder mehrere Repositories entfernt wurden, erscheint zuvor eine Warnung. Diese Warnung weist darauf hin, dass Repository-Zuordnungen gelöscht wurden und dass dadurch die entsprechenden Verweise auf der Datenbank entfernt würden.",
          "Bestätigt der Nutzer die Warnung nicht, bleibt der Projekt-Dialog geöffnet. Der Nutzer kann die Repository-Administration korrigieren und anschließend erneut versuchen, den Dialog mit OK zu beenden.",
          "Bestätigt der Nutzer die Warnung, werden die entfernten Git-Repositories in der Datenbank gelöscht. Zugehörige Check-in-Metriken werden dabei durch die Foreign-Key-Regel `ON DELETE CASCADE` automatisch entfernt.",
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          {
            text: "Das Oberflächendesign ist im Designobjekt Projektdialog beschrieben.",
            linkTarget: "design-surfaces-project-dialog",
          },
        ],
      },
    ],
  },
  {
    id: "uc-analyze-git-data",
    label: "Git-Daten analysieren",
    actor: "Anwender",
    goal: "Git-Daten für verwaltete Projekte einlesen und für spätere Präsentationen verfügbar machen.",
    summary:
      "Für die in der Applikation verwalteten Projekte werden relevante Git-Informationen eingelesen. Dazu können Commits, geänderte Dateien, Zeitpunkte und Statusinformationen gehören.",
    steps: [
      "Verwaltetes Projekt auswählen",
      "Git-Informationen aus dem zugeordneten Repository einlesen",
      "Eingelesene Daten für Tabellen und grafische Auswertungen bereitstellen",
    ],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Git-Daten analysieren beschreibt eine operative Systemfunktion ohne eigene Oberfläche. Sie wird aus dem Projektpflege-Panel heraus gestartet.",
          "Die Funktion iteriert nur über solche Git-Repositories, die in der Datenbank mindestens einem Projekt zugeordnet sind. Nicht zugeordnete Repositories werden nicht analysiert.",
          "Für die zugeordneten Repositories liest die Funktion relevante Git-Informationen aus und schreibt die daraus abgeleiteten Daten in die Datenbank.",
        ],
        subsections: [
          {
            title: "Zu ermittelnde Repository-Kennzahlen",
            paragraphs: [
              "Für jedes zugeordnete Repository werden die verdichteten Repository-Kennzahlen `lastCheckInDate`, `checkInCount` und `hasChatGptContext` ermittelt und in `git_repository` gespeichert.",
              "`firstCheckInDate` wird bereits im Use Case Neue Projekte anlegen bei der initialen Repository-Datenermittlung bestimmt.",
              "`hasChatGptContext` wird zusätzlich beim Zuweisen eines Repositories gesetzt und bei der Git-Datenanalyse erneut aktualisiert.",
            ],
          },
          {
            title: "Zu ermittelnde Check-in-Metriken",
            paragraphs: [
              "Für die einzelnen Check-ins werden die Metrikdaten `commitHash`, `commitDate`, `messageSubject`, `changedFileCount`, `addedLineCount`, `deletedLineCount`, `netLineChange`, `churnLineCount`, `trackedFileCount` und `isMergeCommit` ermittelt.",
              "Diese Daten werden in `check_in_metric` gespeichert und bilden die Grundlage für spätere tabellarische und grafische Auswertungen.",
            ],
          },
        ],
      },
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
    chips: [],
    contentSections: [
      {
        title: "Funktionen",
        paragraphs: [
          "Der Use Case Projektdaten präsentieren beschreibt die Darstellung der erfassten Projekt- und Metrikdaten.",
          "Es wird zwei Formen der Darstellung geben. Die projektbezogene Darstellung zeigt insbesondere die Git-Commits eines Projekts in Tabellenform. Daneben wird es verschiedene grafische Darstellungen geben, die entweder projektbezogen oder über alle Projekte aggregiert aufgebaut sein können.",
        ],
      },
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          {
            text: "Die Oberflächenbeschreibung ist im Designobjekt Projektpräsentations-Panel, Paneel 1: Tabellendarstellung von Projekten, beschrieben.",
            linkTarget: "paneel-tabellendarstellung-projekte",
          },
        ],
      },
    ],
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
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Präsentation in Tabellenform beschreibt die projektbezogene Darstellung von Git-Commits in einer Tabelle.",
          "Die Tabelle soll die erfassten Check-in-Metriken so anzeigen, dass der Nutzer die Entwicklung eines Projekts nachvollziehen und einzelne Commits fachlich prüfen kann.",
        ],
      },
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          {
            text: "Die Oberflächenbeschreibung ist im Designobjekt Projektpräsentations-Panel, Paneel 2: Graphenbasierte Darstellung, beschrieben.",
            linkTarget: "paneel-graphenbasierte-darstellung-projekte",
          },
        ],
      },
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
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Präsentation in grafischer Form beschreibt die graphenbasierte Auswertung der erfassten Projekt- und Metrikdaten.",
          "Es können mehrere Grafiktypen angeboten werden. Einige Grafiktypen benötigen ein konkretes Projekt, andere können projektübergreifend oder über alle Projekte aggregiert dargestellt werden.",
          "Die X-Achse ist in der Regel eine Zeitachse. Dabei werden die Check-in-Metrik-Objekte zeitlich gruppiert. Diese Gruppierung ist administrierbar und erfolgt pro Tag oder pro Woche. Die Y-Achse wird durch die jeweils dargestellte Metrik bestimmt.",
        ],
        table: {
          columns: ["Grafiktyp", "Projekt erforderlich", "Beschreibung"],
          rows: [
            [
              "Check-in-Count innerhalb eines Projekts",
              "Ja",
              "Stellt dar, wie sich die Anzahl der Check-ins eines Projekts über die Zeit entwickelt.",
            ],
            [
              "Anzahl der Files innerhalb eines Projekts",
              "Ja",
              "Stellt dar, wie sich die Anzahl der innerhalb eines Projekts verwalteten Files über die Zeit entwickelt.",
            ],
            [
              "Nettoänderung der Lines of Code",
              "Ja",
              "Stellt dar, wie stark sich die Lines of Code innerhalb einer Zeitgruppe verändert haben.",
            ],
            [
              "Kumulierte Lines of Code",
              "Ja",
              "Stellt dar, wie sich der Sourcecode-Bestand eines Projekts über die Zeit entwickelt.",
            ],
          ],
        },
        subsections: [
          {
            id: "algorithmus-grafiktyp-check-in-count",
            title: "Algorithmus Grafiktyp 1: Check-in-Count innerhalb eines Projekts",
            paragraphs: [
              "Die Check-in-Metrik-Objekte des selektierten Projekts werden entlang der Zeitachse gruppiert. Die Gruppierung erfolgt abhängig von der Administration pro Tag oder pro Woche. Für jede Zeitgruppe wird gezählt, wie viele Check-in-Metrik-Objekte enthalten sind; dieser Zählwert bildet den Y-Wert der Grafik.",
            ],
          },
          {
            id: "algorithmus-grafiktyp-file-count",
            title: "Algorithmus Grafiktyp 2: Anzahl der Files innerhalb eines Projekts",
            paragraphs: [
              "Die Check-in-Metrik-Objekte des selektierten Projekts werden wie bei Grafiktyp 1 pro Tag oder pro Woche gruppiert. Für jede Zeitgruppe wird aus dem Attribut `trackedFileCount` der Maximalwert ermittelt. Dieser Maximalwert bildet den Y-Wert und zeigt, wie viele getrackte Files bis zu diesem Tag beziehungsweise bis zu dieser Woche erreicht wurden.",
            ],
          },
          {
            id: "algorithmus-grafiktyp-lines-of-code",
            title: "Algorithmus Grafiktyp 3: Nettoänderung der Lines of Code",
            paragraphs: [
              "Die Check-in-Metrik-Objekte des selektierten Projekts werden wie bei den vorherigen Grafiktypen pro Tag oder pro Woche gruppiert. Für jede Zeitgruppe wird die Summe der `netLineChange`-Werte gebildet. Dieser Summenwert bildet den Y-Wert und charakterisiert die Nettoänderung der Lines of Code innerhalb der jeweiligen Zeitgruppe.",
            ],
          },
          {
            id: "algorithmus-grafiktyp-cumulative-lines-of-code",
            title: "Algorithmus Grafiktyp 4: Kumulierte Lines of Code",
            paragraphs: [
              "Die Check-in-Metrik-Objekte des selektierten Projekts werden zeitlich ab dem Projektstart ausgewertet und pro Tag oder pro Woche gruppiert. Für jede Zeitgruppe wird zunächst die Summe der `netLineChange`-Werte gebildet. Anschließend werden diese Gruppensummen chronologisch kumuliert. Der kumulierte Wert bildet den Y-Wert und zeigt, wie viel Sourcecode im Projekt über die Zeit hinzugekommen ist.",
            ],
          },
        ],
      },
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          {
            text: "Die Oberflächenbeschreibung ist im Designobjekt Projektpräsentations-Panel, Paneel 2: Graphenbasierte Darstellung, beschrieben.",
            linkTarget: "paneel-graphenbasierte-darstellung-projekte",
          },
        ],
      },
    ],
  },
];

export const useCaseTree = [
  {
    id: "uc-use-dashboard",
    label: "Dashboard nutzen",
    children: [
      {
        id: "uc-maintain-projects",
        label: "Projekte pflegen",
        children: [
          {
            id: "uc-create-project",
            label: "Neue Projekte anlegen",
          },
          {
            id: "uc-administer-projects",
            label: "Projekte administrieren",
          },
          {
            id: "uc-analyze-git-data",
            label: "Git-Daten analysieren",
          },
        ],
      },
      {
        id: "uc-present-project-data",
        label: "Projektdaten präsentieren",
        children: [
          {
            id: "uc-present-table",
            label: "Präsentation in Tabellenform",
          },
          {
            id: "uc-present-graph",
            label: "Präsentation in grafischer Form",
          },
        ],
      },
    ],
  },
  {
    id: "uc-use-cockpit",
    label: "Cockpit nutzen",
  },
];

export const surfaceTree = [
  {
    id: "design-surfaces-dashboard",
    label: "Dashboard",
  },
  {
    id: "design-surfaces-project-maintenance-panel",
    label: "Projektpflege-Panel",
  },
  {
    id: "design-surfaces-project-presentation-panel",
    label: "Projektpräsentations-Panel",
  },
  {
    id: "design-surfaces-project-dialog",
    label: "Projekt-Dialog",
  },
];

export const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    meta: "Applikation",
    eyebrow: "Applikation",
    title: "Dashboard",
    lead:
      "Einstieg in die Projektadministration und spätere Auswertung der verwalteten ChatGPT-Projekte.",
    chips: [],
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
    id: "cockpit",
    label: "Cockpit",
    meta: "Applikation",
    eyebrow: "Applikation",
    title: "Cockpit",
    lead:
      "Eigenständige Applikation zur projektübergreifenden Introspektion der verwalteten ChatGPT-Development-Projekte.",
    chips: [],
    focusTitle: "Projektintrospektion",
    focusText:
      "Das Cockpit soll Projekte, ihre Kontextordner und später die darin enthaltenen Markdown-Artefakte sichtbar machen.",
    focusPoints: [
      "Projekte mit ChatGPT-Context-Ordner auswählen",
      "Directory Tree aus dem persistierten Git-Stand anzeigen",
      "Textdateien im File-Präsentationspanel darstellen",
    ],
    nextStep:
      "Als nächstes wird die Serveranbindung für Projekt- und Git-File-Informationen aufgebaut.",
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
        children: useCaseTree,
      },
      {
        id: "design",
        label: "Design",
        meta: "Oberflächen",
        children: [
          {
            id: "design-surfaces",
            label: "Dashboard",
            children: surfaceTree,
          },
          {
            id: "design-cockpit",
            label: "Cockpit",
          },
        ],
      },
      {
        id: "data-modeling",
        label: "Modellierung",
        meta: "Tabellenstruktur",
      },
    ],
  },
  {
    id: "use-cases",
    label: "Use Cases",
    meta: "UML-Sicht",
    eyebrow: "Analyse",
    title: "Use Case Design",
    lead: "",
    chips: [],
    focusTitle: "Interaktive Modellierung",
    focusText:
      "Die Use-Case-Seite verbindet eine grafische Übersicht mit Detailseiten. Dashboard nutzen bleibt der operative Haupt-Use-Case für Projektpflege und Präsentation. Cockpit nutzen ergänzt diese Sicht um eine projektübergreifende Introspektion der Kontext- und Prozessdokumentation.",
    focusPoints: [
      "Use Cases gemeinsam fachlich schneiden",
      "Akteure, Ziele und Hauptabläufe dokumentieren",
      "Später daraus Datenmodell und API-Aufgaben ableiten",
    ],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Die Anwendung ChatGptDevelopment besteht fachlich aus zwei Hauptanteilen: Dashboard und Cockpit. Beide Anteile dienen dazu, ChatGPT-Development-Projekte nicht nur technisch zu verwalten, sondern auch in ihrer Entwicklung und Dokumentationsqualität sichtbar zu machen.",
          "Das Dashboard ist der operative Teil der Anwendung. Dort werden ChatGPT-Development-Projekte gepflegt und mit ihren Git-Repositories verbunden. Zusätzlich stellt das Dashboard eine Oberfläche bereit, um Softwareentwicklung anhand von Git-Commits, Check-in-Metriken und grafischen Auswertungen nachvollziehbar zu machen.",
          "Das Cockpit ist als projektübergreifende Introspektionssicht gedacht. Es soll die inkludierten Projekte darstellen, insbesondere die Inhalte ihrer ChatGPT-Context-Ordner. Dadurch kann geprüft werden, inwieweit die Projekte den prozessualen Vorstellungen folgen, die im ChatGPT-Base-Bereich beschrieben werden.",
          "Darüber hinaus soll das Cockpit perspektivisch einen Zugang zu möglichen Refactorings der Markdown-Dateien in den ChatGPT-Context-Ordnern schaffen. Es wird damit nicht nur zur Anzeige genutzt, sondern auch als Einstieg in die Pflege und Weiterentwicklung der projektbezogenen Kontextdokumentation.",
        ],
      },
    ],
    nextStep:
      "Der nächste sinnvolle Schritt ist, die ersten Use Cases gemeinsam zu benennen und ihre Hauptabläufe zu schärfen.",
    children: useCaseTree,
  },
  {
    id: "design",
    label: "Design",
    meta: "Oberflächen",
    eyebrow: "Analyse",
    title: "Design",
    lead:
      "Der Designbereich sammelt wiederverwendbare Beschreibungen von Oberflächenobjekten, die nicht dauerhaft in einzelnen Use Cases dupliziert werden sollen.",
    chips: ["Oberflächen", "Kapselung", "Reuse"],
    focusTitle: "Kapselnde Sicht",
    focusText:
      "Designobjekte werden dann herausfaktorisiert, wenn sie wiederverwendet werden, mehrere Use Cases berühren oder als eigenständige Oberfläche klar benannt werden sollen.",
    focusPoints: [
      "Oberflächenobjekte aus Use Cases herauslösen",
      "Dopplungen in Use-Case-Beschreibungen vermeiden",
      "Wiederverwendbare UI-Strukturen zentral dokumentieren",
    ],
    nextStep:
      "Der aktuelle Schwerpunkt liegt auf den Oberflächenobjekten Dashboard, Projektpflege-Panel, Projektpräsentations-Panel und Projekt-Dialog.",
    children: [
      {
        id: "design-surfaces",
        label: "Dashboard",
        children: surfaceTree,
      },
      {
        id: "design-cockpit",
        label: "Cockpit",
      },
    ],
  },
  {
    id: "design-surfaces",
    label: "Dashboard",
    meta: "Designobjekte",
    eyebrow: "Design",
    title: "Dashboard",
    lead:
      "Diese Sicht bündelt die zentralen Oberflächenobjekte des Dashboards. Sie werden aus den Use Cases herausgelöst, wenn sie mehrere fachliche Funktionen tragen oder wiederverwendbar beschrieben werden sollen.",
    chips: ["Dashboard", "Panels", "Dialog"],
    focusTitle: "Oberflächenobjekte",
    focusText:
      "Die Oberflächenbeschreibungen dienen als Brücke zwischen fachlichen Use Cases und späterer Frontend-Implementierung.",
    focusPoints: [
      "Dashboard als Rahmenoberfläche",
      "Projektpflege-Panel für Projektübersicht und Aktionen",
      "Projektpräsentations-Panel für spätere Auswertungen",
      "Projekt-Dialog für Neuanlage und Administration",
    ],
    nextStep:
      "Die einzelnen Oberflächenobjekte können nun unabhängig von den Use Cases weiter detailliert werden.",
    children: surfaceTree,
  },
  {
    id: "design-cockpit",
    label: "Cockpit",
    meta: "Designobjekte",
    eyebrow: "Design",
    title: "Cockpit",
    lead:
      "Der Cockpit-Designbereich sammelt die Oberflächenobjekte für die projektübergreifende Introspektion der verwalteten ChatGPT-Development-Projekte.",
    chips: [],
    contentSections: [
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          "Das Cockpit ist als eigenständiger Designbereich neben dem Dashboard gedacht. Während das Dashboard die operative Projektpflege und Git-Auswertung trägt, fokussiert das Cockpit die Darstellung der inkludierten Projekte und ihrer Kontextdokumentation.",
          "Im oberen Bereich der Seite steht eine Combo-Box zur Projektauswahl. In dieser Combo-Box werden nur solche Projekte angeboten, für die ein ChatGPT-Context-Ordner ermittelt werden kann.",
          "Unterhalb der Projektauswahl wird der Directory Tree des selektierten Projekts angezeigt. Der Tree wird aus dem zugehörigen Git-Repository geladen und zeigt den zuletzt persistierten Repository-Inhalt. Es wird also nicht der aktuell auf dem Dateisystem liegende Arbeitsstand angezeigt, sondern der letzte in Git gespeicherte Stand.",
          "Der untere Bereich ist in zwei Panels gegliedert. Links befindet sich ein Tree-Panel mit dem klickbaren Directory Tree. Der Nutzer kann darin durch die Ordnerstruktur navigieren. Rechts befindet sich ein File-Präsentationspanel. Klickt der Nutzer im Tree auf eine Textdatei, wird deren Inhalt in diesem rechten Panel angezeigt. Auch diese File-Inhalte werden aus Git gelesen.",
        ],
      },
    ],
  },
  {
    id: "design-surfaces-dashboard",
    label: "Dashboard",
    meta: "Oberfläche",
    eyebrow: "Design",
    title: "Dashboard",
    lead:
      "Das Dashboard ist die Rahmenoberfläche der Anwendung und nimmt die beiden zentralen Teilpanels auf.",
    chips: [],
    contentSections: [
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          {
            parts: [
              {
                text: "Das Dashboard wird als einzelne Arbeitsfläche mit zwei fachlichen Haupt-Panels gedacht. ",
              },
              {
                text: "Das obere Panel dient der Projektpflege",
                linkTarget: "design-surfaces-project-maintenance-panel",
              },
              {
                text: ", ",
              },
              {
                text: "das untere Panel dient der Projektdatenpräsentation",
                linkTarget: "design-surfaces-project-presentation-panel",
              },
              {
                text: ".",
              },
            ],
          },
          "Beide Teilpanels nehmen die gesamte Breite der Applikation ein. Der obere Projektbereich nimmt etwa 25 Prozent der Höhe ein, der untere Präsentationsbereich etwa 75 Prozent.",
          "Damit bildet die Oberfläche die Include-Struktur des Use-Case-Modells direkt ab.",
        ],
      },
    ],
  },
  {
    id: "design-surfaces-project-maintenance-panel",
    label: "Projektpflege-Panel",
    meta: "Oberfläche",
    eyebrow: "Design",
    title: "Projektpflege-Panel",
    lead:
      "Das Projektpflege-Panel ist der obere Arbeitsbereich des Dashboards und bündelt Projektübersicht und Projektaktionen.",
    chips: [],
    contentSections: [
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          "Auf diesem Panel werden drei Elemente platziert: eine Tabelle mit den Projektdaten sowie zwei Buttons für die operativen Funktionen.",
          "Die Projekttabelle zeigt die Spalten Projektname, Status, Repository-Anzahl, erster Check-in, letzter Check-in, Check-in-Anzahl und getrackte Dateien. Die Sortierung erfolgt amerikanisch beziehungsweise zeitlich absteigend: Das Projekt mit dem neuesten letzten Check-in steht ganz oben, die weiteren Projekte folgen entsprechend absteigend.",
          "Der Status beschreibt den Bearbeitungs- beziehungsweise Beobachtungsstatus des Projekts, zum Beispiel aktiv, pausiert oder archiviert.",
          "Wenn der Nutzer mit der Maus auf eine Projektzeile geht, öffnet sich ein Tooltip mit einer kompakten Repository-Tabelle. Diese Tooltip-Tabelle zeigt die zugeordneten Repositories und deren aggregierte Daten, sodass die 1:n-Beziehung zwischen Projekt und Repositories sichtbar wird, ohne die Haupttabelle zu überladen.",
          "Die Funktion Projekte administrieren wird über die Projekttabelle ausgelöst. Der Nutzer kann eine Projektzeile selektieren. Per Rechtsklick auf die selektierte Zeile öffnet sich ein Kontextmenü, in dem der Menüpunkt Projekt administrieren angeboten wird.",
          "Das Panel ist horizontal unterteilt. Links steht die Projekttabelle; rechts befindet sich eine schmale Aktionsspalte mit zwei übereinander angeordneten Buttons. Der obere Button stellt die Funktion zur Neuanlage von Projekten bereit, der untere Button startet die Analyse der Git-Daten.",
          "Die beiden Buttons sind gleich groß und nur etwas größer als ihre textuelle Beschreibung. Die Projekttabelle nimmt den gesamten restlichen verfügbaren Raum in der Breite ein.",
        ],
      },
    ],
  },
  {
    id: "design-surfaces-project-presentation-panel",
    label: "Projektpräsentations-Panel",
    meta: "Oberfläche",
    eyebrow: "Design",
    title: "Projektpräsentations-Panel",
    lead:
      "Das Projektpräsentations-Panel ist der untere Arbeitsbereich des Dashboards und nimmt spätere Tabellen- und Grafikdarstellungen auf.",
    chips: [],
    contentSections: [
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          "Das Projektpräsentations-Panel gehört fachlich zum Use Case Projektdaten präsentieren.",
          "Es nimmt den unteren Bereich des Dashboards ein und ist für spätere tabellarische und grafische Präsentationen der Projektdaten vorgesehen.",
          "Die genaue Ausgestaltung wird in den Use Cases Präsentation in Tabellenform und Präsentation in grafischer Form weiter differenziert.",
          "Die Oberfläche wird als Tab Pane ausgeführt. Es gibt zwei aktivierbare Paneele: eines für die Tabellenansicht und eines für die grafische Ansicht.",
        ],
        subsections: [
          {
            id: "paneel-tabellendarstellung-projekte",
            title: "Paneel 1: Tabellendarstellung von Projekten",
            paragraphs: [
              "Das erste Paneel enthält die tabellarische Darstellung von Projektdaten. Es dient insbesondere der projektbezogenen Anzeige von Git-Commits und den zugehörigen Check-in-Metriken.",
              "Im oberen Bereich wird ein Projekt-Selector als Kombobox angeboten. Die Projekte werden in der Kombobox sortiert angezeigt; die zuletzt angelegten Projekte stehen an erster Stelle. Das zeitlich letzte Projekt ist vorausgewählt.",
              "Im unteren Bereich befindet sich die Tabelle mit sämtlichen Check-in-Daten und den zugehörigen Metriken des vorausgewählten beziehungsweise aktuell selektierten Projekts. Die Tabelle füllt die restliche verfügbare Fläche des Paneels aus.",
            ],
          },
          {
            id: "paneel-graphenbasierte-darstellung-projekte",
            title: "Paneel 2: Graphenbasierte Darstellung",
            paragraphs: [
              "Das zweite Paneel enthält zwei Bereiche: einen oberen Administrationsbereich und einen unteren Bereich für die Darstellung eines Graphen.",
              "Der Administrationsbereich enthält drei Komboboxen. In der ersten Kombobox wird der Graphentyp ausgewählt. Die zweite Kombobox dient der Projektauswahl und wird nur aktiviert, wenn der ausgewählte Graphentyp eine Projektspezifikation benötigt. Die dritte Kombobox administriert die zeitliche Gruppierung und bietet die Werte tägliche Gruppierung und wöchentliche Gruppierung an.",
              "Wird eine Projektspezifikation benötigt, werden die Projekte zeitlich sortiert angezeigt. Die Default-Belegung ist das zeitlich zuletzt angelegte Projekt; maßgeblich ist dabei das Startdatum des Projekts.",
              "Im unteren Bereich wird die Grafik dargestellt. Die X-Achse ist in der Regel zeitabhängig, während auf der Y-Achse die jeweilige Metrik angezeigt wird.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design-surfaces-project-dialog",
    label: "Projekt-Dialog",
    meta: "Oberfläche",
    eyebrow: "Design",
    title: "Projekt-Dialog",
    lead:
      "Der Projekt-Dialog ist ein wiederverwendbarer Dialog für Projektneuanlage und spätere Projektadministration.",
    chips: [],
    contentSections: [
      {
        title: "Oberflächenbeschreibung",
        paragraphs: [
          "Die Oberfläche wird als Pop-up-Window gedacht, das aus dem Projektpflege-Panel heraus geöffnet wird. Das Dialogfenster besitzt rechts oben den üblichen Schließen-Button X.",
          "Im oberen Sub-Panel werden die Projektdaten erfasst. Links steht eine kompakte Formulargruppe mit den Labels Name, Projektstart und Projektende; rechts neben den Labels liegen die zugehörigen Eingabefelder. Name ist ein einzeiliges Textfeld, Projektstart und Projektende sind Datumsfelder mit Datumsselektor. Rechts daneben wird eine mehrzeilige Textarea für die Projektbeschreibung angeboten.",
          "Darunter befindet sich ein zweites Sub-Panel für die Repository-Zuordnung. Die Auswahl wird als Zwei-Listen-Mechanik umgesetzt: links verfügbare Repositories, rechts dem Projekt zugeordnete Repositories. Über Hinzufügen und Entfernen können Repositories zwischen beiden Listen bewegt werden.",
          "Am unteren Rand des Pop-up-Windows stehen die beiden Dialogaktionen OK und Abbrechen.",
        ],
        subsections: [
          {
            id: "oberflaechenkonfiguration-neue-projekte-anlegen",
            title: "Oberflächenkonfiguration Neue Projekte anlegen",
            paragraphs: [
              "Im Use Case Neue Projekte anlegen dient der Projekt-Dialog der initialen Erfassung eines neuen Projekts. Das Feld Name ist administrierbar. Projektstart ist ebenfalls administrierbar und wird mit dem aktuellen Datum vorbelegt. Projektende ist in dieser Konfiguration nicht administrierbar.",
            ],
          },
          {
            id: "oberflaechenkonfiguration-projekte-administrieren",
            title: "Oberflächenkonfiguration Projekte administrieren",
            paragraphs: [
              "Im Use Case Projekte administrieren dient der Projekt-Dialog der Pflege eines bereits bestehenden Projekts. Der Name kann nicht geändert werden. Projektstart ist ebenfalls nicht administrierbar.",
              "Projektende wird initial aus der Datenbank geladen. Ist der gespeicherte Wert null, bleibt das Feld zunächst ungesetzt. Entscheidet sich der Nutzer, ein Projektende einzutragen oder zu ändern, wird dieser Wert beim Beenden des Dialogs in der Datenbank gespeichert.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-modeling",
    label: "Modellierung",
    meta: "Tabellenstruktur",
    eyebrow: "Analyse",
    title: "Modellierung der Datenbankstruktur",
    lead:
      "Hier wird aus den Use Cases schrittweise ein Datenmodell abgeleitet. Der Einstieg ist ein Klassendiagramm für ChatGPT-Projekte, zugeordnete Git-Repositories und daraus berechnete Metrikdaten.",
    chips: ["Klassendiagramm", "Stammdaten", "Metriken"],
    modelClasses: [
      {
        id: "model-project",
        name: "chat_gpt_project",
        attributes: ["projectId", "name", "description", "status", "startDate", "endDate"],
      },
      {
        id: "model-repository",
        name: "git_repository",
        attributes: [
          "repositoryId",
          "projectId",
          "path",
          "remoteUrl",
          "firstCheckInDate",
          "lastCheckInDate",
          "checkInCount",
          "hasChatGptContext",
        ],
      },
      {
        id: "model-metrics",
        name: "check_in_metric",
        attributes: [
          "checkInMetricId",
          "repositoryId",
          "commitHash",
          "commitDate",
          "messageSubject",
          "changedFileCount",
          "addedLineCount",
          "deletedLineCount",
          "netLineChange",
          "churnLineCount",
          "trackedFileCount",
          "isMergeCommit",
        ],
      },
    ],
    modelRelations: [
      "git_repository.projectId verweist auf chat_gpt_project.projectId.",
      "check_in_metric.repositoryId verweist auf git_repository.repositoryId.",
    ],
    contentSections: [
      {
        title: "Tabellenbeschreibung",
        paragraphs: [
          "Die Tabellenbeschreibung hält die semantische Bedeutung der Tabellen fest und beschreibt die Foreign-Key-Beziehungen, an denen sich das relationale Modell orientiert.",
        ],
        subsections: [
          {
            title: "chat_gpt_project",
            paragraphs: [
              "chat_gpt_project enthält die Stammdaten eines verwalteten ChatGPT-Projekts. Ein Projekt beschreibt eine fachliche oder technische Arbeitseinheit, die in der Anwendung verwaltet und später im Dashboard ausgewertet werden soll. Über startDate und endDate kann zusätzlich der fachliche Zeitraum des Projekts beschrieben werden.",
              "Die Tabelle ist der fachliche Einstiegspunkt des Modells. Sie besitzt in diesem Stand keine Foreign Keys zu anderen Tabellen.",
            ],
          },
          {
            title: "git_repository",
            paragraphs: [
              "git_repository beschreibt ein Git-Repository, das einem ChatGPT-Projekt zugeordnet ist. Ein Projekt kann ein oder mehrere Repositories besitzen, weil technische Artefakte und Git-Historie nicht zwingend in genau einem Repository liegen müssen.",
              "Die Foreign-Key-Beziehung `git_repository.projectId` verweist auf `chat_gpt_project.projectId`. Dadurch wird jedes Repository einem verwalteten ChatGPT-Projekt zugeordnet. Wird ein Projekt gelöscht, werden die zugeordneten Git-Repositories über `ON DELETE CASCADE` automatisch entfernt.",
              "Repository-weite Kennzahlen wie `firstCheckInDate`, `lastCheckInDate`, `checkInCount` und `hasChatGptContext` werden direkt bei git_repository geführt. Sie beschreiben verdichtete Historienmerkmale des Repositories und müssen nicht als einzelne Check-in-Metriken modelliert werden.",
              "`hasChatGptContext` markiert, ob im persistierten Git-Stand ein Kontextordner wie `ChatGptContext` vorhanden ist. Das Flag wird beim Speichern der Repository-Zuordnung initial gesetzt und bei der Git-Datenanalyse aktualisiert.",
            ],
          },
          {
            title: "check_in_metric",
            paragraphs: [
              "check_in_metric enthält einzelne aus Git gelesene oder abgeleitete Check-in-Metriken. Diese Daten werden nicht manuell gepflegt, sondern durch die Analyse der zugeordneten Git-Repositories und ihrer Check-ins ermittelt.",
              "Die Foreign-Key-Beziehung `check_in_metric.repositoryId` verweist auf `git_repository.repositoryId`. Dadurch gehört jede Check-in-Metrik eindeutig zu dem Repository, aus dem der Check-in gelesen wurde. Wird ein Git-Repository gelöscht, werden die zugehörigen Check-in-Metriken ebenfalls per `ON DELETE CASCADE` entfernt.",
              "`trackedFileCount` wird als Check-in-Metrik geführt, weil damit pro Check-in festgehalten wird, wie viele von Git verwaltete Dateien zu diesem Zeitpunkt existierten. Der aktuelle Wert für ein Repository kann später über den letzten Check-in ermittelt werden.",
              "Tägliche oder wöchentliche Aggregationen werden nicht als eigene Tabellen modelliert. Sie können bei der Präsentation aus `check_in_metric.commitDate` per SQL `GROUP BY` oder alternativ in Python gruppiert und berechnet werden.",
            ],
          },
        ],
      },
      {
        title: "SQL Datenbankbeschreibung",
        paragraphs: [
          "Die folgenden SQL-Statements beschreiben den aktuellen operativen Stand des Datenmodells für MySQL. Die Tabellen werden in Foreign-Key-Reihenfolge angelegt: zuerst das Projekt, danach das Repository und zuletzt die Check-in-Metrik.",
        ],
        code: `CREATE TABLE chat_gpt_project (
  projectId BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status VARCHAR(64) NOT NULL,
  startDate DATE NULL,
  endDate DATE NULL,
  PRIMARY KEY (projectId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE git_repository (
  repositoryId BIGINT NOT NULL AUTO_INCREMENT,
  projectId BIGINT NOT NULL,
  path VARCHAR(1024) NOT NULL,
  remoteUrl VARCHAR(1024) NULL,
  firstCheckInDate DATETIME NULL,
  lastCheckInDate DATETIME NULL,
  checkInCount INT NOT NULL DEFAULT 0,
  hasChatGptContext BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (repositoryId),
  CONSTRAINT fk_git_repository_project
    FOREIGN KEY (projectId)
    REFERENCES chat_gpt_project (projectId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE check_in_metric (
  checkInMetricId BIGINT NOT NULL AUTO_INCREMENT,
  repositoryId BIGINT NOT NULL,
  commitHash VARCHAR(64) NOT NULL,
  commitDate DATETIME NOT NULL,
  messageSubject VARCHAR(512) NULL,
  changedFileCount INT NOT NULL DEFAULT 0,
  addedLineCount INT NOT NULL DEFAULT 0,
  deletedLineCount INT NOT NULL DEFAULT 0,
  netLineChange INT NOT NULL DEFAULT 0,
  churnLineCount INT NOT NULL DEFAULT 0,
  trackedFileCount INT NOT NULL DEFAULT 0,
  isMergeCommit BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (checkInMetricId),
  UNIQUE KEY uq_check_in_metric_repository_commit (repositoryId, commitHash),
  KEY idx_check_in_metric_repository_date (repositoryId, commitDate),
  CONSTRAINT fk_check_in_metric_repository
    FOREIGN KEY (repositoryId)
    REFERENCES git_repository (repositoryId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
      },
    ],
  },
  ...useCases.map((useCase) => ({
    id: useCase.id,
    label: useCase.label,
    meta: useCase.actor,
    eyebrow: "Use Case",
    title: useCase.label,
    lead: useCase.goal,
    chips: useCase.chips ?? [useCase.actor, "Ablauf", "Dokumentation"],
    focusTitle: "Kurzbeschreibung",
    focusText: useCase.summary,
    focusPoints: useCase.steps,
    contentSections: useCase.contentSections,
    nextStep:
      "Diesen Use Case können wir als nächstes mit Vorbedingungen, Hauptablauf, Varianten und betroffenen Tabellen ausformulieren.",
  })),
];
