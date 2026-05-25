# FastAPI Server Coding Experience

## Zweck

Diese Coding Experience beschreibt ein bewährtes Muster für lokale FastAPI-Server, die von einer Weboberfläche aus genutzt und beobachtet werden.

Das Muster eignet sich für Projekte, in denen ein Python-Server REST-Endpunkte bereitstellt, auf eine Datenbank zugreift oder operative Jobs anstößt. Der Schwerpunkt liegt auf einem einfachen Durchstich: Serverstatus sichtbar machen, Serverlog über die Weboberfläche zugänglich machen und die Serverlogik so kapseln, dass sie später erweitert werden kann.

## Grundstruktur

Empfohlene Serverstruktur:

```text
Server/
  .env.example
  requirements.txt
  app/
    __init__.py
    __main__.py
    config.py
    database.py
    main.py
    logging_config.py
    routers/
      __init__.py
      monitoring.py
      fachlicher_router.py
  logs/
    api.log
```

`logs/` sollte nicht eingecheckt werden. Die Logdatei ist ein lokales Laufzeitartefakt.

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

Wichtig ist, dass `.env` nicht eingecheckt wird und stattdessen eine `.env.example` als Vorlage existiert.

## FastAPI Einstiegspunkt

`main.py` erzeugt die FastAPI-App, setzt CORS und bindet Router ein.

Typisches Muster:

```python
app = FastAPI(title="Project API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(monitoring.router, prefix="/api")
app.include_router(domain_router.router, prefix="/api")
```

Für lokale Durchstiche ist es sinnvoll, zuerst nur `GET` zu erlauben. Später kann das gezielt erweitert werden.

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

Die Weboberfläche interpretiert `status: "ok"` als `running`. Jeder Fehler, Timeout oder unerwartete Status wird als `stopped` behandelt.

## Serverstatus In Der Weboberfläche

Die Webapplikation kann im Header eine kleine Status-Bubble anzeigen.

Sie enthält typischerweise:

- Servername, zum Beispiel `Python API`
- Status `running`, `stopped` oder `unknown`
- `Refresh`-Button
- optional einen Schalter, der einen Serverlog-Menüpunkt sichtbar macht

Beim ersten Laden der Webapplikation sollte automatisch ein Status-Refresh gegen `/api/health` ausgeführt werden. Zusätzlich bleibt ein manueller Refresh sinnvoll, weil lokale Server oft während der Entwicklung neu gestartet werden.

## Serverlog Endpoint

Das Serverlog sollte nicht direkt vom Browser aus dem Dateisystem gelesen werden. Stattdessen kapselt der FastAPI-Server den Zugriff über REST.

Empfohlen:

```text
GET /api/server-log?limit=100
GET /api/server-log?limit=100&levels=INFO,ERROR
```

Der Endpoint liest die letzten Logzeilen aus einer JSON-Lines-Datei und gibt sie als Liste zurück.

Typische Antwortobjekte:

```json
{
  "timestamp": "2026-05-24T13:17:13.945674+00:00",
  "level": "INFO",
  "service": "documentTypes",
  "message": "document_root.list.completed",
  "context": {
    "count": 27
  }
}
```

## Strukturiertes Logging

Bewährt hat sich JSON-Lines-Logging. Jede Logzeile ist ein eigenständiges JSON-Objekt.

Typische Felder:

- `timestamp`
- `level`
- `service`
- `message`
- `context`
- `exception`

Der `service`-Name ist wichtig, weil die Logausgabe sonst fachlich schwer lesbar wird. Router oder Services sollten daher eigene Logger verwenden, zum Beispiel `documentTypes`, `monitoring`, `refactoringJob` oder `database`.

## Request Logging

Ein HTTP-Middleware-Logger ist nützlich, um jeden Request mit Pfad, Methode, Statuscode und Laufzeit zu sehen.

Typische Kontextdaten:

```json
{
  "method": "GET",
  "path": "/api/document-root",
  "status_code": 200,
  "duration_ms": 18.42
}
```

Das hilft besonders, wenn die Weboberfläche meldet, dass Daten nicht geladen werden konnten.

## Serverlog In Der Weboberfläche

Das Log sollte als eigene View oder Administrationsseite angezeigt werden, nicht direkt in fachliche Seiten hineingerendert werden.

Empfohlenes UI-Muster:

- Menüpunkt `Server-Log` unter einem administrativen Bereich
- Menüpunkt nur anzeigen, wenn der Log-Schalter aktiv ist
- manuelles Refresh statt automatischem Polling
- Eingabe für Zeilenlimit
- Checkboxen für Log-Level
- dunkles Terminal-ähnliches Layout

Dieses Muster hält die normale Arbeitsoberfläche ruhig, erlaubt aber bei Problemen einen schnellen Blick in den Server.

## Frontend API Kapselung

Die REST-Zugriffe sollten in kleine API-Module ausgelagert werden.

Beispiele:

```text
src/shared/api/serverStatusApi.js
src/shared/api/serverLogApi.js
```

Dadurch bleiben Komponenten einfach. Komponenten zeigen Daten und melden Benutzeraktionen; die Details des REST-Zugriffs liegen in eigenen Modulen.

## Entwicklungsdurchstich

Ein sinnvoller erster Durchstich besteht aus:

1. FastAPI-App startet lokal auf festem Port.
2. `/api/health` liefert `status: ok`.
3. Weboberfläche zeigt Header-Status an.
4. Server schreibt JSON-Lines-Log.
5. `/api/server-log` liest die letzten Logzeilen.
6. Weboberfläche zeigt eine eigene Serverlog-Seite.
7. Ein fachlicher Endpoint lädt erste Daten aus der Datenbank.

Damit ist die technische Basis für weitere Entwicklung vorhanden.

## Wichtige Architekturentscheidung

Serverstatus und Serverlog werden als normale Funktionen der lokalen Webapplikation verstanden.

Der Browser greift nicht direkt auf lokale Dateien zu. Er fragt den Server über REST-Endpunkte ab. Dadurch bleiben Dateizugriff, Logging und Monitoring sauber im Backend gekapselt, während die Weboberfläche nur den Zustand visualisiert.

## Erweiterung Für Operative Jobs

Wenn der FastAPI-Server später operative Jobs anstößt, wird dieses Muster besonders wertvoll.

Dann können zusätzliche Logkontexte ergänzt werden:

- `job_id`
- `document_id`
- `document_instance_id`
- `status`
- `duration_ms`
- `error`

Für größere oder länger laufende Jobs kann später eine Queue-Technologie ergänzt werden. Das einfache Serverlog bleibt trotzdem nützlich, weil es den lokalen Durchstich und die Fehleranalyse stark vereinfacht.
