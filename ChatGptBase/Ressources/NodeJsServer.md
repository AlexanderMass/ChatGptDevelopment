# Ressource: Node.js Server

## Zweck

Diese Ressource beschreibt, wie Node.js in ChatGPT-Development-Projekten als lokale Serverkomponente genutzt werden kann.

Node.js wird eingesetzt, wenn eine Webanwendung dynamische Funktionen benötigt, die nicht rein statisch im Browser ausgeführt werden sollen. Dazu gehören insbesondere REST-Services, Datenbankzugriffe, Dateisystemzugriffe, Git-Auswertungen und serverseitiges Logging.

## Einsatzkontext

In diesem Projekt wird Node.js als lokale REST-Schicht zwischen Frontend, MySQL-Datenbank und lokalem Dateisystem verwendet.

Die statischen Webanteile können weiterhin durch einen Webserver wie Caddy ausgeliefert werden. Node.js übernimmt dagegen die dynamischen API-Funktionen. Dadurch entsteht eine klare Trennung:

- Caddy liefert statische HTML-, CSS- und JavaScript-Dateien aus.
- Node.js stellt REST-Services bereit.
- Node.js greift auf MySQL, Git und lokale Projektverzeichnisse zu.
- Das Frontend kommuniziert mit Node.js über HTTP-Requests.

## Lokale Installation

Node.js ist auf dem Rechner als normale Entwicklerkomponente installiert. Es läuft nicht automatisch als globaler Hintergrundprozess.

Wichtig ist die Unterscheidung:

- Die Installation von Node.js stellt die Laufzeitumgebung bereit.
- Eine konkrete Node.js-Serveranwendung muss separat gestartet werden.
- Pro Projekt kann eine eigene Node.js-Instanz laufen.

Ob Node.js verfügbar ist, kann über PowerShell geprüft werden:

```powershell
node --version
npm --version
```

## Dokumentation

Offizielle Einstiegspunkte:

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Node.js Download](https://nodejs.org/)
- [npm Documentation](https://docs.npmjs.com/)

## Start Im Entwicklungsmodus

Während der Entwicklung kann der Node.js-Server manuell in einem Command Window oder PowerShell-Fenster gestartet werden.

Für dieses Projekt wurde der Server temporär über ein sichtbares Windows-Command-Fenster gestartet. Das war eine pragmatische Lösung, weil dadurch direkt sichtbar bleibt, ob der Server läuft und welche Logausgaben entstehen.

Typisches Vorgehen:

```powershell
Set-Location D:\Alexander\Python\ChatGptDevelopment\Web\server
npm run dev
```

Alternativ kann die Serverdatei direkt mit Node gestartet werden, wenn das Projekt entsprechend eingerichtet ist:

```powershell
node src/server.js
```

Der bevorzugte Weg ist jedoch ein `npm`-Command, weil darin projektspezifische Startparameter zentral im `package.json` verwaltet werden können.

## Ports Pro Projekt

Wenn mehrere Projekte eigene Node.js-Server verwenden, sollten sie unterschiedliche Ports nutzen. Dadurch können mehrere Serverinstanzen parallel laufen, ohne miteinander zu kollidieren.

Empfohlenes Muster:

- Jedes Projekt erhält einen festen API-Port.
- Der Port wird in der jeweiligen Projektkonfiguration dokumentiert.
- Das Frontend des Projekts greift auf genau diesen Port zu.
- Ports werden nicht zufällig gewechselt, damit Debugging und Serviceeinrichtung stabil bleiben.

Beispiel:

```text
ChatGptDevelopment API: 3001
HaushaltBonn API:      3002
AktienPy API:          3003
```

Die konkreten Portnummern sind Projektentscheidung. Wichtig ist nur, dass sie eindeutig vergeben und dokumentiert werden.

## Projektstruktur

Für Node.js-Serveranteile empfiehlt sich eine klare Trennung zwischen Frontend und Server:

```text
Web/
  frontend/
  server/
```

Der Serverbereich enthält typischerweise:

- Konfiguration
- REST-Routen
- Servicefunktionen
- Datenbankzugriff
- Logging
- Hilfsfunktionen für Dateisystem und Git

Die Implementierung muss nicht künstlich kleinteilig sein. Fachliche Services sollten gut auffindbar bleiben. Infrastruktur wie Logging, Datenbankverbindung oder Konfiguration kann zentral gekapselt werden.

## Logging

Node.js sollte serverseitig ein Logfile schreiben, damit REST-Aufrufe und Fehler nachvollziehbar bleiben.

Im Entwicklungsmodus ist zusätzlich die Ausgabe im Command Window hilfreich. Für die spätere Bedienung über die Weboberfläche kann ein REST-Service bereitgestellt werden, der das Logfile liest und im Frontend anzeigt.

Für Logs ist sinnvoll:

- Service-Name oder Modulname
- Log-Level
- fachliche Message
- relevante Nutzdaten bei schreibenden Operationen
- Fehlerdetails bei Exceptions

Zu umfangreiche Response-Daten sollten eher als Debug-Information behandelt werden.

## Betrieb Als Windows-Service

Für dauerhaft verfügbare lokale Anwendungen kann ein Node.js-Server später als Windows-Service eingerichtet werden.

Eine mögliche Lösung ist NSSM. Dabei wird nicht Node.js allgemein als Service installiert, sondern eine konkrete Projektanwendung:

- ein Service pro Anwendung
- definierter Arbeitsordner
- definierter Startbefehl
- optional eigene Logdateien
- projektbezogener Port

Dieses Modell passt gut zu lokalen ChatGPT-Development-Projekten, weil jede Anwendung unabhängig gestartet, gestoppt und konfiguriert werden kann.

## Arbeitsverzeichnis

Beim Start des Servers muss das Arbeitsverzeichnis korrekt gesetzt werden.

Wenn Node.js oder PowerShell mit einem ungünstigen Working Directory gestartet wird, können temporäre Artefakte an unerwarteten Stellen entstehen. Ein Beispiel ist ein versehentlich im Repository-Root angelegter PowerShell-Cacheordner.

Deshalb sollte der Server immer aus dem Serververzeichnis des jeweiligen Projekts gestartet werden:

```powershell
Set-Location D:\Alexander\Python\ChatGptDevelopment\Web\server
npm run dev
```

Bei einem späteren Windows-Service muss das Arbeitsverzeichnis ebenfalls explizit auf das Serververzeichnis zeigen.

## Architekturentscheidung

Node.js wird in diesem Arbeitsmodell als lokale REST-Schicht verstanden.

Die Serverinstanz ist kein globaler Monolith für alle Projekte. Für mehrere Projekte ist es meist übersichtlicher, jeweils eine eigene Node.js-Instanz mit eigenem Port und eigener Konfiguration zu verwenden.

Das unterstützt:

- fachliche Kapselung pro Projekt
- einfache Fehlersuche
- unabhängigen Start und Neustart
- klare Port- und Servicezuordnung
- spätere Installation als separater Windows-Service
