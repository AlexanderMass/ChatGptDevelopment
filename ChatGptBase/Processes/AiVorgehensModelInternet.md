# Vorgehensmodelle im Internet

## Ausgangspunkt

Für KI-gestützte Softwareentwicklung entstehen bereits neue Vorgehensmodelle und Begriffe. Viele Ansätze kreisen um dieselbe Beobachtung: KI kann Implementierung stark beschleunigen, aber ohne explizite Spezifikation, Architektur und Kontext entstehen schnell inkonsistente oder schwer integrierbare Ergebnisse.

Der eigene Arbeitsansatz in diesem Projekt liegt damit in einem erkennbaren Diskussionsfeld. Besonders relevant sind spec-first, agentische und governance-orientierte Vorgehensmodelle.

## Spec-Driven Development

Der Begriff **Spec-Driven Development** oder **Specification-Driven Development** beschreibt Ansätze, bei denen die Spezifikation zur zentralen Quelle der Wahrheit wird. Code, Tests und Dokumentation werden aus dieser Spezifikation abgeleitet oder an ihr validiert.

Relevante Beispiele:

- [SpecDD](https://specdd.ai/)
- [Spec-Driven Development](https://specdriven.ai/)
- [Spec Native](https://www.specnative.dev/)

Kernidee:

- Nicht direkt mit vagen Prompts in die Implementierung springen.
- Erst Anforderungen, Verhalten, Grenzen und Architektur explizit machen.
- Danach KI oder Entwickler gegen diese Spezifikation arbeiten lassen.
- Die Spezifikation bleibt lebendiges Arbeitsartefakt.

Diese Linie ähnelt dem eigenen Vorgehen mit Use Cases, Datenmodell, Oberflächendesign, SQL-Schema und Kontextdateien.

## Architektur und Kontext als Steuerungsinstrument

Mehrere Werkzeuge und Ansätze betonen, dass KI-Coding nur dann zuverlässig wird, wenn Architekturentscheidungen, Konventionen und Kontext explizit vorliegen.

Beispiele:

- [Kiro](https://kiro.dev/)
- [Specwright](https://specwright.app/)

Kernidee:

- KI braucht explizite Steuerung.
- Architekturentscheidungen sollen dokumentiert und wiederverwendbar sein.
- Anforderungen und Akzeptanzkriterien werden strukturiert erfasst.
- Der Mensch bleibt in der Rolle des Architekten, Entscheiders und Prüfers.

Diese Ansätze passen zur These, dass KI die Architekturarbeit nicht ersetzt, sondern wichtiger macht.

## Agentische Vorgehensmodelle

Ein weiteres Diskussionsfeld sind agentische Entwicklungsmodelle. Dabei wird nicht nur ein einzelner KI-Assistent betrachtet, sondern ein koordiniertes Set von Agenten mit unterschiedlichen Rollen.

Beispiele:

- [Agent Driven Development](https://getadd.dev/)
- [MADD - Multi-Agent Driven Development](https://madd.sh/)

Kernidee:

- Unterschiedliche Agenten übernehmen unterschiedliche Rollen.
- Beispiele: Spezifikation, Implementierung, Review, Test, Verifikation.
- Rollen und Verantwortlichkeiten müssen explizit modelliert werden.
- Es braucht Kontrollpunkte, damit schnelle KI-Arbeit nicht zu Drift führt.

Das ist besonders relevant für Unternehmenskontexte, in denen mehrere Menschen und mehrere KI-Agenten parallel arbeiten.

## Enterprise- und Governance-Perspektive

Für größere Unternehmenssysteme reicht einfache prompt-basierte KI-Programmierung nicht aus. Dort spielen Legacy-Systeme, Multi-Repository-Strukturen, Sicherheit, Compliance, Testbarkeit und Governance eine zentrale Rolle.

Beispiel:

- [CoderFlow](https://coderflow.ai/)

Kernidee:

- KI muss in komplexe Unternehmensumgebungen eingebettet werden.
- Lokale oder kontrollierte Ausführung ist wichtig.
- Ergebnisse müssen gebaut, getestet, validiert und reviewt werden.
- Geschwindigkeit allein reicht nicht; Integration und Governance sind entscheidend.

Diese Perspektive passt zur eigenen Erfahrung mit Architekturarbeit, Schnittstellen, funktionaler Kapselung und Einbindung in größere Projektlandschaften.

## Einordnung des eigenen Ansatzes

Der eigene Ansatz verbindet mehrere dieser Linien:

- Use Cases als fachliche Spezifikation
- Datenmodellierung als strukturelle Grundlage
- Oberflächendesign als konkrete UI-Spezifikation
- SQL-Schema als operative Datenbankbeschreibung
- Kontextdateien als wiederverwendbares Projektgedächtnis
- Codex als Modellierungs- und Implementierungswerkstatt
- ChatGPT als Denk-, Schreib- und Reflexionsraum

Damit entsteht eine Form von **AI-assisted Specification Driven Development**.

Die zentrale These:

Je stärker KI die Implementierung beschleunigt, desto wichtiger werden explizite Spezifikation, Architektur, Kontext und Review.

## Relevanz für weitere Arbeit

Für zukünftige Projekte sollten diese Internetansätze nicht einfach kopiert werden. Wichtiger ist, aus ihnen methodische Muster zu extrahieren:

- Welche Spezifikationsartefakte sind wirklich nützlich?
- Welche Kontextdateien braucht ein Projekt?
- Wie detailliert müssen Use Cases sein?
- Wann reicht eine knappe Spezifikation?
- Wann ist eine explizite Architekturmodellierung notwendig?
- Wie wird verhindert, dass KI-Agenten lokal richtige, aber global falsche Lösungen erzeugen?
- Wie werden Ergebnisse reviewt und gegen Spezifikation geprüft?

Das aktuelle Projekt kann als Erfahrungsbasis dienen, um daraus ein eigenes, pragmatisches Vorgehensmodell für KI-gestützte Softwareentwicklung abzuleiten.
