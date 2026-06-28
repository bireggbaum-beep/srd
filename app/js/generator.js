/*
 * DS_GEN — Zufalls-Charaktergenerator für Dungeonslayers (DS4)
 * ===========================================================
 *
 * Erzeugt regelkonforme Charaktere, indem es die bestehende Engine
 * wiederverwendet (keine eigene Regel-Logik, damit nichts auseinanderläuft):
 *   1. zufällige, gültige Erschaffung  -> DS_ENGINE.erschaffeChar
 *   2. auf Zielstufe bringen           -> DS_ENGINE.epEintragen
 *   3. Lernpunkte regelkonform ausgeben -> DS_ENGINE.lpAusgeben (+ Cap-Prüfung)
 *   4. Talente / Zauber                -> generateTalente / generateZauber
 *
 * Jedes Feld kann fest vorgegeben ODER auf "zufällig" (Wert null/"zufall")
 * gesetzt werden: Volk, Klasse, Unterklasse, Stufe, Geschlecht, Name.
 *
 * ERWEITERBARKEIT (Talente & Zauber):
 *   generateTalente() und generateZauber() sind bereits verdrahtet, ruhen aber,
 *   solange DS_REGELN.talente bzw. DS_REGELN.zauber fehlen. Sobald diese
 *   Datentabellen existieren (geplante Schemata siehe unten), vergeben sie
 *   automatisch TP an gültige Talente bzw. füllen das Zauber-Budget — ohne
 *   Änderung am Generator-Aufruf.
 */
