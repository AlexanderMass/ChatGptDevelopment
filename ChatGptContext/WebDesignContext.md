# WebDesignContext

## Zugehöriger Arbeitsordner

`D:\Alexander\Python\ChatGptDevelopment\Web`

## Ziel

Dieses Teilprojekt umfasst die Webanwendung für Zugriff, Exploration und Visualisierung der erfassten Entwicklungsdaten.

Die Anwendung soll als kleines Dashboard für verwaltete ChatGPT-Projekte dienen und zugleich einen Analysebereich für Projektdokumentation, Use Cases und Datenmodellierung bereitstellen.

## Mögliche Funktionen

- Dashboard mit Projektübersicht, Aktivitäten und einfachem Entwicklungsstatus
- Analysebereich für Use Cases, Tabellenstruktur, Diagramme und fachliche Merker
- Spätere Visualisierung von Zeitverläufen, Sitzungen und Aktivitätsdaten
- Verknüpfte Ansichten für Datenbankeinträge, Dokumentation und Metriken

## Abhängigkeiten

- Datenmodell und Persistenz werden im `DatabaseContext` vorbereitet.
- Datenzugriff und Bereitstellung werden im `ApiContext` vorbereitet.
- Fachliche Analyseanforderungen entstehen verteilt aus den Bedarfen der gesamten Plattform.

## Arbeitsprinzip

Die Webanwendung soll als Analyse- und Arbeitswerkzeug dienen, nicht als Marketingseite. Priorität haben klare Navigation, nachvollziehbare Zusammenhänge und eine Darstellung, die Entwicklungsverläufe analytisch zugänglich macht.

## Technische Grundentscheidung

Der initiale Webaufbau liegt unter `Web\frontend` als Vue-3- und Vite-Projekt.

Die Oberfläche wurde bewusst auf zwei Hauptbereiche eingedampft:

- `Dashboard`: kleine Applikation für den Development-Zustand der verwalteten Projekte
- `Analyse`: Dokumentations- und Modellierungsbereich für Projektstruktur, Use Cases und Datenmodell

Die linke Navigation bleibt dadurch sehr schlank. Weitere fachliche Tiefe soll innerhalb der beiden Bereiche entstehen, nicht als wachsende Liste von Hauptnavigationspunkten.

## Analysebereich

Der Bereich `Analyse` ist als dokumentierender Arbeitsraum aufgebaut und enthält zwei erste Unterpunkte:

- `Use Cases`: klappbarer Tree-Knoten mit grafischer Use-Case-Sicht und darunterliegenden Dokumentationsseiten je Use Case
- `Modellierung`: Bereich für Tabellenstruktur, Relationen und spätere Mermaid- oder UML-Diagramme

Ein Klick auf eine Use-Case-Bubble führt in den passenden Dokumentationsknoten im Navigationsbaum. Damit kann die fachliche Diskussion interaktiv beginnen und schrittweise in versionierte Dokumentation überführt werden.

Die erste Use-Case-Struktur ist hierarchisch gedacht:

- `Dashboard nutzen` ist der Haupt-Use-Case
- `Dashboard nutzen` inkludiert `Projekte pflegen`
- `Dashboard nutzen` inkludiert `Projektdaten präsentieren`
- `Projekte pflegen` inkludiert `Neue Projekte anlegen`
- `Projekte pflegen` inkludiert `Git-Daten analysieren`
- `Projektdaten präsentieren` inkludiert `Präsentation in Tabellenform`
- `Projektdaten präsentieren` inkludiert `Präsentation in grafischer Form`
