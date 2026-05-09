# ReportContext

## Ausgangspunkt

Die urspruengliche Idee eines zentralen, weitgehend automatisierten Reportings fuer ChatGPT-gestuetzte Entwicklungsarbeit wurde als wahrscheinlich zu gross und zu frueh eingeschaetzt.

Stattdessen soll zunaechst eine kleine, bewusst ausgeloeste Reporting-Loesung entstehen. Sie soll praktisch nutzbar sein, ohne sofort eine API, Datenbankintegration oder vollstaendige Telemetrie vorauszusetzen.

## Leitidee

Das Reporting soll als leichtgewichtiger Arbeitsreport funktionieren. Der Mensch setzt wenige explizite Anker im Chat, zum Beispiel:

- `Arbeitstag beginnt`
- `Bitte notiere das im Arbeitsreport`
- `Bitte erstelle den Git-Arbeitsreport`
- `Arbeitstag abschliessen`

Die KI nutzt diese Anker, um einen lokalen Report zu pflegen. Der Report kann zunaechst als JSON-Datei entstehen und spaeter bei Bedarf in Datenbankstrukturen ueberfuehrt werden.

## Kein vollstaendiges Chat-Tracking

Der Report soll nicht versuchen, den gesamten Chat vollstaendig zu speichern oder die interne KI-Arbeit zu rekonstruieren.

Stattdessen soll er die wesentlichen beobachtbaren und spaeter auswertbaren Punkte festhalten:

- Start eines Arbeitstags
- zentrale Entscheidungen oder Notizen
- relevante Git-Commits
- geaenderte Dateien
- Insertions und Deletions
- grobe Zusammenfassung des Arbeitstags
- offene Fragen oder naechste Schritte

Damit entsteht kein vollstaendiges Protokoll, sondern ein strukturierter Lesefaden durch die Arbeit.

## Arbeitstag als Reporting-Einheit

Die erste sinnvolle Reporting-Einheit ist der `Arbeitstag`.

Beim Start des Arbeitstags sollte ein kleiner Zustand gespeichert werden:

- Projektname
- Startzeitpunkt
- aktueller Git-HEAD
- optional aktueller Branch
- Status `open`

Der gespeicherte Git-HEAD ist besonders wichtig. Er erlaubt am Ende eine robuste Git-Auswertung mit einem Bereich wie:

`git log <start_head>..HEAD`

Damit muss der Report nicht allein auf Zeitstempel vertrauen. Er kann exakt bestimmen, welche Commits seit Beginn des Arbeitstags entstanden sind.

## Anker statt Pflicht-Tagesreport

Der Startanker muss nicht bedeuten, dass ein Report zwingend am selben Tag erstellt wird. Er markiert primaer einen stabilen Auswertungsbeginn.

Wenn Startzeitpunkt und Git-HEAD gespeichert sind, kann die eigentliche Analyse auch spaeter erfolgen. Dadurch sind unterschiedliche Auswertungsintervalle moeglich:

- einzelner Arbeitstag
- mehrere Arbeitstage
- Arbeitswoche
- Projektphase
- Zeitraum zwischen zwei expliziten Ankern
- Zeitraum von einem gespeicherten Start-HEAD bis zu einem spaeteren Git-HEAD

Das Reporting muss also nicht als taegliche Pflicht verstanden werden. Es kann nachtraeglich ueber gespeicherte Anker und Git-Schluessel rekonstruiert werden.

Fachlich verschiebt sich der Fokus damit von `taeglicher Bericht` zu `auswertbarer Arbeitsabschnitt`. Der Arbeitstag bleibt ein naheliegender Spezialfall, ist aber nicht die einzige moegliche Reporteinheit.

## Git-Arbeitsreport

Der Git-Arbeitsreport ist der erste konkrete und robuste Metrik-Kandidat.

Er soll fuer einen Arbeitstag insbesondere erfassen:

- Anzahl Commits
- Commit-Hash
- Commit-Zeitpunkt
- Commit-Message
- Anzahl geaenderter Dateien
- Anzahl neu hinzugefuegter Dateien
- Anzahl geloeschter Dateien
- Insertions
- Deletions
- Netto-Zeilenaenderung

Die Git-Metriken sind gut geeignet, weil sie objektiv aus dem Repository rekonstruiert werden koennen. Sie muessen aber vorsichtig interpretiert werden. Mehr Codezeilen bedeuten nicht automatisch mehr Produktivitaet.

Generierte Artefakte, Build-Ausgaben, Abhaengigkeiten und andere technische Nebenprodukte sollten spaeter getrennt betrachtet oder ausgeschlossen werden koennen.

