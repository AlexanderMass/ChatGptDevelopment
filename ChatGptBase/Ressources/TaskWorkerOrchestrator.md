# Ressource: Task Worker Orchestrator

## Zweck

Diese Ressource beschreibt Celery als Python-basiertes Task- und Worker-System fuer asynchrone Verarbeitung in ChatGPT-Development-Projekten.

Celery eignet sich, wenn Arbeit nicht direkt im HTTP-Request ausgefuehrt werden soll, sondern im Hintergrund durch getrennte Worker-Prozesse.

## Einsatzkontext

Celery wird verwendet, wenn eine Anwendung neben normalen API-Aufrufen auch laenger laufende oder entkoppelte Verarbeitungsschritte benoetigt.

Typische Einsatzfaelle:

- Batch-Verarbeitung grosser Dokumentmengen
- asynchrone Importlaeufe
- Hintergrundjobs ausserhalb von REST-Requests
- Wiederholungslogik bei fehlgeschlagenen Aufgaben
- verteilte Abarbeitung ueber mehrere Worker

## Dokumentation

Offizielle Einstiegspunkte:

- [Celery Documentation](https://docs.celeryq.dev/)
- [Celery Getting Started](https://docs.celeryq.dev/en/stable/getting-started/)
- [Celery First Steps](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html)

## Rolle Im System

Celery ist nicht die Queue selbst, sondern das System, das Tasks definiert, an Worker uebergibt und deren Ausfuehrung organisiert.

Celery uebernimmt typischerweise:

- Definition von Hintergrundtasks
- Abarbeitung durch Worker-Prozesse
- Wiederholungsversuche bei Fehlern
- Trennung von Webserver und Langlaeufer-Jobs
- Status- und Ablaufsteuerung auf Task-Ebene

## Typische Architektur

Ein typisches Zusammenspiel kann so aussehen:

```text
Frontend
  -> API-Server
  -> Broker / Queue
  -> Celery Worker
  -> Datenbank
```

Dabei gilt:

- der API-Server legt nur einen Job an
- der Broker puffert den Job
- der Worker holt den Job spaeter ab und fuehrt ihn aus

## Abgrenzung Zu FastAPI Oder Node.js

FastAPI oder Node.js uebernehmen die Request-Verarbeitung einer Anwendung.

Celery wird ergaenzend eingesetzt, wenn Aufgaben nicht synchron im Request verarbeitet werden sollen.

Damit gilt:

- REST-Server nehmen Auftraege an
- Celery fuehrt schwere oder langlaufende Aufgaben im Hintergrund aus

## Monitoring

Fuer Celery existieren typische Betriebswerkzeuge wie `Flower`, mit denen Worker, laufende Tasks, erfolgreiche Tasks und Fehler beobachtet werden koennen.

Diese Werkzeuge ersetzen jedoch nicht das projektbezogene Logging und keine fachliche Persistenz von Joblaeufen.

## Architekturentscheidung

Celery wird in diesem Arbeitsmodell als Ressource fuer asynchrone Task-Verarbeitung und Worker-Orchestrierung betrachtet.

Es ist besonders dann sinnvoll, wenn API-Requests von groesseren Batch-Jobs, Importlaeufen oder anderen langlaufenden Aufgaben entkoppelt werden sollen.
