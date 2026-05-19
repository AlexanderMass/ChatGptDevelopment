# Ressource: Message Broker

## Zweck

Diese Ressource beschreibt Redis als In-Memory-Dienst fuer Queue-, Cache- und Vermittlungsaufgaben in ChatGPT-Development-Projekten.

Im hier relevanten Zusammenhang wird Redis primaer als Broker fuer asynchrone Verarbeitung betrachtet.

## Einsatzkontext

Redis wird verwendet, wenn Anwendungen eine schnelle technische Vermittlungsschicht fuer Nachrichten, Warteschlangen oder kurzlebige Zustandsinformationen benoetigen.

Typische Einsatzfaelle:

- Broker fuer Celery-Tasks
- technische Queue fuer Hintergrundjobs
- kurzfristige Zustands- oder Cache-Daten
- einfache Entkopplung zwischen API und Worker-Prozessen

## Dokumentation

Offizielle Einstiegspunkte:

- [Redis Documentation](https://redis.io/docs/)
- [Redis Overview](https://redis.io/docs/latest/develop/get-started/)

## Rolle Im System

Redis ist in diesem Arbeitsmodell nicht der Worker und nicht die fachliche Logik.

Redis uebernimmt typischerweise:

- Annahme von Nachrichten oder Jobs aus einem API-Server
- Puffern dieser Jobs in einer Queue
- Bereitstellung dieser Jobs fuer Worker-Prozesse
- schnelle technische Vermittlung zwischen getrennten Prozessen

## Typische Architektur

Ein typisches Zusammenspiel kann so aussehen:

```text
Frontend
  -> API-Server
  -> Redis als Broker
  -> Worker-System
  -> Datenbank
```

Dabei gilt:

- der API-Server schreibt einen Job nach Redis
- Redis haelt den Job in der Queue bereit
- Worker holen den Job spaeter ab

## Abgrenzung Zu Celery

Redis und Celery haben nicht dieselbe Aufgabe:

- Redis ist die technische Vermittlungs- und Queue-Schicht
- Celery ist das Task- und Worker-System

Kurz gesagt:

- Redis ist der Briefkasten oder die Warteschlange
- Celery ist der Organisator und Ausfuehrer der Arbeit

## Monitoring

Redis bringt technische Status- und Statistikmoeglichkeiten mit, ist aber nicht automatisch eine fachliche Betriebsoberflaeche.

Deshalb sollte Redis-Monitoring nur als technische Sicht verstanden werden, nicht als Ersatz fuer projektbezogenes Logging oder fuer fachliche Jobtabellen.

## Architekturentscheidung

Redis wird in diesem Arbeitsmodell als schlanke technische Vermittlungs- und Queue-Ressource betrachtet.

Es ist besonders dann sinnvoll, wenn getrennte Prozesse wie API-Server und Worker ueber eine schnelle Broker-Schicht entkoppelt werden sollen.
