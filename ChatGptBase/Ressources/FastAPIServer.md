# Ressource: FastAPI Server

## Zweck

Diese Ressource beschreibt, wie FastAPI in ChatGPT-Development-Projekten als lokale Python-Serverkomponente genutzt werden kann.

FastAPI wird eingesetzt, wenn eine Webanwendung dynamische Funktionen benötigt, die auf Python-Bibliotheken, Datenbanken oder operative Verarbeitungsschritte zugreifen sollen. Dazu gehören insbesondere REST-Services, MySQL-Zugriffe, Parsing- und Refactoring-Funktionen, serverseitiges Logging und später auch die Anbindung längerer Hintergrundjobs.

## Einsatzkontext

FastAPI eignet sich besonders gut, wenn das Projekt ohnehin Python als fachliche oder technische Basis nutzt.

Typische Einsatzfälle:

- REST-API zwischen Webfrontend und Datenbank
- Zugriff auf MySQL oder andere relationale Datenbanken
- Nutzung von Python-Bibliotheken für PDF-, Excel-, Text- oder Datenanalyse
- Start und Überwachung operativer Verarbeitungsschritte
- Bereitstellung von Health- und Logging-Endpunkten
- spätere Kopplung mit Task-Queues wie Celery oder anderen Worker-Systemen

Die statischen Webanteile können weiterhin durch einen Webserver wie Caddy ausgeliefert werden. FastAPI übernimmt die dynamischen API-Funktionen. Dadurch entsteht eine klare Trennung:

- Caddy liefert statische HTML-, CSS- und JavaScript-Dateien aus.
- FastAPI stellt REST-Services bereit.
- FastAPI greift auf Datenbank, lokale Dateien und Python-Verarbeitungslogik zu.
- Das Frontend kommuniziert mit FastAPI über HTTP-Requests.

## Lokale Installation

FastAPI sollte pro Projekt in einer eigenen Python Virtual Environment installiert werden.

Empfohlenes Muster:

```text
Server/
  .venv/
  app/
  requirements.txt
```

Typische Abhängigkeiten:

```text
fastapi
uvicorn[standard]
pydantic-settings
python-dotenv
SQLAlchemy
PyMySQL
cryptography
```

`cryptography` kann notwendig sein, wenn MySQL mit Authentifizierungsverfahren wie `caching_sha2_password` verwendet wird.

Die Virtual Environment und lokale `.env`-Dateien gehören nicht ins Repository.

## Dokumentation

Offizielle Einstiegspunkte:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Settings Documentation](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)

## Start Im Entwicklungsmodus

Während der Entwicklung kann der FastAPI-Server manuell in PowerShell gestartet werden.

Typisches Vorgehen:

```powershell
Set-Location D:\Alexander\Python\ProjectName\Server
.\.venv\Scripts\python.exe -m app
```

Alternativ kann Uvicorn direkt gestartet werden:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 3200 --reload
```

Der direkte Start über `python -m app` ist besonders angenehm, wenn Startparameter wie Host und Port in der Projektkonfiguration gekapselt werden.

## Ports Pro Projekt

Wenn mehrere Projekte eigene lokale API-Server verwenden, sollten sie unterschiedliche Ports nutzen.

Empfohlenes Muster:

- Jedes Projekt erhält einen festen API-Port.
- Der Port wird in der jeweiligen Projektkonfiguration dokumentiert.
- Das Frontend des Projekts greift auf genau diesen Port zu.
- Ports werden nicht zufällig gewechselt, damit Debugging und Serviceeinrichtung stabil bleiben.

Beispiel:

```text
Project A FastAPI: 3200
Project B FastAPI: 3210
Project C FastAPI: 3220
```

Die konkreten Portnummern sind Projektentscheidung. Wichtig ist nur, dass sie eindeutig vergeben und dokumentiert werden.

## Projektstruktur

Für FastAPI-Serveranteile empfiehlt sich eine klare Trennung zwischen Webfrontend und Server:

```text
Web/
  frontend/
Server/
  app/
    main.py
    config.py
    database.py
    logging_config.py
    routers/
