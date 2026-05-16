# MyAiScrum

## Zweck

`MyAiScrum` beschreibt ein persönliches Vorgehensmodell für die Organisation von Projektarbeit zwischen Mensch und KI.

Es ist kein Scrum nach Lehrbuch. Es übernimmt nur die Begriffe, die für die Arbeit eines Einzelentwicklers mit AI-Pairing nützlich sind. Der Schwerpunkt liegt nicht auf Teamkoordination, Sprintplanung oder schwergewichtiger Prozessverwaltung, sondern auf fachlicher Orientierung, Teilprojektbildung und dokumentiertem Fortschritt.

## Grundidee

Der Mensch hält Ziel, Priorität, Kontext und Bewertung. Die KI unterstützt bei Strukturierung, Umsetzung, Dokumentation, Review und methodischer Reflexion.

Die Arbeit wird über drei Ebenen organisiert:

- `Epic`: ein größeres fachliches oder technisches Teilprojekt
- `Story`: ein fachlich sinnvoller Teilschritt innerhalb eines Epics
- `Task`: eine konkrete Arbeitseinheit innerhalb einer Story

Für kleine Projekte reichen Epics und Stories häufig aus. Für größere Projekte kann die zusätzliche Task-Ebene notwendig werden, um Implementierung, Review, Refactoring oder Dokumentationsarbeit feiner zu schneiden.

Sprints werden zunächst nicht als Kernelement geführt. Sie können situativ entstehen, sollen aber nicht die Grundstruktur dominieren.

## AiScrumContext

`AiScrumContext.md` ist der zentrale Index der MyAiScrum-Struktur eines konkreten Projekts.

Diese Datei liegt im projektspezifischen Kontextordner, in der Regel unter `ChatGptContext`. Sie beschreibt nicht die allgemeine Methode, sondern die konkrete Arbeitsstruktur des jeweiligen Projekts.

Typische Inhalte:

- Liste der existierenden Epics
- kurze Beschreibung jedes Epics
- Verweis auf die Epic-Ordner oder Epic-Dateien
- Liste der Stories pro Epic
- optional aktive Tasks
- aktueller Arbeitsfokus
- Hinweise zur Commit-Konvention

Damit trennt sich die Projektbeschreibung von der Arbeitsstruktur:

- `ProjektContext.md`: Was ist das Projekt?
- `AiScrumContext.md`: Wie ist die Arbeit im Projekt strukturiert?

## Epic Als Teilprojekt

Ein Epic wird als Teilprojekt verstanden.

Für jedes Epic wird mindestens eine eigene Markdown-Datei angelegt. Dieses Dokument beschreibt den fachlichen Scope, die Zielsetzung, wichtige Entscheidungen, Stories, Tasks und den aktuellen Arbeitsstand.

Die Epic-Dateien liegen nicht in `ChatGptBase`, sondern im Kontextordner des jeweiligen konkreten Projekts, in der Regel unter `ChatGptContext`. `ChatGptBase` beschreibt nur die allgemeine Methode und kann in andere Projekte kopiert werden.

Jedes Epic erhält eine fortlaufende Nummer:

- `Epic 1`
- `Epic 2`
- `Epic 3`

Die Epic-Nummer bleibt stabil, auch wenn sich der Titel des Epics später ändert. Dadurch kann sie in Git-Commits, Dokumentation und späteren Auswertungen eindeutig referenziert werden.

## Skalierungsstufen

Für kleine Projekte kann eine flache Struktur ausreichen:

```text
ChatGptContext/
  ProjektContext.md
  AiScrumContext.md
  Epic1_Analyse.md
  Epic2_Implementierung.md
```

Für größere Projekte kann zusätzliche Dokumentation ergänzt werden. Das Projekt entscheidet selbst, wie weit Epics, Stories oder Tasks ausdokumentiert werden.

Eine mögliche Erweiterung ist ein eigener Epic-Ordner:

