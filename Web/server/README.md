# Server

Lokale Auslieferung der ChatGptDevelopment-Webanwendung ueber den bereits laufenden Caddy-Server.

## Aktueller Deploymentpfad

Die Vue-Anwendung wird nach:

`D:\Alexander\Python\ChatGptDevelopment\Web\frontend\dist`

gebaut und unter folgender URL ausgeliefert:

`http://localhost:8080/chatgpt-development/`

## Laufende Caddy-Konfiguration

Der aktive Caddy-Windows-Service nutzt derzeit die gemeinsame Konfiguration unter:

`D:\Alexander\Python\HaushaltBonn\WebAccess\server\Caddyfile`

Dort ist eine zusaetzliche Route fuer `ChatGptDevelopment` hinterlegt.

## Build

Frontend-Arbeitsverzeichnis:

`D:\Alexander\Python\ChatGptDevelopment\Web\frontend`

Build-Befehl:

`npm.cmd run build`