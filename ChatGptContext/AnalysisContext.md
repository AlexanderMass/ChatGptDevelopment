# AnalysisContext

## Zugehoeriger Arbeitsbereich

Dieser Kontext ist nicht an ein einzelnes technisches Verzeichnis gebunden. Er dokumentiert die fachliche Modellierung, die konzeptionellen Leitfragen und die spaetere Metriklogik des Gesamtprojekts.

## Ziel

Dieser Kontext sammelt die fachlichen Ueberlegungen, die fuer die Plattformstruktur, die projektuebergreifende Vergleichbarkeit und die Quantifizierung von Produktivitaet relevant sind.

## Aktuelle Leitidee

Das Projekt ist nicht als Datenbank fuer ein einzelnes Softwareprojekt gedacht, sondern als gemeinsame Analyseplattform fuer mehrere KI-gestuetzte Entwicklungsprojekte, zum Beispiel `HaushaltBonn` oder `ChatGptDevelopment`.

Ein einzelnes Projekt ist damit nicht die einzige Beobachtungseinheit. Wichtige fachliche Ebenen sind insbesondere:

- `Projekt`
- `Work Session` oder dokumentierter Arbeitstag
- `Interaktion` zwischen Mensch und KI
- `Entwicklungsereignis`
- `Git-Artefakt`
- `Metrik` oder aggregierte Auswertung

## API-Rolle auf der Metaebene

Die API wird fachlich als standardisierte Erfassungsschicht verstanden. Sie soll unterschiedlichen Projekten und spaeter moeglichen externen Clients eine einheitliche Moeglichkeit geben, KI-gestuetzte Entwicklungsprozesse in dieselbe Datenbasis einzuspeisen.

Damit ist die API nicht nur technischer Datenzugriff fuer das Webfrontend, sondern auch die operative Dokumentationsschnittstelle fuer Arbeitsprozesse.

## Work-Session-Gedanke

Ein zentraler fachlicher Kandidat ist die `Work Session` als dokumentierter Arbeitszusammenhang. Ein solcher Arbeitszusammenhang kann unter anderem enthalten:

- Start einer Sitzung
- Zuordnung zu einem Projekt
- Prompts und Antworten
- Entwicklungsereignisse wie Codegenerierung, Dateibearbeitung, Tests oder Builds
- Git-Ereignisse wie Commits, Branches, Diffs oder Pushes
- Abschluss der Sitzung mit Ergebnis, Dauer oder spaeteren Bewertungsdimensionen

## Metrikverstaendnis

Produktivitaet soll nicht vorschnell als einzelne Zahl modelliert werden. Stattdessen wird zwischen Rohereignissen und daraus abgeleiteten Interpretationen unterschieden.

Wichtige Metrikklassen koennen spaeter sein:

- Aktivitaetsmetriken
- Flussmetriken
- Ergebnismetriken
- KI-Nutzungsmetriken
- Kontextmetriken

## Antwortkontext

Als moegliche erste Implementierung wird ein `Antwortkontext` betrachtet. Er beschreibt nicht die verborgene interne Modellarbeit, sondern einen bewusst dokumentierten Verarbeitungsrahmen zwischen menschlichem Prompt und finaler KI-Antwort.

Zu Beginn muss dieser Kontext nicht alle Details qualifizieren. Eine minimale Version koennte bereits folgende Informationen erfassen:

- Bezug zu Projekt und Work Session
- Kurzbeschreibung des menschlichen Prompts
- Startzeitpunkt der Bearbeitung
- Endzeitpunkt der Bearbeitung
- Dauer der Bearbeitung
- Ergebnisstatus
- einfache Hinweise auf sichtbare Arbeit, zum Beispiel Tool-Aufrufe, Datei-Aenderungen oder Build-Laeufe

Die Verarbeitungszeit ist ein naheliegendes, aber nicht unproblematisches Mass. Sie kann durch Rueckfragen, Wartezeiten auf menschliche Antworten, externe Prozesse oder blockierte Tools verzerrt werden. Deshalb sollte sie nicht isoliert als Produktivitaetsmass interpretiert werden, sondern als beobachtbare Prozessspur.

Der Antwortkontext ist damit ein erster Kandidat fuer eine leichte, pragmatische Erfassungsschicht. Er erlaubt eine grobe Qualifikation dessen, was die KI in einem Antwortlauf sichtbar getan hat, ohne den Anspruch zu erheben, interne Denkprozesse vollstaendig abzubilden.

## Git als zweite Messspur

Neben dem Antwortkontext bildet Git eine zweite explizite Messspur. Waehrend der Antwortkontext den Interaktions- und Bearbeitungsprozess dokumentiert, liefert Git konkrete Entwicklungsartefakte.

Moegliche Git-nahe Metriken sind unter anderem:

- Anzahl Commits
- geaenderte Dateien
- hinzugefuegte und geloeschte Zeilen
- Diff-Groesse
- Commit-Zeitpunkte
- Branch- und Merge-Ereignisse
- Zusammenhang zwischen Work Session, Antwortkontext und Commit

Die Kombination beider Spuren ist fachlich zentral: Der Antwortkontext beschreibt den sichtbaren KI-Arbeitsprozess, Git beschreibt die resultierenden Code- und Artefaktaenderungen. Erst gemeinsam koennen beide Spuren produktivitaetsbezogene Aussagen stuetzen.

