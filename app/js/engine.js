/*
 * DS_ENGINE — Regel-Engine für Dungeonslayers (DS4)
 * =================================================
 *
 * Reine Logik, kein DOM. Liest ausschließlich DS_REGELN (Tabellen) und
 * arbeitet auf Charakter-Objekten. Damit ist sie per Konstruktion
 * regeltreu und auditierbar.
 *
 * Charakter-Schema (siehe auch store.js -> leererCharakter):
 *   { id, name, geschlecht, volk, klasse, unterklasse, heldenklasse,
 *     stufe, ep,
 *     attribute:    { koer, agi, gei },
 *     eigenschaften:{ st, hae, be, ge, ve, au },   // aktuelle Werte (inkl. Boni)
 *     capWahl:      { ... },                        // nur Mensch: Cap-Verteilung
 *     lkGekauft:    0,                              // per LP zugekaufte LK
 *     konten:       { lpOffen, tpOffen },
 *     talente:      [ { name, rang } ],
 *     zauber:       [ { name, stufe } ],
 *     ausruestung:  { nahwaffe, fernwaffe, ruestungen:[name], inventar:[] },
 *     sprachen: [], schriftzeichen: [],
 *     notizen: "",
 *     log: [ { ts, stufe, aktion, details } ] }
 */