(function (global) {
  "use strict";

  var R = global.DS_REGELN;
  var E = global.DS_ENGINE;

  // ---- Zufalls-Helfer ------------------------------------------------------
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function choice(arr) { return arr[randInt(0, arr.length - 1)]; }
  function weightedChoice(items) { // items: [{ v, w }]
    var total = items.reduce(function (s, i) { return s + i.w; }, 0);
    var r = Math.random() * total;
    for (var i = 0; i < items.length; i++) { r -= items[i].w; if (r <= 0) return items[i].v; }
    return items[items.length - 1].v;
  }

  // Verteilt 'total' Punkte zufällig & gültig auf 'keys' (je min..max).
  function verteile(total, keys, min, max) {
    var out = {};
    keys.forEach(function (k) { out[k] = min; });
    var rest = total - min * keys.length;
    var guard = 0;
    while (rest > 0 && guard++ < 1000) {
      var offen = keys.filter(function (k) { return out[k] < max; });
      if (!offen.length) break;
      out[choice(offen)] += 1;
      rest--;
    }
    return out;
  }

  // ---- Namens-Pool (reine Flavor-Daten, keine Regeln) ----------------------
  var NAMEN = {
    Elf:    ["Aelar", "Caelynn", "Faelar", "Illyra", "Jherrant", "Lios", "Mirae", "Sylvaris", "Thalionel", "Yllithra"],
    Mensch: ["Aldric", "Brenna", "Cedric", "Dara", "Gerwulf", "Halsten", "Kalthor", "Mara", "Roderick", "Wynn"],
    Zwerg:  ["Borin", "Dwalish", "Gruffneck", "Harngrim", "Korbin", "Morgran", "Nalda", "Thrain", "Vesna", "Durgan"]
  };
  function zufallsName(volk) { return choice(NAMEN[volk] || NAMEN.Mensch); }

  // =========================================================================
  // Hauptfunktion
  // =========================================================================
  // opt = { name, geschlecht, volk, klasse, unterklasse, stufe }
  //   - fehlend / null / "zufall"  => zufällig
  //   - stufe: Zahl 1..20 oder zufällig
  function generate(opt) {
    opt = opt || {};
    function fix(val, randFn) {
      return (val === null || val === undefined || val === "" || val === "zufall") ? randFn() : val;
    }

    var volk = fix(opt.volk, function () { return choice(Object.keys(R.voelker)); });
    var klasse = fix(opt.klasse, function () { return choice(Object.keys(R.klassen)); });
    var klasseDef = R.klassen[klasse];

    var unterklasse = null;
    if (klasseDef.zauberwirker) {
      unterklasse = fix(opt.unterklasse, function () { return choice(klasseDef.unterklassen); });
    }

    var geschlecht = fix(opt.geschlecht, function () { return choice(["männlich", "weiblich"]); });
    var name = fix(opt.name, function () { return zufallsName(volk); });
    var stufe = parseInt(fix(opt.stufe, function () { return randInt(1, 20); }), 10);
    if (isNaN(stufe) || stufe < 1) stufe = 1;
    if (stufe > 20) stufe = 20;

    // 1) Klassen-fokussierte, gültige Erschaffung (Attr. 4..8 = 20, Eig. 0..4 = 8)
    var volkDef = R.voelker[volk];
    var eingaben = {
      name: name, geschlecht: geschlecht, volk: volk, klasse: klasse, unterklasse: unterklasse,
      attribute: zufallsAttribute(klasse),
      eigenschaftenRoh: zufallsEigenschaften(klasse),
      volksbonus: choice(volkDef.bonusWahl),
      klassenbonus: choice(klasseDef.bonusWahl),
      capWahl: volk === "Mensch" ? zufallsCapWahl() : null
    };
    var char = E.erschaffeChar(eingaben);

    // 2) Auf Zielstufe bringen (EP = Schwelle der Zielstufe; verbucht LP/TP)
    if (stufe > 1) {
      var ep = E.epSchwelle(stufe, char.heldenklasse);
      E.epEintragen(char, ep);
    }

    // 3) Lernpunkte regelkonform & klassen-fokussiert ausgeben (Engine prüft Caps)
    verteileLernpunkte(char);

    // 4) Sinnvolle Startausrüstung (skaliert mit Stufe; SRD-Listen, Zwerg-Filter)
    ausruesten(char);

    // 5) Talente & Zauber (ruhen, bis ihre Datentabellen existieren)
    generateTalente(char);
    generateZauber(char);

    E.log(char, "Zufallsgenerator", "automatisch erzeugt (Stufe " + char.stufe + ")");
    return char;
  }

  function zufallsCapWahl() {
    var eig = ["st", "hae", "be", "ge", "ve", "au"];
    var cw = { st: 0, hae: 0, be: 0, ge: 0, ve: 0, au: 0 };
    if (Math.random() < 0.5) { // 1 Eigenschaft +2
      cw[choice(eig)] = 2;
    } else { // 2 verschiedene Eigenschaften +1
      var a = choice(eig); var b; do { b = choice(eig); } while (b === a);
      cw[a] = 1; cw[b] = 1;
    }
    return cw;
  }

  // Primärattribut & klassentypische Eigenschaften (Erschaffung/LP/Ausrüstung).
  // KLASSEN_EIG ist PRIMÄR-zuerst sortiert: [0] = Hauptkampfwert-Treiber
  // (Schaden), [1] = Sekundärwert. Krieger Schlagen=KÖR+ST -> ST primär;
  // Späher Schießen=AGI+GE -> GE primär; Zauberwirker Zaubern=GEI+AU -> AU primär.
  var PRIMAERATTRIBUT = { Krieger: "koer", Späher: "agi", Zauberwirker: "gei" };
  var KLASSEN_EIG = { Krieger: ["st", "hae"], Späher: ["ge", "be"], Zauberwirker: ["au", "ve"] };

  // Attribute klassen-fokussiert: Primärattribut hoch, Rest gestreut (je 4..8, Σ20).
  function zufallsAttribute(klasse) {
    var prim = PRIMAERATTRIBUT[klasse] || "koer";
    var a = { koer: 4, agi: 4, gei: 4 };
    var rest = R.erschaffung.attributPunkte - 12; // 8 Punkte zu verteilen
    var boost = Math.min(R.erschaffung.attributMax - 4, randInt(2, 4));
    a[prim] += boost; rest -= boost;
    var keys = ["koer", "agi", "gei"], guard = 0;
    while (rest > 0 && guard++ < 100) {
      var offen = keys.filter(function (k) { return a[k] < R.erschaffung.attributMax; });
      if (!offen.length) break;
      a[choice(offen)] += 1; rest--;
    }
    return a;
  }

  // Eigenschaften klassen-fokussiert: Klassenwerte zuerst (je max 4 bei Start, Σ8).
  function zufallsEigenschaften(klasse) {
    var prefs = KLASSEN_EIG[klasse] || [];
    var e = { st: 0, hae: 0, be: 0, ge: 0, ve: 0, au: 0 };
    var rest = R.erschaffung.eigenschaftPunkte;
    prefs.forEach(function (p) {
      var add = Math.min(R.erschaffung.eigenschaftMaxStart, randInt(2, 4), rest);
      e[p] += add; rest -= add;
    });
    var keys = Object.keys(e), guard = 0;
    while (rest > 0 && guard++ < 100) {
      var offen = keys.filter(function (k) { return e[k] < R.erschaffung.eigenschaftMaxStart; });
      if (!offen.length) break;
      e[choice(offen)] += 1; rest--;
    }
    return e;
  }

  // Gibt offene LP aus: stark fokussiert auf die Klassenwerte, HÄ/LK für
  // Überlebensfähigkeit, Rest als Füller. Engine-Prüfung -> nie über Cap.
  function verteileLernpunkte(char) {
    var pref = KLASSEN_EIG[char.klasse] || [];
    var primaer = pref[0], sekundaer = pref[1];
    // ~25 % des LP-Budgets sind für Überleben reserviert (Lebenskraft, Kosten 1
    // = effizienteste HP), damit kein Charakter zur Glaskanone wird.
    var budget = char.konten.lpOffen;
    var survivalReserve = Math.round(budget * 0.25);

    // Phase 1 — Offensive: Primärwert (Schaden) am stärksten, dann Sekundärwert,
    // HÄ als Überlebens-Nebenwert; bis nur noch die Überlebens-Reserve übrig ist.
    var offensiv = ["st", "hae", "be", "ge", "ve", "au"];
    var guard = 0;
    while (char.konten.lpOffen > survivalReserve && guard++ < 500) {
      var kandidaten = [];
      offensiv.forEach(function (z) {
        if (!E.pruefeLpAusgabe(char, z).ok) return;
        var w;
        if (z === primaer) w = 10;          // Hauptkampfwert: am stärksten
        else if (z === sekundaer) w = 4;    // Sekundärwert
        else if (z === "hae") w = 2;        // Härte: Überleben (falls nicht pref)
        else w = 1;                         // off-class: selten
        kandidaten.push({ v: z, w: w });
      });
      if (!kandidaten.length) break;
      E.lpAusgeben(char, weightedChoice(kandidaten));
    }

    // Phase 2 — Überleben: restliche LP in Lebenskraft (immer verfügbar, Kosten 1).
    guard = 0;
    while (E.pruefeLpAusgabe(char, "lk").ok && guard++ < 500) {
      E.lpAusgeben(char, "lk");
    }

    // Phase 3 — Sicherheitsnetz: falls doch noch LP offen, in irgendein gültiges Ziel.
    guard = 0;
    while (guard++ < 500) {
      var rest = ["ve", "au", "st", "hae", "be", "ge"].filter(function (z) { return E.pruefeLpAusgabe(char, z).ok; });
      if (!rest.length) break;
      E.lpAusgeben(char, rest[0]);
    }
  }

  // Sinnvolle Startausrüstung je Klasse, skaliert mit der Stufe.
  // Alle Werte aus den SRD-Listen (DS_REGELN.waffen/.ruestungen).
  function ausruesten(char) {
    var volk = char.volk, stufe = char.stufe;
    // "Für Zwerge zu unhandlich"-Waffen für Zwerge ausschließen.
    function pickWaffe(namen) {
      var opts = namen.filter(function (n) {
        var w = E.findeWaffe(n);
        return w && !(volk === "Zwerg" && /Zwerge/.test(w.besonderes || ""));
      });
      return opts.length ? choice(opts) : null;
    }
    if (char.klasse === "Krieger") {
      char.ausruestung.nahwaffe = pickWaffe(["Schwert, Lang-", "Schwert, Breit-", "Streitaxt (2h)", "Bihänder (2h)", "Streithammer (2h)", "Axt"]);
      var koerper = stufe >= 12 ? "Plattenpanzer" : (stufe >= 6 ? "Kettenpanzer" : "Lederpanzer");
      char.ausruestung.ruestungen = [koerper];
      if (Math.random() < 0.5) char.ausruestung.ruestungen.push("Schild, Metall-");
      if (Math.random() < 0.5) char.ausruestung.ruestungen.push("Metallhelm");
    } else if (char.klasse === "Späher") {
      char.ausruestung.fernwaffe = pickWaffe(["Bogen, Lang-", "Bogen, Kurz-", "Armbrust, leicht (2h)"]);
      char.ausruestung.nahwaffe = pickWaffe(["Schwert, Kurz-", "Dolch", "Axt"]);
      char.ausruestung.ruestungen = ["Lederpanzer"];
      if (Math.random() < 0.4) char.ausruestung.ruestungen.push("Lederschienen");
    } else { // Zauberwirker
      char.ausruestung.nahwaffe = "Kampfstab (2h)";
      char.ausruestung.ruestungen = [Math.random() < 0.5 ? "Robe (runenbestickt)" : "Robe"];
    }
    E.log(char, "Ausrüstung", "Startausrüstung generiert (" + char.klasse + ", Stufe " + stufe + ")");
  }

  // =========================================================================
  // HOOKS für Talente & Zauber — dormant bis Datentabellen existieren
  // =========================================================================
  // Erwartetes Schema (siehe PROJEKT §5):
  //   DS_REGELN.talente = [ { name, voraussetzungen: { <Klasse>: minStufe, ... }, maxRang, ... } ]
  //   DS_REGELN.zauber  = [ { name, stufe, klassen: [ "Heiler", ... ], ... } ]
  function generateTalente(char) {
    var T = R.talente;
    if (!T || !T.length) return; // noch keine Talentdaten -> TP bleiben gespart
    var guard = 0;
    while ((char.konten.tpOffen || 0) > 0 && guard++ < 300) {
      var moeglich = T.filter(function (t) { return talentMoeglich(char, t); });
      if (!moeglich.length) break;
      try { E.talentLernen(char, choice(moeglich).name); }
      catch (e) { break; }
    }
  }

  function talentMoeglich(char, t) {
    var vs = t.voraussetzungen || {};
    // Nicht gelistete Klassen können das Talent gar nicht lernen.
    var klasse = char.heldenklasse || char.klasse;
    var minStufe = vs[char.klasse]; // Grundklasse maßgeblich (Heldenklassen erben sie)
    if (minStufe == null && char.unterklasse != null) minStufe = vs[char.unterklasse];
    if (minStufe == null && klasse !== char.klasse) minStufe = vs[klasse];
    if (minStufe == null || char.stufe < minStufe) return false;
    if (t.maxRang) {
      var cur = (char.talente.filter(function (x) { return x.name === t.name; })[0] || {}).rang || 0;
      if (cur >= t.maxRang) return false;
    }
    return true;
  }

  function generateZauber(char) {
    var Z = R.zauber;
    if (!Z || !Z.length || !E.istZauberwirker(char)) return; // noch keine Zauberdaten
    var art = char.unterklasse; // Heiler/Zauberer/Schwarzmagier
    // Zugängliche Sprüche bis zur aktuellen Stufe.
    var pool = Z.filter(function (z) {
      var klassenOk = !z.klassen || z.klassen.indexOf(art) >= 0;
      return klassenOk && (z.stufe || 1) <= char.stufe;
    });
    if (!pool.length) return;
    // Budget: pro erreichter Stufe ist die Stufensumme neuer Sprüche <= Stufe.
    // Vereinfacht für die Generierung: kumuliertes Budget = Summe(1..stufe).
    var budget = 0;
    for (var s = 1; s <= char.stufe; s++) budget += s;
    var verbleibend = budget - E.zauberStufensumme(char);
    var guard = 0;
    while (verbleibend > 0 && guard++ < 300) {
      var bezahlbar = pool.filter(function (z) {
        return (z.stufe || 1) <= verbleibend &&
          !char.zauber.some(function (g) { return g.name === z.name; });
      });
      if (!bezahlbar.length) break;
      var pick = choice(bezahlbar);
      E.zauberLernen(char, pick.name, pick.stufe || 1);
      verbleibend -= (pick.stufe || 1);
    }
  }

  global.DS_GEN = {
    generate: generate,
    zufallsName: zufallsName,
    // exportiert für Tests:
    _verteile: verteile,
    _verteileLernpunkte: verteileLernpunkte
  };
})(typeof window !== "undefined" ? window : this);
