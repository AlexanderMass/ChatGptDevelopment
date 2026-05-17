# Projekt Vision Statement

## Zweck

Dieses Dokument beschreibt die Grundidee hinter `ChatGptBase`.

`ChatGptBase` ist eine projektübergreifende Methoden- und Ressourcenbasis für ChatGPT-Development-Projekte. Der Ordner beschreibt, wie Projekte aufgebaut, dokumentiert und zwischen Mensch und KI bearbeitet werden sollen.

## Vision

ChatGPT-Development-Projekte sollen so organisiert werden, dass ihre fachliche, technische und methodische Struktur auch über Chat-Grenzen hinweg verständlich bleibt.

Ein neuer Chat soll nicht jedes Mal mühsam durch mündliche Erklärung oder lange Vorgeschichten arbeitsfähig gemacht werden müssen. Stattdessen soll ein Projekt seine eigenen Kontextinformationen so pflegen, dass eine Übergabe an einen neuen Chat reproduzierbar möglich ist.

## Grundidee

Jedes Projekt besitzt einen projektspezifischen Kontextordner, typischerweise `ChatGptContext`.

Dieser Ordner enthält die Informationen, die ein neuer Chat benötigt, um das Projekt zu verstehen:

- Projektziel
- aktuelle Arbeitsstruktur
- relevante Epics, Stories und Tasks
- wichtige Architekturentscheidungen
- Analyse- und Designinformationen
- relevante Ressourcen und Vorgehensmodelle
- offene Punkte und Backlog-Einträge

`ChatGptBase` beschreibt dagegen nicht ein einzelnes Projekt. Es enthält allgemeine Methoden, Prozesse und Ressourcen, die in mehreren Projekten wiederverwendet werden können.

## Kontextübergabe

Ein zentrales Ziel ist die kontrollierte Kontextübergabe.

Kontextübergabe bedeutet:

- Ein neuer Chat kann anhand definierter Kontextdateien in ein Projekt einsteigen.
- Relevante Methoden und Ressourcen sind explizit referenziert.
- Entscheidungen sind auffindbar.
- Projektstand und Arbeitsstruktur sind nachvollziehbar.
- Die Zusammenarbeit kann fortgesetzt werden, ohne dass der Mensch alles neu erklären muss.

Diese Übergabefähigkeit ist besonders wichtig, weil Chatverläufe abbrechen, wechseln oder projektbezogen neu gestartet werden können.

## Projektstruktur

Neue Projekte sollen möglichst mit einer klaren Grundstruktur beginnen:

```text
ProjectRoot/
  ChatGptContext/
  Scratch/
```

`ChatGptContext` ist der zentrale Dokumentationsort des Projekts.

`Scratch` ist ein nicht-versionierter temporärer Arbeitsbereich für KI-Artefakte, Zwischenergebnisse und experimentelle Dateien.

Weitere Ordner entstehen projektabhängig, zum Beispiel:

```text
Web/
Java/
Python/
Sql/
```

## Zentrale Kontextdateien

Für Projekte werden insbesondere zwei Einstiegspunkte empfohlen:

- `ProjektContext.md`: beschreibt das Projekt, seinen Zweck, seine Struktur und relevante Base-Imports.
- `AiScrumContext.md`: beschreibt die konkrete Arbeitsstruktur über Epics, Stories und optionale Tasks.

Diese Dateien helfen, Projektinhalt und Arbeitsorganisation zu trennen.

## Methoden Und Ressourcen

`ChatGptBase` unterscheidet zwischen Prozessen und Ressourcen.

Prozesse beschreiben Vorgehensweisen, zum Beispiel:

- Projektanlage
- MyAiScrum
- Analyse mit UML
- Brainstorming
- Dokumentenarbeit

Ressourcen beschreiben wiederverwendbare technische oder methodische Bausteine, zum Beispiel:

- Node.js Server
- Caddy Webserver
- MySQL Database
- ECharts
- Cytoscape.js

Ein konkretes Projekt kann festhalten, welche Prozesse und Ressourcen für es relevant sind.

## Mensch Und KI

Die Zusammenarbeit zwischen Mensch und KI wird als Pairing-Prozess verstanden.

Der Mensch hält Ziel, Priorität, Verantwortung, Bewertung und fachliche Richtung. Die KI unterstützt bei Strukturierung, Implementierung, Dokumentation, Review, Recherche und methodischer Reflexion.

Damit diese Zusammenarbeit stabil bleibt, braucht sie sichtbare Artefakte:

- Kontextdateien
- Epics
- Stories
- Tasks
- Ressourcenbeschreibungen
- Architekturentscheidungen
- Git-Commits

## Leitgedanke

Die Methode soll nicht bürokratisch werden.

Sie soll nur so viel Struktur schaffen, wie nötig ist, damit Projekte über längere Zeit, über mehrere Chats und über wechselnde Arbeitsphasen hinweg verständlich bleiben.

Neue Projekte sollen direkt mit dieser Struktur starten. Bestehende Projekte können schrittweise refactored werden.

## Zielbild

Langfristig soll eine Arbeitsweise entstehen, in der ChatGPT-Development-Projekte:

- schnell fortsetzbar sind
- methodisch konsistent bleiben
- Kontextverluste reduzieren
- Entscheidungen sichtbar machen
- technische Ressourcen wiederverwenden
- menschliche Steuerung und KI-Unterstützung besser koppeln

`ChatGptBase` ist dafür die gemeinsame Basis.

