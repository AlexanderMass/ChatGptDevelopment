# Ressource: Dokumentationstools

## Zweck

Diese Ressource ist ein wiederverwendbarer Eintrag im Werkzeugkatalog von
ChatGptBase. Sie beschreibt Werkzeuge, die einem neuen Projekt fuer die
Erstellung und Pflege professioneller Dokumente zur Verfuegung gestellt
werden koennen. Aus dem Eintrag folgt keine Verpflichtung, ChatGptBase
selbst mit diesen Werkzeugen oder Konventionen zu verwalten.

Der Ansatz trennt Inhalt, Layout und Veroeffentlichungsformat:

```text
Obsidian als optionale Arbeitsoberflaeche
-> Markdown als redaktionelle Quelle
-> Pandoc als Dokumentkonverter
-> LuaLaTeX als Satzsystem
-> PDF als Veroeffentlichungsfassung
```

Vektorgrafiken werden als SVG gepflegt und mit Inkscape verlustfrei in ein
fuer LaTeX geeignetes PDF-Format ueberfuehrt.

## Installierte Werkzeuge

Die Werkzeugkette wurde am 9. September 2026 unter Windows eingerichtet und
mit einem vollstaendigen Markdown-zu-PDF-Test geprueft.

| Werkzeug | Installierte Version | Aufgabe |
| --- | --- | --- |
| Pandoc | 3.11 | Konvertierung von Markdown in LaTeX beziehungsweise PDF |
| MiKTeX | 25.3 | LaTeX-Distribution und Verwaltung benoetigter Pakete |
| LuaLaTeX | LuaHBTeX 1.25.7, MiKTeX 26.5 | Unicode-faehiger PDF-Satz mit deutscher Typografie |
| Inkscape | 1.4.4 | Konvertierung und Kontrolle von SVG-Vektorgrafiken |
| SumatraPDF | 3.6.1 | Automatisch aktualisierende Vorschau der erzeugten PDF-Datei |

Obsidian ist als ergaenzende Arbeitsoberflaeche fuer verlinkte
Markdown-Wissensbestaende lokal vorhanden. Seine konkrete Version wurde bei
der Einrichtung dieser PDF-Werkzeugkette nicht erfasst.

MiKTeX und seine LuaLaTeX-Komponente koennen unterschiedliche
Versionsnummern ausweisen, weil die Distribution und die enthaltene
TeX-Engine getrennt versioniert werden.

LibreOffice war auf dem verwendeten Rechner bereits vorhanden. Es ist keine
Voraussetzung fuer die Werkzeugkette, kann aber fuer manuelle Kontrollen oder
den Austausch mit Office-Anwendungen genutzt werden.

## Ressourcenentscheidung

Markdown bleibt die fuehrende redaktionelle Quelle. Dadurch koennen Inhalte
leicht gelesen, in Git versioniert und in Wissenssystemen wie Obsidian
weiterverwendet werden.

Wenn ein Projekt Obsidian einsetzt, dient es nicht als proprietaerer
Datenspeicher, sondern als menschenfreundliche Arbeitsoberflaeche fuer einen
aus Markdown-Dateien bestehenden Wissensbestand. Graph View, Links,
Rueckverweise und Suche koennen Quellen, Begriffe, Analysen und spaetere
Dokumentteile als zusammenhaengende Wissensstruktur erschliessen. Der
optionale Prozess ist unter
[`Nutzung von Obsidian`](../Processes/NutzungObsidian.md) beschrieben.

LaTeX dient ausschliesslich als reproduzierbare Layout- und Satzschicht. Das
PDF ist das stabile Ausgabeformat fuer Versand und Veroeffentlichung. Eine
ODT- oder DOCX-Datei kann bei Bedarf zusaetzlich erzeugt werden, soll aber
nicht parallel als zweite fuehrende Quelle gepflegt werden.

## Empfohlener Arbeitsablauf

1. Text und Metadaten in einer Markdown-Datei pflegen.
2. Abbildungen im SVG-Format als editierbare Vektorquelle aufbewahren.
3. SVG-Abbildungen mit Inkscape in PDF konvertieren.
4. Markdown mit Pandoc und LuaLaTeX als A4-PDF setzen.
5. Das PDF waehrend der Bearbeitung in SumatraPDF geoeffnet lassen; nach
   jedem neuen Build wird die Anzeige automatisch aktualisiert.
6. Das erzeugte PDF seitenweise rendern und visuell auf Umlaute,
   Seitenumbrueche, Abbildungsqualitaet und Quellenhinweise pruefen.
7. Nur das gepruefte PDF als Veroeffentlichungsfassung weitergeben.

## Beispielbefehle

SVG als Vektor-PDF ausgeben:

```powershell
inkscape.exe abbildung.svg --export-type=pdf --export-filename=abbildung.pdf
```

Markdown als A4-PDF setzen:

```powershell
pandoc.exe dokument.md `
  --from=markdown `
  --pdf-engine=lualatex `
  --pdf-engine-opt=--enable-installer `
  -V papersize=a4 `
  -V geometry:margin=24mm `
  -o dokument.pdf
```

Die Option `--enable-installer` erlaubt MiKTeX, beim ersten Lauf fehlende
LaTeX-Pakete nachzuladen. Fuer wiederkehrende Dokumente empfiehlt sich
spaeter eine eigene Pandoc- beziehungsweise LaTeX-Vorlage fuer Typografie,
Farben, Kopf- und Fusszeilen sowie Quellenformatierung.

## Installationspfade unter Windows

Die getestete Installation verwendet folgende Einstiegspunkte:

```text
C:\ProgramData\chocolatey\bin\pandoc.exe
C:\ProgramData\chocolatey\bin\inkscape.exe
C:\Program Files\MiKTeX\miktex\bin\x64\lualatex.exe
C:\Program Files\SumatraPDF\SumatraPDF.exe
```

Nach einer Neuinstallation kann ein bereits geoeffnetes Terminal noch den
alten `PATH` verwenden. In diesem Fall genuegt ein neues Terminal oder ein
Neustart der verwendeten Entwicklungsumgebung.

## Dokumentation

Offizielle Einstiegspunkte:

- [Obsidian Help](https://help.obsidian.md/)
- [Pandoc User's Guide](https://pandoc.org/MANUAL.html)
- [MiKTeX Documentation](https://docs.miktex.org/)
- [LuaTeX](https://www.luatex.org/)
- [Inkscape Documentation](https://inkscape.org/learn/)
- [SumatraPDF Documentation](https://www.sumatrapdfreader.org/docs/SumatraPDF-documentation)

## Abgrenzung

Die Werkzeugkette garantiert eine reproduzierbare technische Ausgabe, aber
nicht automatisch ein gutes Dokumentdesign. Satzvorlage, Quellenapparat,
Barrierefreiheit und visuelle Qualitaetspruefung bleiben eigenstaendige
redaktionelle Aufgaben.
