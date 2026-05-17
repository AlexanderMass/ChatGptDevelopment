# Epic: Dashboard-Entwicklung

Epic-Nummer: 2

## Ziel

Dieses Epic dokumentiert die operative Entwicklung des Dashboards.

Ziel war es, aus den Analyse- und Designentscheidungen eine lauffähige lokale Webapplikation zu bauen, die Projekte administriert, Git-Daten analysiert und Check-in-Metriken tabellarisch sowie grafisch präsentiert.

## Scope

Zum Epic gehören:

- Aufbau der Dashboard-Oberfläche
- Projektadministration mit Dialog
- Repository-Zuordnung
- Node.js-REST-Server
- MySQL-Anbindung
- Git-Datenanalyse
- Check-in-Metrik-Tabelle
- erste grafische Metrikdarstellung mit ECharts
- Serverlog- und Serverstatus-Diagnostik

Nicht zum Epic gehören:

- vollständiger produktiver Servicebetrieb als Windows-Service
- projektübergreifende Graphaggregationen
- komplexe Mindmap- oder Netzwerkvisualisierung
- vollständige Dokumentationssynchronisation

## Kontext

Die Dashboard-Entwicklung wurde als vertikaler Schnitt umgesetzt. Statt alle Funktionen vollständig vorab zu implementieren, wurden nacheinander lauffähige Durchstiche gebaut.

Dabei entstand ein lokaler Node.js-Server als REST-Schicht zwischen statischem Frontend, MySQL-Datenbank und Git-Dateisystemzugriffen.

## Stories

- [x] Story 2.1: Dashboard-Oberfläche entwickeln
- [x] Story 2.2: Projekt-Popup für Projektstammdaten und Repository-Zuordnung entwickeln
- [x] Story 2.3: Verschiedenes und Querschnittsfunktionen umsetzen

## Entscheidungen

- Caddy bleibt für statische Auslieferung zuständig.
- Node.js übernimmt dynamische REST-Services, MySQL-Zugriffe, Git-Auswertung und Logging.
- ECharts wird als Standard-Framework für Metrikdiagramme verwendet.
- Cytoscape.js wird als spätere Option für modellgetriebene Graphen, Mindmaps und Use-Case-Netze vorgemerkt, aber nicht installiert.
- Check-in-Metriken werden beim Analysieren auf den Projektscope begrenzt.
- Die tabellarische und grafische Sicht nutzen projektbezogene Metrikdaten.
- Arbeitsfreie Zeiträume werden im Line-Chart nicht als Nullpunkte eingefügt.

## Backlog Und Fortschritt

### Fortschritt Nach Commits

- `20a5bc7` Story 2.1: Initiale Vue-Workspace-Shell aufgebaut.
- `7944243` Story 2.1: Dashboard-Applikationsshell ergänzt.
- `d88c91d` Story 2.1: App-Shell, Analysebereich und Dashboard-Module getrennt.
- `84b4b8a` Story 2.2 / Story 2.3: Node-Projekt-API und MySQL-Anbindung integriert.
- `2b99096` Story 2.2: Projekt-Dialog-Layout nachgeschärft.
- `63ac194` Story 2.3: Serverlog-Diagnostik ergänzt.
- `460bd1f` Story 2.1 / Story 2.2 / Story 2.3: Dashboard-Projektworkflows implementiert.
- `02503ba` Story 2.1: Präsentationspanes vorbereitet.
- `2e145a8` Story 2.1 / Story 2.3: Dashboard-Metrikpräsentation angebunden.

### Fachlicher Fortschritt

- Erledigt: Das Dashboard wurde als eigene View-Struktur aus dem Analysebereich herausgelöst.
- Erledigt: Die Projektadministration wurde als obere Dashboard-Bubble umgesetzt.
- Erledigt: Die Projekttabelle lädt echte Projektdaten aus der Datenbank.
- Erledigt: Die Projekttabelle unterstützt selektierte Zeilen, Kontextmenü und Tooltip mit Repository-Daten.
- Erledigt: Die Projektdatenpräsentation wurde als untere Dashboard-Bubble mit Karteikartenreitern aufgebaut.
- Erledigt: Die tabellarische Sicht lädt echte Check-in-Metriken des ausgewählten Projekts.
- Erledigt: Die tabellarische Sicht enthält Projekt-Combobox, Repository-Filter und optionale Uhrzeitanzeige.
- Erledigt: Die grafische Sicht zeigt erste ECharts-Line-Charts für Check-in-Count, Files, Net Line Change und Sourcecode-Wachstum.
- Erledigt: Arbeitsfreie Zeiträume werden im Line-Chart nicht als künstliche Nullpunkte eingefügt.
- Erledigt: Das Dashboard wurde auf fensterorientiertes Scrollverhalten mit internen Tabellen-Scrollbars umgestellt.
- Erledigt: Der Projekt-Popup-Dialog unterstützt Projektanlage und Projektadministration.
- Erledigt: Projektname, Beschreibung, Projektstart und Projektende wurden im Popup administrierbar beziehungsweise konfigurierbar gemacht.
- Erledigt: Die Repository-Zuordnung wurde als Zwei-Listen-Auswahl mit Doppelklick und Verschiebe-Buttons umgesetzt.
- Erledigt: Beim Entfernen von Repositories erscheint eine Messagebox als Warnung.
- Erledigt: Projektstammdaten und Repository-Zuordnungen werden über REST-Services in MySQL gespeichert.
- Erledigt: Git-Datenanalyse wurde als REST-Service umgesetzt und erzeugt Check-in-Metriken.
- Erledigt: Die Git-Datenanalyse wurde auf den fachlichen Projektscope begrenzt.
- Erledigt: Serverstatus und Serverlog-Diagnostik wurden ergänzt.
- Erledigt: Die grafische Metrikdarstellung wurde um einen Tooltip erweitert, der pro Messpunkt die zugrunde liegenden Check-ins der jeweiligen Zeitgruppe anzeigt.
- Idee: Die grafische Metrikdarstellung könnte später weiter zu einem Git-Viewer erweitert werden. Beim Hover auf einen Commit könnten die geänderten Dateien erscheinen. Optional könnte ein weiterer Drill-down die konkreten Dateiänderungen beziehungsweise Diffs sichtbar machen. Dadurch entstünde eine stärker explorative Sicht auf Git-Repositories innerhalb des Dashboards.
- Offen: Projektübergreifende Graphauswertungen könnten später ergänzt werden.
- Offen: Node.js könnte später als Windows-Service über NSSM eingerichtet werden.
- Offen: Bundlegröße der Graphbibliothek kann bei Bedarf optimiert werden.
- Beobachtung: Die Anwendung wurde bereits praktisch genutzt, um ein externes GitHub-Projekt lokal einzubinden und dessen Entwicklungshistorie zu interpretieren.
