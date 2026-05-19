# Ressource: Python API Server

## Zweck

Diese Ressource beschreibt FastAPI als Python-basiertes Serverframework fuer REST-APIs in ChatGPT-Development-Projekten.

FastAPI eignet sich besonders, wenn ein Projekt Python-nahe Fachlogik, Datenverarbeitung oder Bibliotheken ueber HTTP-Endpunkte steuerbar machen soll.

## Einsatzkontext

FastAPI wird verwendet, wenn eine Anwendung dynamische API-Funktionen in Python benoetigt.

Typische Einsatzfaelle:

- REST-Endpunkte fuer Frontends bereitstellen
- Python-Fachlogik ueber HTTP steuerbar machen
- Datenbankzugriff kapseln
- Verarbeitungsjobs anstossen
- Jobstatus und Laufprotokolle bereitstellen
- API-nahe Validierung von Request- und Response-Daten

## Dokumentation

Offizielle Einstiegspunkte:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Uvicorn Documentation](https://www.uvicorn.org/)

## Rolle Im System

FastAPI ist die API-Schicht einer Python-Anwendung.

FastAPI uebernimmt typischerweise:

- Entgegennahme von HTTP-Requests
- Validierung von Eingaben
- Rueckgabe strukturierter JSON-Antworten
- Starten oder Steuern von Verarbeitungsablaeufen
- Abfrage von Status, Ergebnissen und Protokollen

## Abgrenzung Zu Worker-Systemen

FastAPI sollte nicht als Hauptort fuer langlaufende Batch-Jobs verstanden werden.

Fuer kurze Requests, Statusabfragen und steuernde API-Funktionen ist FastAPI sehr gut geeignet. Fuer groessere Hintergrundverarbeitung sollte FastAPI die Arbeit an ein Worker-System delegieren.

Typische Arbeitsteilung:

- FastAPI nimmt den Auftrag entgegen.
- Ein Message Broker puffert den Auftrag.
- Ein Task Worker Orchestrator fuehrt die Arbeit im Hintergrund aus.
- Eine Datenbank speichert Status, Ergebnisse und fachliche Laufprotokolle.

## Typische Architektur

```text
Frontend
  -> Python API Server
  -> Message Broker
  -> Task Worker Orchestrator
  -> Datenbank
```

Diese Struktur ist besonders sinnvoll, wenn API-Requests schnell beantwortet werden sollen, waehrend eigentliche Verarbeitungsschritte laenger laufen koennen.

## Async Und Parallelitaet

FastAPI laeuft typischerweise auf einem ASGI-Server wie Uvicorn.

Ein Serverprozess kann viele I/O-lastige Requests effizient bearbeiten. Das bedeutet aber nicht, dass CPU-lastige oder langlaufende Batch-Jobs automatisch gut im Request-Prozess aufgehoben sind.

Fuer aufwendige Verarbeitung sollte die Anwendung getrennte Worker-Prozesse verwenden.

## Logging

Ein Python API Server sollte von Anfang an strukturiert loggen.

Sinnvolle Logpunkte:

- Serverstart und Konfiguration
- eingehende relevante API-Aufrufe
- angelegte Jobs
- Statusabfragen
- Fehler und Exceptions
- Verweise auf fachliche Job- oder Lauf-IDs

Fuer produktive oder laenger laufende Verarbeitung reicht Logausgabe allein nicht aus. Status und fachliche Ergebnisse sollten zusaetzlich in einer Datenbank persistiert werden.

## Abgrenzung Zu Node.js Server

Node.js und FastAPI koennen beide REST-Services bereitstellen.

FastAPI ist besonders naheliegend, wenn die zentrale Logik ohnehin in Python liegt, zum Beispiel bei Datenverarbeitung, PDF-Parsing, wissenschaftlichen Bibliotheken oder Python-nahen ETL-Prozessen.

Node.js ist besonders naheliegend, wenn ein Projekt eine schlanke JavaScript-nahe Web-API oder Frontend-nahe Serverlogik benoetigt.

## Architekturentscheidung

FastAPI wird in diesem Arbeitsmodell als Python-basierte API-Schicht betrachtet.

Sie ist geeignet fuer steuernde REST-Endpunkte, Datenzugriff und Jobkoordination. Langlaufende Verarbeitung sollte bei Bedarf ueber separate Worker- und Broker-Ressourcen entkoppelt werden.
