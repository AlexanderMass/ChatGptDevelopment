# Epic 1 Context Info: Analyse

## Zweck

Diese Datei verdichtet die fachlichen Kontextinformationen zu Epic 1 `Analyse`. Sie dient als Einarbeitungspunkt fuer neue Chats oder Threads, die an Analyse, Modellierung oder Dokumentationsrefactoring weiterarbeiten.

Die prozessuale Steuerung des Epics liegt weiterhin in `Epic1_Analyse.md`.

## Fachlicher Kern

Epic 1 beschreibt die analytische Vorarbeit des Projekts `ChatGptDevelopment`.

Die Analyse war modellgetrieben und nutzte drei Hauptachsen:

- Use Cases: fachliche Funktionen der Anwendung
- Design: wiederverwendbare Oberflaechen- und Strukturentscheidungen
- Modellierung: Datenbankmodellierung und SQL-Schema

Die Analyse ist kein vollstaendiges Pflichtenheft. Sie bildet eine belastbare Orientierung, waehrend Implementierungsdetails im Pairing zwischen Mensch und KI konkretisiert werden.

## Zentrale Ergebnisse

- Die Anwendung wurde auf drei Hauptbereiche fokussiert: `Dashboard`, `Cockpit` und `Analyse`.
- Das Dashboard verwaltet ChatGPT-Development-Projekte und praesentiert Git-Metriken.
- Das Cockpit macht Kontextordner verwalteter Projekte sichtbar.
- Die Analyse bleibt als dokumentierender Arbeitsbereich erhalten.
- Das Datenmodell basiert auf `chat_gpt_project`, `git_repository` und `check_in_metric`.
- `chat_gpt_project` ist die fachliche Wurzel des Modells.
- Repositories werden bewusst projektbezogen modelliert.
- Check-in-Metriken werden aus Git abgeleitet und projektbezogen praesentiert.

## Analysebereich

Der Analysebereich ist als dokumentierender Arbeitsraum aufgebaut.

Er umfasst im Kern:

- Use Cases fuer die fachliche Funktionssicht
- Designobjekte fuer wiederverwendbare Oberflaechen- und Strukturentscheidungen
- Modellierung fuer Datenbankstruktur und SQL-Schema

Die urspruengliche Use-Case-Struktur wurde hierarchisch gedacht. `Dashboard nutzen` war der zentrale Haupt-Use-Case. Darunter wurden Projektpflege, Projektdatenpraesentation, Projektanlage, Projektadministration, Git-Datenanalyse sowie tabellarische und grafische Praesentation herausgearbeitet.

Die Analysemodelle dienen als Orientierung und Navigationshilfe. Sie ersetzen keine vollstaendige Uebergabespezifikation, sondern schaffen eine belastbare gemeinsame Sprache fuer Umsetzung und spaetere Refactorings.

## Datenmodell

Das Datenmodell ist bewusst klein und projektzentriert gehalten.

Physische Kernobjekte:

- `chat_gpt_project`: Stammdaten eines verwalteten ChatGPT-Projekts
- `git_repository`: einem Projekt zugeordnetes Git-Repository
- `check_in_metric`: aus Git-Check-ins abgeleitete Einzelmetriken

Wichtige Entscheidungen:

- `chat_gpt_project` ist die fachliche Wurzel des Modells.
- `git_repository.projectId` verweist auf `chat_gpt_project.projectId` mit `ON DELETE CASCADE`.
- `check_in_metric.repositoryId` verweist auf `git_repository.repositoryId` mit `ON DELETE CASCADE`.
- Wird ein Projekt geloescht, werden dadurch auch seine Repositories und deren Check-in-Metriken entfernt.
- Repositories werden projektbezogen modelliert, auch wenn derselbe physische Repository-Pfad theoretisch in mehreren Projekten vorkommen kann.

Repository-weite Kennzahlen werden direkt auf `git_repository` gefuehrt:

- `firstCheckInDate`
- `lastCheckInDate`
- `checkInCount`
- `hasChatGptContext`

`hasChatGptContext` markiert, ob im persistierten Git-Stand ein Kontextordner wie `ChatGptContext` vorhanden ist. Das Flag wird beim Speichern der Repository-Zuordnung initial gesetzt und bei der Git-Datenanalyse aktualisiert.

Check-in-Metriken werden als stabile, direkt aus Git ableitbare Attribute modelliert. Dazu gehoeren unter anderem Commit-Hash, Commit-Datum, Message Subject, geaenderte Dateien, Zeilendeltas, Churn, Net Line Change, Tracked File Count und Merge-Status.

Ein generisches `metricPayload` wurde bewusst nicht in den ersten Modellstand aufgenommen.

## Metrikverstaendnis

Git-Metriken werden als beobachtbare Entwicklungsspur verstanden, nicht als einfache Produktivitaetszahl.

Die Anwendung unterscheidet zwischen Rohereignissen und daraus abgeleiteten Interpretationen. Git liefert belastbare Artefaktspuren wie Commits, Dateiaenderungen und Zeilendeltas. Diese Daten muessen aber fachlich vorsichtig interpretiert werden.

Aggregierte Werte werden nicht dauerhaft in eigenen Tabellen gespeichert. Taegliche und woechentliche Auswertungen werden aus `check_in_metric.commitDate` per SQL `GROUP BY` oder in der Anwendung gruppiert und berechnet.

Der aktuelle File-Bestand wird nicht als Repository-Stammdatum gespeichert, sondern ueber `check_in_metric.trackedFileCount` historisiert.

## Operative Einordnung

Die statische Weboberflaeche wird ueber Caddy ausgeliefert. Dynamische Datenbank-, Git- und Dateisystemfunktionen werden ueber einen lokalen Node.js-Server bereitgestellt.

Diese operative Einordnung gehoert heute eher zu Epic 2 und Epic 4, wurde aber urspruenglich in der Analyse vorbereitet. Fuer Epic 1 bleibt wichtig: Browserlogik soll nicht direkt auf MySQL oder Git zugreifen. Dynamische Funktionen werden ueber Serverfunktionen gekapselt.

## Refactoring-Hinweis

Die frueheren Dateien `AnalysisContext.md`, `DatabaseContext.md` und `WebDesignContext.md` wurden in diese Context-Info-Datei konsolidiert und koennen als zeitliche Artefakte entfallen.