```text
ChatGptContext/
  ProjektContext.md
  AiScrumContext.md
  Epic1_Analyse/
    Epic1_Context.md
    Story1_1_UseCases.md
    Story1_2_Design.md
    Story1_3_Modellierung.md
  Epic2_DashboardEntwicklung/
    Epic2_Context.md
    Story2_1_DashboardOberflaeche.md
    Story2_2_ProjektDialog.md
```

Diese Ordnerstruktur ist optional. Sie wird nur genutzt, wenn eine einzelne Epic-Datei zu groß wird oder wenn Stories eigenständige Dokumentationsräume benötigen.

Alternativ können einzelne Story-Dateien auch direkt neben den Epic-Dateien liegen. Wenn selbst eine Story-Datei nicht ausreicht, können auch Tasks eigene Detaildateien erhalten. Das ist keine Pflichtstruktur, sondern ein Skalierungsmechanismus.

## Benennung

Dateinamen sollten CamelCasing verwenden und keine Leerzeichen enthalten.

Beispiele:

- `AiScrumContext.md`
- `Epic1_Analyse.md`
- `Epic1_Context.md`
- `Story1_1_UseCases.md`
- `Story2_2_ProjektDialog.md`

Story- und Task-Dateien sind optional. Häufig reicht es, Stories und Tasks innerhalb der Epic-Datei zu dokumentieren. Eigene Dateien entstehen nur, wenn dadurch Klarheit gewonnen wird.

## Struktur Eines Epic-Dokuments

Ein Epic-Dokument kann folgende Struktur verwenden:

```markdown
# Epic: Name Des Epics

Epic-Nummer: 1

## Ziel

Kurze Beschreibung, welches Teilprojekt mit diesem Epic verfolgt wird.

## Scope

Was gehört zum Epic und was gehört bewusst nicht dazu?

## Kontext

Fachliche oder technische Einordnung des Epics.

## Stories

- [ ] Story 1.1: ...
- [ ] Story 1.2: ...
- [ ] Story 1.3: ...

## Tasks

- [ ] Task 1.1.1: ...
- [ ] Task 1.1.2: ...
- [ ] Task 1.2.1: ...

## Entscheidungen

Wichtige fachliche, technische oder methodische Entscheidungen.

## Backlog Und Fortschritt

- Offen: ...
- In Arbeit: ...
- Erledigt: ...
- Beobachtung: ...
```

Die Struktur soll nicht bürokratisch werden. Sie dient dazu, den Scope eines Teilprojekts festzuhalten und Fortschritt nachvollziehbar zu machen.

## Stories

Stories beschreiben fachlich sinnvolle Arbeitsschritte innerhalb eines Epics.

Eine Story sollte nicht zu klein sein. Sie ist keine technische Mini-Aufgabe, sondern beschreibt einen nutzbaren Fortschritt.

Stories werden innerhalb des Epics nummeriert. Die Nummer setzt sich aus Epic-Nummer und Story-Nummer zusammen:

- `Story 1.1`
- `Story 1.2`
- `Story 2.1`

Beispiele:

- Projektdaten tabellarisch anzeigen
- Git-Datenanalyse ausführen und Ergebnis melden
- Projektadministration mit Repository-Zuordnung ermöglichen
- Erste grafische Metrikdarstellung aufbauen

Stories können während der Arbeit entstehen. Sie müssen nicht vollständig vorab bekannt sein.

## Tasks

Tasks beschreiben konkrete Arbeitseinheiten innerhalb einer Story.

Eine Task ist sinnvoll, wenn eine Story für die Umsetzung zu groß wird oder wenn mehrere klar unterscheidbare Arbeitsschritte entstehen. Tasks können Implementierung, Tests, Dokumentation, Refactoring oder technische Vorbereitung beschreiben.

Tasks werden innerhalb einer Story nummeriert. Die Nummer setzt sich aus Epic-Nummer, Story-Nummer und Task-Nummer zusammen:

- `Task 1.1.1`
- `Task 1.1.2`
- `Task 2.3.1`

Tasks sind optional. Sie sollen größere Projekte beherrschbarer machen, aber nicht jede kleine Änderung künstlich formalisieren.

