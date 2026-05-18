# Neues Projekt

## Zweck

`NeuesProjekt` beschreibt, wie ein neues ChatGPT-Development-Projekt grundsätzlich aufgebaut werden kann.

Die Datei dient als Startmuster für neue Projekte. Sie beschreibt den Projektwurzelordner, den zentralen Kontextordner und die Zusammenarbeit zwischen Mensch und KI in der Anfangsphase eines Projekts.

## Grundidee

Ein neues Projekt soll nicht als ungeordnete Code-Sammlung beginnen.

Mit der Projektanlage wird ein Projektwurzelordner festgelegt. Dieser Wurzelordner wird unter Git-Kontrolle gestellt und bildet die technische und dokumentarische Kapsel des Projekts.

Die Ordnerstruktur soll möglichst knapp bleiben. Neben dem zentralen Kontextordner werden weitere Ordner nur dann angelegt, wenn sie aus dem konkreten Projekt heraus benötigt werden.

## Projektwurzel

Der Projektwurzelordner ist der Einstiegspunkt des Projekts.

Er enthält:

- das Git-Repository
- den zentralen Kontextordner
- einen nicht-versionierten Scratch-Arbeitsbereich
- optional weitere technische oder fachliche Unterordner
- optional ein `README.md`

Beispiel:

```text
ProjectRoot/
  .git/
  ChatGptContext/
  Scratch/
  <ProjektSpezifischeOrdner>/
  README.md
```

`<ProjektSpezifischeOrdner>/` ist ein Platzhalter. In einem konkreten Projekt werden für die fachlichen oder technischen Umsetzungen nur die Ordner angelegt, die wirklich benötigt werden.

Der Wurzelordner sollte frühzeitig unter Git-Verwaltung gestellt werden. Dadurch können Kontextdateien, Quellcode, SQL-Skripte und andere Projektartefakte gemeinsam versioniert werden.

## ChatGptContext

`ChatGptContext` ist der zentrale Dokumentationsort des Projekts.

Hier werden die projektbezogenen Informationen gepflegt, die ein neuer Chat benötigt, um arbeitsfähig zu werden. Viele methodische Elemente, die während der Zusammenarbeit mit KI entstehen, werden in diesem Ordner dokumentiert.

Typische Basisstruktur:

```text
  ChatGptContext/
    ProjektContext.md
    ProjektVisionStatement.md
    ProjektScrumContext.md
```

Dateinamen im Kontextordner sollten CamelCasing verwenden und keine Leerzeichen enthalten.

`ProjektContext.md` ist der Einstieg in das konkrete Projekt. Die Datei beschreibt Projektziel, Scope, zentrale Entscheidungen, relevante Base-Prozesse, relevante Base-Ressourcen und wichtige Projektordner.

`ProjektVisionStatement.md` beschreibt die langfristige Projektvision. Die Datei klärt, warum das Projekt existiert, welche Leitidee verfolgt wird und welche Qualitätsperspektive die weitere Arbeit rahmt.

`ProjektScrumContext.md` beschreibt die konkrete MyAiScrum-Struktur des Projekts. Die Details der Methode stehen in `ChatGptBase/Processes/MyAiScrum.md`; hier wird nur die projektbezogene Instanz beschrieben.

### ProjektContext.md

`ProjektContext.md` ist der erste Einstieg in ein konkretes Projekt.

Die Datei sollte knapp beschreiben:

- Ziel und Zweck des Projekts
- aktueller Scope und bewusste Abgrenzungen
- wichtige Projektordner
- relevante Prozesse aus `ChatGptBase/Processes`
- relevante Ressourcen aus `ChatGptBase/Ressources`
- besondere Hinweise, die ein neuer Chat vor Arbeitsbeginn kennen muss

### ProjektVisionStatement.md

`ProjektVisionStatement.md` beschreibt die langfristige Leitidee eines Projekts.

Die Datei sollte grob festhalten:

- warum das Projekt existiert
- welche Perspektive oder welches Leitbild es verfolgt
- welche Qualitäts- oder Entwicklungsrichtung wichtig ist
- welche langfristige Wirkung oder Nutzung angestrebt wird

Das Vision Statement ist kein detaillierter Projektplan. Es ist ein Nordstern, der spätere Entscheidungen einordnet.

### ProjektScrumContext.md

`ProjektScrumContext.md` beschreibt die konkrete MyAiScrum-Instanz des Projekts.

Die methodischen Details zu Epics, Stories, Tasks, Backlog und Commit-Konvention stehen in `ChatGptBase/Processes/MyAiScrum.md` und sollen hier nicht wiederholt werden. Dort wird auch die Filestruktur für Epics und ihre Kontextdokumentation beschrieben.

## Scratch

`Scratch` ist ein Arbeitsbereich für temporäre Artefakte, Zwischenergebnisse und experimentelle Teilprodukte.

