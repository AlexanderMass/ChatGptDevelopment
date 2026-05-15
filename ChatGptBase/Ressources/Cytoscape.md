# Ressource: Cytoscape.js

## Zweck

Diese Ressource beschreibt Cytoscape.js als optionale JavaScript-Bibliothek für Graphen, Netze und modellartige Visualisierungen.

Cytoscape.js eignet sich besonders für Darstellungen, bei denen Knoten und Kanten im Mittelpunkt stehen. Dazu gehören Mindmaps, Beziehungsnetze, Use-Case-Strukturen, Abhängigkeitsgraphen und andere relationale Modelle.

## Status

Cytoscape.js ist derzeit als mögliche Ressource vorgemerkt.

Die Library wurde in den bisherigen Projekten noch nicht produktiv eingesetzt. Sie wird dokumentiert, weil sie für zukünftige ChatGPT-Development-Projekte interessant sein kann, insbesondere wenn Modellierungsarbeit stärker grafisch unterstützt werden soll.

## Einsatzkontext

Cytoscape.js wird verwendet, wenn Informationen nicht primär als Tabelle oder klassisches Diagramm dargestellt werden sollen, sondern als Netzwerk aus verbundenen Objekten.

Typische Einsatzfälle:

- Mindmaps
- Use-Case-Netze
- Architekturgraphen
- Abhängigkeitsgraphen
- relationale Modellvisualisierungen
- Kontext- und Dokumentationsnetze
- Navigationsgraphen in Analyse- oder Cockpit-Anwendungen

## Dokumentation

Offizielle Einstiegspunkte:

- [Cytoscape.js](https://js.cytoscape.org/)
- [Cytoscape.js Documentation](https://js.cytoscape.org/#getting-started)
- [Cytoscape.js Layouts](https://js.cytoscape.org/#layouts)
- [Cytoscape.js Styling](https://js.cytoscape.org/#style)

## Installieren

Cytoscape.js wird im Frontend-Projekt installiert:

```powershell
npm install cytoscape
```

Danach kann die Library im Frontend-Code importiert werden.

## Verwendung Im Frontend

Cytoscape.js wird als clientseitige Bibliothek verwendet. Die Anwendung übergibt eine Menge von Knoten und Kanten an Cytoscape, danach rendert die Library den Graphen im Browser.

Typischer Ablauf:

- Datenquelle liefert Objekte und Relationen.
- Frontend transformiert diese Daten in Knoten und Kanten.
- Cytoscape rendert den Graphen.
- Layout, Styling und Interaktionen werden im Frontend konfiguriert.

## Abgrenzung Zu ECharts

ECharts ist besser geeignet für klassische Diagramme:

- Line-Charts
- Bar-Charts
- Zeitreihen
- Metrikdiagramme
- Dashboard-Kennzahlen

Cytoscape.js ist besser geeignet für:

- Knoten-Kanten-Graphen
- relationale Strukturen
- Netzwerke
- Mindmaps
- Modellierungsansichten

Für Metrikvisualisierungen sollte zunächst ECharts geprüft werden. Für strukturelle Visualisierungen sollte Cytoscape.js geprüft werden.

## Architekturentscheidung

Cytoscape.js wird in diesem Arbeitsmodell als optionale Ressource für Graphennetze und modellgetriebene Visualisierungen betrachtet.

Die Library wird nicht pauschal installiert. Sie sollte nur dann projektlokal ergänzt werden, wenn eine konkrete Oberfläche Knoten-Kanten-Darstellungen benötigt.