```

Der Serverbereich enthält typischerweise:

- Konfiguration
- REST-Router
- Datenbankzugriff
- Logging
- fachliche Services
- optionale Job- oder Worker-Anbindung

Die Implementierung sollte nicht künstlich kleinteilig sein. Fachliche Router und Services sollten gut auffindbar bleiben. Infrastruktur wie Logging, Datenbankverbindung oder Konfiguration kann zentral gekapselt werden.

## Konfiguration

Die Konfiguration sollte zentral über `pydantic-settings` und `.env` erfolgen.

Typische Werte:

```text
API_HOST
API_PORT
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
CORS_ORIGINS
```

Die `.env` enthält lokale Geheimnisse und wird nicht eingecheckt. Eine `.env.example` dokumentiert die notwendigen Variablen ohne echte Passwörter.

## Health Endpoint

Ein Health-Endpoint macht den Serverstatus für die Weboberfläche sichtbar.

Empfohlen:

```text
GET /api/health
```

Antwort:

```json
{
  "status": "ok",
  "service": "project-api"
}
```

Die Weboberfläche kann daraus eine kleine Status-Bubble erzeugen. Beim ersten Laden sollte automatisch ein Status-Refresh ausgeführt werden. Zusätzlich bleibt ein manueller Refresh sinnvoll, weil lokale Server während der Entwicklung häufig neu gestartet werden.

## Logging

FastAPI sollte serverseitig ein Logfile schreiben, damit REST-Aufrufe, Datenbankzugriffe und Fehler nachvollziehbar bleiben.

Bewährt hat sich JSON-Lines-Logging. Jede Logzeile ist ein eigenständiges JSON-Objekt.

Typische Felder:

- `timestamp`
- `level`
- `service`
- `message`
- `context`
- `exception`

Der `service`-Name ist wichtig, damit fachlich erkennbar bleibt, welcher Router oder Service eine Meldung geschrieben hat.

Beispiele für Service-Namen:

- `monitoring`
- `documentTypes`
- `database`
- `refactoringJob`
- `parser`

## Serverlog In Der Weboberfläche

Für lokale Entwicklungs- und Refactoring-Anwendungen ist es hilfreich, das Serverlog über die Weboberfläche sichtbar zu machen.

Empfohlen:

```text
GET /api/server-log?limit=100
GET /api/server-log?limit=100&levels=INFO,ERROR
```

Der Browser greift dabei nicht direkt auf lokale Dateien zu. Der FastAPI-Server liest die Logdatei und gibt strukturierte Logeinträge zurück.

Sinnvolles UI-Muster:

- Menüpunkt `Server-Log` im Administrationsbereich
- Menüpunkt nur anzeigen, wenn eine Loganzeige aktiv gewünscht ist
- manuelles Refresh statt automatischem Polling
- Eingabe für Zeilenlimit
- Checkboxen für Log-Level
- dunkles Terminal-ähnliches Layout

## Datenbankzugriff

Für relationale Datenbanken eignet sich SQLAlchemy als zentrale Zugriffsschicht.

Typisches Muster:

- Datenbank-URL in `config.py` bauen
- Engine und Session-Fabrik in `database.py` kapseln
- Sessions per FastAPI Dependency in Router injizieren
- SQL-Fehler in HTTP-Fehler übersetzen

Für frühe Durchstiche ist es akzeptabel, SQL-Statements direkt in Routern zu verwenden. Wenn die Fachlogik wächst, sollten sie in Service- oder Repository-Funktionen ausgelagert werden.

## Operative Jobs

FastAPI kann kleine Operationen direkt ausführen. Längere Parsing-, Refactoring- oder Batch-Jobs sollten später nicht dauerhaft im Request laufen.

Für längere Jobs ist ein Worker-/Queue-Modell sinnvoll, zum Beispiel:

- FastAPI nimmt den Auftrag entgegen.
- Ein Broker oder eine Queue speichert den Job.
- Ein Worker führt den Job aus.
- Status und Ergebnisse werden in der Datenbank gespeichert.
- Das Frontend zeigt Status und Log an.

FastAPI bleibt in diesem Modell die REST- und Steuerungsschicht, nicht der eigentliche Langläufer-Prozess.

## Betrieb Als Windows-Service

Für dauerhaft verfügbare lokale Anwendungen kann ein FastAPI-Server später als Windows-Service eingerichtet werden.

Dabei wird nicht Python allgemein als Service installiert, sondern eine konkrete Projektanwendung:

- ein Service pro Anwendung
- definierter Arbeitsordner
- definierter Startbefehl
- optional eigene Logdateien
- projektbezogener Port

Wichtig ist, dass das Arbeitsverzeichnis korrekt gesetzt wird und der Startbefehl die projektspezifische Virtual Environment verwendet.

## Arbeitsverzeichnis

Beim Start des Servers muss das Arbeitsverzeichnis korrekt gesetzt werden.

Wenn Python oder PowerShell mit einem ungünstigen Working Directory gestartet wird, können Konfigurationsdateien, Logs oder temporäre Artefakte an unerwarteten Stellen entstehen.

Deshalb sollte der Server immer aus dem Serververzeichnis des jeweiligen Projekts gestartet werden:

```powershell
Set-Location D:\Alexander\Python\ProjectName\Server
.\.venv\Scripts\python.exe -m app
```

Bei einem späteren Windows-Service muss das Arbeitsverzeichnis ebenfalls explizit auf das Serververzeichnis zeigen.

## Architekturentscheidung

FastAPI wird in diesem Arbeitsmodell als lokale Python-REST-Schicht verstanden.

Die Serverinstanz ist kein globaler Monolith für alle Projekte. Für mehrere Projekte ist es meist übersichtlicher, jeweils eine eigene FastAPI-Instanz mit eigenem Port und eigener Konfiguration zu verwenden.

Das unterstützt:

- fachliche Kapselung pro Projekt
- einfache Fehlersuche
- unabhängigen Start und Neustart
- klare Port- und Servicezuordnung
- Nutzung projektspezifischer Python-Bibliotheken
- spätere Erweiterung um Worker, Queue oder Windows-Service