## Backlog Und Fortschritt

Das Backlog lebt innerhalb des Epic-Dokuments oder in den dazugehörigen Story-Dateien.

Es sammelt offene Punkte, Nacharbeiten, Beobachtungen und mögliche Erweiterungen. Dadurch bleibt jedes Teilprojekt in sich nachvollziehbar.

## Commit-Konvention

Git-Commits sollen nach Möglichkeit auf die feinste sinnvoll passende Ebene referenzieren.

Erlaubte Referenzen:

- `Epic 3: ...`
- `Story 3.2: ...`
- `Task 3.2.1: ...`

Die Nummern enthalten jeweils ihre übergeordnete Struktur. `Story 1.2` bedeutet Epic 1, Story 2. `Task 1.2.3` bedeutet Epic 1, Story 2, Task 3.

Beispiele:

```text
Epic 3: Add initial project base structure
Story 1.2: Add project metric table
Task 2.1.3: Connect project table to API
```

Wenn ein Commit einer konkreten Task zugeordnet werden kann, soll die Task-Nummer verwendet werden. Wenn keine Task existiert, aber eine Story passt, wird die Story-Nummer verwendet. Wenn ein Commit nur auf Epic-Ebene sinnvoll zugeordnet werden kann, reicht die Epic-Nummer.

Wenn der Commit rein technisch oder vorbereitend ist, kann er als Infrastruktur- oder Refactoring-Commit benannt werden. Auch dann sollte nach Möglichkeit eine Epic-, Story- oder Task-Referenz ergänzt werden.

## Abgrenzung Zu Klassischem Scrum

Klassisches Scrum adressiert Teams, Rollen, Sprints, Planning, Daily, Review und Retrospektive.

`MyAiScrum` ist kleiner und persönlicher. Es ist auf Einzelentwicklung mit KI zugeschnitten.

Wichtige Unterschiede:

- Keine festen Sprints als Grundelement
- Tasks optional und nur bei Bedarf
- Keine Teamrollen im klassischen Sinn
- Fokus auf Epics als Teilprojekte
- Fokus auf Stories als fachliche Fortschrittseinheiten
- Tasks als optionale Umsetzungsebene für größere Projekte
- Backlog direkt im Epic-Dokument oder in Story-Dateien
- Starke Verbindung zu Analyse, Implementierung und Dokumentation

## Rolle Der KI

Die KI unterstützt dabei, Epics zu strukturieren, Stories herauszuarbeiten, Tasks bei Bedarf zu bilden, offene Punkte zu erkennen und Fortschritt zu dokumentieren.

Sie soll nicht jede Arbeit automatisch in Tasks zerlegen. Stattdessen soll sie helfen, die fachliche Ebene stabil zu halten und erst dann zu konkretisieren, wenn Implementierung, Review oder Projektgröße es erfordern.

Wenn die KI Commits erstellt oder Commit-Texte vorschlägt, soll sie die Commit-Konvention dieses Vorgehensmodells berücksichtigen. Soweit eine Änderung einer Task zugeordnet werden kann, soll die Task-Nummer im Commit-Text genannt werden. Ist keine Task passend, soll die Story-Nummer verwendet werden. Ist auch keine Story passend, soll mindestens die Epic-Nummer oder ein klarer Infrastruktur- beziehungsweise Refactoring-Hinweis verwendet werden.

## Arbeitsmodus

Ein typischer Ablauf kann so aussehen:

1. Ein neues Epic wird fachlich beschrieben.
2. Die ersten Stories werden gemeinsam formuliert.
3. Bei größeren Stories werden Tasks ergänzt.
4. Mensch und KI arbeiten an einer Story oder Task.
5. Während der Umsetzung entstehen neue Beobachtungen.
6. `AiScrumContext.md`, Epic-Kontext oder Story-Dateien werden bei Bedarf aktualisiert.
7. Am Ende wird der Fortschritt im Backlog festgehalten.

Damit entsteht eine leichte, projektübergreifend wiederverwendbare Struktur für Planung, Umsetzung und Reflexion.
