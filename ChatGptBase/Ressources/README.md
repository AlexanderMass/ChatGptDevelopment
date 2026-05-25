# Ressources

Dieser Ordner sammelt wiederverwendbare Ressourcen fuer KI-gestuetzte Projektarbeit.

Ressourcen sind keine vollstaendigen Vorgehensmodelle, sondern Hilfsmittel, Entscheidungen oder Referenzen, die in mehreren Projekten nuetzlich sein koennen.

## Ressourcenliste

- [Caddy Webserver](CaddyWebServer.md): lokaler statischer Webserver, Aktualisierung von Frontend-Ressourcen, Servicepruefung, Neustart und Zusammenspiel mit Node.js.
- [Task Worker Orchestrator](TaskWorkerOrchestrator.md): Celery-basierte Worker-Orchestrierung fuer asynchrone Verarbeitung, Batch-Jobs und Hintergrundaufgaben ausserhalb von REST-Requests.
- [Cytoscape.js](Cytoscape.md): optionale Bibliothek fuer Graphennetze, Mindmaps, Use-Case-Netze und modellgetriebene Knoten-Kanten-Darstellungen.
- [ECharts](ECharts.md): Graphen- und Diagrammbibliothek fuer Metrikvisualisierungen, Zeitreihen, Dashboard-Charts und Line-Charts.
- [FastAPI Server](FastAPIServer.md): lokale Python-REST-Schicht fuer Webapplikationen, Health- und Logging-Endpunkte, Datenbankzugriffe und spaetere Jobsteuerung.
- [Message Broker](MessageBroker.md): Redis-basierte Broker- und Queue-Ressource zur Entkopplung von API-Servern und Worker-Prozessen.
- [MySQL Database](MySqlDatabase.md): relationale Datenbank, SQL-Schema, Node.js-Zugriff, Passwortstrategie und lokale Datenbankpflege.
- [Node.js Server](NodeJsServer.md): lokale REST-Schicht fuer Webapplikationen, Datenbankzugriffe, Git-Auswertung, Logging, Portvergabe und spaeteren Servicebetrieb.
- [PDF Parser](PdfParser.md): Parser-Ressource fuer maschinenlesbare PDF-Dokumente mit PyMuPDF als Primaerframework und pdfplumber als Analyse- und Debugging-Ergaenzung.
- [Python API Server](PythonApiServer.md): FastAPI-basierte REST-Schicht fuer Python-nahe Fachlogik, Datenzugriff und steuernde Jobkoordination.

## Moegliche Inhalte

- Werkzeugentscheidungen und Library-Bewertungen
- technische Checklisten
- Architekturentscheidungen, die mehrfach verwendbar sind
- Promptmuster und Reviewfragen
- Referenzen auf externe Dokumentation
- wiederverwendbare UI-, API- oder Datenbankmuster

## Abgrenzung

Prozessbeschreibungen gehoeren nach `Processes`. Projektspezifische Entscheidungen gehoeren in den jeweiligen `ChatGptContext` des konkreten Projekts.
