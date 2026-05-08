# DatenbankKontext

## Zugehoeriger Arbeitsordner

`D:\Alexander\Python\ChatGptDevelopment\Db`

## Ziel

Dieses Teilprojekt klammert alle Coding-Aktivitaeten rund um die Datenbank.

Ziel ist der Aufbau einer gemeinsamen Datenbasis fuer Dialogdaten zwischen Mensch und KI sowie fuer Entwicklungsartefakte aus Versionskontrolle und Codeaenderungen. Die Datenbank soll diese Informationen strukturiert, nachvollziehbar und auswertbar speichern.

## Typische Inhalte

- Schemata fuer Dialog-, Sequenz-, Zeit- und Entwicklungsdaten
- Tabellen, Views, Indizes und Constraints
- Migrations- oder Setup-Skripte fuer reproduzierbare Datenbankstaende
- Logik zur Verknuepfung von Interaktion und Codeaenderung

## Abgrenzung

- Schnittstellenlogik und Datenbereitstellung gehoeren primaer in den `ApiKontext`.
- Oberflaechen, Visualisierung und Nutzerinteraktion gehoeren in den `WebdesignKontext`.
- Analysefragen werden hier nur insoweit behandelt, wie sie die Modellierung und Abfragefaehigkeit der Datenbasis beeinflussen.

## Arbeitsprinzip

Datenbankcode soll reproduzierbar, versionierbar und nachvollziehbar sein. Die Struktur soll so angelegt werden, dass sowohl Rohdaten als auch spaetere abgeleitete Metriken konsistent gespeichert und ausgewertet werden koennen.
