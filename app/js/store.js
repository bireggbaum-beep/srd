/*
 * DS_STORE — Persistenz für die Charakterverwaltung
 * =================================================
 *
 * Statisch & offline, kein Backend. Der Browser kann nicht ins Repo
 * schreiben, darum:
 *   - Arbeitsstand lebt in localStorage (Roster).
 *   - "Export JSON" lädt eine Charakter-Datei herunter, die der SL ins
 *     Repo committet  ->  versionierte Kampagnen-Historie (jeder Aufstieg
 *     ein Commit). "Import JSON" liest eine solche Datei wieder ein.
 *
 * Datei-Layout im Repo (Vorschlag): charaktere/<id>.json
 */
(function (global) {
  "use strict";

  var KEY = "ds4_roster_v1";
  var E = global.DS_ENGINE;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Roster konnte nicht geladen werden:", e);
      return [];
    }
  }

  function save(roster) {
    localStorage.setItem(KEY, JSON.stringify(roster));
  }

  function get(id) {
    return load().filter(function (c) { return c.id === id; })[0] || null;
  }

  function upsert(char) {
    var roster = load();
    var idx = -1;
    for (var i = 0; i < roster.length; i++) if (roster[i].id === char.id) { idx = i; break; }
    if (idx >= 0) roster[idx] = char; else roster.push(char);
    save(roster);
    return char;
  }

  function remove(id) {
    save(load().filter(function (c) { return c.id !== id; }));
  }

  // Eindeutige ID erzeugen (Kollisionen vermeiden)
  function eindeutigeId(basis) {
    var roster = load();
    var ids = roster.map(function (c) { return c.id; });
    var id = E.slug(basis), n = 2;
    while (ids.indexOf(id) >= 0) { id = E.slug(basis) + "-" + n; n++; }
    return id;
  }

  // ---- Import / Export -----------------------------------------------------
  function download(filename, text) {
    var blob = new Blob([text], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function exportChar(char) {
    download(char.id + ".json", JSON.stringify(char, null, 2));
  }

  function exportRoster() {
    download("roster.json", JSON.stringify(load(), null, 2));
  }

  // Liest JSON-Text (ein Charakter ODER ein Array). Gibt {chars:[...]} zurück.
  function parseImport(text) {
    var data = JSON.parse(text);
    var chars = Array.isArray(data) ? data : [data];
    chars.forEach(function (c) {
      if (!c.id || !c.name || !c.eigenschaften)
        throw new Error("Datei ist kein gültiger Dungeonslayers-Charakter.");
    });
    return { chars: chars };
  }

  // Importierte Charaktere ins Roster übernehmen (ID-Kollisionen auflösen).
  function importChars(chars) {
    var ergebnis = [];
    chars.forEach(function (c) {
      if (get(c.id)) c.id = eindeutigeId(c.name);
      upsert(c);
      ergebnis.push(c);
    });
    return ergebnis;
  }

  // ---- Seed (Beispielcharakter beim ersten Start) --------------------------
  // Grounded: über die Engine erschaffen, damit der Beispielcharakter
  // garantiert regelkonform ist (SRD-Beispiel "Kalthor", Mensch Krieger).
  function seedIfEmpty() {
    if (load().length > 0) return;
    try {
      var kalthor = E.erschaffeChar({
        name: "Kalthor",
        geschlecht: "männlich",
        volk: "Mensch",
        klasse: "Krieger",
        attribute: { koer: 8, agi: 6, gei: 6 },
        eigenschaftenRoh: { st: 4, hae: 2, be: 0, ge: 0, ve: 0, au: 2 },
        volksbonus: "st",       // Mensch: 1 beliebige Eigenschaft +1
        klassenbonus: "hae",    // Krieger: ST oder HÄ +1
        capWahl: { st: 1, hae: 1 } // Mensch Cap-Bonus: 2×+1
      });
      kalthor.ausruestung.nahwaffe = "Schwert, Lang-";
      kalthor.ausruestung.ruestungen = ["Lederpanzer"];
      kalthor.sprachen = ["Gemeinsprache"];
      E.epEintragen(kalthor, 350); // -> Stufe 3 (Demo der LP/TP-Ökonomie)
      upsert(kalthor);
    } catch (e) {
      console.error("Seed fehlgeschlagen:", e);
    }
  }

  global.DS_STORE = {
    load: load,
    save: save,
    get: get,
    upsert: upsert,
    remove: remove,
    eindeutigeId: eindeutigeId,
    exportChar: exportChar,
    exportRoster: exportRoster,
    parseImport: parseImport,
    importChars: importChars,
    seedIfEmpty: seedIfEmpty
  };
})(typeof window !== "undefined" ? window : this);
