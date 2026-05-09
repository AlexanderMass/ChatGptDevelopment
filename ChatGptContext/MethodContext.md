# MethodContext

## Zweck

Diese Datei beschreibt eine wiederverwendbare Vorgehensstruktur für die Zusammenarbeit mit einer KI in Softwareprojekten.

Sie ist bewusst projektübergreifend formuliert. Sie kann in andere Projekte kopiert werden, damit ein neuer Chat schneller versteht, wie Projektanalyse, Modellierung, Umsetzung und Dokumentation gemeinsam erarbeitet werden sollen.

## Grundidee

Die Arbeit mit einer KI bündelt mehrere Rollen in einer Person. Der Mensch arbeitet nicht nur als Entwickler, sondern wechselt je nach Situation zwischen mehreren Perspektiven:

- Analyst
- Produktverantwortlicher
- Architekt
- Entwickler
- Datenbankmodellierer
- UI- oder UX-Reviewer
- Tester
- Dokumentationsverantwortlicher

Diese Rollenwechsel sind produktiv, aber kognitiv anspruchsvoll. Deshalb soll die Zusammenarbeit bewusst strukturiert werden.

## Arbeitsprinzip

Die KI soll nicht nur Code erzeugen, sondern helfen, den Arbeitsmodus sichtbar zu machen.

Vor größeren Schritten soll geklärt werden, in welchem Modus gearbeitet wird:

- `Analysemodus`: Fachliche Begriffe, Ziele, Use Cases und Abgrenzungen klären.
- `Architekturmodus`: Struktur, Komponenten, Datenflüsse und technische Zuständigkeiten festlegen.
- `Datenmodellierungsmodus`: Entitäten, Tabellen, Beziehungen, Attribute und Constraints ableiten.
- `Umsetzungsmodus`: Konkrete Dateien ändern, Funktionalität bauen und Buildfähigkeit prüfen.
- `Reviewmodus`: Ergebnis fachlich, visuell und technisch prüfen.
- `Dokumentationsmodus`: Entscheidungen, Modelle und offene Fragen nachvollziehbar ablegen.

Die Modi müssen nicht starr sein. Sie dienen als Orientierung, damit klar bleibt, welche Art von Entscheidung gerade getroffen wird.

## Scope-Führung

Ein wichtiges Ziel ist die bewusste Stabilisierung des Projektumfangs.

KI kann schnell viel Output erzeugen. Das ersetzt aber nicht die Entscheidung, was wirklich gebaut werden soll. Deshalb soll die KI aktiv helfen, große Ideen in handhabbare Schritte zu zerlegen.

Bewährtes Vorgehen:

1. Grobe Projektidee sammeln.
2. Zu großen Scope explizit erkennen.
3. MVP oder Lernziel formulieren.
4. Fachliche Hauptebene festlegen.
5. Erste Use Cases schneiden.
6. Daraus Datenmodell und technische Struktur ableiten.
7. Erst danach größere Implementierungsschritte starten.

Wichtig: Eine technisch kleinere Alternative ist nicht automatisch die bessere Wahl. Wenn ein bestimmter Ansatz als Lernziel dient, zum Beispiel relationale Datenbank statt JSON-Dateien, darf diese Entscheidung bewusst getroffen und dokumentiert werden.

## Use-Case-Arbeit

Use Cases werden als Einstieg in die fachliche Strukturierung genutzt.

Das Vorgehen soll möglichst einfach bleiben:

1. Haupt-Use-Cases benennen.
2. Include- oder Unter-Use-Cases herausarbeiten.
3. Zu jedem Use Case eine kurze Dokumentationsseite anlegen.
4. Optional ein grafisches Use-Case-Diagramm pflegen.
5. Aus den Use Cases Entitäten, Tabellen und UI-Bedürfnisse ableiten.

Eine Use-Case-Beschreibung sollte mindestens enthalten:

- Name
- Ziel
- Akteur
- Kurzbeschreibung
- Hauptablauf
- Varianten oder offene Fragen
- betroffene Daten oder Tabellen

Die grafische Darstellung ist nicht Selbstzweck. Sie dient dazu, Struktur sichtbar zu machen und die spätere Dokumentation navigierbar zu halten.

## Datenmodellierung

Datenmodellierung wird als eigener Lern- und Arbeitsmodus behandelt.

Die KI soll nicht sofort Tabellen erzeugen, sondern aus Use Cases schrittweise ein Modell ableiten:

1. Welche fachlichen Objekte kommen vor?
2. Welche Objekte müssen dauerhaft gespeichert werden?
3. Welche Beziehungen bestehen zwischen ihnen?
4. Welche Attribute sind für den ersten Stand wirklich nötig?
5. Welche Constraints, IDs und Zeitstempel werden gebraucht?
6. Welche Auswertungen soll das Modell später ermöglichen?

Das Datenmodell kann zunächst als Markdown, Mermaid-Klassendiagramm oder ER-Diagramm dokumentiert werden. Danach kann daraus ein konkretes Datenbankschema entstehen.

## Dokumentation

Dokumentation ist Teil des Arbeitsprozesses, nicht nur Nacharbeit.

Wichtige Entscheidungen sollen in Kontextdateien abgelegt werden:

- Projektziel und Scope
- Use Cases
- Datenmodell
- technische Teilbereiche
- offene Fragen
- getroffene Architekturentscheidungen
- Lernziele und methodische Gründe für bestimmte Entscheidungen

Die Dokumentation darf bewusst kompakt sein. Ziel ist nicht ein vollständiges Pflichtenheft, sondern eine belastbare Orientierung für spätere Chats und Projektphasen.

## Rolle der KI

Die KI soll als strukturierender Partner arbeiten.

Erwartetes Verhalten:

- unklare Ideen in konkrete nächste Schritte übersetzen
- Scope-Risiken freundlich benennen
- bei Bedarf zwischen Analyse, Architektur, Umsetzung und Review unterscheiden
- Ergebnisse in Dateien ablegen, wenn sie als Projektwissen wiederverwendbar sind
- nicht vorschnell große Implementierungen starten, wenn die fachliche Struktur noch unscharf ist
- bei UI- und Modellierungsarbeit sichtbare Zwischenstände schaffen
- nach Änderungen Builds oder passende Prüfungen ausführen

Die KI soll nicht nur reagieren, sondern helfen, den Arbeitsfluss stabil zu halten.

## Wiederverwendbares Muster

Für neue Projekte kann dieses Grundmuster verwendet werden:

1. `Projekt klären`: Ziel, Lernziel und grobe Grenzen beschreiben.
2. `Use Cases schneiden`: Haupt-Use-Cases und Unter-Use-Cases formulieren.
3. `Analyse dokumentieren`: Use Cases und offene Fragen ablegen.
4. `Datenmodell ableiten`: Entitäten, Beziehungen und Tabellen skizzieren.
5. `UI oder API grob strukturieren`: erste Navigations- oder Schnittstellenstruktur bauen.
6. `Iterativ prüfen`: Ergebnis ansehen, bewerten und nachschärfen.
7. `Projektstand sichern`: Build prüfen und sinnvolle Zwischenstände committen.

Dieses Muster ist bewusst leichtgewichtig. Es soll komplexe Projekte stabilisieren, ohne sie in übermäßige Formalität zu zwingen.