Der Ordner sollte grundsätzlich angelegt werden, weil KI-gestützte Arbeit häufig temporäre Dateien benötigt. Das gilt besonders für längere Prozesse über viele Prompts hinweg, bei denen Zwischenstände, generierte Ressourcen oder kleine temporäre Teilprojekte abgelegt werden müssen.

Die Inhalte des Scratch-Ordners sind zunächst nicht stabil und sollen nicht automatisch versioniert werden. Der Benutzer entscheidet, wann der Ordner bereinigt wird oder ob einzelne Ergebnisse aus `Scratch` in stabile Projektordner übernommen werden.

`Scratch/` sollte deshalb in `.gitignore` eingetragen werden.

## Projektspezifische Ordner

Weitere Unterordner werden abhängig vom jeweiligen Projekt angelegt.

Die Struktur sollte nicht künstlich aufgebläht werden. Jeder Ordner braucht eine klare Aufgabe und sollte aus dem konkreten Projektbedarf entstehen.

Mögliche Beispiele sind:

```text
ProjectRoot/
  Web/
  Java/
  Python/
  Sql/
```

Diese Ordner werden nicht als allgemeine Pflichtstruktur detailliert. Wenn ein Projekt besondere Erwartungen an Web-, Java-, Python-, SQL- oder andere Artefakte hat, wird das im jeweiligen `ProjektContext.md` oder in einer passenden Ressourcenbeschreibung festgehalten.

## README

`README.md` ist der Einstiegspunkt für Menschen.

Es sollte kurz beschreiben:

- Was ist das Ziel des Projekts?
- Wie wird das Projekt gestartet?
- Welche Hauptordner gibt es?
- Welche Voraussetzungen werden benötigt?
- Wo liegt die projektspezifische Kontextdokumentation?

Das README muss nicht lang sein. Es soll Orientierung geben.

## Zusammenarbeit Zwischen Mensch Und KI

Der Mensch hält Ziel, Priorität, Bewertung und fachliche Richtung.

Die KI unterstützt bei:

- Strukturaufbau
- Kontextdateien
- Analyse
- Implementierung
- Refactoring
- Review
- Dokumentation
- Commit-Vorbereitung

Zu Beginn eines Projekts sollte die KI nicht sofort große Implementierungen starten, wenn der Scope noch unklar ist. Sinnvoll ist zuerst ein kurzer Strukturaufbau:

1. Projektziel klären.
2. Projektwurzel unter Git-Kontrolle stellen.
3. `ChatGptContext` anlegen.
4. `ProjektContext.md`, `ProjektVisionStatement.md` und `ProjektScrumContext.md` anlegen.
5. `Scratch` anlegen und über `.gitignore` von der Versionierung ausnehmen.
6. relevante Base-Prozesse und Ressourcen importieren oder referenzieren.
7. erste Epics, Stories oder Tasks skizzieren.
8. danach den ersten vertikalen Schnitt implementieren.

## Base-Imports

Neue Projekte können auf Dateien aus `ChatGptBase` verweisen.

Dadurch muss methodisches Wissen nicht in jedem Projekt neu formuliert werden.

Beispiele:

```text
ChatGptBase/Processes/MyAiScrum.md
ChatGptBase/Processes/AnalyseUml.md
ChatGptBase/Processes/NeuesProjekt.md
ChatGptBase/Ressources/NodeJsServer.md
ChatGptBase/Ressources/MySqlDatabase.md
```

Ein Projekt sollte dokumentieren, welche Base-Dateien für dieses Projekt relevant sind. Dadurch kann ein neuer Chat schneller verstehen, nach welchen Methoden und Ressourcen gearbeitet werden soll.

## Git Und Commits

Ein neues Projekt sollte frühzeitig unter Git-Verwaltung gestellt werden.

Empfohlen:

- Git-Repository initialisieren
- `.gitignore` anlegen
- keine Passwörter oder lokalen Secrets einchecken
- kleine, nachvollziehbare Commits erstellen
- Commit-Konvention aus `MyAiScrum` verwenden, wenn Epics, Stories oder Tasks existieren

## Ergebnis

Am Ende der Startphase sollte ein neues Projekt nicht vollständig spezifiziert sein.

Es sollte aber arbeitsfähig sein:

- Der Projektzweck ist klar.
- Der Projektwurzelordner steht unter Git-Kontrolle.
- `ChatGptContext` ist als zentraler Dokumentationsort vorhanden.
- `ProjektContext.md` beschreibt das Projekt.
- `ProjektVisionStatement.md` beschreibt die langfristige Leitidee.
- `ProjektScrumContext.md` beschreibt die Arbeitsstruktur und begründet die Epics.
- `Scratch` ist als nicht-versionierter temporärer Arbeitsbereich vorhanden.
- Die Ordnerstruktur ist knapp und projektbezogen.
- Die Zusammenarbeit zwischen Mensch und KI ist gerahmt.
- Die ersten nächsten Schritte sind ableitbar.
