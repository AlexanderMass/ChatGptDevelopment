# Epic: Analyse

Epic-Nummer: 1

## Ziel

Dieses Epic dokumentiert die analytische Vorarbeit des Projekts `ChatGptDevelopment`.

Ziel war es, aus einer zunächst offenen Projektidee ein fachliches Modell, ein Datenmodell, Use Cases und wiederverwendbare Designobjekte abzuleiten. Die Analyse sollte nicht nur dieses Projekt strukturieren, sondern zugleich ein Vorgehensmuster für spätere KI-gestützte Projekte erproben.

## Scope

Zum Epic gehören:

- Klärung des Projektscopes
- Use-Case-Modellierung
- Datenbankmodellierung
- Oberflächen- und Designobjektbeschreibung
- methodische Reflexion der Zusammenarbeit mit KI
- Aufbau erster Kontextdateien

Nicht zum Epic gehören:

- operative Implementierung des Dashboards
- Node.js-Serverimplementierung
- konkrete Datenbankzugriffe
- grafische Metrikdarstellungen im Dashboard

## Kontext

Die Analyse wurde bewusst modellgetrieben durchgeführt. UML-nahe Use-Case-Diagramme, Klassendiagramme und textuelle Dokumentation dienten als Denk- und Kommunikationswerkzeuge.

Die Analyse war dabei kein vollständiges Pflichtenheft. Sie bildete ein Orientierungsmodell, das während der Umsetzung durch konkrete Prompts, Reviews und Nachschärfungen ergänzt wurde.

## Stories

- [x] Story 1.1: Use Cases analysieren und dokumentieren
- [x] Story 1.2: Designobjekte herausarbeiten und dokumentieren
- [x] Story 1.3: Datenmodellierung und SQL-Schema ableiten
- [x] Story 1.4: Verschiedenes und Querschnittliches

## Entscheidungen

- Die Anwendung wird bewusst datenbankbasiert umgesetzt, obwohl JSON-Dateien technisch einfacher gewesen wären. Der Datenbankansatz dient als Lern- und Methodenziel.
- `chat_gpt_project` ist die fachliche Wurzel des Datenmodells.
- `git_repository` wird projektbezogen modelliert, nicht als global normalisierte Repository-Entität.
- `check_in_metric` speichert nur stabile, direkt aus Git ableitbare Metriken.
- Aggregationen werden nicht dauerhaft gespeichert, sondern aus Metrikdaten berechnet.
- Projektbezogene Löschlogik wird über `ON DELETE CASCADE` modelliert.
- Analysemodelle dienen als Orientierung, nicht als vollständige Übergabespezifikation.

## Backlog Und Fortschritt

### Fortschritt Nach Commits

- `555bcbe` Story 1.1: Projektkontext initialisiert.
- `489f475` Story 1.1: Web-Dashboard-Scope vereinfacht und Analyse als Hauptbereich stabilisiert.
- `2f292aa` Story 1.1: Methodenkontext und Use-Case-Navigation ergänzt.
- `39d8d01` Story 1.3: Modellierung und Datenbankschema abgeschlossen.
- `35e7206` Story 1.1 / Story 1.2: Use Cases und Layout-Scrolling weiter detailliert.
- `d3723d0` Story 1.2: Projektanalyse und Präsentationsdesign detailliert.
- `b0f5067` Story 1.2: Analyse der graphischen Präsentation abgeschlossen.
- `fca3da0` Story 1.2: Tabelleninteraktion für Projektadministration fachlich dokumentiert.
- `02503ba` Story 1.2: Dashboard-Präsentationspanes vorbereitet und Visualisierungsentscheidung dokumentiert.

### Fachlicher Fortschritt

- Erledigt: Der Projektumfang wurde von einer zunächst offenen Idee auf ein kleines Dashboard mit Analyse- und Modellierungsbereich stabilisiert.
- Erledigt: Die Use-Case-Struktur wurde aufgebaut: `Dashboard nutzen`, `Projekte pflegen`, `Neue Projekte anlegen`, `Projekte administrieren`, `Git-Daten analysieren`, `Projektdaten präsentieren`, `Präsentation in Tabellenform` und `Präsentation in grafischer Form`.
- Erledigt: Die Include-Struktur der Use Cases wurde grafisch dargestellt und mit der linken Navigation verknüpft.
- Erledigt: Die Use-Case-Dokumentationsseiten wurden angelegt und schrittweise mit Funktions- und Oberflächenbeschreibungen gefüllt.
- Erledigt: Wiederverwendbare Designobjekte wurden aus den Use Cases herausfaktorisiert: Dashboard, Projektpflege-Panel, Projektpräsentations-Panel und Projekt-Dialog.
- Erledigt: Der Projekt-Dialog wurde fachlich für `Neue Projekte anlegen` und `Projekte administrieren` konfiguriert.
- Erledigt: Das Projektpräsentations-Panel wurde als Tab-Pane mit tabellarischer und grafischer Sicht modelliert.
- Erledigt: Das Datenmodell wurde auf drei projektzentrierte Tabellen reduziert: `chat_gpt_project`, `git_repository` und `check_in_metric`.
- Erledigt: Repository-Instanzen wurden bewusst projektbezogen modelliert, statt als global normalisierte Repository-Entitäten.
- Erledigt: Das SQL-Schema wurde mit Foreign Keys, Kaskadenlogik und Check-in-Metrik-Attributen dokumentiert.
- Erledigt: Die Entscheidung gegen dauerhaft gespeicherte Aggregationstabellen wurde getroffen; Aggregationen sollen aus `check_in_metric` berechnet werden.
- Erledigt: Die Projektarbeit wurde nachträglich in Epic-Dateien strukturiert, um Analyse, Dashboard-Entwicklung, ProjectBaseWork und Development Cockpit als fachliche Arbeitsachsen sichtbar zu machen.
- Offen: Der implementierte Ist-Stand sollte zum Projektabschluss noch mit der Analyse-Dokumentation abgeglichen werden.
- Beobachtung: KI-Pairing reduziert den Übergabeaufwand zwischen Analyse und Entwicklung, erzeugt aber Bedarf an bewusster Dokumentationssynchronisation.

