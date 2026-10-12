# Nutzung von Obsidian

## Zweck

Diese Prozessdatei ist ein wiederverwendbarer Eintrag im Faehigkeitskatalog
von ChatGptBase. Sie beschreibt, wie ein Projekt Obsidian fuer
Markdown-Dokumentation, Wissensnavigation und optional als LLM-Wiki einsetzen
kann.

Die Aufnahme dieses Prozesses bedeutet nicht, dass ChatGptBase selbst ein
Obsidian-Vault oder OKF-Bundle ist. Bestehende Prozess- und Ressourcendateien
muessen weder verschoben noch mit OKF-Metadaten versehen werden. Erst das
jeweilige Zielprojekt entscheidet, ob und in welchem Umfang es dieses Muster
uebernimmt.

Obsidian arbeitet auf normalen Markdown-Dateien. Der Wissensbestand bleibt
deshalb auch ohne Obsidian fuer Menschen, LLMs und andere Werkzeuge lesbar.
Bereits als einfache Dokumentationsoberflaeche bietet Obsidian Suche, Links,
Rueckverweise und Graph View.

Fuer umfangreiche Wissensprojekte kann die Nutzung um zwei sich ergaenzende
Ansaetze erweitert werden:

- Andrej Karpathys LLM-Wiki beschreibt das Arbeitsmodell fuer die laufende
  Verdichtung und Pflege von Wissen durch ein LLM.
- Das Open Knowledge Format, kurz OKF, beschreibt eine portable technische
  Grundkonvention fuer Markdown-Wissensbestaende und ihre Metadaten.

In dieser erweiterten Variante ist Obsidian die Wissens-IDE fuer den Menschen:
Es macht Links, Rueckverweise, Suchergebnisse und den Wissensgraphen sichtbar.
Das LLM
unterstuetzt als Redakteur, der neue Quellen einordnet, vorhandene Seiten
aktualisiert und die Konsistenz des Wissensbestands prueft.

## Referenzquellen

### Karpathy: LLM Wiki

- Titel: `LLM Wiki - A pattern for building personal knowledge bases using LLMs`
- Autor: Andrej Karpathy
- URL: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

### Google Cloud Platform: Open Knowledge Format

- Titel: `Open Knowledge Format (OKF)`, Spezifikation Version 0.2
- Herausgeber: GoogleCloudPlatform, Repository `knowledge-catalog`
- URL: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

## Optionales LLM-Wiki-Grundmodell

Wenn ein Projekt Obsidian als LLM-Wiki einsetzen moechte, besteht dieses
Arbeitsmodell aus drei logisch getrennten Schichten:

1. **Rohquellen:** unveraenderte Dokumente, Daten und externe Referenzen;
2. **Wiki:** kuratierte, verlinkte Markdown-Seiten mit dem stabilisierten
   Wissensstand;
3. **Schema:** Regeln fuer Struktur, Metadaten, Quellenbezug, Benennung und
   Pflege des Wikis.

Projekt- und Agentenkontext, technische Austauschdaten und
Oberflaechenzustaende gehoeren nicht automatisch in den fachlichen Vault. Sie
sollten getrennt abgelegt werden, damit der Wissensgraph fachlich lesbar
bleibt.

## Arbeitsablaeufe eines LLM-Wikis

### Ingest

Eine neue Quelle wird nicht nur gespeichert oder indexiert. Sie wird gelesen,
inhaltlich bewertet und in den bestehenden Wissensbestand eingeordnet.

1. Quelle unveraendert sichern oder stabil referenzieren.
2. Herkunft, Datum und Dokumenttyp erfassen.
3. Relevante Aussagen, Begriffe und offene Fragen extrahieren.
4. Bestehende Wiki-Seiten aktualisieren oder neue Seiten anlegen.
5. Aussagen mit den verwendeten Quellen verbinden.
6. Indizes und Aenderungsprotokoll aktualisieren.
7. Das Eingangsdokument als eingearbeitet kennzeichnen oder archivieren.

### Query

Fragen werden zuerst gegen den kuratierten Wissensbestand beantwortet. Neue
Synthesen, die ueber die einzelne Antwort hinaus nuetzlich bleiben, koennen
nach Pruefung als eigene Wiki-Seite zurueckgeschrieben werden.

### Lint

Der Vault wird regelmaessig auf Widersprueche, veraltete Aussagen, fehlende
Quellen, ungueltige Links, verwaiste Seiten, Redundanzen und Wissensluecken
geprueft. Die technische Fehlerfreiheit ersetzt dabei keine fachliche
Pruefung.

## Optionale OKF-Grundkonventionen

Entscheidet sich ein Projekt fuer eine OKF-Orientierung, verwendet der
Wissensbestand UTF-8-Markdown mit
YAML-Frontmatter. Regulaere Wissensseiten besitzen mindestens ein nicht
leeres Feld `type`.

Weitere sinnvolle Metadaten sind:

