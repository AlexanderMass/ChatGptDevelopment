# MyAIScrum

## Zweck

`MyAIScrum` beschreibt ein persönliches Vorgehensmodell für die Organisation von Projektarbeit zwischen Mensch und KI.

Es ist kein Scrum nach Lehrbuch. Es übernimmt nur die Begriffe, die für die Arbeit eines Einzelentwicklers mit AI-Pairing nützlich sind. Der Schwerpunkt liegt nicht auf Teamkoordination, Sprintplanung oder kleinteiliger Taskverwaltung, sondern auf fachlicher Orientierung, Teilprojektbildung und dokumentiertem Fortschritt.

## Grundidee

Der Mensch hält Ziel, Priorität, Kontext und Bewertung. Die KI unterstützt bei Strukturierung, Umsetzung, Dokumentation, Review und methodischer Reflexion.

Die Arbeit wird auf hoher Ebene organisiert. Zwei Begriffe stehen im Zentrum:

- `Epic`: ein größeres fachliches oder technisches Teilprojekt
- `Story`: ein fachlich sinnvoller Teilschritt innerhalb eines Epics

Tasks und Sprints werden zunächst nicht als Kernelemente geführt. Sie können situativ entstehen, sollen aber nicht die Grundstruktur dominieren.

## Epic Als Teilprojekt

Ein Epic wird als Teilprojekt verstanden.

Für jedes Epic wird ein eigenes Markdown-Dokument angelegt. Dieses Dokument beschreibt den fachlichen Scope, die Zielsetzung, wichtige Entscheidungen, Stories und den aktuellen Arbeitsstand.

Die Epic-Dateien liegen nicht in `ChatGptBase`, sondern im Kontextordner des jeweiligen konkreten Projekts, in der Regel unter `ChatGptContext`. `ChatGptBase` beschreibt nur die allgemeine Methode und kann in andere Projekte kopiert werden.

Jedes Epic erhält eine fortlaufende Nummer:

- `Epic 1`
- `Epic 2`
- `Epic 3`

Die Epic-Nummer bleibt stabil, auch wenn sich der Titel des Epics später ändert. Dadurch kann sie in Git-Commits, Dokumentation und späteren Auswertungen eindeutig referenziert werden.

Beispiel für Dateinamen:

- `Epic1_DashboardPresentation.md`
- `Epic2_DatabaseModeling.md`
- `Epic3_ProjectAdministration.md`

Der Dateiname sollte CamelCasing verwenden und keine Leerzeichen enthalten.

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

Die Story-Nummer soll bei Commits genannt werden, wenn ein Commit einer Story fachlich zugeordnet werden kann.

Beispiele:

- Projektdaten tabellarisch anzeigen
- Git-Datenanalyse ausführen und Ergebnis melden
- Projektadministration mit Repository-Zuordnung ermöglichen
- Erste grafische Metrikdarstellung aufbauen

Stories können während der Arbeit entstehen. Sie müssen nicht vollständig vorab bekannt sein.

## Backlog Und Fortschritt

Das Backlog lebt innerhalb des Epic-Dokuments.

Es sammelt offene Punkte, Nacharbeiten, Beobachtungen und mögliche Erweiterungen. Dadurch bleibt jedes Teilprojekt in sich nachvollziehbar.

Das Backlog dient nicht nur der Planung, sondern auch der Reflexion:

- Was ist erledigt?
- Was wurde verschoben?
- Welche neuen Fragen sind entstanden?
- Welche methodischen Erkenntnisse wurden gewonnen?

## Commit-Konvention

Git-Commits sollen nach Möglichkeit auf die Story referenzieren.

Die Epic-Zuordnung ist in der Story-Nummer bereits enthalten. `Story 1.2` bedeutet: Epic 1, Story 2.

Beispiele:

```text
Story 1.2: Add project metric table
Story 2.1: Refine database cascade rules
Epic 3: Add initial dashboard shell
```

Wenn ein Commit nicht sinnvoll einer einzelnen Story zugeordnet werden kann, reicht die Epic-Nummer. Wenn der Commit rein technisch oder vorbereitend ist, kann er als Infrastruktur- oder Refactoring-Commit benannt werden.

Ziel dieser Konvention ist nicht Bürokratie, sondern spätere Nachvollziehbarkeit:

- Welche fachliche Komponente wurde verändert?
- Welche Story wurde umgesetzt?
- Welche Commits gehören zu welchem Teilprojekt?

## Abgrenzung Zu Klassischem Scrum

Klassisches Scrum adressiert Teams, Rollen, Sprints, Planning, Daily, Review und Retrospektive.

`MyAIScrum` ist kleiner und persönlicher. Es ist auf Einzelentwicklung mit KI zugeschnitten.

Wichtige Unterschiede:

- Keine festen Sprints als Grundelement
- Keine dauerhafte Task-Zerlegung
- Keine Teamrollen im klassischen Sinn
- Fokus auf Epics als Teilprojekte
- Fokus auf Stories als fachliche Fortschrittseinheiten
- Backlog direkt im Epic-Dokument
- Starke Verbindung zu Analyse, Implementierung und Dokumentation

## Rolle Der KI

Die KI unterstützt dabei, Epics zu strukturieren, Stories herauszuarbeiten, offene Punkte zu erkennen und Fortschritt zu dokumentieren.

Sie soll nicht jede Arbeit automatisch in Tasks zerlegen. Stattdessen soll sie helfen, die fachliche Ebene stabil zu halten und erst dann zu konkretisieren, wenn Implementierung oder Review es erfordern.

Wenn die KI Commits erstellt oder Commit-Texte vorschlägt, soll sie die Commit-Konvention dieses Vorgehensmodells berücksichtigen. Soweit eine Änderung einer Story zugeordnet werden kann, soll die Story-Nummer im Commit-Text genannt werden. Ist keine Story passend, soll mindestens die Epic-Nummer oder ein klarer Infrastruktur- beziehungsweise Refactoring-Hinweis verwendet werden.

## Arbeitsmodus

Ein typischer Ablauf kann so aussehen:

1. Ein neues Epic wird fachlich beschrieben.
2. Die ersten Stories werden gemeinsam formuliert.
3. Mensch und KI arbeiten an einer Story.
4. Während der Umsetzung entstehen neue Beobachtungen.
5. Das Epic-Dokument wird bei Bedarf aktualisiert.
6. Am Ende wird der Fortschritt im Backlog festgehalten.

Damit entsteht eine leichte, projektübergreifend wiederverwendbare Struktur für Planung, Umsetzung und Reflexion.
