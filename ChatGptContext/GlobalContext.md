# GlobalContext

## Projektziel

Dieses Repository dient dem Aufbau einer Plattform zur strukturierten Erfassung und Analyse von KI-gestuetzten Entwicklungsprozessen.

Ziel ist es, Dialogdaten zwischen Mensch und KI sowie Entwicklungsartefakte aus der Versionskontrolle in einer gemeinsamen Datenbasis zusammenzufuehren. Auf dieser Grundlage sollen Entwicklungsverlaeufe rekonstruiert und projektuebergreifend vergleichbare Metriken fuer KI-gestuetzte Softwareentwicklung abgeleitet werden.

## Kernthese

KI-gestuetzte Softwareentwicklung wird derzeit primaer subjektiv als produktiver wahrgenommen. Dieses Projekt soll dazu beitragen, diese Produktivitaet empirisch zu operationalisieren, indem Interaktions- und Entwicklungsdaten systematisch erfasst, strukturiert verknuepft und auswertbar gemacht werden.

## Aktueller Projektfokus

Im Zentrum steht die Konzeption einer technischen und methodischen Grundlage fuer drei eng verbundene Arbeitsbereiche:

- `Api`: Erfassung, Verarbeitung und Bereitstellung der Projektdaten
- `Db`: Datenmodellierung, Persistenz und Verknuepfung der Datenquellen
- `Web`: Oberflaechen, Visualisierung und Exploration der erfassten Entwicklungsdaten

Die fachliche Analyse wird wieder als eigener Kontext dokumentiert, weil die konzeptionellen Fragen zu Projektvergleich, Work Sessions, Ereignisstrukturen und Metrikbildung ueber mehrere Teilprojekte hinweg reichen.

## Repository-Struktur

- `ChatGptContext`: kurze Kontextdateien fuer das Gesamtprojekt und die Teilprojekte
- `Api`: technische Logik zur Erfassung, Verarbeitung oder Bereitstellung der Projektdaten
- `Db`: Datenhaltung, Datenmodellierung und datenbankbezogene Implementierung
- `Web`: Oberflaechen, Visualisierung und interaktive Exploration der Projektdaten

## Teilprojekt-Kontexte

- `AnalysisContext.md`: fachliche Modellierung, Metriklogik und projektuebergreifende Begriffsarbeit
- `ApiContext.md`: API-Schicht, Schnittstellenlogik und Datenverarbeitung
- `DatabaseContext.md`: Datenmodell, Persistenz und datenbanknahe Implementierung
- `WebDesignContext.md`: Webanwendung, Visualisierung und Interaktionskonzepte
- `ReportContext.md`: leichtgewichtiges Arbeitsreporting und Git-Arbeitsberichte

## Naechste sinnvolle Schritte

1. Das fachliche Kernmodell fuer Projekte, Work Sessions, Interaktionen und Entwicklungsereignisse schaerfen.
2. Die Rolle der API als standardisierte Erfassungsschicht fuer externe Projekte weiter konkretisieren.
3. Ein erstes gemeinsames Datenmodell fuer Dialogdaten, Commits und Datei-Aenderungen skizzieren.
4. Danach konkrete Artefakte in den Teilprojekten aufbauen.
