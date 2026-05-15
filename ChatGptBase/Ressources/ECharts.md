# Ressource: ECharts

## Zweck

Diese Ressource beschreibt die Nutzung von ECharts als Graphen- und Diagrammbibliothek in ChatGPT-Development-Projekten.

ECharts eignet sich besonders für klassische Datenvisualisierungen wie Linien-, Balken-, Flächen-, Kreis- und Zeitreihendiagramme.

## Einsatzkontext

ECharts wird verwendet, wenn strukturierte Metrikdaten aus einer Anwendung grafisch präsentiert werden sollen.

Typische Einsatzfälle:

- Zeitreihen darstellen
- Metriken visualisieren
- technische Kennzahlen vergleichen
- aggregierte Daten grafisch aufbereiten
- Dashboard-Diagramme bauen

## Dokumentation

Offizielle Einstiegspunkte:

- [Apache ECharts](https://echarts.apache.org/)
- [ECharts Handbook](https://apache.github.io/echarts-handbook/en/)
- [Import ECharts](https://apache.github.io/echarts-handbook/en/basics/import/)
- [Chart Container And Size](https://apache.github.io/echarts-handbook/en/concepts/chart-size/)

## Installieren

ECharts wird im Frontend-Projekt installiert:

```powershell
npm install echarts
```

Danach kann die Library im Frontend-Code importiert werden.

## Verwendung Im Frontend

ECharts wird als clientseitige Bibliothek verwendet. Die Daten kommen aus REST-Services, werden im Frontend aufbereitet und anschließend an ECharts übergeben.

Typischer Ablauf:

- REST-Service liefert Metrikdaten.
- Frontend filtert, gruppiert oder transformiert Daten.
- Frontend erzeugt Serien und Achsenwerte.
- ECharts rendert das Diagramm im Browser.

## Zeitliche Gruppierung

ECharts kann Daten darstellen, die zuvor zeitlich gruppiert wurden.

Typische Gruppierungen:

- tägliche Gruppierung
- wöchentliche Gruppierung
- monatliche Gruppierung

Die Gruppierung kann im Frontend oder serverseitig erfolgen. Für kleinere lokale Anwendungen ist eine Gruppierung im Frontend oft ausreichend, weil dadurch die Server-Services einfach bleiben und die Darstellung flexibel angepasst werden kann.

## Lifecycle In Komponenten

Beim Einsatz in komponentenbasierten Frontends muss der Lifecycle beachtet werden.

Wichtig:

- Chart initialisieren, wenn das DOM-Element sichtbar ist.
- Chart aktualisieren, wenn Daten oder Konfiguration geändert werden.
- Chart bei Verlassen oder Entfernen der View sauber entsorgen.
- Beim erneuten Öffnen der View den Chart neu initialisieren.

## Bundlegröße

ECharts kann das Frontend-Bundle deutlich vergrößern.

Für kleine lokale Anwendungen ist das zunächst akzeptabel. Wenn die Bundlegröße später relevant wird, können folgende Maßnahmen geprüft werden:

- nur benötigte ECharts-Module importieren
- Code-Splitting für grafische Sichten
- Lazy Loading der Graphenbibliothek

## Abgrenzung Zu Cytoscape

ECharts ist die bevorzugte Bibliothek für klassische Diagramme und Metrikvisualisierungen.

Cytoscape.js ist dagegen besser geeignet für:

- Graphennetze
- Mindmaps
- Use-Case-Netze
- relationale Modellvisualisierungen
- Knoten-Kanten-Darstellungen

Für modellgetriebene Graphen- oder Cockpit-Funktionen kann Cytoscape zusätzlich interessant werden.

## Architekturentscheidung

ECharts wird in diesem Arbeitsmodell als Standardbibliothek für Metrikdiagramme betrachtet.

Die Library wird projektlokal im jeweiligen Frontend installiert. Daten werden über REST-Services geladen und im Frontend zu Diagrammserien aufbereitet. Dadurch bleibt die Serverlogik auf Datenbereitstellung beschränkt, während die Visualisierungslogik in der Oberfläche liegt.

