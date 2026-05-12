# Server

Lokale Auslieferung der ChatGptDevelopment-Webanwendung und vorbereiteter
Node.js-API-Service fuer die spaetere Datenbankanbindung.

## Statische Webauslieferung

Die Vue-Anwendung wird weiterhin ueber den bereits laufenden Caddy-Server
ausgeliefert.

Build-Ziel:

```text
D:\Alexander\Python\ChatGptDevelopment\Web\frontend\dist
```

Lokale URL:

```text
http://localhost:8080/chatgpt-development/
```

Aktive Caddy-Konfiguration:

```text
D:\Alexander\Python\HaushaltBonn\WebAccess\server\Caddyfile
```

Frontend-Build:

```powershell
cd D:\Alexander\Python\ChatGptDevelopment\Web\frontend
npm.cmd run build
```

## Node.js-API-Service

Der API-Service ist als eigenstaendiges Node.js-Modul vorbereitet. Er kapselt
die spaetere MySQL-Anbindung und kann perspektivisch als eigener Windows-Service
gestartet werden.

```text
Web/server
  package.json
  src/
    config/
      serverConfig.js
    http/
      jsonResponse.js
      requestBody.js
    routes/
      healthRoutes.js
      projectRoutes.js
    services/
      projectService.js
    server.js
```

## REST-Pfade

Die Pfade fuer die Projektpflege sind angelegt und gegen MySQL verdrahtet.

```text
GET  /api/health
GET  /api/projects
POST /api/projects
GET  /api/projects/:projectId
PUT  /api/projects/:projectId
```

`POST /api/projects` legt ein Projekt in `chat_gpt_project` an. `PUT
/api/projects/:projectId` aktualisiert fuer den Administrationsdialog die
Beschreibung und das Projektende.

## Lokaler Start

```powershell
cd D:\Alexander\Python\ChatGptDevelopment\Web\server
npm.cmd run check
npm.cmd start
```

Standardport:

```text
http://127.0.0.1:3100
```

Der Port kann ueber `API_PORT` in `.env.local` oder ueber eine
Prozessumgebung ueberschrieben werden. Die MySQL-Zugangsdaten werden ebenfalls
aus `.env.local` gelesen und sind in `src/config/serverConfig.js` zentral
gekapselt.

## Logging

Der Node.js-API-Service schreibt ein lokales Logfile:

```text
D:\Alexander\Python\ChatGptDevelopment\Web\server\logs\api.log
```

Das Log enthaelt Serverstart, HTTP-Requests, Fehler sowie Projektanlage und
Projektaktualisierung. Passwoerter werden nicht geloggt. Der Ordner `logs` ist
ueber `.gitignore` ausgeschlossen.
