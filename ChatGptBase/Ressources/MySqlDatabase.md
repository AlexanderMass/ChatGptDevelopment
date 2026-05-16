# Ressource: MySQL Database

## Zweck

Diese Ressource beschreibt die Nutzung von MySQL in ChatGPT-Development-Projekten.

MySQL wird eingesetzt, wenn strukturierte Daten dauerhaft gespeichert, relational modelliert und über Anwendungen ausgewertet werden sollen. Es eignet sich besonders für Projekte, in denen Tabellen, Foreign Keys, SQL-Abfragen und Datenbankdesign bewusst Teil der Arbeit sind.

## Einsatzkontext

MySQL kann als lokale relationale Datenbank für Entwicklungsprojekte verwendet werden.

Typische Einsatzfälle:

- Stammdaten verwalten
- Relationen zwischen Objekten modellieren
- Metrikdaten speichern
- Auswertungen mit SQL durchführen
- Daten über REST-Services bereitstellen
- Datenmodelle mit SQL-Create-Skripten dokumentieren

## Dokumentation

Offizielle Einstiegspunkte:

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [MySQL Shell](https://dev.mysql.com/doc/mysql-shell/8.4/en/)
- [MySQL Connector/Node.js](https://dev.mysql.com/doc/dev/connector-nodejs/latest/)

## Schema Und SQL-Skripte

Für jedes Projekt sollte das Datenbankschema als SQL-Datei im Repository dokumentiert werden.

Typische Ablage:

```text
Sql/
  create_schema.sql
```

Das SQL-Skript sollte enthalten:

- Schema-Erzeugung
- Tabellen-Erzeugung
- Primary Keys
- Foreign Keys
- Cascading-Regeln
- sinnvolle Datentypen
- technische Kommentare, wenn nötig

Die SQL-Datei ist Teil des Projekts und darf eingecheckt werden, solange sie keine Passwörter oder privaten Zugangsdaten enthält.

## Zugriff Aus Node.js

Wenn eine Webanwendung MySQL nutzt, sollte der Browser nicht direkt auf die Datenbank zugreifen.

Empfohlenes Muster:

```text
Frontend
  -> REST-Service
  -> Node.js
  -> MySQL
```

Node.js stellt REST-Endpunkte bereit, führt SQL-Abfragen aus und liefert dem Frontend nur die benötigten Daten.

In Node.js kann zum Beispiel `mysql2` genutzt werden:

```powershell
npm install mysql2
```

## Umgang Mit Passwörtern

Passwörter und Zugangsdaten dürfen nicht in Git eingecheckt werden.

Empfohlenes Muster:

- Zugangsdaten liegen in einer lokalen `.env`-Datei.
- Die `.env`-Datei wird über `.gitignore` ausgeschlossen.
- Im Repository liegt höchstens eine Beispiel-Datei wie `.env.example`.
- Die Anwendung liest Zugangsdaten aus Umgebungsvariablen.
- Kontextdateien beschreiben nur die benötigten Variablennamen, nicht die geheimen Werte.

Beispiel für eine lokale `.env`-Datei:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=local_user
DB_PASSWORD=secret
DB_NAME=example_schema
```

Beispiel für eine eincheckbare `.env.example`:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## Nutzung Durch Codex

Codex kann mit MySQL arbeiten, wenn die Zugangsdaten lokal verfügbar sind und der Benutzer den Zugriff erlaubt.

Sinnvolle Arbeitsweise:

- Codex liest keine Passwörter aus Chatnachrichten, wenn es vermeidbar ist.
- Codex nutzt lokale Konfigurationsdateien oder Umgebungsvariablen.
- Codex schreibt keine Secrets in Git-Dateien.
- Codex kann SQL-Skripte erstellen und anpassen.
- Codex kann Datenbankschemata über lokale Tools einspielen, wenn der Zugriff eingerichtet ist.
- Codex kann Testabfragen ausführen, wenn die Datenbank erreichbar ist.

Wenn ein Passwort interaktiv benötigt wird, sollte es nicht dauerhaft in Projektdateien gespeichert werden.

## Lokale Datenbankpflege

Für lokale Entwicklungsprojekte ist ein pragmatisches Vorgehen sinnvoll:

- SQL-Schema im Repository dokumentieren.
- Schemaänderungen zuerst im SQL-Skript nachziehen.
- Änderungen anschließend in der lokalen Datenbank ausführen.
- Ergebnis mit einer Datenbankoberfläche oder Testabfrage prüfen.
- Änderungen committen, sobald SQL-Skript und Anwendung zusammenpassen.

## Migrationen

Für kleine lokale Projekte kann ein einzelnes `create_schema.sql` zunächst ausreichen.

Wenn ein Projekt größer wird, können Migrationen sinnvoll werden:

```text
Sql/
  migrations/
    001_create_schema.sql
    002_add_project_status.sql
```

Migrationen sind besonders dann hilfreich, wenn mehrere Datenbankstände nachvollziehbar weiterentwickelt werden müssen.

## Architekturentscheidung

MySQL wird in diesem Arbeitsmodell als lokale relationale Datenbank für strukturierte Projektinformationen betrachtet.

Die Datenbanklogik soll über eine Serverkomponente wie Node.js gekapselt werden. SQL-Skripte werden versioniert, Zugangsdaten nicht. Dadurch bleiben Datenmodell, Anwendung und Sicherheitsgrenzen nachvollziehbar getrennt.
