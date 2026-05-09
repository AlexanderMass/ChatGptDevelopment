# WebDesignContext

## Zugehoeriger Arbeitsordner

`D:\Alexander\Python\ChatGptDevelopment\Web`

## Ziel

Dieses Teilprojekt umfasst die Webanwendung fuer Zugriff, Exploration und Visualisierung der erfassten Entwicklungsdaten.

Die Anwendung soll als kleines Dashboard fuer verwaltete ChatGPT-Projekte dienen und zugleich einen Analysebereich fuer Projektdokumentation, Use Cases und Datenmodellierung bereitstellen.

## Moegliche Funktionen

- Dashboard mit Projektuebersicht, Aktivitaeten und einfachem Entwicklungsstatus
- Analysebereich fuer Use Cases, Tabellenstruktur, Diagramme und fachliche Merker
- Spaetere Visualisierung von Zeitverlaeufen, Sitzungen und Aktivitaetsdaten
- Verknuepfte Ansichten fuer Datenbankeintraege, Dokumentation und Metriken

## Abhaengigkeiten

- Datenmodell und Persistenz werden im `DatabaseContext` vorbereitet.
- Datenzugriff und Bereitstellung werden im `ApiContext` vorbereitet.
- Fachliche Analyseanforderungen entstehen verteilt aus den Bedarfen der gesamten Plattform.

## Arbeitsprinzip

Die Webanwendung soll als Analyse- und Arbeitswerkzeug dienen, nicht als Marketingseite. Prioritaet haben klare Navigation, nachvollziehbare Zusammenhaenge und eine Darstellung, die Entwicklungsverlaeufe analytisch zugaenglich macht.

## Technische Grundentscheidung

Der initiale Webaufbau liegt unter `Web\frontend` als Vue-3- und Vite-Projekt.

Die Oberflaeche wurde bewusst auf zwei Hauptbereiche eingedampft:

- `Dashboard`: kleine Applikation fuer den Development-Zustand der verwalteten Projekte
- `Analyse`: Dokumentations- und Modellierungsbereich fuer Projektstruktur, Use Cases und Datenmodell

Die linke Navigation bleibt dadurch sehr schlank. Weitere fachliche Tiefe soll innerhalb der beiden Bereiche entstehen, nicht als wachsende Liste von Hauptnavigationspunkten.
