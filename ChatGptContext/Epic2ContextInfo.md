# Epic 2 Context Info: Dashboard-Entwicklung

## Zweck

Diese Datei verdichtet die fachlichen Kontextinformationen zu Epic 2 `Dashboard-Entwicklung`. Sie dient als Einarbeitungspunkt fuer neue Chats oder Threads, die am Dashboard, an Serverfunktionen oder an Git-Metriken weiterarbeiten.

Die prozessuale Steuerung des Epics liegt weiterhin in `Epic2_DashboardEntwicklung.md`.

## Fachlicher Kern

Epic 2 beschreibt die operative Entwicklung des Dashboards als lokale Webapplikation.

Das Dashboard ist ein vertikaler Schnitt durch Frontend, Node.js-REST-Server, MySQL-Datenbank und Git-Auswertung. Es verwaltet Projekte, ordnet Repositories zu, analysiert Git-Daten und stellt Check-in-Metriken tabellarisch sowie grafisch dar.

## Zentrale Ergebnisse

- Caddy liefert die statische Weboberflaeche.
- Node.js stellt lokale REST-Services bereit.
- MySQL speichert Projekte, Repositories und Check-in-Metriken.
- Projektanlage und Projektadministration laufen ueber einen Popup-Dialog.
- Repository-Zuordnung wird ueber eine Zwei-Listen-Oberflaeche administriert.
- Git-Datenanalyse erzeugt `check_in_metric`-Objekte innerhalb des Projektscopes.
- Tabellarische Sicht zeigt Check-in-Metriken mit Repository-Filter.
- Grafische Sicht nutzt ECharts fuer Liniengraphen.
- Serverstatus und Serverlog wurden als Diagnosefunktionen integriert.

## Wichtige technische Bereiche

- `Web/frontend/src/dashboard`: Dashboard-View, Dialoge und Dashboard-CSS
- `Web/server/src/routes`: REST-Routen
- `Web/server/src/services`: fachliche Serverlogik
- `Web/server/src/database`: MySQL-Zugriffe
- `Sql`: SQL-Schema und Migrationsskripte

## Abgrenzung

Epic 2 beschreibt die Dashboard-Applikation. Das Development Cockpit ist eine eigene Anwendung und gehoert zu Epic 4.

## Offene Refactoring-Frage

Ein Teil der Dashboard-Dokumentation ist in aelteren allgemeinen Kontextdateien enthalten. Bei einem spaeteren Refactoring sollte entschieden werden, welche Inhalte nach `Epic2ContextInfo.md` gehoeren und welche als Detaildokumente bestehen bleiben.