## JSON als temporaeres Format

Als erste technische Form bietet sich ein JSON-File an.

Moegliche Ablage:

`ChatGptContext/Reports/YYYY-MM-DD.json`

Alternativ kann fuer aktive Arbeitstage zunaechst eine einzelne Arbeitsdatei verwendet werden:

`ChatGptContext/Reports/CurrentWorkday.json`

Das JSON-Format soll bewusst klein bleiben. Es soll maschinenlesbar sein, aber nicht den Eindruck erwecken, bereits ein endgueltiges Datenbankschema zu sein.

## Zentrale Sicht ueber mehrere Projekte

Das Reporting soll nicht nur fuer ein einzelnes Projekt nuetzlich sein. Der Nutzer arbeitet mit mehreren ChatGPT- bzw. Codex-Projekten, zum Beispiel `HaushaltBonn` und `ChatGptDevelopment`.

Die lokalen Reportdateien sollen daher so gestaltet werden, dass sie spaeter zentral gesammelt, gelesen und verglichen werden koennen. Ein einzelnes Projekt kann seine Reports lokal im jeweiligen `ChatGptContext` fuehren, aber eine zentrale Auswertung kann diese Dateien projektuebergreifend importieren.

Moegliche spaetere Ziele einer zentralen Sicht sind:

- Uebersicht ueber Arbeitsaktivitaet in mehreren Projekten
- Wochen- oder Monatsauswertungen ueber alle ChatGPT-gestuetzten Arbeiten
- Vergleich von Projekten nach Commits, Datei-Aenderungen oder LOC-Metriken
- Erkennen von Arbeitsschwerpunkten und Projektphasen
- Grundlage fuer einfache Produktivitaets- oder Unterstuetzungsmetriken

Damit das moeglich bleibt, sollten Reportdateien mindestens stabile Projektinformationen enthalten:

- Projektname
- Projektpfad
- Git-Repository-Pfad
- optional Remote-URL
- Zeitraum oder Ankerbereich des Reports
- eindeutige Report-ID oder Dateiname

Die zentrale Sicht muss nicht sofort gebaut werden. Sie sollte aber beim Format mitgedacht werden, damit lokale Reports spaeter ohne groessere Migration gemeinsam analysierbar sind.

## Zentrales Reporting-Verzeichnis

Als einfache zentrale Loesung kann ein gemeinsames Reporting-Verzeichnis definiert werden. Dieses Verzeichnis ist keine komplexe Anwendung, sondern zunaechst nur ein zentraler Ablageort fuer Reportdateien aus mehreren Projekten.

Moegliche Struktur:

`<CentralReportingRoot>/`

`<CentralReportingRoot>/ChatGptDevelopment/`

`<CentralReportingRoot>/HaushaltBonn/`

`<CentralReportingRoot>/<WeitereProjekte>/`

Jedes Projekt erhaelt dort ein eigenes Unterverzeichnis. Die Reports koennen entweder direkt dort erzeugt oder aus dem lokalen Projektkontext dorthin kopiert werden.

Diese Struktur haette mehrere Vorteile:

- ein zentraler Ort fuer projektuebergreifende Auswertung
- einfache Sicherung und Versionierung der Reports
- klare Trennung der Projekte durch Unterverzeichnisse
- spaeter leicht durch Skripte, Datenbankimporte oder Webansichten auswertbar

Die genaue Lage des zentralen Verzeichnisses ist noch offen. Wichtig ist zunaechst nur, dass der Pfad explizit festgelegt wird und jedes Projekt seinen eigenen Report-Unterordner bekommt.

## Zentrales Reporting-Projekt

Eine naheliegende Weiterentwicklung ist ein eigenes ChatGPT- bzw. Codex-Projekt, das nur als zentrales Reporting-Repository dient.

Dieses zentrale Projekt haette eine andere Rolle als die normalen Arbeitsprojekte:

- Arbeitsprojekte wie `HaushaltBonn` oder `ChatGptDevelopment` erzeugen Reports.
- Das zentrale Reporting-Projekt sammelt diese Reports.
- Dort koennen gemeinsame Analyseregeln dokumentiert werden.
- Dort koennen Skripte, Auswertungen oder spaetere Webansichten zur projektuebergreifenden Analyse entstehen.

Damit wird die Reporting-Logik zweistufig:

- lokal in jedem Arbeitsprojekt: Anker setzen, Git-Daten sammeln, Projektreport erzeugen
- zentral im Reporting-Projekt: Reports zusammenfuehren, vergleichen, auswerten und verdichten

