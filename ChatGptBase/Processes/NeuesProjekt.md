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
  README.md
```

Der Wurzelordner sollte frühzeitig unter Git-Verwaltung gestellt werden. Dadurch können Kontextdateien, Quellcode, SQL-Skripte und andere Projektartefakte gemeinsam versioniert werden.

## ChatGptContext

`ChatGptContext` ist der zentrale Dokumentationsort des Projekts.

Hier werden die projektbezogenen Informationen gepflegt, die ein neuer Chat benötigt, um arbeitsfähig zu werden. Viele methodische Elemente, die während der Zusammenarbeit mit KI entstehen, werden in diesem Ordner dokumentiert.

Typische Basisstruktur:

```text
ChatGptContext/
  ProjektContext.md
  AiScrumContext.md
```

`ProjektContext.md` ist der Einstieg in das konkrete Projekt. Die Datei beschreibt Projektziel, Scope, zentrale Entscheidungen, relevante Base-Prozesse, relevante Base-Ressourcen und wichtige Projektordner.

`AiScrumContext.md` beschreibt die konkrete MyAiScrum-Struktur des Projekts. Die Datei listet die existierenden Epics, ihre Stories, den aktuellen Arbeitsfokus und die Verweise auf Epic- oder Story-Detaildokumente.

Für kleine Projekte können Epic-Dateien flach im Kontextordner liegen:

```text
ChatGptContext/
  ProjektContext.md
  AiScrumContext.md
  Epic1_Analyse.md
  Epic2_Implementierung.md
```

Für größere Projekte kann zusätzliche Dokumentation ergänzt werden. Das Projekt entscheidet selbst, wie weit Epics, Stories oder Tasks ausdokumentiert werden.

Eine mögliche Erweiterung sind Epic-Ordner:

```text
ChatGptContext/
  ProjektContext.md
  AiScrumContext.md
  Epic1_Analyse/
    Epic1_Context.md
    Story1_1_UseCases.md
    Story1_2_Design.md
  Epic2_Implementierung/
    Epic2_Context.md
    Story2_1_Server.md
    Story2_2_Frontend.md
```

Nicht jedes Projekt benötigt Epic-Ordner. Sie sind nur eine mögliche Skalierungsstufe, wenn die Dokumentation innerhalb eines Epics umfangreicher wird.

Alternativ können einzelne Story- oder Task-Dateien auch ohne zusätzliche Ordner angelegt werden. Entscheidend ist nicht die formale Tiefe, sondern ob die zusätzliche Datei dem Projekt hilft, Orientierung zu behalten.

Mögliche Aufgaben von `ChatGptContext`:

- Projektziel beschreiben
- Scope und zentrale Entscheidungen dokumentieren
- Analyseergebnisse sammeln
- Epics, Stories und Tasks verwalten
- wichtige Ressourcen- und Methodenimporte nennen
- Übergaben an neue Chats erleichtern

## Projektabhängige Ordner

Weitere Unterordner werden abhängig vom jeweiligen Projekt angelegt.

Die Struktur sollte nicht künstlich aufgebläht werden. Jeder Ordner sollte eine klare Aufgabe haben.

Häufige Beispiele:

```text
ProjectRoot/
  ChatGptContext/
  Scratch/
  Web/
  Java/
  Python/
  Sql/
```

## Scratch

`Scratch` ist ein Arbeitsbereich für temporäre Artefakte, Zwischenergebnisse und experimentelle Teilprodukte.

Der Ordner sollte grundsätzlich angelegt werden, weil KI-gestützte Arbeit häufig temporäre Dateien benötigt. Das gilt besonders für längere Prozesse über viele Prompts hinweg, bei denen Zwischenstände, generierte Ressourcen oder kleine temporäre Teilprojekte abgelegt werden müssen.

Die Inhalte des Scratch-Ordners sind zunächst nicht stabil und sollen nicht automatisch versioniert werden. Der Benutzer entscheidet, wann der Ordner bereinigt wird oder ob einzelne Ergebnisse aus `Scratch` in stabile Projektordner übernommen werden.

`Scratch/` sollte deshalb in `.gitignore` eingetragen werden.

## Web

`Web` wird verwendet, wenn ein Projekt Webanteile enthält.

Der Ordner kann statische Webseiten, Web-Apps und Serveranteile enthalten.

Eine mögliche Struktur:

```text
Web/
  frontend/
  server/
```

`frontend` enthält die clientseitige Oberfläche. `server` enthält dynamische Serverfunktionen, zum Beispiel Node.js-REST-Services.

## Java

`Java` kann verwendet werden, wenn ein Projekt Java-Code enthält oder eine Java-Applikation gepflegt wird.

Der Ordner kann Quellcode, Build-Dateien, Konfigurationen oder projektbezogene Java-Module enthalten. Die konkrete Struktur hängt vom verwendeten Build-System und vom bestehenden Projekt ab.

## Python

`Python` kann verwendet werden, wenn ein Projekt hauptsächlich aus Python-Code besteht oder Python-Anteile enthält.

Der Ordner kann Skripte, Packages, virtuelle Umgebungsbeschreibungen oder serverseitige Python-Komponenten enthalten. Die konkrete Struktur soll projektbezogen entschieden werden.

## Sql

`Sql` ist kein verpflichtender Standardordner.

Der Ordner wird angelegt, wenn das Projekt SQL-Artefakte benötigt.

Typische Inhalte:

```text
Sql/
  create_schema.sql
  select_project_overview.sql
  select_metric_summary.sql
```

In `Sql` können Skripte zur Erzeugung des Datenbankschemas liegen, aber auch wichtige projektbezogene SQL-Selects oder andere SQL-Hilfsdateien.

SQL-Skripte dürfen versioniert werden, solange sie keine Passwörter oder privaten Zugangsdaten enthalten. Wenn Datenbankdesign rein analytisch beschrieben wird, kann die Beschreibung zusätzlich im Analyse- oder Modellierungsbereich des Projekts liegen.

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
4. `ProjektContext.md` und `AiScrumContext.md` anlegen.
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
- `AiScrumContext.md` beschreibt die Arbeitsstruktur.
- `Scratch` ist als nicht-versionierter temporärer Arbeitsbereich vorhanden.
- Die Ordnerstruktur ist knapp und projektbezogen.
- Die Zusammenarbeit zwischen Mensch und KI ist gerahmt.
- Die ersten nächsten Schritte sind ableitbar.
