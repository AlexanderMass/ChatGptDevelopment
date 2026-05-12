# ApiContext

## Zugehoeriger Arbeitsordner

`D:\Alexander\Python\ChatGptDevelopment\Api`

## Ziel

Dieses Teilprojekt umfasst die technische Logik zur Erfassung, Verarbeitung und Bereitstellung der Projektdaten.

Im Fokus stehen Schnittstellen und Verarbeitungslogiken, ueber die Dialogdaten, Zeitinformationen und Entwicklungsartefakte in eine gemeinsame technische Form ueberfuehrt und fuer weitere Komponenten nutzbar gemacht werden.

## Typische Inhalte

- Import- und Erfassungslogik fuer Interaktionsdaten
- Aufbereitung und Normalisierung von Entwicklungsereignissen
- API-Endpunkte fuer Datenzugriff und Analysefunktionen
- Verknuepfung zwischen Datenquellen, Datenbank und Webanwendung

## Abgrenzung

- Persistenz, Schemafragen und datenbankinterne Modellierung gehoeren primaer in den `DatabaseContext`.
- Oberflaechen, Navigation und Visualisierung gehoeren primaer in den `WebDesignContext`.
- Fachliche Analysefragen werden innerhalb der API nur soweit behandelt, wie sie fuer Verarbeitung und Bereitstellung relevant sind.

## Arbeitsprinzip

API-Code soll nachvollziehbar, modular und so aufgebaut sein, dass Datenfluesse spaeter reproduzierbar analysiert und erweitert werden koennen.

## Lokaler Node.js-REST-Service

Der lokale REST-Service fuer dieses Projekt liegt unter:

`D:\Alexander\Python\ChatGptDevelopment\Web\server`

Der Service wird lokal mit folgendem Befehl gestartet:

`npm.cmd start`

Standardadresse:

`http://127.0.0.1:3100`

Wichtige Kontrollroute:

`GET /api/health`

Das lokale API-Logfile liegt unter:

`D:\Alexander\Python\ChatGptDevelopment\Web\server\logs\api.log`

Das Logfile enthaelt Serverstart, HTTP-Requests, Fehler sowie Projektanlage und Projektaktualisierung. Datenbankpasswoerter werden nicht geloggt. Der Logordner ist nicht versioniert.