(function (global) {
  "use strict";

  var R = global.DS_REGELN;

  var EIG = ["st", "hae", "be", "ge", "ve", "au"];

  // ---- kleine Helfer -------------------------------------------------------

  function lpSpalte(char) {
    var k = R.klassen[char.klasse];
    return k ? k.lpSpalte : "Krieger";
  }

  function istZauberwirker(char) {
    var k = R.klassen[char.klasse];
    return !!(k && k.zauberwirker);
  }

  function findeWaffe(name) {
    if (!name) return null;
    for (var i = 0; i < R.waffen.length; i++) if (R.waffen[i].name === name) return R.waffen[i];
    return null;
  }
  function findeRuestung(name) {
    if (!name) return null;
    for (var i = 0; i < R.ruestungen.length; i++) if (R.ruestungen[i].name === name) return R.ruestungen[i];
    return null;
  }

  // ---- Eigenschaftshöchstwerte (Caps) -------------------------------------
  // Cap = Grundwert 12 + Volks-Cap-Bonus + Klassen-Cap-Bonus.
  // Mensch verteilt seinen Cap-Bonus frei über char.capWahl.
  function caps(char) {
    var out = {};
    var volk = R.voelker[char.volk];
    var klasse = R.klassen[char.klasse];
    EIG.forEach(function (e) {
      var c = R.capGrundwert;
      if (volk && volk.capBonus) c += volk.capBonus[e] || 0;
      if ((!volk || !volk.capBonus) && char.capWahl) c += char.capWahl[e] || 0; // Mensch
      if (klasse && klasse.capBonus) c += klasse.capBonus[e] || 0;
      out[e] = c;
    });
    return out;
  }

  // ---- Kampfwerte (abgeleitet) --------------------------------------------
  function ausruestungsMods(char) {
    var m = { pa: 0, paNichtStoff: 0, laufen: 0, init: 0, au: 0 };
    var liste = (char.ausruestung && char.ausruestung.ruestungen) || [];
    liste.forEach(function (name) {
      var r = findeRuestung(name);
      if (!r) return;
      m.pa += r.pa || 0;
      if (!r.stoff) m.paNichtStoff += r.pa || 0;
      if (r.mods) {
        m.laufen += r.mods.laufen || 0;
        m.init += r.mods.init || 0;
        m.au += r.mods.au || 0;
      }
    });
    return m;
  }

  function kampfwerte(char) {
    var a = char.attribute, e = char.eigenschaften;
    var koer = a.koer, agi = a.agi, gei = a.gei;
    var volk = R.voelker[char.volk] || {};
    var ve = (volk.effekte) || {};
    var mods = ausruestungsMods(char);

    var nah = findeWaffe(char.ausruestung && char.ausruestung.nahwaffe);
    var fern = findeWaffe(char.ausruestung && char.ausruestung.fernwaffe);
    var wbNah = nah ? nah.wb : 0;
    var wbFern = fern ? fern.wb : 0;
    var zielzauberWB = (nah && nah.mods && nah.mods.zielzauber) || 0;

    var auEff = e.au + mods.au; // z.B. runenbestickte Robe: AU +1
    var laufen = agi / 2 + 1 + mods.laufen;

    return {
      lebenskraft: koer + e.hae + 10 + (char.lkGekauft || 0),
      abwehr: koer + e.hae + mods.pa + (ve.abwehr || 0),
      initiative: agi + e.be + mods.init,
      laufen: Math.round(laufen * 10) / 10,
      schlagen: koer + e.st + wbNah,
      schiessen: agi + e.ge + wbFern,
      // ZB (Zauberbonus des aktiven Spruchs) ist spruchabhängig -> hier 0 (Grundwert).
      zaubern: gei + auEff - mods.paNichtStoff,
      zielzauber: gei + e.ge + zielzauberWB - mods.paNichtStoff,
      _pa: mods.pa,
      _hinweise: {
        nahwaffe: nah,
        fernwaffe: fern,
        zauberHinweis: "ZB des aktiven Spruchs noch addieren"
      }
    };
  }

  // ---- Lernpunkte (LP) -----------------------------------------------------
  // Gültige Ziele: Eigenschaften (st..au), 'lk', 'tp', 'sprache', 'schriftzeichen'.
  function lpKosten(char, ziel) {
    var sp = R.lpKosten[lpSpalte(char)];
    if (ziel === "sprache" || ziel === "schriftzeichen") return 1;
    if (sp && sp[ziel] != null) return sp[ziel];
    return null;
  }

  // Prüft, ob eine LP-Ausgabe regelkonform möglich ist.
  function pruefeLpAusgabe(char, ziel) {
    var kosten = lpKosten(char, ziel);
    if (kosten == null) return { ok: false, grund: "Unbekanntes Ziel: " + ziel };
    if ((char.konten.lpOffen || 0) < kosten)
      return { ok: false, grund: "Nicht genug LP (" + char.konten.lpOffen + " vorhanden, " + kosten + " nötig)" };
    if (EIG.indexOf(ziel) >= 0) {
      var cap = caps(char)[ziel];
      if (char.eigenschaften[ziel] >= cap)
        return { ok: false, grund: "Höchstwert erreicht (Cap " + cap + ")" };
    }
    return { ok: true, kosten: kosten };
  }

  // Führt die LP-Ausgabe durch (mutiert char) und schreibt ins Log.
  function lpAusgeben(char, ziel, detail) {
    var p = pruefeLpAusgabe(char, ziel);
    if (!p.ok) throw new Error(p.grund);
    char.konten.lpOffen -= p.kosten;
    if (EIG.indexOf(ziel) >= 0) {
      char.eigenschaften[ziel] += 1;
    } else if (ziel === "lk") {
      char.lkGekauft = (char.lkGekauft || 0) + 1;
    } else if (ziel === "tp") {
      char.konten.tpOffen += 1;
    } else if (ziel === "sprache") {
      if (detail) char.sprachen.push(detail);
    } else if (ziel === "schriftzeichen") {
      if (detail) char.schriftzeichen.push(detail);
    }
    log(char, "LP ausgegeben", labelZiel(ziel) + (detail ? " (" + detail + ")" : "") + " +1 für " + p.kosten + " LP");
    return char;
  }

  function labelZiel(ziel) {
    if (ziel === "lk") return "Lebenskraft";
    if (ziel === "tp") return "Talentpunkt";
    if (ziel === "sprache") return "Sprache";
    if (ziel === "schriftzeichen") return "Schriftzeichen";
    var found = R.eigenschaften.filter(function (x) { return x.id === ziel; })[0];
    return found ? found.name : ziel;
  }

  // ---- EP / Stufenaufstieg -------------------------------------------------
  function epSchwelle(stufe, heldenklasse) {
    var row = R.epTabelle.filter(function (r) { return r.stufe === stufe; })[0];
    if (!row) return null;
    if (heldenklasse && row.epHeld != null) return row.epHeld;
    return row.ep;
  }

  // Höchste erreichte Stufe für gegebene EP.
  function stufeFuerEp(ep, heldenklasse) {
    var stufe = 1;
    for (var i = 0; i < R.epTabelle.length; i++) {
      var s = R.epTabelle[i].stufe;
      var schwelle = epSchwelle(s, heldenklasse);
      if (ep >= schwelle) stufe = s; else break;
    }
    return stufe;
  }

  function naechsteStufe(char) {
    if (char.stufe >= 20) return null;
    var s = char.stufe + 1;
    return { stufe: s, ep: epSchwelle(s, char.heldenklasse) };
  }

  // Trägt einen neuen EP-Stand ein und löst fällige Stufenaufstiege aus.
  // Gibt eine Liste der gewonnenen Stufen zurück (für die UI).
  function epEintragen(char, neueEp) {
    neueEp = Math.max(0, Math.floor(neueEp));
    var altStufe = char.stufe;
    char.ep = neueEp;
    var zielStufe = stufeFuerEp(neueEp, char.heldenklasse);
    var gewonnen = [];
    while (char.stufe < zielStufe) {
      var s = char.stufe + 1;
      var row = R.epTabelle.filter(function (r) { return r.stufe === s; })[0];
      char.stufe = s;
      char.konten.lpOffen += row.lp;
      char.konten.tpOffen += row.tp;
      var info = { stufe: s, lp: row.lp, tp: row.tp, zauberBudget: istZauberwirker(char) ? s : 0 };
      gewonnen.push(info);
      log(char, "Stufenaufstieg", "Stufe " + s + ": +" + row.lp + " LP, +" + row.tp + " TP" +
        (info.zauberBudget ? ", Zauber-Budget " + info.zauberBudget : ""));
    }
    if (gewonnen.length === 0 && neueEp !== char.ep) {
      // nur EP-Update ohne Aufstieg
    }
    log(char, "EP eingetragen", "EP = " + neueEp + (gewonnen.length ? " (Stufe " + altStufe + " → " + char.stufe + ")" : ""));
    return gewonnen;
  }

  // Zauberwirker-Budget bei Stufenaufstieg: Summe der erlernbaren Spruchstufen
  // entspricht der neuen Charakterstufe.
  function zauberBudget(stufe) {
    return stufe;
  }

  // ---- Talente -------------------------------------------------------------
  // Talent-Definition (aus DS_REGELN.talente) per Name finden.
  function talentDef(name) {
    var T = R.talente;
    if (!T) return null;
    return T.filter(function (t) { return t.name === name; })[0] || null;
  }

  // Bester Zugang eines Charakters zu einem Talent (über Grundklasse,
  // Unterklasse und ggf. Heldenklasse): kleinste Mindeststufe, höchster Rang.
  function talentZugang(char, t) {
    if (!t || !t.zugang) return null;
    var keys = [char.klasse];
    if (char.unterklasse) keys.push(char.unterklasse);
    if (char.heldenklasse) keys.push(char.heldenklasse);
    var best = null;
    keys.forEach(function (k) {
      var z = t.zugang[k];
      if (!z) return;
      if (!best) best = { ab: z.ab, rang: z.rang };
      else { best.ab = Math.min(best.ab, z.ab); best.rang = Math.max(best.rang, z.rang); }
    });
    return best;
  }

  function aktuellerRang(char, name) {
    var t = char.talente.filter(function (x) { return x.name === name; })[0];
    return t ? t.rang : 0;
  }

  // Kann der Charakter dieses Talent (weiter) erlernen?
  function talentVerfuegbar(char, t) {
    var z = talentZugang(char, t);
    if (!z) return { ok: false, grund: char.klasse + " kann dieses Talent nicht lernen" };
    if (char.stufe < z.ab) return { ok: false, grund: "Erst ab Stufe " + z.ab };
    if (aktuellerRang(char, t.name) >= z.rang) return { ok: false, grund: "Maximalrang " + z.rang + " erreicht" };
    if ((char.konten.tpOffen || 0) < 1) return { ok: false, grund: "Kein Talentpunkt offen" };
    return { ok: true, ab: z.ab, maxRang: z.rang };
  }

  // Talent hinzufügen / Rang erhöhen, kostet 1 TP pro Rang.
  // Mit Talentdaten (DS_REGELN.talente) wird die Voraussetzung geprüft;
  // ohne Daten (frühe Phase) bleibt es frei eintragbar.
  function talentLernen(char, name) {
    if ((char.konten.tpOffen || 0) < 1) throw new Error("Kein Talentpunkt verfügbar");
    var def = talentDef(name);
    if (def) {
      var p = talentVerfuegbar(char, def);
      if (!p.ok) throw new Error(p.grund);
    }
    var t = char.talente.filter(function (x) { return x.name === name; })[0];
    if (t) { t.rang += 1; } else { char.talente.push({ name: name, rang: 1 }); }
    char.konten.tpOffen -= 1;
    var neuerRang = aktuellerRang(char, name);
    log(char, "Talent gelernt", name + " (Rang " + neuerRang + ") für 1 TP");
    return char;
  }

  // ---- Zauber --------------------------------------------------------------
  function zauberLernen(char, name, stufe) {
    char.zauber.push({ name: name, stufe: stufe });
    log(char, "Zauber gelernt", name + " (Stufe " + stufe + ")");
    return char;
  }
  function zauberStufensumme(char) {
    return (char.zauber || []).reduce(function (a, z) { return a + (z.stufe || 0); }, 0);
  }

  // ---- Log -----------------------------------------------------------------
  function log(char, aktion, details) {
    if (!char.log) char.log = [];
    char.log.push({ ts: new Date().toISOString(), stufe: char.stufe, aktion: aktion, details: details || "" });
  }

  // ---- Erschaffung: Validierung -------------------------------------------
  // eingaben = { name, geschlecht, volk, klasse, unterklasse,
  //              attribute:{koer,agi,gei}, eigenschaftenRoh:{...},
  //              volksbonus:'ge', klassenbonus:'au', capWahl:{...} (Mensch) }
  function validiereErschaffung(eingaben) {
    var fehler = [];
    var E = R.erschaffung;
    var a = eingaben.attribute || {};
    var roh = eingaben.eigenschaftenRoh || {};

    if (!eingaben.name) fehler.push("Name fehlt.");
    if (!R.voelker[eingaben.volk]) fehler.push("Ungültiges Volk.");
    if (!R.klassen[eingaben.klasse]) fehler.push("Ungültige Klasse.");
    var klasse = R.klassen[eingaben.klasse];
    if (klasse && klasse.zauberwirker && !eingaben.unterklasse)
      fehler.push("Zauberwirker brauchen eine Unterklasse (Heiler/Zauberer/Schwarzmagier).");

    // Attribute: Summe 20, jeder 0..8
    var attrSumme = (a.koer || 0) + (a.agi || 0) + (a.gei || 0);
    if (attrSumme !== E.attributPunkte)
      fehler.push("Attribute: " + attrSumme + " von " + E.attributPunkte + " Punkten verteilt.");
    ["koer", "agi", "gei"].forEach(function (k) {
      if ((a[k] || 0) > E.attributMax) fehler.push("Attribut " + k.toUpperCase() + " über Maximum " + E.attributMax + ".");
      if ((a[k] || 0) < 0) fehler.push("Attribut " + k.toUpperCase() + " negativ.");
    });

    // Eigenschaften (roh, vor Boni): Summe 8, jeder 0..4
    var eigSumme = EIG.reduce(function (s, e) { return s + (roh[e] || 0); }, 0);
    if (eigSumme !== E.eigenschaftPunkte)
      fehler.push("Eigenschaften: " + eigSumme + " von " + E.eigenschaftPunkte + " Punkten verteilt.");
    EIG.forEach(function (e) {
      if ((roh[e] || 0) > E.eigenschaftMaxStart) fehler.push("Eigenschaft " + labelZiel(e) + " über Start-Maximum " + E.eigenschaftMaxStart + ".");
      if ((roh[e] || 0) < 0) fehler.push("Eigenschaft " + labelZiel(e) + " negativ.");
    });

    // Volks-/Klassenbonus gültig?
    var volk = R.voelker[eingaben.volk];
    if (volk && eingaben.volksbonus && volk.bonusWahl.indexOf(eingaben.volksbonus) < 0)
      fehler.push("Volksbonus für " + eingaben.volk + " muss aus " + volk.bonusWahl.join("/") + " sein.");
    if (klasse && eingaben.klassenbonus && klasse.bonusWahl.indexOf(eingaben.klassenbonus) < 0)
      fehler.push("Klassenbonus für " + eingaben.klasse + " muss aus " + klasse.bonusWahl.join("/") + " sein.");

    // Mensch Cap-Wahl: 2 Punkte, je Eigenschaft max +2
    if (eingaben.volk === "Mensch") {
      var cw = eingaben.capWahl || {};
      var cwSumme = EIG.reduce(function (s, e) { return s + (cw[e] || 0); }, 0);
      if (cwSumme !== (R.voelker.Mensch.capWahlPunkte || 2))
        fehler.push("Mensch Cap-Bonus: " + cwSumme + " von 2 Punkten verteilt (2×+1 oder 1×+2).");
      EIG.forEach(function (e) { if ((cw[e] || 0) > 2) fehler.push("Cap-Bonus auf " + labelZiel(e) + " über +2."); });
    }

    return fehler;
  }

  // Baut aus geprüften Eingaben einen fertigen Charakter (Stufe 1).
  function erschaffeChar(eingaben) {
    var fehler = validiereErschaffung(eingaben);
    if (fehler.length) { var err = new Error(fehler.join(" ")); err.fehler = fehler; throw err; }

    var roh = eingaben.eigenschaftenRoh;
    var eig = {};
    EIG.forEach(function (e) { eig[e] = roh[e] || 0; });
    if (eingaben.volksbonus) eig[eingaben.volksbonus] += 1;
    if (eingaben.klassenbonus) eig[eingaben.klassenbonus] += 1;

    var volk = R.voelker[eingaben.volk];
    var startTP = R.erschaffung.startTP + ((volk.effekte && volk.effekte.startTP) || 0);

    var char = {
      schema: 1,
      id: eingaben.id || slug(eingaben.name),
      name: eingaben.name,
      geschlecht: eingaben.geschlecht || "",
      volk: eingaben.volk,
      klasse: eingaben.klasse,
      unterklasse: eingaben.unterklasse || null,
      heldenklasse: null,
      stufe: R.erschaffung.startStufe,
      ep: R.erschaffung.startEP,
      attribute: { koer: eingaben.attribute.koer, agi: eingaben.attribute.agi, gei: eingaben.attribute.gei },
      eigenschaften: eig,
      capWahl: eingaben.volk === "Mensch" ? (eingaben.capWahl || {}) : null,
      lkGekauft: 0,
      konten: { lpOffen: 0, tpOffen: startTP },
      talente: [],
      zauber: [],
      ausruestung: { nahwaffe: null, fernwaffe: null, ruestungen: [], inventar: [] },
      sprachen: [],
      schriftzeichen: [],
      volksfaehigkeiten: volk.faehigkeiten.slice(),
      notizen: "",
      log: []
    };
    log(char, "Erstellt", eingaben.volk + " " + eingaben.klasse +
      (eingaben.unterklasse ? " (" + eingaben.unterklasse + ")" : "") +
      " · Volksbonus " + (eingaben.volksbonus ? labelZiel(eingaben.volksbonus) : "-") +
      ", Klassenbonus " + (eingaben.klassenbonus ? labelZiel(eingaben.klassenbonus) : "-"));
    return char;
  }

  function slug(s) {
    return (s || "char").toString().toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "char";
  }

  global.DS_ENGINE = {
    EIG: EIG,
    lpSpalte: lpSpalte,
    istZauberwirker: istZauberwirker,
    findeWaffe: findeWaffe,
    findeRuestung: findeRuestung,
    caps: caps,
    kampfwerte: kampfwerte,
    lpKosten: lpKosten,
    pruefeLpAusgabe: pruefeLpAusgabe,
    lpAusgeben: lpAusgeben,
    labelZiel: labelZiel,
    epSchwelle: epSchwelle,
    stufeFuerEp: stufeFuerEp,
    naechsteStufe: naechsteStufe,
    epEintragen: epEintragen,
    zauberBudget: zauberBudget,
    zauberStufensumme: zauberStufensumme,
    talentLernen: talentLernen,
    talentDef: talentDef,
    talentZugang: talentZugang,
    talentVerfuegbar: talentVerfuegbar,
    aktuellerRang: aktuellerRang,
    zauberLernen: zauberLernen,
    validiereErschaffung: validiereErschaffung,
    erschaffeChar: erschaffeChar,
    slug: slug,
    log: log
  };
})(typeof window !== "undefined" ? window : this);
