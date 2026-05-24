# Node.js Server Coding Experience

## Zweck

Diese Coding Experience beschreibt, wie der lokale Node.js-Server in die Weboberfläche von `ChatGptDevelopment` integriert wurde.

Der Text ist als praktische Referenz für andere Projekte gedacht, die einen lokalen API-Server betreiben und in ihrer Webseite einfache Serverkontrolle sowie Logeinsicht anbieten wollen. Das Muster lässt sich auch auf einen Python-Server übertragen.

## Relevante Dateien

Frontend:

- `Web/frontend/src/App.vue`
- `Web/frontend/src/app-shell/components/AppShell.vue`
- `Web/frontend/src/app-shell/components/ServerLogView.vue`
- `Web/frontend/src/shared/api/serverStatusApi.js`
- `Web/frontend/src/shared/api/serverLogApi.js`

Backend:

- `Web/server/src/routes/healthRoutes.js`
- `Web/server/src/routes/logRoutes.js`
- `Web/server/src/logging/logger.js`
- `Web/server/src/server.js`

## Serverstatus In Der Headerzeile

Die Webapplikation zeigt in der Headerzeile eine kleine Serverstatus-Bubble.

Die Bubble liegt in `Web/frontend/src/app-shell/components/AppShell.vue`.

Sie zeigt:

- `Serverstatus: running` oder `Serverstatus: stopped`
- farbliche Unterscheidung über CSS-Klassen
- einen `Refresh`-Button
- eine Checkbox `Show Server Log`

Die eigentliche Statusprüfung wird nicht direkt in der Komponente durchgeführt. `AppShell.vue` bekommt den Status über Props und meldet nur Benutzeraktionen nach außen.

Die Steuerung liegt in `Web/frontend/src/App.vue`.

Dort werden verwaltet:

- `serverStatus`
- `showServerLog`
- `refreshServerStatus()`
- Umschalten der Server-Log-Sicht

Der API-Zugriff liegt ausgelagert in `Web/frontend/src/shared/api/serverStatusApi.js`.

Die Statusprüfung erfolgt über:

```text
GET /api/health
```

Wenn der Request erfolgreich ist und `status: "ok"` zurückkommt, wird `running` angezeigt. Bei Fehler, nicht erreichbarem Server oder anderem Status wird `stopped` angezeigt.

Serverseitig wird der Endpoint in `Web/server/src/routes/healthRoutes.js` bereitgestellt.

Das Muster ist bewusst einfach. Es gibt keinen automatischen Heartbeat. Der Nutzer aktualisiert den Status aktiv über `Refresh`.

## Serverlog Anzeigen

Das Serverlog wird als eigene View in der Webapplikation angezeigt.

Die zentrale Komponente ist `Web/frontend/src/app-shell/components/ServerLogView.vue`.

Die View bietet:

- Eingabe der Anzahl geladener Logzeilen
- Checkbox-Filter für Log-Level
- `Refresh`-Button
- Darstellung der geladenen Logzeilen in umgekehrter Reihenfolge

Die Logdaten werden über `Web/frontend/src/shared/api/serverLogApi.js` geladen.

Der API-Endpoint lautet:

```text
GET /api/server-log?limit=100
```

Optional kann ein Level-Filter übertragen werden:

```text
GET /api/server-log?limit=100&levels=INFO,ERROR
```

Serverseitig liest `Web/server/src/routes/logRoutes.js` die letzten Logzeilen aus der Logdatei und gibt sie als Liste zurück.

Die Datei wird nicht automatisch gepollt. Auch hier wurde bewusst ein manuelles Refresh gewählt, damit die lokale Applikation ruhig bleibt und keine unnötigen Requests erzeugt.

## Logging Im Server

Das Logging ist in `Web/server/src/logging/logger.js` zentral gekapselt.

Die Logdatei liegt unter:

```text
Web/server/logs/api.log
```

Jeder Logeintrag wird als JSON-Zeile geschrieben.

Typische Felder:

- `timestamp`
- `level`
- `service`
- `message`
- `context`

Über `createLogger(serviceName)` bekommt ein Servermodul einen Logger mit Service-Namen.

Beispiel:

```js
const logger = createLogger("projectService");

logger.info("project.create.persisting", {
  project: projectInput
});
```

Der Service-Name ist wichtig, weil man im Serverlog sonst schwer erkennt, aus welchem fachlichen Bereich eine Meldung stammt.

## Zusammenspiel Der Komponenten

Das Zusammenspiel sieht so aus:

```text
App.vue
  -> AppShell.vue
    -> Serverstatus-Bubble
    -> Show-Server-Log-Schalter

App.vue
  -> ServerLogView.vue
    -> serverLogApi.js
    -> GET /api/server-log

serverStatusApi.js
  -> GET /api/health

Node.js Server
  -> healthRoutes.js
  -> logRoutes.js
  -> logger.js
```

## Übertragung Auf Einen Python-Server

Für einen Python-Server sollte dasselbe Muster verwendet werden.

Empfohlen:

- ein Health-Endpoint, zum Beispiel `GET /api/health`
- ein Log-Endpoint, zum Beispiel `GET /api/server-log`
- serverseitiges strukturiertes Logging als JSON-Lines
- ein zentraler Logger mit Service- oder Modulnamen
- eine Header-Bubble im Frontend mit Status und Refresh
- eine eigene Log-View mit Zeilenlimit, Level-Filter und manuellem Refresh

Die konkrete Servertechnologie ist dabei zweitrangig. Entscheidend ist der Vertrag zwischen Frontend und Backend.

## Architekturentscheidung

Serverkontrolle und Serverlogging werden als normale Funktionen der lokalen Webapplikation verstanden.

Der Browser greift nicht direkt auf Logdateien zu. Er fragt den lokalen Server über REST-Endpunkte ab. Dadurch bleibt die Weboberfläche einfach, während Dateisystemzugriff, Serverstatus und Logik sauber auf der Serverseite gekapselt bleiben.
