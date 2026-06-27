# Dungeonslayers DS4 — Charakterverwaltung (App)

Statisches, offline-fähiges Verwaltungstool für den Spielleiter. Vanilla
JS/HTML, **kein Backend**. Öffnen per GitHub Pages (`/app/`) oder direkt
`app/index.html` im Browser (`file://`).

## Aufbau

```
app/
├── index.html        Shell (lädt Daten → Engine → Store → App)
├── styles.css        Styling
├── data/
│   └── regeln.js     GROUNDED Regeldaten (EP-Leiter, LP-Kosten, Völker,
│                     Klassen, Caps, Kampfwert-Formeln, Waffen-WB, Rüstungs-PA).
│                     Alle Werte wörtlich aus dem DS4 SRD+ verifiziert.
└── js/
    ├── engine.js     Reine Regel-Logik (DOM-frei, auditierbar):
    │                 Caps, Kampfwerte, LP-Kosten/-Prüfung, EP→Stufe,
    │                 Stufenaufstieg, Talente, Zauber, Erschaffungs-Validierung.
    ├── store.js      Persistenz: localStorage-Roster + JSON Import/Export.
    └── app.js        UI: Roster, Erschaffungs-Assistent, Charakterblatt,
                      Aufstiegs-Assistent.
```

### Warum `.js` statt `.json` für die Regeldaten?

Damit das Tool **offline** (per `file://`) funktioniert. Browser blockieren
dort `fetch()` auf lokale JSON-Dateien. Die Tabellen liegen deshalb als reine
Daten in einem globalen Objekt (`DS_REGELN`) vor, per `<script>` geladen —
weiterhin „Regeln als Daten, getrennt von der Engine", nur script-ladbar.

## Persistenz-Workflow (versionierte Kampagne)

1. In der App arbeiten (Erschaffung, Aufstiege). Stand liegt in `localStorage`.
2. **Export JSON** lädt `<id>.json` herunter.
3. Datei nach `charaktere/<id>.json` ins Repo committen → jeder Aufstieg ist ein
   Commit, die Kampagnen-Historie ist versioniert und unkaputtbar.
4. Auf einem anderen Rechner / nach Reset: **Import** der JSON-Datei.

> Hinweis Sichtbarkeit: GitHub-Pages-Seiten sind öffentlich. Wer Charakterdaten
> privat halten will, committet die `charaktere/*.json` nur ins (private) Repo
> und nutzt sie lokal über Import/Export — sie müssen nicht auf Pages liegen.

## Stand & nächste Schritte

Umgesetzt: Schicht 1 (Regeldaten, Schema, validierte Erschaffung, Roster,
Persistenz) **und** Schicht 2 (Aufstiegs-Assistent: EP/LP/TP-Ökonomie, Caps,
Talente, Zauber-Budget, Heldenklasse, Ausrüstungseffekte).

Noch offen (Schicht 3+): strukturierte Talent- und Zauberlisten mit
Voraussetzungs-/Budget-Prüfung (aus `talente.md` / `zaubersprueche.md`),
Heldenklassen-Details ab Stufe 10, Druck-/PDF-Export passend zum Papierbogen.
Aktuell sind Talente und Zauber frei eintragbar.

## Lizenz

Regeldaten © Christian Kennig, [DS4 SRD+](https://github.com/RoninEighty/Dungeonslayers)
unter CC BY-NC-SA 4.0.
