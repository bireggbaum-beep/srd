/*
 * DS_BEUTE — Beute-Auflöser für Dungeonslayers (DS4)
 * ==================================================
 *
 * Würfelt auf den Beutetabellen (DS_REGELN.beute) und löst dabei das
 * verschachtelte System auf: Verweise (z.B. "Beutetabelle M:5", "(WN1)") werden
 * verfolgt und Mengen-/Münzangaben (z.B. "3d20 GM", "1d20/2 m") ausgewürfelt.
 *
 * Reine Logik, kein DOM. Spieler kann auch selbst würfeln und das Ergebnis
 * als forcedRoll übergeben (manueller Modus).
 */
(function (global) {
  "use strict";
  var R = global.DS_REGELN;

  function rnd(n) { return Math.floor(Math.random() * n) + 1; }

  // Anzahl W20 aus dem Tabellen-Würfel ("W20","2W20","5W20" …)
  function diceCount(d) { var m = String(d || "W20").match(/^(\d*)W20$/i); return m ? (m[1] ? +m[1] : 1) : 1; }
  function rollDice(d) { var n = diceCount(d), s = 0; for (var i = 0; i < n; i++) s += rnd(20); return s; }

  // Inline-Würfel im Text ausrechnen: "3d20", "1d20/2", "2d20"
  function resolveInlineDice(t) {
    return String(t).replace(/(\d+)d(\d+)(\/2)?/gi, function (_, n, x, half) {
      var s = 0, nn = +n, xx = +x; for (var i = 0; i < nn; i++) s += rnd(xx);
      if (half) s = Math.floor(s / 2);
      return String(s);
    });
  }

  function table(id) { return R.beute && R.beute[id]; }
  function findRow(t, roll) {
    for (var i = 0; i < t.rows.length; i++) { var r = t.rows[i]; if (r.lo != null && roll >= r.lo && roll <= r.hi) return r; }
    return null;
  }

  // Zieht ein Ergebnis von Tabelle id. opts.forcedRoll = vorgegebener Wurf.
  // Gibt { id, name, roll, text, sub:[…] } zurück (sub = verfolgte Verweise).
  function draw(id, opts, depth) {
    opts = opts || {}; depth = depth || 0;
    var t = table(id);
    if (!t) return { id: id, text: "(Tabelle " + id + " fehlt)", sub: [] };
    if (t.complex) return { id: id, name: t.name, roll: null, text: "auf Tabelle " + id + " auswürfeln (siehe Tabelle)", sub: [] };
    var roll = opts.forcedRoll != null ? opts.forcedRoll : rollDice(t.dice);
    var row = findRow(t, roll);
    if (!row) return { id: id, name: t.name, roll: roll, text: "(kein Eintrag für Wurf " + roll + ")", sub: [] };
    var text = resolveInlineDice(row.text);
    var sub = [];
    if (depth < 6) {
      var orig = row.text, m;
      // 1) erzwungene Zeile: "Beutetabelle X:N"
      var fRe = /Beutetabelle\s+([A-Za-z0-9]+)\s*:\s*(\d+)/g;
      while ((m = fRe.exec(orig))) { if (table(m[1])) sub.push(draw(m[1], { forcedRoll: +m[2] }, depth + 1)); }
      // 2) Würfel-Verweise: "(WN1)" / "Beutetabelle X" (ohne :N)
      var seen = {};
      var rRe = /\(([A-Za-z0-9]{1,3})\)|Beutetabelle\s+([A-Za-z0-9]+)(?!\s*:\s*\d)/g;
      while ((m = rRe.exec(orig))) {
        var rid = m[1] || m[2];
        if (rid && table(rid) && !seen[rid]) { seen[rid] = 1; sub.push(draw(rid, {}, depth + 1)); }
      }
      // 3) magischer Effekt bei Waffen/Rüstungen ("mit E: Effekt")
      if (/\bE:\s*Effekt|mit\s+E\b/.test(orig) && table("E") && !seen.E) sub.push(draw("E", {}, depth + 1));
    }
    return { id: id, name: t.name, roll: roll, text: text, sub: sub };
  }

  // Flacht ein draw-Ergebnis in lesbare Zeilen ab.
  function flatten(res, tiefe, out) {
    out = out || []; tiefe = tiefe || 0;
    var pre = tiefe ? "→ " : "";
    var rollInfo = res.roll != null ? " [" + res.id + ":" + res.roll + "]" : (res.id ? " [" + res.id + "]" : "");
    out.push({ tiefe: tiefe, text: pre + res.text, info: rollInfo });
    (res.sub || []).forEach(function (s) { flatten(s, tiefe + 1, out); });
    return out;
  }

  // Eine komplette Beute-Ziehung (z.B. ein Gegner) als Zeilenliste.
  // mode: 'probenlos' (Tabellenwürfel) | 'probe' (W20 ≤ pw, Ergebnis = Zeile) | 'manuell'
  function ziehung(tableId, opts) {
    opts = opts || {};
    if (opts.mode === "probe") {
      var w = opts.forcedRoll != null ? opts.forcedRoll : rnd(20);
      if (w > (opts.pw || 0)) return { ueberschrift: "Probe " + w + " > PW " + opts.pw + " → keine Beute", zeilen: [] };
      return { ueberschrift: "Probe " + w + " ≤ PW " + opts.pw, zeilen: flatten(draw(tableId, { forcedRoll: w })) };
    }
    // probenlos / manuell
    return { ueberschrift: null, zeilen: flatten(draw(tableId, { forcedRoll: opts.forcedRoll })) };
  }

  global.DS_BEUTE = { draw: draw, flatten: flatten, ziehung: ziehung, rollDice: rollDice, rnd: rnd };
})(typeof window !== "undefined" ? window : this);
