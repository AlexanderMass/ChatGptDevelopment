# Cytoscape Coding Experience

## Zweck

Diese Notiz sammelt praktische Erfahrungen beim Einsatz von Cytoscape.js fuer nicht frei editierbare Objekt- und Beziehungsdiagramme in Weboberflaechen.

Der Fokus liegt auf stabilen Arbeitsflaechen, zusammengesetzten Objektboxen, gerichteten Beziehungen und responsivem Verhalten ohne ungewollte Skalierung.

## Grundprinzip

Cytoscape.js rendert Graphen auf Canvas-Layern. Die sichtbaren Knoten sind daher keine normalen HTML-Elemente, die man mit CSS-Boxmodellen, Flexbox oder DOM-Inspektion direkt behandeln kann.

Fuer UI-artige Objektboxen sollte man deshalb nicht versuchen, komplexe HTML-Strukturen in einem einzelnen Node-Label abzubilden. Robuster ist es, eine Objektbox aus mehreren Cytoscape-Nodes zusammenzusetzen.

## Zusammengesetzte Objektboxen Darstellen

Fuer strukturierte Objektboxen mit Kopfbereich und Inhaltsbereich hat sich folgendes Muster bewaehrt:

- Ein fachliches Objekt wird aus mehreren Nodes aufgebaut.
- Der Objektkopf ist ein sichtbarer Rechteck-Node.
- Der Inhaltsbereich ist ein zweiter sichtbarer Rechteck-Node.
- Inhaltstexte sind eigene transparente Text-Nodes.
- Zwischen einzelnen Inhaltszeilen werden nur dann Linien gezeichnet, wenn sie fachlich benoetigt werden.
- Sichtbar getrennt wird nur der Objektkopf vom Inhaltsbereich.

Dieses Muster ist geeignet, wenn eine Diagrammbox nicht nur einen Namen, sondern mehrere strukturierte Zeilen oder Eigenschaften anzeigen soll.

## Mehrzeilige Labels

Mehrzeilige Labels in einem Cytoscape-Node sind nur begrenzt angenehm zu kontrollieren.

Problematische Punkte:

- Zeilenumbrueche koennen je nach Styling schwer vorhersehbar sein.
- Padding und Textposition wirken anders als in normalen HTML-Boxen.
- Linksbuendigkeit innerhalb eines Rechtecks ist nicht automatisch intuitiv.

Empfehlung:

- Fuer kontrollierte Inhaltszeilen besser eigene Text-Nodes verwenden.
- Text-Nodes transparent rendern und innerhalb des Inhaltsbereichs positionieren.

## Textausrichtung

Die Textausrichtung in Cytoscape ist an den Node-Anker gebunden und wirkt deshalb anders als CSS-Textausrichtung in HTML.

Eine wichtige Beobachtung:

- `text-halign: left` kann Text links neben dem Node-Anker positionieren.
- Wenn ein Text an einer linken Innenkante starten soll, kann ein sehr schmaler Text-Node mit `text-halign: right` sinnvoll sein.

Praktisches Muster:

- Text-Node als unsichtbaren 1-Pixel-Anker an die linke Innenkante setzen.
- Label mit `text-halign: right` nach innen laufen lassen.

Das ist kontraintuitiv, aber fuer linksbuendige Inhaltszeilen innerhalb einer Objektbox oft stabiler.

## Pfeile Und Beziehungen

Pfeile sollten nicht an sichtbare Text-Nodes andocken, wenn der Pfeil fachlich auf eine Zeile oder Kante zeigen soll.

Robuster ist:

- Unsichtbare Anchor-Nodes an den Zielkanten platzieren.
- Edges zwischen diesen Anchor-Nodes zeichnen.
- Die Anchor-Nodes sehr klein und transparent rendern.

Dadurch koennen Pfeilspitzen sichtbar an der Rechteckkante enden, statt unter Text oder Boxrahmen zu verschwinden.

Fuer direkte Beziehungen zwischen zwei Objektboxen sind gerade Linien oft besser lesbar als gebogene Kanten:

```js
{
  selector: "edge",
  style: {
    "curve-style": "straight",
    "target-arrow-shape": "triangle",
    "target-arrow-fill": "filled"
  }
}
```

## Feste Groesse Statt Automatischer Skalierung

Cytoscape kann Diagramme automatisch an die Flaeche anpassen. Fuer UI-nahe Arbeitsflaechen kann das unruhig wirken, weil Fonts und Objektboxen scheinbar skaliert werden.

Wenn die Elemente eine stabile UI-Groesse behalten sollen:

```js
layout: { name: "preset", fit: false },
zoom: 1,
userZoomingEnabled: false,
userPanningEnabled: false
```

Das verhindert, dass Cytoscape die Objekte bei Container-Aenderungen automatisch passend zoomt.

## Nicht Editierbare Diagramme

Wenn ein Diagramm nur ansehen und nicht direkt bearbeiten soll, sollten Knoten nicht selektierbar oder verschiebbar sein.

Empfohlen:

```js
autoungrabify: true,
autounselectify: true,
boxSelectionEnabled: false
```

Zusaetzlich koennen einzelne Nodes setzen:

```js
selectable: false,
grabbable: false
```

## Responsives Verhalten

Bei responsiven Arbeitsflaechen sollte man nicht automatisch skalieren, sondern die Positionen neu berechnen.

Bewaehrtes Muster:

- Diagrammobjekte behalten feste Groessen.
- Die Objektgruppe wird anhand der aktuellen Containerbreite zentriert.
- Ein `ResizeObserver` ruft bei Groessenaenderungen eine Layoutfunktion auf.
- Die Funktion setzt neue Node-Positionen, ohne Zoom oder Fontgroessen zu veraendern.

Prinzip:

```js
const resizeObserver = new ResizeObserver(() => {
  cy.resize();
  applyDiagramPositions();
});
```

Dabei sollte `applyDiagramPositions` nur Positionen aktualisieren, nicht das Diagramm neu erzeugen.

## Praktische Empfehlung

Beim Einstieg mit Cytoscape.js fuer strukturierte Objekt- und Beziehungsdiagramme klein beginnen:

- eine feste Diagrammflaeche
- zwei Objektboxen
- wenige Inhaltszeilen
- gerade Beziehungen
- keine Editierfunktion
- keine automatische Skalierung
- responsive Zentrierung erst nach stabiler Grunddarstellung

Erst wenn diese Basis stabil ist, sollten weitere Funktionen wie Drag-and-Drop, Detailpanels, Layoutwechsel, Zoom oder groessere Graphen ergaenzt werden.
