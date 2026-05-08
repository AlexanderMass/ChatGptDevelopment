# Projektkontext

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

Analysearbeiten werden nicht als eigenes Teilprojekt isoliert, sondern innerhalb dieser drei Bereiche fachlich mitgefuehrt.

## Repository-Struktur

- `ChatGptContext`: kurze Kontextdateien fuer das Gesamtprojekt und die Teilprojekte
- `Api`: technische Logik zur Erfassung, Verarbeitung oder Bereitstellung der Projektdaten
- `Db`: Datenhaltung, Datenmodellierung und datenbankbezogene Implementierung
- `Web`: Oberflaechen, Visualisierung und interaktive Exploration der Projektdaten

## Teilprojekt-Kontexte

- `ApiKontext.md`: API-Schicht, Schnittstellenlogik und Datenverarbeitung
- `DatenbankKontext.md`: Datenmodell, Persistenz und datenbanknahe Implementierung
- `WebdesignKontext.md`: Webanwendung, Visualisierung und Interaktionskonzepte

## Naechste sinnvolle Schritte

1. Die Rollen von `Api`, `Db` und `Web` fachlich und technisch weiter schaerfen.
2. Ein erstes gemeinsames Datenmodell fuer Dialogdaten, Commits und Datei-Aenderungen skizzieren.
3. Den geplanten Datenfluss von Erfassung ueber Speicherung bis zur Analyse und Visualisierung beschreiben.
4. Danach konkrete Artefakte in den Teilprojekten aufbauen.
