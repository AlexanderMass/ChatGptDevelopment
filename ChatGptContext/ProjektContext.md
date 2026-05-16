# ProjektContext

## Projektziel

Dieses Repository dient dem Aufbau einer Plattform zur strukturierten Erfassung, Dokumentation und Analyse von KI-gestützten Entwicklungsprozessen.

Ziel ist es, ChatGPT-Projekte, zugeordnete Git-Repositories, Kontextdokumentation und Entwicklungsmetriken in einer gemeinsamen Projektumgebung sichtbar zu machen. Auf dieser Grundlage sollen Entwicklungsverläufe nachvollziehbar werden und projektübergreifend vergleichbare Arbeitsmuster entstehen.

## Kernthese

KI-gestützte Softwareentwicklung wird derzeit primär subjektiv als produktiver wahrgenommen. Dieses Projekt soll dazu beitragen, diese Produktivität methodisch und technisch greifbarer zu machen.

Dazu werden Entwicklungsartefakte, Kontextdateien, Git-Informationen und methodische Prozessbeschreibungen so strukturiert, dass Mensch und KI in mehreren Projekten reproduzierbarer zusammenarbeiten können.

## ChatGptBase

Der Ordner `ChatGptBase` enthält allgemeine Methoden- und Ressourcenbeschreibungen für ChatGPT-Development-Projekte.

Diese Dateien beschreiben nicht dieses einzelne Projekt, sondern wiederverwendbare Grundlagen für die Zusammenarbeit zwischen Mensch und KI. Sie können in andere Projekte exportiert oder dort als Kontext importiert werden.

## Relevante Prozesse Aus ChatGptBase

Die folgenden Prozessdateien aus `ChatGptBase/Processes` sind für dieses Projekt relevant:

- `MyAiScrum.md`: Organisation der Arbeit über Epics, Stories und optionale Tasks.
- `AnalyseUml.md`: modellgetriebene Analyse mit Use Cases, Designobjekten und Modellierung.
- `NeuesProjekt.md`: Grundstruktur für neue Projekte und Aufbau von `ChatGptContext`.
- `AiBrainStorming.md`: Pingpong-artige Ideenentwicklung zwischen Mensch und KI.
- `DokumentenArbeit.md`: strukturierte Arbeit an längeren Dokumenten mit ChatGPT und Codex.

## Relevante Ressourcen Aus ChatGptBase

Die folgenden Ressourcendateien aus `ChatGptBase/Ressources` sind für dieses Projekt relevant:

- `NodeJsServer.md`: lokale REST-Schicht für dynamische API-Funktionen.
- `CaddyWebServer.md`: statische Auslieferung von Webressourcen.
- `MySqlDatabase.md`: relationale Datenbank, SQL-Skripte und Passwortstrategie.
- `ECharts.md`: Diagrammbibliothek für Metrikvisualisierungen.
- `Cytoscape.md`: optionale Bibliothek für Graphennetze und modellgetriebene Visualisierungen.

## Aktueller Projektfokus

Im Zentrum steht die Konzeption einer technischen und methodischen Grundlage für mehrere eng verbundene Arbeitsbereiche:

- `ChatGptContext`: projektspezifische Kontextdateien, Epics und fachliche Dokumentation
- `ChatGptBase`: projektübergreifende Methoden- und Ressourcenbasis
- `Sql`: SQL-Skripte, Datenhaltung, Datenmodellierung und datenbankbezogene Implementierung
- `Web`: Oberflächen, Visualisierung und interaktive Exploration der erfassten Entwicklungsdaten

Die fachliche Analyse wird als eigener Kontext dokumentiert, weil die konzeptionellen Fragen zu Projektvergleich, Kontextstruktur, Arbeitsprozessen und Metrikbildung über mehrere Teilbereiche hinweg reichen.

## Repository-Struktur

- `ChatGptContext`: kurze Kontextdateien für das Gesamtprojekt und die Teilprojekte
- `ChatGptBase`: allgemeine Prozesse und Ressourcen für ChatGPT-Development-Projekte
- `Sql`: SQL-Skripte, Datenhaltung, Datenmodellierung und datenbankbezogene Implementierung
- `Web`: Oberflächen, Visualisierung und interaktive Exploration der Projektdaten
- `Scratch`: temporärer, nicht-versionierter Arbeitsbereich für KI-Artefakte und Zwischenergebnisse

## Teilprojekt-Kontexte

- `ProjektContext.md`: Einstiegskontext für dieses Projekt
- `AnalysisContext.md`: fachliche Modellierung, Metriklogik und projektübergreifende Begriffsarbeit
- `ApiContext.md`: API-Schicht, Schnittstellenlogik und Datenverarbeitung
- `DatabaseContext.md`: Datenmodell, Persistenz und datenbanknahe Implementierung
- `WebDesignContext.md`: Webanwendung, Visualisierung und Interaktionskonzepte
- `ReportContext.md`: leichtgewichtiges Arbeitsreporting und Git-Arbeitsberichte
- `MethodContext.md`: wiederverwendbare Vorgehensstruktur für KI-gestützte Projektanalyse
- `Epic*.md`: Epic-Dokumente nach `MyAiScrum`

## Nächste Sinnvolle Schritte

1. Die Methodenbasis in `ChatGptBase` weiter stabilisieren.
2. Den Prozess für Context-Imports und Chat-Transfer ausarbeiten.
3. Das `Development Cockpit` als Sicht auf Projekt- und Kontextordner konzipieren.
4. Projektkontext, Base-Prozesse und Ressourcen schrittweise gegeneinander prüfen.

