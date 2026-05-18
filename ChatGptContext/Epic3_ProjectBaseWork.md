# Epic: Project-Based Work

Epic-Nummer: 3

## Ziel

Dieses Epic dokumentiert die projektübergreifende Grundlagenarbeit für ChatGPT-Development-Projekte.

Ziel ist es, wiederverwendbare Vorgehensmodelle, Ressourcenbeschreibungen und Kontextbausteine zu erarbeiten, die in andere Projekte exportiert werden können. Dadurch soll eine gemeinsame Arbeitsbasis entstehen, mit der Mensch und KI in unterschiedlichen Projekten reproduzierbarer, strukturierter und effizienter zusammenarbeiten können.

## Scope

Zum Epic gehören:

- Aufbau einer allgemeinen Basis für Vorgehensmodelle
- Beschreibung wiederverwendbarer Ressourcen und Architekturentscheidungen
- Standardisierung von Kontextdateien
- Entwicklung eines persönlichen MyAiScrum-Vorgehens
- Definition von Epic-, Story- und Commit-Konventionen
- Reflexion der Zusammenarbeit zwischen Mensch und KI

Nicht zum Epic gehören:

- konkrete Implementierung einer neuen Webapplikation
- operative Auswertung fremder Kontextordner
- automatisierte Qualitätsbewertung von Dokumentation
- vollständige Formalisierung eines Teamprozesses

## Kontext

Dieses Epic entsteht aus der Beobachtung, dass die Arbeit mit KI nicht nur Code erzeugt, sondern auch neue Vorgehensmodelle benötigt.

Die im Projekt `ChatGptDevelopment` erarbeitete Methodik soll nicht im einzelnen Projekt verbleiben. Sie soll als exportierbare Basis dienen, damit andere ChatGPT-Development-Projekte mit denselben methodischen Grundlagen starten können.

Der Ordner `ChatGptBase` bildet dafür die zentrale Sammlung. Er enthält keine konkrete Projektarbeit, sondern beschreibt Methoden, Prozessmuster und Ressourcen, die in konkrete Projekte übernommen werden können.

## Stories

- [ ] Story 3.1: Arbeit an Vorgehensmodellen
- [ ] Story 3.2: Arbeit an allgemeinen Ressourcenbeschreibungen
- [ ] Story 3.3: Verschiedenes und Querschnittliches

## Entscheidungen

- Projektübergreifende Methoden liegen im Ordner `ChatGptBase`.
- Konkrete Epic-Dateien liegen im Kontextordner des jeweiligen Projekts.
- `ChatGptBase` beschreibt die Methode, nicht den konkreten Projektfortschritt.
- Epics und Stories werden als zentrale Strukturierungselemente verwendet.
- Commit-Nachrichten sollen nach Möglichkeit auf Story-Nummern referenzieren.
- Epic 3 wird bewusst in drei breite Arbeitsachsen geschnitten: Vorgehensmodelle, Ressourcenbeschreibungen und Querschnittliches.

## Backlog Und Fortschritt

### Fortschritt Nach Commits

- Offen: Die zugehörigen Commits werden nach der weiteren Ausarbeitung ergänzt.

### Fachlicher Fortschritt

- Erledigt: Der Zweck des Ordners `ChatGptBase` wurde als projektübergreifende Wissens- und Methodensammlung definiert.
- Erledigt: `MyAiScrum` wurde als persönliches High-Level-Vorgehensmodell skizziert.
- Erledigt: Epic- und Story-Nummerierung wurde als Grundlage für spätere Commit-Zuordnung festgelegt.
- Erledigt: Die Story-Struktur wurde auf Vorgehensmodelle, Ressourcenbeschreibungen und Querschnittliches verschlankt.
- Erledigt: Die Methodik unterscheidet nun zwischen prozesszentrischen Epic-Akten und fachlichen `Epic<x>_ContextInfo.md`-Dateien für Chat-Transfer und Einarbeitung.
- Erledigt: Für die bestehenden Epics wurden erste Context-Info-Dateien als operative Zielstruktur angelegt.
- Offen: Weitere Ressourcenbeschreibungen sollen aus wiederkehrenden Architektur- und Infrastrukturentscheidungen abgeleitet werden.
- Offen: Die Exportlogik in andere Projekte soll noch genauer beschrieben werden.
