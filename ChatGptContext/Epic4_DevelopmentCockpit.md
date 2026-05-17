# Epic: Development Cockpit

Epic-Nummer: 4

## Ziel

Dieses Epic dokumentiert die Idee einer neuen Webapplikation mit dem Namen `Development Cockpit`.

Ziel ist es, eine zentrale Oberfläche zu schaffen, über die Kontextordner verschiedener ChatGPT-Development-Projekte sichtbar und kontrollierbar werden. Das Cockpit soll helfen, den Zustand der Projektdokumentation, die Struktur der Kontextdateien und mögliche Qualitätsanker projektübergreifend im Blick zu behalten.

## Scope

Zum Epic gehören:

- Konzeption einer neuen Webapplikation `Development Cockpit`
- Zugriff auf Kontextordner anderer ChatGPT-Development-Projekte
- Übersicht über vorhandene Kontextdateien
- Darstellung des Dokumentationsstands pro Projekt
- Definition von Qualitätsankern für Kontextdokumentation
- spätere Ableitung von Prüf- und Navigationsfunktionen

Nicht zum Epic gehören:

- sofortige Implementierung der Cockpit-Anwendung
- automatische inhaltliche Bewertung aller Kontextdateien
- vollständiges Projektmanagementsystem
- Ersatz der bestehenden Dashboard-Applikation

## Kontext

Die bisherige Dashboard-Anwendung verwaltet konkrete ChatGPT-Projekte und Git-Metriken. Das `Development Cockpit` wäre eine neue, stärker methodische Sicht auf die Projektlandschaft.

Während das Dashboard projektbezogene Entwicklungsdaten präsentiert, soll das Cockpit die Dokumentations- und Kontextstruktur mehrerer Projekte sichtbar machen. Dadurch entsteht eine zentrale Stelle, an der kontrolliert werden kann, wie sich Kontextordner entwickeln und ob projektübergreifende Standards eingehalten werden.

Das Cockpit steht damit in enger Beziehung zu Epic 3. Epic 3 erarbeitet die methodischen Grundlagen, während Epic 4 perspektivisch eine operative Oberfläche für deren Kontrolle und Anwendung bereitstellt.

## Stories

- [ ] Story 4.1: Development-Cockpit-Analyse
- [ ] Story 4.2: Development-Cockpit-Implementierung
- [ ] Story 4.3: Verschiedenes und Querschnittliches

## Entscheidungen

- Das `Development Cockpit` wird als eigenständige Webapplikation verstanden.
- Die Anwendung soll nicht die bestehende Dashboard-Funktion ersetzen, sondern eine neue methodische Sicht ergänzen.
- Kontextordner werden als zentrale Beobachtungsobjekte behandelt.
- Das Cockpit verwendet die Projektstruktur, die bereits für das Dashboard aufgebaut wurde.
- Es wird keine vorgelagerte umfangreiche Modellierungsarbeit für Projekt- und Kontextordner geplant.
- Qualitätsanker sollen helfen, Dokumentationsarbeit kontrollierbarer und reproduzierbarer zu machen.
- Die konkrete technische Architektur wird später separat entschieden.

## Backlog Und Fortschritt

### Fortschritt Nach Commits

- Offen: Die zugehörigen Commits werden nach Beginn der konkreten Arbeit ergänzt.

### Architekturkonzept

Das `Development Cockpit` soll Kontextordner anderer ChatGPT-Development-Projekte dynamisch über Serverfunktionen lesen.

Ausgangspunkt sind die bereits in der Datenbank bekannten Projekte und ihre zugeordneten Git-Repositories. Auf `git_repository` wird dafür das Boolean-Flag `hasChatGptContext` gepflegt. Es wird beim Speichern einer Repository-Zuordnung initial aus dem Git-Stand ermittelt und beim Use Case `Git-Daten analysieren` erneut aktualisiert. Wird ein Kontextordner später entfernt, verliert das Repository dadurch auch seine Cockpit-Relevanz.

Der Cockpit-Projektfilter kann damit direkt über die Datenbank laufen: Ein Projekt wird angezeigt, wenn mindestens eines seiner zugeordneten Repositories `hasChatGptContext = 1` besitzt. Die konkrete Struktur und die Markdown-Dateien des Kontextordners werden anschließend über den bekannten lokalen Repository-Pfad gelesen.

Das Cockpit wird damit als Projektintrospektion verstanden. Es beobachtet Projekte von außen, indem es die bekannten Projekt- und Repository-Daten nutzt und die standardisierte Directory-Struktur der Projekte auswertet. Wenn Projekte der Struktur aus `NeuesProjekt.md` folgen, kann das Cockpit Projektkontext, AiScrum-Struktur, Epics, Stories und Ressourcenbezüge sichtbar machen.

Der Zugriff auf Kontextdateien erfolgt nicht über eine Kopie der Dokumente und zunächst auch nicht primär über GitHub, sondern direkt über das lokale Dateisystem des jeweiligen Repositorys. Git bleibt ergänzend relevant, zum Beispiel für Remote-URL, Branch, Status oder spätere Änderungsinformationen.

Mögliche Serverfunktionen:

- `GET /api/cockpit/projects`: liefert Projekte, deren Repositories einen erkannten Kontextordner besitzen.
- `GET /api/development-cockpit/repositories/:repositoryId/context-files`: liefert die Dateien eines Kontextordners.
- `GET /api/development-cockpit/repositories/:repositoryId/context-files/:fileName`: liefert den Inhalt einer konkreten Markdown-Datei.

Der Serverzugriff soll auf bekannte Repository-Pfade beschränkt bleiben. Dadurch kann das Cockpit Kontextdateien dynamisch lesen, ohne einen allgemeinen Dateisystemzugriff zu öffnen.

### Fachlicher Fortschritt

- Erledigt: Die Grundidee eines `Development Cockpit` wurde als neues Epic identifiziert.
- Erledigt: Die zentrale Aufgabe wurde beschrieben: Kontrolle und Beobachtung von Kontextordnern verschiedener Projekte.
- Erledigt: Der Zusammenhang zu Epic 3 wurde festgehalten.
- Erledigt: Die Story-Struktur wurde auf Analyse, Implementierung und Querschnitt verschlankt.
- Erledigt: Das dynamische Lesen von Kontextordnern über lokale Repository-Pfade wurde als Architekturkonzept festgehalten.
- Idee: Das Cockpit soll Projektarbeit beim Doing von außen beobachtbar machen. Grundlage sind bekannte Projekte, ihre Git-Repositories und die standardisierte Kontextstruktur mit `ProjektContext.md`, `AiScrumContext.md`, Epics, Stories und Ressourcenreferenzen.
- Offen: In der Development-Cockpit-Analyse muss geklärt werden, welche Projekte und Kontextordner initial angebunden werden.
- Offen: Es muss definiert werden, welche Qualitätsanker für Kontextdateien relevant sind.
- Offen: Die technische Umsetzung als neue Webapplikation muss noch modelliert werden.
