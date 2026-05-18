# ProjektScrumContext

## Zweck

`ProjektScrumContext.md` beschreibt die MyAiScrum-Struktur dieses konkreten Projekts.

Die Datei beantwortet nicht primär die Frage, was das Projekt fachlich ist. Das leistet `ProjektContext.md`. Sie beantwortet stattdessen, warum die Arbeit in bestimmte Epics geschnitten wurde, wie diese Epics zusammenhängen und welche fachliche Rolle sie im Gesamtprojekt übernehmen.

Damit ist diese Datei der Einstiegspunkt für neue Chats, die verstehen sollen, wie die Arbeit im Projekt organisiert ist.

## Projektlogik

`ChatGptDevelopment` ist gleichzeitig Anwendung, Methodenlabor und Dokumentationsbasis.

Die Arbeit wurde deshalb in vier Epics geschnitten:

- Epic 1 beschreibt die analytische Vorarbeit.
- Epic 2 beschreibt die operative Dashboard-Entwicklung.
- Epic 3 beschreibt die projektübergreifende Methoden- und Ressourcenarbeit.
- Epic 4 beschreibt das Development Cockpit als neue projektübergreifende Sicht auf Kontextordner.

Diese Epics sind nicht nur zeitliche Arbeitspakete. Sie bilden verschiedene Perspektiven auf dasselbe Gesamtvorhaben.

## Epic 1: Analyse

Epic 1 bündelt die modellgetriebene Analyse.

Hier wurden Use Cases, Designobjekte und Datenmodellierung erarbeitet. Die Analyse diente nicht als vollständiges Pflichtenheft, sondern als Orientierungsmodell für die spätere Umsetzung.

Zentrale Stories:

- Story 1.1: Use Cases analysieren und dokumentieren
- Story 1.2: Designobjekte herausarbeiten und dokumentieren
- Story 1.3: Datenmodellierung und SQL-Schema ableiten
- Story 1.4: Verschiedenes und Querschnittliches

Wichtige Dateien:

- `Epic1_Analyse.md`
- `Epic1ContextInfo.md`

## Epic 2: Dashboard-Entwicklung

Epic 2 bündelt die operative Entwicklung des Dashboards.

Das Dashboard ist die erste produktive Anwendung des Projekts. Es verwaltet Projekte, ordnet Git-Repositories zu, analysiert Git-Daten und präsentiert Metriken tabellarisch sowie grafisch.

Zentrale Stories:

- Story 2.1: Dashboard-Oberfläche entwickeln
- Story 2.2: Projekt-Popup für Projektstammdaten und Repository-Zuordnung entwickeln
- Story 2.3: Verschiedenes und Querschnittsfunktionen umsetzen

Wichtige Dateien:

- `Epic2_DashboardEntwicklung.md`
- `Epic2ContextInfo.md`

## Epic 3: Project-Based Work

Epic 3 bündelt die projektübergreifende Methodenarbeit.

Hier entstehen Vorgehensmodelle, Ressourcenbeschreibungen und Kontextbausteine, die in andere ChatGPT-Development-Projekte exportiert werden können. Dieses Epic ist damit die methodische Basis für reproduzierbare Zusammenarbeit zwischen Mensch und KI.

Zentrale Stories:

- Story 3.1: Arbeit an Vorgehensmodellen
- Story 3.2: Arbeit an allgemeinen Ressourcenbeschreibungen
- Story 3.3: Verschiedenes und Querschnittliches

Wichtige Dateien:

- `Epic3_ProjectBaseWork.md`
- `Epic3ContextInfo.md`
- `ChatGptBase/Processes`
- `ChatGptBase/Ressources`

## Epic 4: Development Cockpit

Epic 4 bündelt die Entwicklung des Development Cockpits.

Das Cockpit ist eine eigene Anwendung, die Kontextordner verwalteter Projekte sichtbar macht. Es dient der Projektintrospektion und soll später helfen, Dokumentationsqualität, Prozesskonformität und mögliche Refactoring-Bedarfe zu erkennen.

Zentrale Stories:

- Story 4.1: Development-Cockpit-Analyse
- Story 4.2: Development-Cockpit-Implementierung
- Story 4.3: Verschiedenes und Querschnittliches

Wichtige Dateien:

- `Epic4_DevelopmentCockpit.md`
- `Epic4ContextInfo.md`

## Zusammenhang Der Epics

Epic 1 liefert die analytische Grundlage.

Epic 2 setzt diese Grundlage operativ im Dashboard um.

Epic 3 abstrahiert aus der konkreten Projektarbeit wiederverwendbare Methoden und Ressourcen.

Epic 4 nutzt diese Methodenperspektive, um ein Cockpit für Kontextordner und Projektintrospektion aufzubauen.

Damit entsteht eine Schleife:

Analyse führt zu Implementierung. Implementierung erzeugt Methodenerfahrung. Methodenerfahrung führt zu projektübergreifender Kontrolle und Refactoring über das Cockpit.

## Aktueller Fokus

Der aktuelle Fokus liegt auf Epic 3 und Epic 4.

Epic 3 stabilisiert die Methodik rund um `ProjektContext.md`, `ProjektScrumContext.md`, `EpicxName.md` und `EpicxContextInfo.md`.

Epic 4 liefert die operative Oberfläche, um solche Kontextstrukturen projektübergreifend sichtbar zu machen.
