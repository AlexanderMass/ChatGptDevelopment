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
          "Das Dashboard wird als einzelne Arbeitsfläche mit zwei fachlichen Haupt-Panels gedacht. Das obere Panel dient der Projektpflege, das untere Panel der Projektdatenpräsentation. Beide Teilpanels nehmen die gesamte Breite der Applikation ein. Der obere Projektbereich nimmt etwa 25 Prozent der Höhe ein, der untere Präsentationsbereich etwa 75 Prozent. Damit bildet die Oberfläche die Include-Struktur des Use-Case-Modells direkt ab.",
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
    includes: ["uc-create-project", "uc-analyze-git-data"],
    chips: [],
    contentSections: [
      {
        title: "Funktion",
        paragraphs: [
          "Der Use Case Projekte pflegen beschreibt den operativen Umgang mit den in der Datenbank verwalteten ChatGPT-Projekten. Der Nutzer soll sehen können, welche Projekte bereits angelegt sind und welche Repository-Informationen ihnen zugeordnet wurden.",
          "Zu jedem Projekt werden die gespeicherten Projektinformationen aus der Datenbank angezeigt. Dazu gehören auch verdichtete beziehungsweise aggregierte Metrikinformationen, die aus den zugeordneten Git-Repositories und Check-in-Metriken abgeleitet werden.",
          "Die Applikation bietet in diesem Bereich zwei operative Funktionen an: neue Projekte anlegen und Git-Daten analysieren. Diese Funktionen sprechen die jeweils referenzierten Use Cases an; ihre Detailbeschreibung erfolgt dort.",
          "Der Use Case bildet damit die fachliche Klammer für zwei untergeordnete Aufgaben: neue Projekte anlegen und Git-Daten analysieren. Die Detailregeln dieser Aufgaben werden in den inkludierten Use Cases weiter beschrieben.",
        ],
      },
      {
        title: "Oberflächendesign",
        paragraphs: [
          "Die Oberfläche wird als Projektpflege-Panel innerhalb des Dashboards gedacht. Auf diesem Panel werden drei Elemente platziert: eine Tabelle mit den Projektdaten sowie zwei Buttons für die operativen Funktionen.",
          "Die Projekttabelle zeigt die Spalten Projektname, Status, Repository-Anzahl, erster Check-in, letzter Check-in, Check-in-Anzahl und getrackte Dateien. Die Sortierung erfolgt amerikanisch beziehungsweise zeitlich absteigend: Das Projekt mit dem neuesten letzten Check-in steht ganz oben, die weiteren Projekte folgen entsprechend absteigend. Der Status beschreibt den Bearbeitungs- beziehungsweise Beobachtungsstatus des Projekts, zum Beispiel aktiv, pausiert oder archiviert.",
          "Wenn der Nutzer mit der Maus auf eine Projektzeile geht, öffnet sich ein Tooltip mit einer kompakten Repository-Tabelle. Diese Tooltip-Tabelle zeigt die zugeordneten Repositories und deren aggregierte Daten, sodass die 1:n-Beziehung zwischen Projekt und Repositories sichtbar wird, ohne die Haupttabelle zu überladen.",
          "Das Panel ist horizontal unterteilt. Links steht die Projekttabelle; rechts befindet sich eine schmale Aktionsspalte mit zwei übereinander angeordneten Buttons. Der obere Button stellt die Funktion zur Neuanlage von Projekten bereit, der untere Button startet die Analyse der Git-Daten.",
          "Die beiden Buttons sind gleich groß und nur etwas größer als ihre textuelle Beschreibung. Die Projekttabelle nimmt den gesamten restlichen verfügbaren Raum in der Breite ein. Dadurch bleiben Projektübersicht und operative Pflegefunktionen in einem gemeinsamen Arbeitsbereich gebündelt.",
          "Wenn der Nutzer auf den Button Neue Projekte anlegen drückt, öffnet sich ein Pop-up-Window mit der entsprechenden Erfassungsfunktion. Die fachliche Detailbeschreibung erfolgt im Use Case Neue Projekte anlegen.",
          "Wenn der Nutzer auf den Button Git-Daten analysieren drückt, startet eine Python-Funktion. Diese analysiert die zugeordneten Git-Repositories, ermittelt die relevanten Git- und Metrikdaten und legt die Ergebnisse in der Datenbank ab. Die fachliche Detailbeschreibung erfolgt im Use Case Git-Daten analysieren.",
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
          "Der Nutzer kann einen Projektnamen eingeben und separat eine Projektbeschreibung erfassen.",
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
          "Die Oberfläche wird als Pop-up-Window gedacht, das aus dem Projektpflege-Panel heraus geöffnet wird. Das Dialogfenster besitzt rechts oben den üblichen Schließen-Button X.",
          "Im oberen Sub-Panel werden die Projektdaten erfasst. Links steht ein einzeiliges Textfeld für den Projektnamen. Rechts daneben wird eine mehrzeilige Textarea für die Projektbeschreibung angeboten.",
          "Darunter befindet sich ein zweites Sub-Panel für die Repository-Zuordnung. Die Auswahl wird als Zwei-Listen-Mechanik umgesetzt: links verfügbare Repositories, rechts dem Projekt zugeordnete Repositories. Über Hinzufügen und Entfernen können Repositories zwischen beiden Listen bewegt werden.",
          "Am unteren Rand des Pop-up-Windows stehen die beiden Dialogaktionen Projekt anlegen und Abbrechen.",
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
              "Für jedes zugeordnete Repository werden die verdichteten Repository-Kennzahlen `lastCheckInDate` und `checkInCount` ermittelt und in `git_repository` gespeichert.",
              "`firstCheckInDate` wird bereits im Use Case Neue Projekte anlegen bei der initialen Repository-Datenermittlung bestimmt.",
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
        children: useCaseTree,
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
    title: "Use-Case-Design",
    lead:
      "Hier entsteht die grafische Use-Case-Sicht. Die Bubbles sind als Einstieg in die spätere Dokumentation der einzelnen Use Cases gedacht.",
    chips: ["Akteure", "Use Cases", "Dokumentation"],
    focusTitle: "Interaktive Modellierung",
    focusText:
      "Die Use-Case-Seite verbindet eine grafische Übersicht mit Detailseiten. Der Haupt-Use-Case Dashboard nutzen inkludiert Projektpflege und Präsentation. Projektpflege teilt sich in Projektanlage und Git-Datenanalyse auf, Präsentation in Tabellen- und Grafikform.",
    focusPoints: [
      "Use Cases gemeinsam fachlich schneiden",
      "Akteure, Ziele und Hauptabläufe dokumentieren",
      "Später daraus Datenmodell und API-Aufgaben ableiten",
    ],
    nextStep:
      "Der nächste sinnvolle Schritt ist, die ersten Use Cases gemeinsam zu benennen und ihre Hauptabläufe zu schärfen.",
    children: useCaseTree,
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
        attributes: ["projectId", "name", "description", "status"],
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
              "chat_gpt_project enthält die Stammdaten eines verwalteten ChatGPT-Projekts. Ein Projekt beschreibt eine fachliche oder technische Arbeitseinheit, die in der Anwendung verwaltet und später im Dashboard ausgewertet werden soll.",
              "Die Tabelle ist der fachliche Einstiegspunkt des Modells. Sie besitzt in diesem Stand keine Foreign Keys zu anderen Tabellen.",
            ],
          },
          {
            title: "git_repository",
            paragraphs: [
              "git_repository beschreibt ein Git-Repository, das einem ChatGPT-Projekt zugeordnet ist. Ein Projekt kann ein oder mehrere Repositories besitzen, weil technische Artefakte und Git-Historie nicht zwingend in genau einem Repository liegen müssen.",
              "Die Foreign-Key-Beziehung `git_repository.projectId` verweist auf `chat_gpt_project.projectId`. Dadurch wird jedes Repository einem verwalteten ChatGPT-Projekt zugeordnet.",
              "Repository-weite Kennzahlen wie `firstCheckInDate`, `lastCheckInDate` und `checkInCount` werden direkt bei git_repository geführt. Sie beschreiben verdichtete Historienmerkmale des Repositories und müssen nicht als einzelne Check-in-Metriken modelliert werden.",
            ],
          },
          {
            title: "check_in_metric",
            paragraphs: [
              "check_in_metric enthält einzelne aus Git gelesene oder abgeleitete Check-in-Metriken. Diese Daten werden nicht manuell gepflegt, sondern durch die Analyse der zugeordneten Git-Repositories und ihrer Check-ins ermittelt.",
              "Die Foreign-Key-Beziehung `check_in_metric.repositoryId` verweist auf `git_repository.repositoryId`. Dadurch gehört jede Check-in-Metrik eindeutig zu dem Repository, aus dem der Check-in gelesen wurde.",
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
  PRIMARY KEY (repositoryId),
  CONSTRAINT fk_git_repository_project
    FOREIGN KEY (projectId)
    REFERENCES chat_gpt_project (projectId)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
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
