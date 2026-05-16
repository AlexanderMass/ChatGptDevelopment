# Analyse Uml

## Zweck

`AnalyseUml` beschreibt einen modellgetriebenen Analyseprozess für ChatGPT-Development-Projekte.

Die Methode nutzt UML-nahe Denkformen, um fachliche Funktionen, größere Applikationsstrukturen und Datenmodelle vor oder während der Implementierung zu klären. UML wird dabei nicht als starres Formalwerkzeug verstanden, sondern als strukturierende Sprache für Analyse, Kommunikation und Dokumentation.

## Grundidee

Analysearbeit wird in drei Hauptbereiche untergliedert:

- Use Cases
- Design
- Modellierung

Diese Bereiche helfen dabei, unterschiedliche Analysefragen sauber zu trennen. Funktionen, Oberflächen, Algorithmen und Datenstrukturen werden nicht in einem einzigen Dokument vermischt, sondern jeweils dort beschrieben, wo sie methodisch hingehören.

Ziel ist nicht, eine Applikation bis in jedes Detail vollständig vorab zu spezifizieren. Diese Notwendigkeit entsteht vor allem in Unternehmen, wenn viele Menschen mit klaren Übergaben in Teams zusammenarbeiten. In der Arbeit mit KI wird ein praktischerer Ansatz gewählt: Grobe Aspekte werden modelliert und dokumentiert, während Detailentscheidungen in der konkreten Umsetzung gemeinsam mit der KI erarbeitet werden.

## Typische Webstruktur

In der praktischen Arbeit kann die Analyse direkt in einer Webapplikation sichtbar gemacht werden.

Ein häufiges Muster ist ein Hauptpunkt `Analyse`, unter dem die zentralen Analysebereiche als Unterpunkte angeboten werden:

- Use Cases oder Use Case Design
- Design
- Modellierung

Dadurch wird die Weboberfläche nicht nur Anwendung, sondern zugleich lebendige Projektdokumentation. Analyseergebnisse bleiben während der Entwicklung zugreifbar, können verlinkt werden und lassen sich schrittweise mit der Implementierung abgleichen.

## Use Cases

Use Cases beschreiben die fachlichen Funktionen, für die eine Applikation entwickelt wird.

Sie beantworten vor allem die Frage:

```text
Was soll die Anwendung für den Nutzer oder das System leisten?
```

Typische Inhalte:

- Name des Use Cases
- fachliche Funktion
- beteiligte Nutzer- oder Systemrollen
- Hauptablauf
- wichtige Varianten
- Verweise auf Oberflächen oder Designobjekte
- Verweise auf andere Use Cases

Use Cases können grafisch in einem Use-Case-Diagramm dargestellt werden. Die grafische Darstellung dient dazu, Hauptfunktionen, inkludierte Funktionen und Abhängigkeiten schnell sichtbar zu machen.

## Design

Im Design werden größere und wichtige Strukturen der Applikation beschrieben.

Designobjekte entstehen, wenn eine Struktur nicht nur lokal in einem Use Case beschrieben werden soll, sondern als eigenständiges Objekt wiederverwendbar oder zentral verständlich sein muss.

Typische Designobjekte:

- Oberflächendesigns
- Panels
- Dialoge
- Navigationsstrukturen
- komplexe Algorithmen
- wiederverwendbare Funktionsblöcke
- technische Ablaufbeschreibungen

Das Design beantwortet vor allem die Frage:

```text
Wie soll eine wichtige Struktur der Anwendung aufgebaut sein?
```

Use Cases dürfen auf Designobjekte verweisen. Dadurch bleibt die Use-Case-Beschreibung fachlich schlank, während komplexere Oberflächen- oder Algorithmusdetails separat beschrieben werden können.

## Modellierung

In der Modellierung wird mit Klassendiagrammen oder klassendiagrammähnlichen Darstellungen gearbeitet.

Der Schwerpunkt liegt auf struktureller Modellierung. In vielen Projekten betrifft das besonders das Datenbankdesign.

Typische Inhalte:

- fachliche Datenobjekte
- Tabellen
- Attribute
- Primary Keys
- Foreign Keys
- Relationen
- Kardinalitäten
- SQL-Create-Statements

Die Modellierung beantwortet vor allem die Frage:

```text
Welche stabilen Datenstrukturen benötigt die Anwendung?
```

Auch wenn Klassendiagramme ursprünglich objektorientiert gedacht sind, können sie pragmatisch genutzt werden, um relationale Datenbankstrukturen sichtbar zu machen.

## Zusammenspiel Der Bereiche

Die drei Analysebereiche ergänzen sich:

- Use Cases beschreiben Funktionen.
- Design beschreibt größere Applikationsstrukturen.
- Modellierung beschreibt stabile Datenstrukturen.

Ein typischer Ablauf:

1. Use Cases identifizieren.
2. Wichtige Oberflächen oder Algorithmen als Designobjekte herauslösen.
3. Benötigte Datenobjekte modellieren.
4. Relationen und Attribute stabilisieren.
5. Dokumentation und Implementierung schrittweise gegeneinander prüfen.

Die Reihenfolge ist nicht starr. Analyse ist ein Discovery-Prozess. Neue Erkenntnisse aus Design oder Implementierung können dazu führen, Use Cases oder Modellierung nachzuschärfen.

## Rolle Der KI

Die KI unterstützt dabei, Analysegedanken zu strukturieren, Diagramme vorzubereiten, Dokumentation zu formulieren und Konsistenzfragen sichtbar zu machen.

Sie soll nicht ungefragt Formalismus erzeugen. Die Methode ist kein Selbstzweck. UML und Analyseobjekte werden nur so weit genutzt, wie sie helfen, fachliche und technische Entscheidungen verständlicher, stabiler und wiederverwendbarer zu machen.

Details, die für die Implementierung wichtig werden, können bewusst erst während der Umsetzung entstehen. Die KI kann diese Details dann gemeinsam mit dem Menschen klären, in Code übersetzen und bei Bedarf in die Dokumentation zurückführen.

## Ergebnis

Das Ergebnis der Analyse ist kein perfektes Pflichtenheft.

Ziel ist eine tragfähige, überprüfbare Makrostruktur:

- Welche Funktionen gibt es?
- Welche Oberflächen oder Algorithmen sind wichtig?
- Welche Datenstrukturen tragen die Anwendung?
- Welche Entscheidungen wurden getroffen?
- Wo ist bewusst noch Unschärfe erlaubt?

Diese Makrostruktur kann anschließend in Stories, Tasks und Implementierungsschritte überführt werden.

