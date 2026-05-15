# Entwicklungsprozess-Sicht

## Ausgangspunkt

Für KI-gestützte Projekte reicht es nicht, nur Code, Use Cases oder Datenmodelle zu verwalten. Zusätzlich braucht es eine entwicklungsprozessuale Sicht auf das Projekt.

Diese Sicht beschreibt nicht primär, was die Anwendung fachlich tut, sondern wie die Arbeit an der Anwendung strukturiert, verfolgt und bewertet wird.

## Ziel der Prozesssicht

Die Prozesssicht soll von außen schnell verständlich machen:

- Worum geht es in diesem Projekt?
- Was gehört zum aktuellen Scope?
- Was ist bewusst nicht Teil des Scopes?
- In welcher Entwicklungsphase befindet sich das Projekt?
- Welche Epics und Stories existieren?
- Was ist spezifiziert?
- Was ist umgesetzt?
- Was ist offen oder blockiert?
- Was ist der nächste sinnvolle Arbeitsschritt?

Damit wird das Projekt nicht nur fachlich, sondern auch prozessual selbstbeschreibend.

## Project Scope

Ein zentraler Bestandteil ist der Project Scope. Er beschreibt den fachlichen und technischen Rahmen des Projekts.

Mögliche Inhalte:

- Ziel des Projekts
- fachliche Motivation
- MVP-Scope
- zentrale Funktionen
- bewusste Abgrenzungen
- Out-of-Scope-Themen
- langfristige Erweiterungsideen
- wichtige Annahmen
- aktuelle Scope-Entscheidungen

Der Project Scope hilft besonders beim Wiedereinstieg in ein Projekt. Er verhindert, dass alte Entscheidungen im Chatverlauf verschwinden oder neu rekonstruiert werden müssen.

## Umsetzungsstatus

Die Prozesssicht sollte außerdem den aktuellen Umsetzungsstatus abbilden.

Mögliche Statuswerte:

- Idee
- Analyse
- Spezifikation
- Bereit zur Umsetzung
- Umsetzung
- Test
- Stabilisierung
- Abgeschlossen
- Pausiert
- Zurückgestellt

Für Solo-Projekte können diese Statuswerte bewusst schlank gehalten werden. Sie dienen nicht der Teamkontrolle, sondern der Selbstorientierung und der Steuerung der KI-Arbeit.

## Fortschritt

Neben dem Status braucht es eine Fortschrittsbeschreibung. Diese muss nicht zwingend mathematisch exakt sein. Wichtiger ist, dass sie Orientierung bietet.

Mögliche Fortschrittsinformationen:

- Anzahl Epics
- Anzahl Stories
- spezifizierte Stories
- Stories in Umsetzung
- abgeschlossene Stories
- offene Fragen
- blockierte Punkte
- letzter Arbeitsstand
- nächster sinnvoller Schritt

Eine Prozentangabe kann hilfreich sein, sollte aber nur als grobe Orientierung verstanden werden.

## Backlog-Struktur

Die Prozesssicht kann mit einem Markdown-basierten Backlog verbunden werden.

Eine schlanke Struktur:

```text
Backlog/
  EpicIndex.md
  ProjektverwaltungUndGitMetriken.md
  ProjektdatenPraesentieren.md
  NodeServiceUndLokaleAusfuehrung.md
```

Der `EpicIndex.md` dient als Einstiegspunkt. Die einzelnen Epic-Dateien enthalten Ziel, Status, Scope, Stories, offene Fragen und Fortschritt.

Innerhalb einer Epic-Datei können Stories direkt verwaltet werden. Dadurch bleibt die Struktur leichtgewichtig und braucht keinen separaten Story-Ordner.

## Beispiel für einen Projektkopf

```markdown
# ChatGptDevelopment

## Project Scope

Ziel: Aufbau einer lokalen Dashboard-Anwendung zur Verwaltung von ChatGPT-Projekten und Git-Metriken.

MVP-Scope:
- Projekte anlegen
- Repositories zuordnen
- Git-Daten analysieren
- Projektdaten tabellarisch und grafisch präsentieren

Out of Scope:
- Mehrbenutzerbetrieb
- Cloud-Deployment
- umfangreiches Security-Konzept

## Status

Phase: Spezifikation
Fortschritt: 65 Prozent
Letzter Arbeitsstand: Use Cases Projektpflege und Git-Datenanalyse spezifiziert.
Nächster Schritt: Projektdaten präsentieren spezifizieren.

## Epics

- Projektverwaltung und Git-Metriken: spezifiziert
- Projektdaten präsentieren: in Analyse
- Lokaler Node-Service: geplant
```

## Rolle in KI-Projekten

Die Entwicklungsprozess-Sicht ist besonders wichtig für KI-gestützte Solo-Projekte.

Viele agile Vorgehensmodelle sind auf Teams zugeschnitten. Ein Einzelentwickler braucht weniger Übergaben und weniger Governance, aber eine sehr gute Selbststrukturierung. Die Prozesssicht übernimmt diese Funktion.

Sie macht sichtbar:

- welche Arbeit bereits verstanden ist
- welche Arbeit noch Discovery-Charakter hat
- welche Teile implementierungsbereit sind
- welche Entscheidungen später wiederverwendet werden können

## Kerngedanke

Die Prozesssicht ist ein Projekt-Cockpit für KI-gestützte Entwicklung.

Sie verbindet Scope, Backlog, Status und Fortschritt. Dadurch entsteht ein wiederverwendbares Arbeitsgedächtnis, das sowohl dem Menschen als auch der KI hilft, ein Projekt über mehrere Arbeitstage und Entwicklungsschritte hinweg konsistent weiterzuführen.