- `title` und `description` fuer die menschenlesbare Einordnung;
- `sources` fuer Herkunft und stabile Quellenkennungen;
- `generated` fuer Erzeuger und Zeitpunkt der Bearbeitung;
- `verified` fuer getrennt dokumentierte Pruefungen;
- `status` mit beispielsweise `draft`, `stable` oder `deprecated`;
- `stale_after` fuer zeitkritische Inhalte;
- `tags` fuer themenuebergreifende Sichten.

Einzelne Aussagen koennen ueber Markdown-Fussnoten mit stabilen
Quellenkennungen verbunden werden. Normale Markdown-Links bilden die
gerichteten Beziehungen des Wissensgraphen.

OKF schreibt keine fachliche Taxonomie und keine konkrete Ordnerstruktur vor.
Verzeichnisse fuer Quellen, Themen, Entitaeten, Konzepte, Analysen oder
Zeitlinien sind moegliche projektspezifische Auspraegungen, aber kein
verpflichtender Bestandteil des Standards.

## Navigation in Obsidian

- Ein Wurzelindex beschreibt Zweck, Einstiegspunkte und Hauptbereiche.
- Verzeichnisindizes erschliessen ihre Inhalte mit Link und Kurzbeschreibung.
- Ein `log.md` dokumentiert Ingests, Wartung und wesentliche Aenderungen.
- Der Graph View dient als Navigations- und Diagnosewerkzeug, nicht als Ersatz
  fuer eine nachvollziehbare Hierarchie.
- Eindeutige Namen fuer Verzeichnisindizes koennen sinnvoll sein, wenn
  gleichnamige `index.md`-Knoten den Graph View unleserlich machen. Diese
  lokale Anpassung ist dann im Schema festzuhalten.

## Moegliche Verzeichnislogik eines LLM-Wikis

Eine moegliche Ausgangsstruktur lautet:

```text
Vault/
  Inbox/
    Neu/
    Eingearbeitet/
    Geparkt/
  Sources/
  Topics/
  Entities/
  Concepts/
  Analyses/
  Timelines/
  Assets/
```

Die Inbox ist eine Arbeitszone und noch kein dauerhaft kuratierter
Wissensbereich. Neue Dokumente duerfen dort diskutiert, ergaenzt und
aufgeteilt werden. Erst nach der inhaltlichen Verarbeitung werden stabile
Erkenntnisse in die fachlich passenden Wiki-Seiten integriert.

## Zusammenarbeit von Mensch und LLM

Der Mensch entscheidet ueber Ziel, fachliche Bedeutung, strittige
Interpretationen und Freigabe. Das LLM uebernimmt die Strukturierung,
Quellenpflege, Querverweise, Konsistenzpruefung und Fortschreibung. Unsichere
Aussagen werden als Hypothese oder offener Punkt gekennzeichnet und nicht
stillschweigend zu Fakten verdichtet.

Bei mehreren Agenten sollten Arbeitsrollen getrennt werden. Beispielsweise
kann ein Agent Eingangsdokumente oder Daten erzeugen, waehrend ein
redaktioneller Agent deren Qualitaet prueft und die freigegebenen Erkenntnisse
in den Vault integriert.

## Git und Obsidian-Konfiguration

Der Markdown-Wissensbestand sollte mit Git versioniert werden. Dadurch bleiben
Aenderungen, Quellenkorrekturen und strukturelle Umbauten nachvollziehbar.

Die `.obsidian`-Konfiguration enthaelt teilweise rein persoenliche
Navigations- und Oberflaechenzustaende. Solche Dateien sollten grundsaetzlich
ignoriert werden. Nur bewusst gemeinsam genutzte Konfigurationen, Vorlagen
oder Erweiterungseinstellungen sollten nach einer eigenen Entscheidung in Git
aufgenommen werden.

## Verbindung zur Dokumenterstellung

Das Wiki ist breiter als das spaetere Dokument. Es darf Hintergrundwissen,
alternative Hypothesen, verworfene Deutungen und methodische Details
enthalten. Fuer einen Bericht werden daraus nur die benoetigten, belegten und
redaktionell freigegebenen Teile zu einer linearen Argumentation verdichtet.

Die technische Ausgabe von Markdown zu einem veroeffentlichbaren PDF ist in
der Ressource [`Dokumentationstools`](../Ressources/Dokumentationstools.md)
beschrieben.

## Abgrenzung

Obsidian, Karpathys LLM-Wiki-Ansatz und OKF erfuellen unterschiedliche Rollen:

- Obsidian ist die menschliche Arbeits- und Navigationsoberflaeche.
- Karpathys Ansatz beschreibt den Pflegeprozess des persistenten Wissens.
- OKF liefert die portablen technischen Grundkonventionen fuer Wissensobjekte,
  Metadaten und Quellenbezug.

Das konkrete Schema muss fuer jedes Projekt fachlich ausgestaltet und bei
Aenderungen dokumentiert werden. Fuer eine einfache Obsidian-Nutzung sind
weder ein LLM-Wiki noch OKF-Metadaten oder diese Verzeichnisstruktur
erforderlich.
