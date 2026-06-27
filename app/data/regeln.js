/*
 * DS_REGELN — Regeldaten für Dungeonslayers (DS4 SRD+)
 * ====================================================
 *
 * GROUNDED DATA. Alle Werte in dieser Datei stammen wörtlich aus dem
 * DS4-SRD+ und wurden gegen die Quelldateien geprüft. Nichts hier ist
 * "aus dem Gedächtnis" — bei jeder Tabelle steht die Quelle.
 *
 * Quelle der Wahrheit:
 *   https://github.com/RoninEighty/Dungeonslayers  (Branch main, Ordner grw/)
 * Gerenderte Referenz (Deeplink-Ziel):
 *   https://immersieg.de
 *
 * Regeldaten © Christian Kennig, DS4 SRD+ unter CC BY-NC-SA 4.0.
 *
 * Warum .js und nicht .json?  Das Tool soll OFFLINE funktionieren, also auch
 * wenn man index.html direkt per file:// öffnet. Browser blockieren dabei
 * fetch() auf lokale JSON-Dateien. Darum liegen die Tabellen hier als reine
 * Daten in einem globalen Objekt vor (per <script> geladen) — weiterhin
 * "Regeln als Daten, getrennt von der Engine", nur eben script-ladbar.
 */
(function (global) {
  "use strict";

  var DS_REGELN = {
    meta: {
      system: "Dungeonslayers DS4 SRD+",
      lizenz: "CC BY-NC-SA 4.0",
      autor: "Christian Kennig",
      quelle: "https://github.com/RoninEighty/Dungeonslayers",
      referenz: "https://immersieg.de"
    },

    // Deeplinks zu den gerenderten Regelkapiteln (immersieg.de)
    deeplinks: {
      erschaffung: "https://immersieg.de/grw/charaktere-charaktererschaffung.html",
      attribute: "https://immersieg.de/grw/charaktere-attribute-eigenschaften.html",
      erfahrung: "https://immersieg.de/grw/charaktere-erfahrung.html",
      magie: "https://immersieg.de/grw/regeln-magie.html",
      talente: "https://immersieg.de/grw/talente.html",
      zauber: "https://immersieg.de/grw/zaubersprueche.html",
      ausruestung: "https://immersieg.de/grw/ausruestung.html",
      heldenklassen: "https://immersieg.de/grw/charaktere-heldenklassen.html"
    },

    // Die 3 Attribute -> je 2 Eigenschaften
    // Quelle: grw/charaktere-attribute-eigenschaften.md
    attribute: [
      { id: "koer", name: "Körper", kurz: "KÖR", eigenschaften: ["st", "hae"] },
      { id: "agi", name: "Agilität", kurz: "AGI", eigenschaften: ["be", "ge"] },
      { id: "gei", name: "Geist", kurz: "GEI", eigenschaften: ["ve", "au"] }
    ],

    // Die 6 Eigenschaften
    eigenschaften: [
      { id: "st", name: "Stärke", kurz: "ST", attribut: "koer" },
      { id: "hae", name: "Härte", kurz: "HÄ", attribut: "koer" },
      { id: "be", name: "Bewegung", kurz: "BE", attribut: "agi" },
      { id: "ge", name: "Geschick", kurz: "GE", attribut: "agi" },
      { id: "ve", name: "Verstand", kurz: "VE", attribut: "gei" },
      { id: "au", name: "Aura", kurz: "AU", attribut: "gei" }
    ],

    // Erschaffungs-Budgets
    // Quelle: grw/charaktere-charaktererschaffung.md, Schritte 3-4
    erschaffung: {
      attributPunkte: 20, // auf KÖR/AGI/GEI verteilen
      attributMax: 8, // kein Attribut > 8 bei Erschaffung
      eigenschaftPunkte: 8, // auf die 6 Eigenschaften verteilen
      eigenschaftMaxStart: 4, // bei Erschaffung kein Eigenschaftswert > 4 (vor Boni)
      startTP: 1, // jeder Charakter; Mensch +1 (Volksfähigkeit) = 2
      startGold: 10, // 10 GM Startbudget
      startStufe: 1,
      startEP: 0
    },

    // Völker: Volksbonus (Erschaffung, +1 auf EINE Eigenschaft der Auswahl),
    // Cap-Mods (Höchstwert-Bonus) und Volksfähigkeiten.
    // Quelle: grw/charaktere-charaktererschaffung.md (Schritt 1 & 5)
    //         grw/charaktere-erfahrung.md (Eigenschaftshöchstwerte)
    voelker: {
      Elf: {
        name: "Elf",
        // Erschaffungs-Volksbonus: +1 auf EINE dieser Eigenschaften
        bonusWahl: ["be", "ge", "au"],
        bonusMenge: 1,
        // Cap-Bonus (Grundwert 12 +): bei Elf fix auf alle drei
        capBonus: { be: 1, ge: 1, au: 1 },
        faehigkeiten: ["Leichtfüßig (Schleichen +2)", "Nachtsicht", "Unsterblich"],
        // Mechanisch wirksame Volksfähigkeiten:
        effekte: {}
      },
      Mensch: {
        name: "Mensch",
        // +1 auf EINE beliebige Eigenschaft
        bonusWahl: ["st", "hae", "be", "ge", "ve", "au"],
        bonusMenge: 1,
        // Cap-Bonus FREI wählbar: 2 beliebige +1 ODER 1 beliebige +2
        capBonus: null, // wird über char.capWahl modelliert
        capWahlPunkte: 2, // 2 Punkte frei auf Caps verteilen (max +2 je Eigenschaft)
        faehigkeiten: ["1 Talentpunkt gratis"],
        effekte: { startTP: 1 } // +1 TP statt Volksfähigkeiten
      },
      Zwerg: {
        name: "Zwerg",
        bonusWahl: ["st", "hae", "ge"],
        bonusMenge: 1,
        capBonus: { st: 1, hae: 1, ge: 1 },
        faehigkeiten: ["Dunkelsicht", "Langlebig", "Zäh (Abwehr +1)"],
        effekte: { abwehr: 1 } // Zäh: Abwehr +1
      }
    },

    // Klassen: Klassenbonus (Erschaffung), Cap-Mods, LP-Kosten-Spalte.
    // Quelle: grw/charaktere-charaktererschaffung.md (Schritt 2 & 5),
    //         grw/charaktere-erfahrung.md (LP-Kosten, Caps)
    klassen: {
      Krieger: {
        name: "Krieger",
        bonusWahl: ["st", "hae"],
        capBonus: { st: 1, hae: 1 },
        lpSpalte: "Krieger",
        zauberwirker: false
      },
      Späher: {
        name: "Späher",
        bonusWahl: ["be", "ge"],
        capBonus: { be: 1, ge: 1 },
        lpSpalte: "Späher",
        zauberwirker: false
      },
      Zauberwirker: {
        name: "Zauberwirker",
        bonusWahl: ["ve", "au"],
        capBonus: { ve: 1, au: 1 },
        lpSpalte: "Zauberwirker",
        zauberwirker: true,
        // Unterklassen bestimmen die nutzbaren Zauberarten.
        // Quelle: grw/charaktere-charaktererschaffung.md, Schritt 2
        unterklassen: ["Heiler", "Zauberer", "Schwarzmagier"]
      }
    },

    // Grund-Cap für jede Eigenschaft (vor Volks-/Klassen-Mods)
    // Quelle: grw/charaktere-erfahrung.md
    capGrundwert: 12,

    // EP-Stufenleiter. ep = Schwelle Grundklasse, epHeld = Schwelle ab
    // Heldenklasse (gilt ab Stufe 11). lp/tp = Zuwachs pro Stufenaufstieg.
    // Quelle: grw/charaktere-erfahrung.md, "Die Stufenleiter"
    epTabelle: [
      { stufe: 1, ep: 0, epHeld: null, lp: 0, tp: 1 },
      { stufe: 2, ep: 100, epHeld: null, lp: 2, tp: 1 },
      { stufe: 3, ep: 300, epHeld: null, lp: 2, tp: 1 },
      { stufe: 4, ep: 600, epHeld: null, lp: 2, tp: 1 },
      { stufe: 5, ep: 1000, epHeld: null, lp: 2, tp: 1 },
      { stufe: 6, ep: 1500, epHeld: null, lp: 2, tp: 1 },
      { stufe: 7, ep: 2100, epHeld: null, lp: 2, tp: 1 },
      { stufe: 8, ep: 2800, epHeld: null, lp: 2, tp: 1 },
      { stufe: 9, ep: 3600, epHeld: null, lp: 2, tp: 1 },
      { stufe: 10, ep: 4500, epHeld: null, lp: 2, tp: 1 },
      { stufe: 11, ep: 5500, epHeld: 6000, lp: 2, tp: 1 },
      { stufe: 12, ep: 6600, epHeld: 7600, lp: 2, tp: 1 },
      { stufe: 13, ep: 7800, epHeld: 9300, lp: 2, tp: 1 },
      { stufe: 14, ep: 9100, epHeld: 11100, lp: 2, tp: 1 },
      { stufe: 15, ep: 10500, epHeld: 13000, lp: 2, tp: 1 },
      { stufe: 16, ep: 12000, epHeld: 15000, lp: 2, tp: 1 },
      { stufe: 17, ep: 13700, epHeld: 17200, lp: 2, tp: 1 },
      { stufe: 18, ep: 15600, epHeld: 19600, lp: 2, tp: 1 },
      { stufe: 19, ep: 17700, epHeld: 22200, lp: 2, tp: 1 },
      { stufe: 20, ep: 20000, epHeld: 25000, lp: 2, tp: 1 }
    ],

    // LP-Kosten je +1 (nach Klassen-Spalte). Ziele: Eigenschaften, LK, TP.
    // Quelle: grw/charaktere-erfahrung.md, "LP-KOSTEN"
    lpKosten: {
      Krieger:      { st: 2, hae: 2, be: 3, ge: 3, ve: 3, au: 3, lk: 1, tp: 3 },
      Späher:       { st: 3, hae: 3, be: 2, ge: 2, ve: 3, au: 3, lk: 1, tp: 3 },
      Zauberwirker: { st: 3, hae: 3, be: 3, ge: 3, ve: 2, au: 2, lk: 1, tp: 3 }
    },

    // Kampfwert-Formeln. Dokumentation; die Engine implementiert sie in Code.
    // Quelle: grw/charaktere-attribute-eigenschaften.md & charaktere-charaktererschaffung.md (Schritt 8)
    kampfwertFormeln: {
      lebenskraft: "KÖR + HÄ + 10 (+ gekaufte LK)",
      abwehr: "KÖR + HÄ + PA (+ Zwerg: Zäh +1)",
      initiative: "AGI + BE (± Ausrüstungs-Mods)",
      laufen: "AGI/2 + 1 (± Rüstungs-Mods), in Metern",
      schlagen: "KÖR + ST + WB (Nahkampfwaffe)",
      schiessen: "AGI + GE + WB (Fernkampfwaffe)",
      zaubern: "GEI + AU + ZB − PA (ZB = Zauberbonus des aktiven Spruchs)",
      zielzauber: "GEI + GE + ZB − PA"
    },

    // Waffen: WB + kampfrelevante Mods.  art: 'nah' | 'fern' | 'beides'
    // Quelle: grw/ausruestung.md, Tabelle WAFFEN
    waffen: [
      { name: "Waffenlos", wb: 0, art: "nah", besonderes: "Gegner kein Abwehr-Bonus … (Gegnerabwehr +5)" },
      { name: "Axt", wb: 1, art: "nah" },
      { name: "Armbrust, leicht (2h)", wb: 2, art: "fern", mods: { init: -2 } },
      { name: "Armbrust, schwer (2h)", wb: 3, art: "fern", mods: { init: -4 }, besonderes: "Gegnerabwehr -2" },
      { name: "Bihänder (2h)", wb: 3, art: "nah", mods: { init: -2 }, besonderes: "Gegnerabwehr -4; für Zwerge zu unhandlich" },
      { name: "Bogen, Elfen- (2h)", wb: 3, art: "fern", mods: { init: 1 }, besonderes: "für Zwerge zu unhandlich" },
      { name: "Bogen, Kurz- (2h)", wb: 1, art: "fern", mods: { init: 1 } },
      { name: "Bogen, Lang- (2h)", wb: 2, art: "fern", mods: { init: 1 }, besonderes: "für Zwerge zu unhandlich" },
      { name: "Dolch", wb: 0, art: "nah", mods: { init: 1 } },
      { name: "Flegel", wb: 2, art: "nah", mods: { init: -2 } },
      { name: "Hammer", wb: 1, art: "nah", besonderes: "Gegnerabwehr -1" },
      { name: "Hellebarde (2h)", wb: 2, art: "nah", mods: { init: -2 } },
      { name: "Kampfstab (2h)", wb: 1, art: "nah", mods: { zielzauber: 1 } },
      { name: "Keule", wb: 1, art: "nah" },
      { name: "Lanze", wb: 1, art: "nah", besonderes: "Trab WB+1 / Galopp WB+4 (nur beritten)" },
      { name: "Schlachtbeil (2h)", wb: 4, art: "nah", mods: { init: -6 }, besonderes: "Gegnerabwehr -4; für Zwerge zu unhandlich" },
      { name: "Schlachtgeißel", wb: 3, art: "nah", mods: { init: -4 }, besonderes: "Gegnerabwehr -4" },
      { name: "Schlagring", wb: 0, art: "nah", besonderes: "wie waffenlos, Gegner aber kein Abwehr-Bonus" },
      { name: "Schleuder", wb: 0, art: "fern", besonderes: "Distanzmalus -1 pro 2m" },
      { name: "Schwert, Breit-", wb: 1, art: "nah", besonderes: "Gegnerabwehr -2" },
      { name: "Schwert, Kurz-", wb: 1, art: "nah", besonderes: "auch Krummsäbel" },
      { name: "Schwert, Lang-", wb: 2, art: "nah", besonderes: "auch Krummschwert" },
      { name: "Speer", wb: 1, art: "beides" },
      { name: "Streitaxt (2h)", wb: 3, art: "nah", mods: { init: -2 } },
      { name: "Streithammer (2h)", wb: 3, art: "nah", mods: { init: -4 } },
      { name: "Streitkolben/Morgenstern", wb: 1, art: "nah", besonderes: "Gegnerabwehr -1" },
      { name: "Wurfmesser", wb: 0, art: "beides", besonderes: "Distanzmalus -1 pro 2m" },
      { name: "Zwergenaxt (2h)", wb: 3, art: "nah", mods: { init: -1 }, besonderes: "Gegnerabwehr -2" }
    ],

    // Rüstungen & Schilde: PA + Mods (laufen in Metern, init, eigenschaft au).
    // Mehrere Teile (Körper + Helm + Schienen + Schild) stapeln.
    // Quelle: grw/ausruestung.md, Tabelle RÜSTUNGEN
    ruestungen: [
      { name: "Kettenpanzer", pa: 2, slot: "koerper", mods: { laufen: -0.5 } },
      { name: "Lederschienen", pa: 1, slot: "schienen", besonderes: "Arm & Bein" },
      { name: "Lederpanzer", pa: 1, slot: "koerper" },
      { name: "Metallhelm", pa: 1, slot: "helm", mods: { init: -1 } },
      { name: "Plattenarmschienen", pa: 1, slot: "schienen", mods: { laufen: -0.5 } },
      { name: "Plattenbeinschienen", pa: 1, slot: "schienen", mods: { laufen: -0.5 } },
      { name: "Plattenpanzer", pa: 3, slot: "koerper", mods: { laufen: -1 } },
      { name: "Robe", pa: 0, slot: "koerper", stoff: true },
      { name: "Robe (runenbestickt)", pa: 0, slot: "koerper", stoff: true, mods: { au: 1 } },
      { name: "Schild, Holz-", pa: 1, slot: "schild", besonderes: "zerbricht bei Abwehr-Patzer" },
      { name: "Schild, Metall-", pa: 1, slot: "schild", mods: { laufen: -0.5 } },
      { name: "Schild, Turm-", pa: 2, slot: "schild", mods: { laufen: -1 } }
    ]
  };

  global.DS_REGELN = DS_REGELN;
})(typeof window !== "undefined" ? window : this);
