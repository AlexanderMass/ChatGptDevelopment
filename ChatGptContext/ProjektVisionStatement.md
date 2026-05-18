# ProjektVisionStatement

## Vision

`ChatGptDevelopment` soll eine lokale Plattform werden, mit der KI-gestützte Entwicklungsarbeit strukturiert sichtbar, dokumentierbar und auswertbar wird.

Das Projekt verbindet drei Perspektiven:

- operative Projektverwaltung
- methodische Dokumentationsarbeit
- projektübergreifende Introspektion

Damit ist `ChatGptDevelopment` nicht nur eine kleine Webapplikation, sondern zugleich ein Methodenlabor für die Zusammenarbeit zwischen Mensch und KI.

## Leitidee

Die Arbeit mit KI erzeugt hohe Produktivität, aber auch neue Anforderungen an Kontext, Übergabe, Dokumentation und Prozessführung.

Dieses Projekt entwickelt dafür eine praktische Arbeitsform:

- Projekte werden in einer Datenbank verwaltet.
- Git-Repositories werden Projekten zugeordnet.
- Git-Commits werden als Entwicklungsmetriken ausgewertet.
- Kontextordner werden als zentrale Wissensräume behandelt.
- Methoden- und Ressourcenbeschreibungen werden in `ChatGptBase` projektübergreifend gepflegt.

Ziel ist eine wiederverwendbare Struktur, mit der neue Chats oder neue Projekte schneller anschlussfähig werden.

## Anwendungsperspektive

Das Dashboard bildet die operative Sicht.

Es ermöglicht:

- ChatGPT-Development-Projekte anzulegen und zu administrieren
- Git-Repositories zuzuordnen
- Git-Daten zu analysieren
- Check-in-Metriken tabellarisch und grafisch auszuwerten

Das Development Cockpit bildet die methodische Sicht.

Es ermöglicht:

- Projekte mit Kontextordnern zu finden
- Kontextdateien aus dem persistierten Git-Stand sichtbar zu machen
- die Struktur von Projektdokumentation zu prüfen
- spätere Qualitätsanker und Refactoring-Ideen für Kontextordner vorzubereiten

## ChatGptBase

`ChatGptBase` ist die projektübergreifende Methoden- und Ressourcensammlung.

Dieser Ordner gehört nicht zu einem einzelnen Anwendungsprojekt. Er beschreibt allgemeine Kontextdateien, die bei der Anlage oder Weiterentwicklung konkreter Projekte potenziell relevant werden können.

`ChatGptBase` hat zwei Hauptanteile:

- `Processes`: Methodenspezifikationen für die Zusammenarbeit zwischen Mensch und KI
- `Ressources`: Ressourcenspezifikationen für wiederverwendbare technische oder organisatorische Bausteine

Die Dateien in `ChatGptBase` werden nicht automatisch vollständig in jedes Projekt übernommen. Ein konkretes Projekt referenziert oder importiert nur die Prozesse und Ressourcen, die für dieses Projekt Bedeutung gewinnen.

## Methodenperspektive Für Projekte

Ein konkretes Projekt instanziiert die in `ChatGptBase` beschriebenen Methoden und Ressourcen in seinem eigenen Kontextordner.

Wichtige Bausteine sind:

- `ProjektContext.md`: Einstieg in das konkrete Projekt
- `ProjektVisionStatement.md`: langfristige Leitidee und Qualitätsperspektive des Projekts
- `ProjektScrumContext.md`: Begründung und Struktur der Epics
- `Epic<x>_<Thema>.md`: prozesszentrische Epic-Akte
- `Epic<x>_ContextInfo.md`: fachliche Einarbeitung pro Epic

Diese Struktur soll den Chat-Transfer erleichtern. Ein neuer Chat soll nicht den gesamten historischen Dialog kennen müssen, sondern über verdichtete Kontextdateien schnell arbeitsfähig werden.

## Qualitätsziel

Das Projekt verfolgt keinen maximal formalisierten Unternehmensprozess.

Stattdessen soll ein pragmatisches Vorgehen entstehen, das für Einzelentwicklung mit KI funktioniert:

- so viel Analyse wie nötig
- so wenig Bürokratie wie möglich
- klare Kontextübergabe
- nachvollziehbare Entscheidungen
- saubere Commit-Zuordnung über Epics, Stories und Tasks

## Langfristige Perspektive

Langfristig kann `ChatGptDevelopment` zu einem Cockpit für mehrere KI-gestützte Projekte werden.

Es soll helfen, Entwicklungsverlauf, Kontextqualität, Methodenreife und Git-basierte Arbeitsspuren projektübergreifend sichtbar zu machen. Dadurch entsteht ein persönliches Kontroll- und Reflexionswerkzeug für strukturierte Arbeit mit KI.