Das zentrale Reporting-Projekt kann selbst wieder einen `ChatGptContext` besitzen. Dort waeren dann nicht die fachlichen Kontexte eines einzelnen Softwareprojekts dokumentiert, sondern die Regeln fuer Import, Validierung, Aggregation und Analyse der Reportdateien.

Moegliche Inhalte des zentralen Reporting-Projekts:

- zentrale Reportablage mit Unterordnern pro Projekt
- gemeinsame JSON-Schemata oder Templates
- Regeln zur Berechnung von Wochen- oder Monatsmetriken
- Ausschlussregeln fuer generierte Dateien und Build-Artefakte
- Skripte fuer Git-/Report-Auswertung
- spaetere Visualisierung oder Datenbankueberfuehrung

Diese Struktur erlaubt, klein zu beginnen und trotzdem eine klare Richtung fuer spaetere zentrale Auswertungen zu behalten.

## Portables Vorgehensmodell

Der `ReportContext` soll zugleich als portables Vorgehensmodell dienen. Die Datei kann in andere ChatGPT- bzw. Codex-Projekte kopiert werden, sofern dort ebenfalls ein Kontextordner existiert.

In jedem Projekt beschreibt der ReportContext dann dieselbe Arbeitsregel:

- Der Mensch setzt wenige explizite Reporting-Anker.
- Die KI pflegt lokale Reportdateien im Projekt.
- Git-Informationen werden aus dem jeweiligen lokalen Repository ausgelesen.
- Die Reports bleiben projektlokal nutzbar.
- Die Reports bleiben zugleich so strukturiert, dass sie spaeter zentral gesammelt und ausgewertet werden koennen.

Damit entsteht keine zentrale Pflicht-Infrastruktur am Anfang. Stattdessen wird ein gemeinsames Reporting-Vorgehen in mehreren Projekten wiederholt angewendet.

Ein neuer Projektchat kann angewiesen werden, den lokalen `ReportContext.md` zu lesen und Reporting-Aufgaben nach dieser Beschreibung auszufuehren. Auf diese Weise wird das Vorgehensmodell nicht nur in diesem Projekt dokumentiert, sondern auch auf andere Projekte uebertragbar.

## Moegliche Event-Typen

Eine erste kleine Menge von Event-Typen koennte ausreichen:

- `workday_started`
- `report_anchor_created`
- `note`
- `decision`
- `git_workday_summary`
- `workday_closed`

Diese Event-Typen sind bewusst einfach gehalten. Sie sollen zuerst helfen, Arbeitsverlaeufe brauchbar zu dokumentieren. Eine spaetere API oder Datenbank kann daraus abgeleitet werden.

## Beispiel: ChatGptDevelopment als erster Arbeitstag

Das Projekt `ChatGptDevelopment` eignet sich als erster Testfall, weil es am 08.05.2026 begonnen wurde und damit ein klar abgegrenzter erster Arbeitstag existiert.

Fuer diesen Tag koennte ein erster Git-Arbeitsreport erzeugt werden. Dabei waere zu pruefen:

- Welche Commits wurden am ersten Projekttag erstellt?
- Welche Dateien wurden neu angelegt?
- Wie viele Dateien wurden geaendert?
- Wie viele Insertions und Deletions sind entstanden?
- Welche Aenderungen gehoeren zu Kontext, Webaufbau, Deployment und Analyse?

Dieser Beispielreport kann helfen, das JSON-Format pragmatisch zu schaerfen.

## Offene Gestaltungsfragen

Fuer die naechste Ausarbeitung bleiben insbesondere folgende Fragen offen:

- Soll pro Arbeitstag genau eine JSON-Datei entstehen?
- Soll es zusaetzlich eine `CurrentWorkday.json` fuer den offenen Arbeitstag geben?
- Welche Dateien oder Pfade sollen bei LOC-Metriken ausgeschlossen werden?
- Sollen Dokumentation, Code, Konfiguration und Build-Artefakte getrennt ausgewertet werden?
- Soll der Report nur Git-Daten enthalten oder auch kurze Chat-Zusammenfassungen?
- Wann wird ein Report finalisiert und versioniert?

## Arbeitsprinzip

Das Reporting soll niedrigschwellig bleiben. Es soll die Arbeit nicht dominieren, sondern am Ende eines Arbeitstags helfen, zentrale Ergebnisse und Git-Metriken nachvollziehbar festzuhalten.

Die kleine Loesung ist bewusst anschlussfaehig an die groessere Projektidee. Wenn sich das Format bewaehrt, kann es spaeter in API-Endpunkte, Datenbanktabellen oder Webansichten ueberfuehrt werden.
