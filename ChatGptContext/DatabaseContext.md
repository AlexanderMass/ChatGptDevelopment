# DatabaseContext

## Zugehoeriger Arbeitsordner

`D:\Alexander\Python\ChatGptDevelopment\Db`

## Ziel

Dieses Teilprojekt klammert alle Coding-Aktivitaeten rund um die Datenbank.

Ziel ist der Aufbau einer gemeinsamen Datenbasis fuer Dialogdaten zwischen Mensch und KI sowie fuer Entwicklungsartefakte aus Versionskontrolle und Codeaenderungen. Die Datenbank soll diese Informationen strukturiert, nachvollziehbar und auswertbar speichern.

## Typische Inhalte

- Schemata fuer Dialog-, Sequenz-, Zeit- und Entwicklungsdaten
- Tabellen, Views, Indizes und Constraints
- Migrations- oder Setup-Skripte fuer reproduzierbare Datenbankstaende
- Logik zur Verknuepfung von Interaktion und Codeaenderung

## Abgrenzung

- Schnittstellenlogik und Datenbereitstellung gehoeren primaer in den `ApiContext`.
- Oberflaechen, Visualisierung und Nutzerinteraktion gehoeren in den `WebDesignContext`.
- Analysefragen werden hier nur insoweit behandelt, wie sie die Modellierung und Abfragefaehigkeit der Datenbasis beeinflussen.

## Arbeitsprinzip

Datenbankcode soll reproduzierbar, versionierbar und nachvollziehbar sein. Die Struktur soll so angelegt werden, dass sowohl Rohdaten als auch spaetere abgeleitete Metriken konsistent gespeichert und ausgewertet werden koennen.

## Aktueller Modellierungsstand

Der aktuelle Datenbankkern ist bewusst klein und relational konservativ gehalten.

Geplante physische Tabellen:

- `chat_gpt_project`: Stammdaten eines verwalteten ChatGPT-Projekts
- `git_repository`: einem Projekt zugeordnetes Git-Repository
- `check_in_metric`: aus Git-Check-ins abgeleitete Einzelmetriken

Wichtige Attribute von `chat_gpt_project`:

- `projectId`
- `name`
- `description`
- `status`
- `startDate`
- `endDate`

Wichtige Foreign-Key-Beziehungen:

- `git_repository.projectId` verweist auf `chat_gpt_project.projectId` mit `ON DELETE CASCADE`
- `check_in_metric.repositoryId` verweist auf `git_repository.repositoryId` mit `ON DELETE CASCADE`

Damit gilt für Löschvorgänge: Wird ein Projekt gelöscht, werden die zugeordneten Git-Repositories automatisch entfernt. Durch die zweite Kaskade werden dabei auch die zugehörigen Check-in-Metriken gelöscht.

Aggregierte Werte sollen zunächst nicht dauerhaft gespeichert werden. Tägliche und wöchentliche Auswertungen werden aus `check_in_metric.commitDate` per SQL `GROUP BY` oder alternativ in Python gruppiert und berechnet.

## Repository-Kennzahlen

Allgemeine repository-weite Kennzahlen werden direkt auf `git_repository` geführt, weil sie den Zustand oder die Historie des gesamten Repositories beschreiben:

- `firstCheckInDate`
- `lastCheckInDate`
- `checkInCount`

Diese Werte können beim Use Case `Git-Daten analysieren` aus Git ermittelt und als verdichtete Repository-Merkmale gespeichert werden. Der aktuelle File-Bestand wird dagegen nicht hier gespeichert, sondern über `check_in_metric.trackedFileCount` historisiert. Flüchtige Arbeitsbaumwerte wie `untrackedFileCount` oder `modifiedFileCount` gehören zunächst nicht in den Kernentwurf.

## Check-in-Metriken

Das Attribut `check_in_metric.metricPayload` wird zunächst nicht in das Modell aufgenommen.

Stattdessen enthält `check_in_metric` für den ersten Stand nur stabile, direkt aus Git ableitbare Kernattribute:

- `checkInMetricId`
- `repositoryId`
- `commitHash`
- `commitDate`
- `messageSubject`
- `changedFileCount`
- `addedLineCount`
- `deletedLineCount`
- `netLineChange`
- `churnLineCount`
- `trackedFileCount`
- `isMergeCommit`

Weitere Detailinformationen aus Git sollen erst dann ergänzt werden, wenn konkrete Auswertungsfragen entstehen. Dann kann die Tabelle erweitert oder ein eigenes Detailmodell ergänzt werden.

## Operative Datenbereitstellung

Die Weboberflaeche bleibt statisch und wird weiterhin ueber den vorhandenen Caddy-Service ausgeliefert. Dynamische Datenbank- und Git-Funktionen sollen nicht im Browser implementiert werden, sondern ueber einen lokalen Node.js-Server bereitgestellt werden.

Node.js wird dabei semantisch als lokaler REST/API-Server verstanden. Das Frontend ruft REST-Endpunkte auf; der Node-Server kapselt MySQL-Zugriffe, Git-Auswertungen, Dateisystemzugriffe und fachliche Serviceablaeufe.

Fuer die private Projektlandschaft wird ein Service pro Applikation bevorzugt. Fuer dieses Projekt waere das ein eigener Windows-Service, zum Beispiel `ChatGptDevelopmentApi`, der den Node-Server startet. Caddy und Node bleiben damit klar getrennt: Caddy liefert statische Dateien, Node liefert dynamische REST-Services.

Der Node-Server soll spaeter per NSSM als Microsoft-Service eingerichtet werden, damit er beim Systemstart automatisch verfuegbar ist. Node.js selbst ist nur die installierte Laufzeitumgebung; dauerhaft laufen soll die konkrete Serverapplikation.

Bei Node.js-Updates bleibt der Service normalerweise gueltig, solange der Pfad zu `node.exe` gleich bleibt. Wird nur der Servercode geaendert, reicht ein Neustart des Services. Nur wenn sich der Node-Pfad oder das Startskript aendert, muss die Service-Konfiguration angepasst werden.
