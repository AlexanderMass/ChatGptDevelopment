# Ressource: Caddy Webserver

## Zweck

Diese Ressource beschreibt, wie Caddy in ChatGPT-Development-Projekten als lokaler Webserver genutzt werden kann.

Caddy wird verwendet, um statische Webressourcen auszuliefern. Dazu gehören HTML, CSS, JavaScript, Bilder und gebaute Frontend-Bundles. Dynamische Funktionen wie Datenbankzugriffe oder Git-Auswertungen werden nicht von Caddy selbst übernommen, sondern über separate Serverkomponenten wie Node.js bereitgestellt.

## Einsatzkontext

In diesem Arbeitsmodell übernimmt Caddy die Rolle der stabilen lokalen Auslieferungsschicht für Weboberflächen.

Typische Aufgaben:

- lokale Webapplikationen über HTTP bereitstellen
- statische Dateien aus einem Build-Verzeichnis ausliefern
- mehrere Projektoberflächen über unterschiedliche Pfade oder Ports erreichbar machen
- Requests an API-Server wie Node.js weiterleiten, falls ein Reverse Proxy benötigt wird

## Dokumentation

Offizielle Einstiegspunkte:

- [Caddy Documentation](https://caddyserver.com/docs/)
- [Caddyfile Concepts](https://caddyserver.com/docs/caddyfile/concepts)
- [Caddy Reverse Proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)

## Abgrenzung Zu Node.js

Caddy und Node.js erfüllen unterschiedliche Aufgaben:

- Caddy liefert statische Dateien aus.
- Node.js stellt dynamische REST-Services bereit.
- Caddy kann optional als Reverse Proxy vor Node.js stehen.
- Node.js sollte nicht nur für statische Dateien eingesetzt werden, wenn Caddy diese Aufgabe bereits stabil übernimmt.

Diese Trennung hält die Architektur übersichtlich:

```text
Browser
  -> Caddy: statische Weboberfläche
  -> Node.js: REST-API, Datenbank, Git, Logging
```

## Typische Projektstruktur

Für Frontend-Projekte kann folgende Struktur verwendet werden:

```text
Web/
  frontend/
    src/
    dist/
  server/
```

Der Frontend-Build erzeugt statische Dateien im `dist`-Ordner. Caddy liefert dann diesen Ordner aus.

## Aktualisierung Bei Ressourcenänderungen

Wenn Frontend-Ressourcen geändert werden, reicht es nicht immer aus, nur die Quelldateien zu speichern. Der auszuliefernde Build muss aktualisiert werden.

Typisches Vorgehen:

```powershell
Set-Location D:\Alexander\Python\ChatGptDevelopment\Web\frontend
npm run build
```

Danach liefert Caddy die neu erzeugten Dateien aus dem Build-Verzeichnis aus.

Wenn Caddy direkt auf das Build-Verzeichnis zeigt, ist normalerweise kein Neustart des Caddy-Service notwendig. Ein Browser-Reload reicht dann aus.

Ein Neustart von Caddy ist nur nötig, wenn sich die Caddy-Konfiguration selbst geändert hat, zum Beispiel:

- anderer Dokumentenroot
- neuer Pfad
- anderer Port
- neue Reverse-Proxy-Regel
- geänderte TLS- oder Header-Konfiguration

## Caddy-Service Prüfen

Unter Windows kann geprüft werden, ob der Caddy-Service läuft:

```powershell
sc.exe query caddy
```

Der konkrete Servicepfad kann abgefragt werden:

```powershell
(Get-CimInstance Win32_Service -Filter "Name='caddy'").PathName
```

## Caddy Neu Starten

Wenn die Konfiguration geändert wurde, kann Caddy neu gestartet werden:

```powershell
Restart-Service caddy
```

Alternativ kann zuerst gestoppt und geprüft werden:

```powershell
sc.exe stop caddy
sc.exe query caddy
```

## Zusammenspiel Mit Frontend-Builds

Für die normale Entwicklung gilt:

- Änderung an Vue/TypeScript/CSS durchführen.
- Frontend bauen.
- Browser neu laden.
- Caddy nur neu starten, wenn sich seine Konfiguration geändert hat.

Damit bleibt Caddy eine stabile Auslieferungsschicht, während die eigentliche Entwicklungsarbeit im Frontend-Projekt und gegebenenfalls im Node.js-Server stattfindet.

## Ports Und Projekte

Wenn mehrere lokale Webprojekte parallel laufen, sollten Ports und Pfade bewusst vergeben und dokumentiert werden.

Mögliche Muster:

- ein Caddy-Service mit mehreren Sites oder Pfaden
- unterschiedliche Ports pro Projekt
- Caddy als gemeinsame statische Auslieferungsschicht
- Node.js-API-Server pro Projekt mit jeweils eigenem API-Port

Wichtig ist, dass die Port- und Pfadzuordnung pro Projekt dokumentiert wird, damit spätere Chats und Entwicklungsdurchläufe denselben lokalen Aufbau reproduzieren können.

## Architekturentscheidung

Caddy wird in diesem Arbeitsmodell als lokaler statischer Webserver betrachtet.

Er soll die Anwendung zuverlässig erreichbar machen, aber keine fachliche Serverlogik übernehmen. Fachliche Dynamik wird in separaten Serverkomponenten wie Node.js implementiert. Dadurch bleiben Auslieferung, API-Logik und Datenzugriff klar getrennt.
