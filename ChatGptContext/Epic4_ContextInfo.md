# Epic 4 Context Info: Development Cockpit

## Zweck

Diese Datei verdichtet die fachlichen Kontextinformationen zu Epic 4 `Development Cockpit`. Sie dient als Einarbeitungspunkt fuer neue Chats oder Threads, die am Cockpit, an Kontextordner-Introspektion oder an Qualitaetsankern fuer Projektdokumentation weiterarbeiten.

Die prozessuale Steuerung des Epics liegt weiterhin in `Epic4_DevelopmentCockpit.md`.

## Fachlicher Kern

Das Development Cockpit ist eine eigenstaendige Webapplikation innerhalb von `ChatGptDevelopment`.

Es macht Kontextordner verwalteter ChatGPT-Development-Projekte sichtbar. Dadurch entsteht eine projektuebergreifende Sicht auf Dokumentationsstruktur, Kontextdateien und spaetere Qualitaetsanker.

## Zentrale Ergebnisse

- Im Navigationsbereich existiert neben `Dashboard` und `Analyse` eine eigene Bubble `Cockpit`.
- Die Cockpit-Combobox zeigt Projekte, deren Repositories einen erkannten Kontextordner besitzen.
- `git_repository.hasChatGptContext` dient als gepflegtes Boolean-Flag.
- Das Flag wird beim Speichern von Repository-Zuordnungen gesetzt und bei der Git-Datenanalyse aktualisiert.
- Der Cockpit-Server liest Kontextbäume und Datei-Inhalte aus dem persistierten Git-Stand.
- Links wird ein Directory Tree angezeigt.
- Rechts wird der Inhalt einer selektierten Datei angezeigt.

## Wichtige technische Bereiche

- `Web/frontend/src/cockpit`: Cockpit-View, API-Client und CSS
- `Web/server/src/routes/cockpitRoutes.js`: Cockpit-REST-Routen
- `Web/server/src/services/cockpitService.js`: Cockpit-Fachlogik
- `Web/server/src/services/repositoryContextService.js`: Erkennung und Lesen von Kontextordnern
- `Sql/alter_git_repository_has_chat_gpt_context.sql`: Migration fuer das Cockpit-Flag

## Abgrenzung

Das Cockpit ist keine Dashboard-Erweiterung. Es ist eine eigene Anwendung fuer Projektintrospektion und Methodenkontrolle.

## Naechste fachliche Fragen

- Welche Qualitaetsanker sollen fuer Kontextordner geprueft werden?
- Welche Dateien sind fuer einen neuen Chat zwingend relevant?
- Soll das Cockpit spaeter Refactoring-Vorschlaege fuer Kontextdateien unterstuetzen?