## Aktueller Fokus der Git-Metriken

Für den ersten Datenbankentwurf werden Git-Daten entlang einzelner Check-ins gedacht. Die Tabelle `check_in_metric` soll aus Git gelesene oder abgeleitete Einzelmetriken aufnehmen.

Ein generisches `metricPayload` wird zunächst bewusst nicht modelliert. Stattdessen werden nur stabile Kernmetriken als explizite Attribute vorgesehen. Weitere Details aus Git sollen erst ergänzt werden, wenn konkrete Auswertungsfragen entstehen.

`trackedFileCount` wird als Check-in-Metrik geführt. Dadurch wird pro Check-in historisiert, wie viele von Git verwaltete Dateien zu diesem Zeitpunkt existierten. Der aktuelle Wert eines Repositories kann später über den jeweils letzten Check-in ermittelt werden.

Repository-weite Kennzahlen wie `firstCheckInDate`, `lastCheckInDate` und `checkInCount` werden direkt auf `git_repository` geführt. Diese Werte beschreiben verdichtete Historienmerkmale des Repositories.

Aggregationen wie tägliche oder wöchentliche Auswertungen sollen zunächst nicht als fertig berechnete Werte gespeichert und auch nicht als eigene Mapping-Struktur modelliert werden. Sie werden aus `check_in_metric.commitDate` per SQL `GROUP BY` oder alternativ in Python gruppiert und berechnet.

## Komprimiertes Chat-Protokoll

Eine weitere zentrale Idee ist ein komprimiertes Chat-Protokoll. Es soll nicht zwingend den gesamten Chat in voller Laenge speichern, sondern die fachlich relevanten Bezugspunkte zwischen menschlicher Anforderung, KI-Antwort und Entwicklungsartefakten erhalten.

Moegliche Inhalte sind:

- menschlicher Prompt oder eine robuste Prompt-Zusammenfassung
- finale KI-Antwort oder eine Antwort-Zusammenfassung
- Bezug zu Work Session und Antwortkontext
- sichtbare Arbeitsschritte, soweit sie fuer die Rekonstruktion relevant sind
- Zuordnung zu Git-Commits, Datei-Aenderungen oder anderen Entwicklungsereignissen

Der Nutzen liegt besonders in der Korrelation mit Git-Daten. Ein Commit-Kommentar beschreibt oft nur knapp, was geaendert wurde. Das zugehoerige Chat-Protokoll kann rekonstruieren, warum die Aenderung entstanden ist, welcher Prompt sie ausgeloest hat und welche Entscheidungen oder Einschraenkungen im Dialog sichtbar waren.

## Automatisierung der Erfassung

Die spaetere API koennte dazu dienen, solche Prozessdaten aktiv waehrend der Arbeit zu erfassen. Die KI koennte relevante Ereignisse ueber API-Endpunkte melden, zum Beispiel:

- Work Session oeffnen oder schliessen
- Antwortkontext oeffnen oder schliessen
- Prompt- oder Antwortzusammenfassung speichern
- sichtbaren Arbeitsschritt protokollieren
- Git-Commit oder Datei-Aenderung zuordnen

Eine vollstaendige automatische Erfassung der internen Modellarbeit ist nicht realistisch. Sinnvoller ist eine Kombination aus aktiver Selbst-Dokumentation durch die KI, spaeteren Importen aus Chat- oder Projekt-Exporten und automatischer Git-Analyse.

## Codex-Projekte, Automatisierungen und Statusreports

Codex-Projekte und deren Automatisierungs- oder Statusreport-Funktionen koennen eine weitere wichtige Datenquelle werden. Sie sind vermutlich nicht dasselbe wie das fachliche Projektmodell der Datenbank, koennen aber als Arbeitscontainer und Ereignisquelle dienen.

Besonders interessant sind moegliche Statusreports, zum Beispiel:

- Git-Statusreport mit Branch, geaenderten Dateien, Staging-Zustand, Remote-Status oder letzten Commits
- Projektstatus mit Arbeitsordner, Kontext, offenen Aenderungen oder Aktivitaeten
- Automatisierungsstatus mit geplanten oder ausgefuehrten Aufgaben

Diese Reports koennten eine bereits verdichtete Beobachtungsebene bilden. Das Projekt sollte daher offen halten, solche Reports spaeter zu importieren und mit Work Sessions, Antwortkontexten, Chat-Protokollen und Git-Artefakten zu verknuepfen.

## Offene fachliche Fragen

Fuer die naechste Analysephase bleiben insbesondere folgende Fragen offen:

- Welche Daten liefert ein Codex-Projektstatusreport konkret und in welchem Format?
- Lassen sich Statusreports automatisch exportieren oder ueber eine API abfragen?
- Welche Teile des Chat-Protokolls muessen live erfasst werden und welche koennen spaeter importiert werden?
- Wie wird menschliche Wartezeit von KI-Verarbeitungszeit unterschieden?
- Wie werden Antwortkontext, Work Session und Git-Commit eindeutig miteinander verknuepft?
- Welche Metriken werden gespeichert und welche nur aus Rohdaten berechnet?

## Arbeitsprinzip

Dieser Kontext soll konzeptionelle Verdichtungen aufnehmen, nicht jede Diskussion im Wortlaut. Ziel ist eine knappe, aber belastbare fachliche Arbeitsgrundlage fuer API, Datenbank und Webdesign.
