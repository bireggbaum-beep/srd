/*
 * DS_APP — UI für die Dungeonslayers-Charakterverwaltung
 * ======================================================
 * Vanilla JS. Rendert in #app. Drei Ansichten: Gruppe (Roster),
 * Erschaffung (regelvalidierter Assistent) und Charakterblatt mit
 * Aufstiegs-Assistent (das Herz). Alle Mutationen laufen über DS_ENGINE
 * und werden via DS_STORE in localStorage persistiert.
 */
(function (global) {
  "use strict";

  var R = global.DS_REGELN;
  var E = global.DS_ENGINE;
  var S = global.DS_STORE;
  var EIG = R.eigenschaften; // [{id,name,kurz,attribut}]
  var ATTR = R.attribute;

  var app = document.getElementById("app");

  var state = {
    view: "roster",   // 'roster' | 'create' | 'generator' | 'sheet' | 'monster'
    currentId: null,
    tab: "uebersicht",
    create: null,     // Arbeitszustand der Erschaffung
    monster: { gruppe: "Alle", suche: "" }
  };

  // ---- kleine Helfer -------------------------------------------------------
  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function eigName(id) { var x = EIG.filter(function (e) { return e.id === id; })[0]; return x ? x.name : id; }
  function eigKurz(id) { var x = EIG.filter(function (e) { return e.id === id; })[0]; return x ? x.kurz : id; }

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3200);
  }

  function go(view, id) { state.view = view; if (id !== undefined) state.currentId = id; render(); window.scrollTo(0, 0); }

  // ===========================================================================
  // ROSTER
  // ===========================================================================
  function renderRoster() {
    var roster = S.load();
    var wrap = h('<div></div>');

    var head = h('<div class="inline" style="justify-content:space-between;margin-bottom:16px;width:100%"></div>');
    head.appendChild(h('<h2 style="margin:0">Gruppe <span class="muted">(' + roster.length + ')</span></h2>'));
    var actions = h('<div class="inline"></div>');
    // "+ Neuer Charakter" steht bereits prominent in der Topnav -> hier nur Zufall + Export
    var btnGen = h('<button class="btn">🎲 Zufallscharakter</button>');
    btnGen.onclick = function () { go("generator"); };
    actions.appendChild(btnGen);
    if (roster.length) {
      var btnExport = h('<button class="btn">Gruppe exportieren</button>');
      btnExport.onclick = function () { S.exportRoster(); toast("roster.json heruntergeladen."); };
      actions.appendChild(btnExport);
    }
    head.appendChild(actions);
    wrap.appendChild(head);

    if (!roster.length) {
      wrap.appendChild(h(
        '<div class="empty"><div class="big">📜</div>' +
        '<p>Noch keine Charaktere in der Gruppe.</p>' +
        '<p class="muted">Lege einen neuen Charakter an oder importiere eine JSON-Datei.</p></div>'));
      app.appendChild(wrap);
      return;
    }

    var grid = h('<div class="grid grid-cards"></div>');
    roster.forEach(function (c) {
      var kw = E.kampfwerte(c);
      var sub = c.volk + " " + c.klasse + (c.unterklasse ? " · " + c.unterklasse : "") +
        (c.heldenklasse ? " · " + c.heldenklasse : "");
      var card = h(
        '<div class="card">' +
        '<div class="name">' + esc(c.name) + '</div>' +
        '<div class="sub">' + esc(sub) + '</div>' +
        '<div class="stats">' +
        '<span>Stufe <b>' + c.stufe + '</b></span>' +
        '<span>EP <b>' + c.ep + '</b></span>' +
        '<span>LK <b>' + kw.lebenskraft + '</b></span>' +
        '<span>Abwehr <b>' + kw.abwehr + '</b></span>' +
        '</div>' +
        '<div class="stats" style="margin-top:8px">' +
        (c.konten.lpOffen ? '<span class="pill good">' + c.konten.lpOffen + ' LP offen</span>' : '') +
        (c.konten.tpOffen ? '<span class="pill good">' + c.konten.tpOffen + ' TP offen</span>' : '') +
        '</div>' +
        '</div>');
      card.onclick = function () { state.tab = "uebersicht"; go("sheet", c.id); };
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    app.appendChild(wrap);
  }

  // ===========================================================================
  // ERSCHAFFUNG
  // ===========================================================================
  function startCreate() {
    state.create = {
      name: "", geschlecht: "",
      volk: "Mensch", klasse: "Krieger", unterklasse: "Heiler",
      attribute: { koer: 0, agi: 0, gei: 0 },
      eig: { st: 0, hae: 0, be: 0, ge: 0, ve: 0, au: 0 },
      volksbonus: null, klassenbonus: null,
      capWahl: { st: 0, hae: 0, be: 0, ge: 0, ve: 0, au: 0 }
    };
    go("create");
  }

  function createEingaben() {
    var c = state.create;
    return {
      name: c.name, geschlecht: c.geschlecht,
      volk: c.volk, klasse: c.klasse,
      unterklasse: R.klassen[c.klasse].zauberwirker ? c.unterklasse : null,
      attribute: c.attribute, eigenschaftenRoh: c.eig,
      volksbonus: c.volksbonus, klassenbonus: c.klassenbonus,
      capWahl: c.volk === "Mensch" ? c.capWahl : null
    };
  }

  function counter(group, key, val, min, max) {
    return '<span class="counter" data-group="' + group + '" data-key="' + key + '">' +
      '<button class="btn btn-sm" data-step="-1"' + (val <= min ? " disabled" : "") + '>−</button>' +
      '<input type="text" value="' + val + '" readonly />' +
      '<button class="btn btn-sm" data-step="1"' + (val >= max ? " disabled" : "") + '>+</button>' +
      '</span>';
  }

  function renderCreate() {
    var c = state.create;
    var volk = R.voelker[c.volk];
    var klasse = R.klassen[c.klasse];
    var Eb = R.erschaffung;

    var attrSum = c.attribute.koer + c.attribute.agi + c.attribute.gei;
    var eigSum = EIG.reduce(function (s, e) { return s + c.eig[e.id]; }, 0);
    var capSum = EIG.reduce(function (s, e) { return s + c.capWahl[e.id]; }, 0);

    var wrap = h('<div></div>');
    wrap.appendChild(h('<div class="breadcrumb"><a id="bc-roster">Gruppe</a> / Neuer Charakter</div>'));
    wrap.appendChild(h('<h2>Charaktererschaffung <a class="deeplink" href="' + R.deeplinks.erschaffung + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));

    // --- Identität, Volk, Klasse ---
    var p1 = h('<div class="panel"></div>');
    p1.appendChild(h('<h3>1–2 · Identität, Volk & Klasse</h3>'));
    var rowId = h('<div class="row"></div>');
    rowId.appendChild(h('<div class="field"><label>Name</label><input type="text" id="f-name" value="' + esc(c.name) + '" placeholder="z.B. Kalthor"/></div>'));
    rowId.appendChild(h('<div class="field"><label>Geschlecht</label><input type="text" id="f-geschlecht" value="' + esc(c.geschlecht) + '" placeholder="optional"/></div>'));
    p1.appendChild(rowId);

    var rowVK = h('<div class="row"></div>');
    var volkSel = '<div class="field"><label>Volk</label><select id="f-volk">' +
      Object.keys(R.voelker).map(function (v) { return '<option ' + (v === c.volk ? "selected" : "") + '>' + v + '</option>'; }).join("") +
      '</select><div class="help">' + esc(volk.faehigkeiten.join(", ")) + '</div></div>';
    rowVK.appendChild(h(volkSel));
    var klasseSel = '<div class="field"><label>Klasse</label><select id="f-klasse">' +
      Object.keys(R.klassen).map(function (k) { return '<option ' + (k === c.klasse ? "selected" : "") + '>' + k + '</option>'; }).join("") +
      '</select></div>';
    rowVK.appendChild(h(klasseSel));
    if (klasse.zauberwirker) {
      var us = '<div class="field"><label>Unterklasse</label><select id="f-unterklasse">' +
        klasse.unterklassen.map(function (u) { return '<option ' + (u === c.unterklasse ? "selected" : "") + '>' + u + '</option>'; }).join("") +
        '</select></div>';
      rowVK.appendChild(h(us));
    }
    p1.appendChild(rowVK);
    wrap.appendChild(p1);

    // --- Attribute ---
    var p2 = h('<div class="panel"></div>');
    p2.appendChild(h('<h3>3 · Attribute <span class="muted">(' + Eb.attributPunkte + ' Punkte, je max ' + Eb.attributMax + ')</span></h3>'));
    var attrGrid = h('<div class="statgrid"></div>');
    ATTR.forEach(function (a) {
      attrGrid.appendChild(h('<div class="stat"><div class="k">' + a.name + ' (' + a.kurz + ')</div>' +
        counter("attribute", a.id, c.attribute[a.id], 0, Eb.attributMax) + '</div>'));
    });
    p2.appendChild(attrGrid);
    p2.appendChild(h('<div class="help ' + (attrSum === Eb.attributPunkte ? "ok-note" : "") + '">Verteilt: ' + attrSum + " / " + Eb.attributPunkte + '</div>'));
    wrap.appendChild(p2);

    // --- Eigenschaften (roh) ---
    var p3 = h('<div class="panel"></div>');
    p3.appendChild(h('<h3>4 · Eigenschaften <span class="muted">(' + Eb.eigenschaftPunkte + ' Punkte, je max ' + Eb.eigenschaftMaxStart + ')</span></h3>'));
    var eigGrid = h('<div class="statgrid"></div>');
    EIG.forEach(function (e) {
      eigGrid.appendChild(h('<div class="stat"><div class="k">' + e.name + ' (' + e.kurz + ')</div>' +
        counter("eig", e.id, c.eig[e.id], 0, Eb.eigenschaftMaxStart) + '</div>'));
    });
    p3.appendChild(eigGrid);
    p3.appendChild(h('<div class="help ' + (eigSum === Eb.eigenschaftPunkte ? "ok-note" : "") + '">Verteilt: ' + eigSum + " / " + Eb.eigenschaftPunkte + '</div>'));
    wrap.appendChild(p3);

    // --- Boni ---
    var p4 = h('<div class="panel"></div>');
    p4.appendChild(h('<h3>5 · Volks- & Klassenbonus <span class="muted">(je +1)</span></h3>'));
    var rowB = h('<div class="row"></div>');
    rowB.appendChild(h('<div><label>Volksbonus (' + c.volk + ')</label>' + radios("volksbonus", volk.bonusWahl, c.volksbonus) + '</div>'));
    rowB.appendChild(h('<div><label>Klassenbonus (' + c.klasse + ')</label>' + radios("klassenbonus", klasse.bonusWahl, c.klassenbonus) + '</div>'));
    p4.appendChild(rowB);

    if (c.volk === "Mensch") {
      p4.appendChild(h('<hr class="sep"/>'));
      p4.appendChild(h('<h3>Mensch · Höchstwert-Bonus <span class="muted">(2 Punkte: 2×+1 oder 1×+2)</span></h3>'));
      var capGrid = h('<div class="statgrid"></div>');
      EIG.forEach(function (e) {
        capGrid.appendChild(h('<div class="stat"><div class="k">' + e.kurz + ' Cap +</div>' +
          counter("capWahl", e.id, c.capWahl[e.id], 0, 2) + '</div>'));
      });
      p4.appendChild(capGrid);
      p4.appendChild(h('<div class="help ' + (capSum === 2 ? "ok-note" : "") + '">Verteilt: ' + capSum + ' / 2</div>'));
    }
    wrap.appendChild(p4);

    // --- Validierung + Aktion ---
    var fehler = E.validiereErschaffung(createEingaben());
    var p5 = h('<div class="panel"></div>');
    var errBox = h('<div id="create-errors"></div>');
    errBox.appendChild(renderErrors(fehler));
    p5.appendChild(errBox);
    var btnRow = h('<div class="inline"></div>');
    var btnCreate = h('<button class="btn btn-primary" id="btn-create"' + (fehler.length ? " disabled" : "") + '>Charakter erstellen</button>');
    btnCreate.onclick = doCreate;
    var btnCancel = h('<button class="btn btn-ghost">Abbrechen</button>');
    btnCancel.onclick = function () { go("roster"); };
    btnRow.appendChild(btnCreate); btnRow.appendChild(btnCancel);
    p5.appendChild(btnRow);
    wrap.appendChild(p5);

    app.appendChild(wrap);

    // ---- Wiring ----
    wrap.querySelector("#bc-roster").onclick = function () { go("roster"); };

    // Stepper (delegiert)
    wrap.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button[data-step]");
      if (!btn) return;
      var cont = btn.closest(".counter");
      var group = cont.dataset.group, key = cont.dataset.key, step = parseInt(btn.dataset.step, 10);
      applyStep(group, key, step);
    });

    // Text-Inputs: Zustand aktualisieren, nur Validierung neu rendern (kein Re-render -> Fokus bleibt)
    wrap.querySelector("#f-name").addEventListener("input", function (e) { c.name = e.target.value; refreshCreateValidation(); });
    wrap.querySelector("#f-geschlecht").addEventListener("input", function (e) { c.geschlecht = e.target.value; });

    // Selects: voller Re-render (Optionsstruktur ändert sich)
    wrap.querySelector("#f-volk").addEventListener("change", function (e) {
      c.volk = e.target.value; c.volksbonus = null;
      c.capWahl = { st: 0, hae: 0, be: 0, ge: 0, ve: 0, au: 0 };
      render();
    });
    wrap.querySelector("#f-klasse").addEventListener("change", function (e) {
      c.klasse = e.target.value; c.klassenbonus = null;
      if (R.klassen[c.klasse].zauberwirker) c.unterklasse = R.klassen[c.klasse].unterklassen[0];
      render();
    });
    var uk = wrap.querySelector("#f-unterklasse");
    if (uk) uk.addEventListener("change", function (e) { c.unterklasse = e.target.value; });

    // Radios
    wrap.querySelectorAll('input[type=radio]').forEach(function (rad) {
      rad.addEventListener("change", function () {
        c[rad.name] = rad.value; refreshCreateValidation();
      });
    });
  }

  function radios(name, options, current) {
    return '<div>' + options.map(function (o) {
      return '<label class="inline" style="display:inline-flex;margin:0 12px 6px 0;color:var(--ink)">' +
        '<input type="radio" name="' + name + '" value="' + o + '" ' + (o === current ? "checked" : "") + ' style="width:auto"/> ' +
        eigName(o) + ' (' + eigKurz(o) + ')</label>';
    }).join("") + '</div>';
  }

  function applyStep(group, key, step) {
    var c = state.create, Eb = R.erschaffung;
    if (group === "attribute") {
      var nv = c.attribute[key] + step;
      if (nv < 0 || nv > Eb.attributMax) return;
      if (step > 0 && (c.attribute.koer + c.attribute.agi + c.attribute.gei) >= Eb.attributPunkte) { toast("Alle " + Eb.attributPunkte + " Attributpunkte verteilt."); return; }
      c.attribute[key] = nv;
    } else if (group === "eig") {
      var ev = c.eig[key] + step;
      if (ev < 0 || ev > Eb.eigenschaftMaxStart) return;
      if (step > 0 && EIG.reduce(function (s, e) { return s + c.eig[e.id]; }, 0) >= Eb.eigenschaftPunkte) { toast("Alle " + Eb.eigenschaftPunkte + " Eigenschaftspunkte verteilt."); return; }
      c.eig[key] = ev;
    } else if (group === "capWahl") {
      var cv = c.capWahl[key] + step;
      if (cv < 0 || cv > 2) return;
      if (step > 0 && EIG.reduce(function (s, e) { return s + c.capWahl[e.id]; }, 0) >= 2) { toast("Mensch: nur 2 Cap-Punkte."); return; }
      c.capWahl[key] = cv;
    }
    render(); // Steppers ohne Textfokus -> voller Re-render unkritisch
  }

  function renderErrors(fehler) {
    if (!fehler.length) return h('<div class="ok-note" style="margin-bottom:12px">✓ Alles regelkonform — bereit zum Erstellen.</div>');
    var box = h('<div class="errors"><b>Noch zu erledigen:</b><ul></ul></div>');
    var ul = box.querySelector("ul");
    fehler.forEach(function (f) { ul.appendChild(h('<li>' + esc(f) + '</li>')); });
    return box;
  }

  function refreshCreateValidation() {
    var fehler = E.validiereErschaffung(createEingaben());
    var box = document.getElementById("create-errors");
    if (box) { box.innerHTML = ""; box.appendChild(renderErrors(fehler)); }
    var btn = document.getElementById("btn-create");
    if (btn) btn.disabled = fehler.length > 0;
  }

  function doCreate() {
    try {
      var eingaben = createEingaben();
      eingaben.id = S.eindeutigeId(eingaben.name);
      var char = E.erschaffeChar(eingaben);
      S.upsert(char);
      toast("„" + char.name + "“ erstellt.");
      state.tab = "uebersicht";
      go("sheet", char.id);
    } catch (err) {
      toast("Fehler: " + err.message);
    }
  }

  // ===========================================================================
  // ZUFALLSGENERATOR
  // ===========================================================================
  function renderGenerator() {
    var wrap = h('<div></div>');
    wrap.appendChild(h('<div class="breadcrumb"><a id="bc-roster">Gruppe</a> / Zufallscharakter</div>'));
    wrap.appendChild(h('<h2>🎲 Zufalls-Charaktergenerator</h2>'));

    var p = h('<div class="panel"></div>');
    p.appendChild(h('<div class="help" style="margin-bottom:12px">Lass alles auswürfeln oder gib einzelne Felder vor — der Rest bleibt auf „Zufällig". Der erzeugte Charakter ist regelkonform (Attribute, Eigenschaften, Caps, LP-Ökonomie). Talente &amp; Zauber kommen automatisch dazu, sobald wir ihre Daten ergänzen.</div>'));

    var rZufall = '<option value="zufall">🎲 Zufällig</option>';

    var row1 = h('<div class="row"></div>');
    row1.appendChild(h('<div class="field"><label>Name</label><input type="text" id="g-name" placeholder="leer = zufällig"/></div>'));
    row1.appendChild(h('<div class="field"><label>Geschlecht</label><select id="g-geschlecht">' + rZufall +
      '<option value="männlich">männlich</option><option value="weiblich">weiblich</option></select></div>'));
    p.appendChild(row1);

    var row2 = h('<div class="row"></div>');
    row2.appendChild(h('<div class="field"><label>Volk</label><select id="g-volk">' + rZufall +
      Object.keys(R.voelker).map(function (v) { return '<option value="' + v + '">' + v + '</option>'; }).join("") + '</select></div>'));
    row2.appendChild(h('<div class="field"><label>Klasse</label><select id="g-klasse">' + rZufall +
      Object.keys(R.klassen).map(function (k) { return '<option value="' + k + '">' + k + '</option>'; }).join("") + '</select></div>'));
    var uk = R.klassen.Zauberwirker.unterklassen;
    row2.appendChild(h('<div class="field"><label>Unterklasse <span class="muted">(nur Zauberwirker)</span></label><select id="g-unterklasse">' + rZufall +
      uk.map(function (u) { return '<option value="' + u + '">' + u + '</option>'; }).join("") + '</select></div>'));
    p.appendChild(row2);

    var stufeOpts = "";
    for (var s = 1; s <= 20; s++) stufeOpts += '<option value="' + s + '">Stufe ' + s + '</option>';
    var row3 = h('<div class="row"></div>');
    row3.appendChild(h('<div class="field"><label>Stufe</label><select id="g-stufe">' + rZufall + stufeOpts + '</select></div>'));
    row3.appendChild(h('<div class="field"></div>')); // Platzhalter fürs Layout
    p.appendChild(row3);

    var btnRow = h('<div class="inline" style="margin-top:8px"></div>');
    var btnGen = h('<button class="btn btn-primary">🎲 Charakter generieren</button>');
    btnGen.onclick = doGenerate;
    var btnCancel = h('<button class="btn btn-ghost">Abbrechen</button>');
    btnCancel.onclick = function () { go("roster"); };
    btnRow.appendChild(btnGen); btnRow.appendChild(btnCancel);
    p.appendChild(btnRow);
    wrap.appendChild(p);

    app.appendChild(wrap);
    wrap.querySelector("#bc-roster").onclick = function () { go("roster"); };
  }

  function doGenerate() {
    try {
      var opt = {
        name: document.getElementById("g-name").value.trim() || "zufall",
        geschlecht: document.getElementById("g-geschlecht").value,
        volk: document.getElementById("g-volk").value,
        klasse: document.getElementById("g-klasse").value,
        unterklasse: document.getElementById("g-unterklasse").value,
        stufe: document.getElementById("g-stufe").value
      };
      var char = global.DS_GEN.generate(opt);
      char.id = S.eindeutigeId(char.name);
      S.upsert(char);
      toast("„" + char.name + "“ generiert (" + char.volk + " " + char.klasse + ", Stufe " + char.stufe + ").");
      state.tab = "uebersicht";
      go("sheet", char.id);
    } catch (err) {
      toast("Generierung fehlgeschlagen: " + err.message);
      console.error(err);
    }
  }

  // ===========================================================================
  // CHARAKTERBLATT
  // ===========================================================================
  function renderSheet() {
    var c = S.get(state.currentId);
    if (!c) { go("roster"); return; }
    var wrap = h('<div></div>');
    wrap.appendChild(h('<div class="breadcrumb"><a id="bc-roster">Gruppe</a> / ' + esc(c.name) + '</div>'));

    // Kopf
    var head = h('<div class="inline" style="justify-content:space-between;width:100%;flex-wrap:wrap;gap:10px"></div>');
    head.appendChild(h('<div><h2 style="margin:0">' + esc(c.name) + '</h2>' +
      '<div class="muted">' + esc(c.volk + " " + c.klasse + (c.unterklasse ? " · " + c.unterklasse : "") + (c.heldenklasse ? " · " + c.heldenklasse : "")) +
      ' · Stufe ' + c.stufe + '</div></div>'));
    var ha = h('<div class="inline"></div>');
    var bGesamt = h('<button class="btn btn-subtle btn-sm" title="Alle Infos auf einen Blick">📋 Gesamtansicht</button>');
    bGesamt.onclick = function () { openGesamt(c); };
    var bExp = h('<button class="btn">Export JSON</button>');
    bExp.onclick = function () { S.exportChar(c); toast(c.id + ".json heruntergeladen — ins Repo committen."); };
    var bDel = h('<button class="btn btn-danger">Löschen</button>');
    bDel.onclick = function () { if (confirm("„" + c.name + "“ wirklich löschen? (Export vorher empfohlen)")) { S.remove(c.id); toast("Gelöscht."); go("roster"); } };
    ha.appendChild(bGesamt); ha.appendChild(bExp); ha.appendChild(bDel);
    head.appendChild(ha);
    wrap.appendChild(head);

    // Konten-Badges
    var counts = h('<div class="badge-counts"></div>');
    counts.appendChild(h('<div class="count"><b>' + c.ep + '</b>EP</div>'));
    counts.appendChild(h('<div class="count"><b>' + c.konten.lpOffen + '</b>LP offen</div>'));
    counts.appendChild(h('<div class="count"><b>' + c.konten.tpOffen + '</b>TP offen</div>'));
    wrap.appendChild(counts);

    // Tabs
    var tabs = h('<div class="tabs"></div>');
    [["uebersicht", "Übersicht"], ["aufstieg", "Aufstieg"], ["ausruestung", "Ausrüstung"], ["verlauf", "Verlauf"]].forEach(function (t) {
      var b = h('<button class="tab ' + (state.tab === t[0] ? "active" : "") + '">' + t[1] + '</button>');
      b.onclick = function () { state.tab = t[0]; render(); };
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    var body = h('<div></div>');
    if (state.tab === "uebersicht") body.appendChild(tabUebersicht(c));
    else if (state.tab === "aufstieg") body.appendChild(tabAufstieg(c));
    else if (state.tab === "ausruestung") body.appendChild(tabAusruestung(c));
    else body.appendChild(tabVerlauf(c));
    wrap.appendChild(body);

    app.appendChild(wrap);
    wrap.querySelector("#bc-roster").onclick = function () { go("roster"); };
  }

  // ---- Tab: Übersicht ------------------------------------------------------
  function tabUebersicht(c) {
    var kw = E.kampfwerte(c);
    var caps = E.caps(c);
    var box = h('<div></div>');

    // Kampfwerte
    var pk = h('<div class="panel"></div>');
    pk.appendChild(h('<h2>Kampfwerte <a class="deeplink" href="' + R.deeplinks.attribute + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));
    var kg = h('<div class="statgrid"></div>');
    var defs = [
      ["Lebenskraft", kw.lebenskraft, "KÖR+HÄ+10" + (c.lkGekauft ? "+" + c.lkGekauft : "")],
      ["Abwehr", kw.abwehr, "KÖR+HÄ+PA" + (kw._pa ? " (PA " + kw._pa + ")" : "")],
      ["Initiative", kw.initiative, "AGI+BE"],
      ["Laufen", kw.laufen + "m", "AGI/2+1"],
      ["Schlagen", kw.schlagen, "KÖR+ST+WB"],
      ["Schießen", kw.schiessen, "AGI+GE+WB"]
    ];
    if (E.istZauberwirker(c)) {
      defs.push(["Zaubern", kw.zaubern, "GEI+AU+ZB−PA"]);
      defs.push(["Zielzauber", kw.zielzauber, "GEI+GE+ZB−PA"]);
    }
    defs.forEach(function (d) {
      kg.appendChild(h('<div class="stat"><div class="v">' + d[1] + '</div><div class="k">' + d[0] + '</div><small>' + d[2] + '</small></div>'));
    });
    pk.appendChild(kg);
    if (E.istZauberwirker(c)) pk.appendChild(h('<div class="help">ZB (Zauberbonus) ist spruchabhängig und hier nicht eingerechnet — er kommt vom aktiven Zauberspruch dazu.</div>'));
    box.appendChild(pk);

    // Attribute & Eigenschaften
    var pa = h('<div class="panel"></div>');
    pa.appendChild(h('<h2>Attribute & Eigenschaften</h2>'));
    var tbl = h('<table></table>');
    tbl.appendChild(h('<tr><th>Attribut</th><th class="num">Wert</th><th>Eigenschaften</th></tr>'));
    ATTR.forEach(function (a) {
      var eigCells = a.eigenschaften.map(function (eid) {
        return eigKurz(eid) + " <b>" + c.eigenschaften[eid] + "</b> <span class='muted'>/" + caps[eid] + "</span>";
      }).join(" &nbsp; ");
      tbl.appendChild(h('<tr><td>' + a.name + ' (' + a.kurz + ')</td><td class="num"><b>' + c.attribute[a.id] + '</b></td><td>' + eigCells + '</td></tr>'));
    });
    pa.appendChild(tbl);
    pa.appendChild(h('<div class="help">Eigenschaften: <b>Wert</b> / Höchstwert (Cap aus Grundwert 12 + Volk + Klasse).</div>'));
    box.appendChild(pa);

    // Volksfähigkeiten / Sprachen
    var pf = h('<div class="panel"></div>');
    pf.appendChild(h('<h2>Volk, Sprachen & Notizen</h2>'));
    pf.appendChild(h('<div style="margin-bottom:8px"><b>Volksfähigkeiten:</b> ' +
      (c.volksfaehigkeiten && c.volksfaehigkeiten.length ? c.volksfaehigkeiten.map(function (f) { return '<span class="pill">' + esc(f) + '</span>'; }).join("") : '<span class="muted">—</span>') + '</div>'));
    pf.appendChild(h('<div style="margin-bottom:8px"><b>Sprachen:</b> ' + (c.sprachen.length ? c.sprachen.map(function (s) { return '<span class="pill">' + esc(s) + '</span>'; }).join("") : '<span class="muted">—</span>') + '</div>'));
    if (c.schriftzeichen && c.schriftzeichen.length)
      pf.appendChild(h('<div style="margin-bottom:8px"><b>Schriftzeichen:</b> ' + c.schriftzeichen.map(function (s) { return '<span class="pill">' + esc(s) + '</span>'; }).join("") + '</div>'));
    var ta = h('<textarea rows="3" placeholder="Notizen…">' + esc(c.notizen || "") + '</textarea>');
    ta.addEventListener("change", function () { c.notizen = ta.value; S.upsert(c); toast("Notiz gespeichert."); });
    pf.appendChild(h('<label style="margin-top:8px">Notizen</label>'));
    pf.appendChild(ta);
    box.appendChild(pf);

    // Talente / Zauber kurz
    if ((c.talente && c.talente.length) || (c.zauber && c.zauber.length)) {
      var pt = h('<div class="panel"></div>');
      if (c.talente.length) pt.appendChild(h('<div><b>Talente:</b> ' + c.talente.map(function (t) { return '<span class="pill">' + esc(t.name) + ' ' + roman(t.rang) + '</span>'; }).join("") + '</div>'));
      if (c.zauber.length) pt.appendChild(h('<div style="margin-top:8px"><b>Zauber:</b> ' + c.zauber.map(function (z) { return '<span class="pill">' + esc(z.name) + ' (St. ' + z.stufe + ')</span>'; }).join("") + '</div>'));
      box.appendChild(pt);
    }
    return box;
  }

  // ---- Tab: Aufstieg (das Herz) -------------------------------------------
  function tabAufstieg(c) {
    var box = h('<div></div>');

    // EP / Stufe
    var pe = h('<div class="panel"></div>');
    pe.appendChild(h('<h2>Erfahrung & Stufe <a class="deeplink" href="' + R.deeplinks.erfahrung + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));
    var next = E.naechsteStufe(c);
    if (next) {
      var cur = E.epSchwelle(c.stufe, c.heldenklasse);
      var frac = Math.max(0, Math.min(1, (c.ep - cur) / (next.ep - cur)));
      pe.appendChild(h('<div class="inline" style="justify-content:space-between"><span>Stufe <b>' + c.stufe + '</b></span><span class="muted">Nächste Stufe ' + next.stufe + ' bei <b>' + next.ep + '</b> EP (noch ' + Math.max(0, next.ep - c.ep) + ')</span></div>'));
      pe.appendChild(h('<div class="progress" style="margin:8px 0"><i style="width:' + (frac * 100).toFixed(1) + '%"></i></div>'));
    } else {
      pe.appendChild(h('<div>Stufe <b>' + c.stufe + '</b> — Höchststufe erreicht.</div>'));
    }
    var epRow = h('<div class="row" style="align-items:flex-end"></div>');
    epRow.appendChild(h('<div class="field" style="flex:2"><label>EP-Stand setzen</label><input type="number" id="ep-input" value="' + c.ep + '" min="0"/></div>'));
    var epBtn = h('<div class="field"><button class="btn btn-primary" id="ep-set">Eintragen</button></div>');
    epRow.appendChild(epBtn);
    pe.appendChild(epRow);
    pe.appendChild(h('<div class="help">Stufenaufstiege werden automatisch verbucht: je +2 LP und +1 TP.' + (E.istZauberwirker(c) ? ' Zauberwirker erhalten zusätzlich ein Zauber-Budget = neue Stufe.' : '') + '</div>'));

    // Heldenklasse ab Stufe 10
    if (c.stufe >= 10) {
      pe.appendChild(h('<hr class="sep"/>'));
      var hkRow = h('<div class="row" style="align-items:flex-end"></div>');
      hkRow.appendChild(h('<div class="field" style="flex:2"><label>Heldenklasse (ab Stufe 10, erhöht künftige EP-Schwellen)</label><input type="text" id="hk-input" value="' + esc(c.heldenklasse || "") + '" placeholder="z.B. Waffenmeister"/></div>'));
      hkRow.appendChild(h('<div class="field"><button class="btn" id="hk-set">Setzen</button></div>'));
      pe.appendChild(hkRow);
      pe.appendChild(h('<div class="help"><a href="' + R.deeplinks.heldenklassen + '" target="_blank" rel="noopener">↗ Heldenklassen im SRD</a></div>'));
    }
    box.appendChild(pe);

    // LP-Ökonomie
    var pl = h('<div class="panel"></div>');
    pl.appendChild(h('<h2>Lernpunkte ausgeben <span class="muted">(' + c.konten.lpOffen + ' offen · Kostenspalte: ' + E.lpSpalte(c) + ')</span></h2>'));
    var caps = E.caps(c);
    EIG.forEach(function (e) {
      pl.appendChild(lpRow(c, e.id, e.name + " (" + e.kurz + ")", c.eigenschaften[e.id] + " / " + caps[e.id]));
    });
    pl.appendChild(lpRow(c, "lk", "Lebenskraft", "+" + (c.lkGekauft || 0) + " gekauft"));
    pl.appendChild(lpRow(c, "tp", "Talentpunkt (TP)", c.konten.tpOffen + " offen"));
    // Sprache / Schriftzeichen
    var spRow = h('<div class="lp-row"><span class="lbl">Sprache / Schriftzeichen lernen</span></div>');
    var spInput = h('<input type="text" id="sp-input" placeholder="Name der Sprache" style="max-width:200px"/>');
    var spBtn = h('<button class="btn btn-sm" ' + (c.konten.lpOffen < 1 ? "disabled" : "") + '>1 LP · Sprache</button>');
    var szBtn = h('<button class="btn btn-sm" ' + (c.konten.lpOffen < 1 ? "disabled" : "") + '>1 LP · Schrift</button>');
    spBtn.onclick = function () { spendLanguage(c, "sprache"); };
    szBtn.onclick = function () { spendLanguage(c, "schriftzeichen"); };
    var spWrap = h('<span class="inline"></span>'); spWrap.appendChild(spInput); spWrap.appendChild(spBtn); spWrap.appendChild(szBtn);
    spRow.appendChild(spWrap);
    pl.appendChild(spRow);
    box.appendChild(pl);

    // TP / Talente
    box.appendChild(tabTalente(c));

    // Zauber (Zauberwirker)
    if (E.istZauberwirker(c)) {
      box.appendChild(tabZauber(c));
    }

    // Wiring EP/HK
    var epSet = box.querySelector("#ep-set");
    if (epSet) epSet.onclick = function () {
      var v = parseInt(box.querySelector("#ep-input").value, 10);
      if (isNaN(v)) { toast("Ungültige EP."); return; }
      var gained = E.epEintragen(c, v); S.upsert(c);
      if (gained.length) toast("Aufgestiegen auf Stufe " + c.stufe + "! +" + gained.reduce(function (a, g) { return a + g.lp; }, 0) + " LP, +" + gained.reduce(function (a, g) { return a + g.tp; }, 0) + " TP.");
      else toast("EP aktualisiert.");
      render();
    };
    var hkSet = box.querySelector("#hk-set");
    if (hkSet) hkSet.onclick = function () {
      var v = box.querySelector("#hk-input").value.trim();
      c.heldenklasse = v || null;
      E.log(c, "Heldenklasse", v ? "gewechselt zu " + v : "zurückgesetzt");
      S.upsert(c); toast(v ? "Heldenklasse: " + v : "Heldenklasse entfernt."); render();
    };
    return box;
  }

  function lpRow(c, ziel, label, info) {
    var kosten = E.lpKosten(c, ziel);
    var pruef = E.pruefeLpAusgabe(c, ziel);
    var row = h('<div class="lp-row"><span class="lbl">' + label + ' <span class="muted">' + (info ? "· " + info : "") + '</span></span></div>');
    var right = h('<span class="inline"></span>');
    right.appendChild(h('<span class="cost">' + kosten + ' LP</span>'));
    var btn = h('<button class="btn btn-sm"' + (pruef.ok ? "" : " disabled title=\"" + esc(pruef.grund) + "\"") + '>+1</button>');
    btn.onclick = function () {
      try { E.lpAusgeben(c, ziel); S.upsert(c); toast(E.labelZiel(ziel) + " +1."); render(); }
      catch (e) { toast(e.message); }
    };
    right.appendChild(btn);
    row.appendChild(right);
    return row;
  }

  function spendLanguage(c, art) {
    var input = document.getElementById("sp-input");
    var name = input ? input.value.trim() : "";
    if (!name) { toast("Name eingeben."); return; }
    try { E.lpAusgeben(c, art, name); S.upsert(c); toast(name + " gelernt (1 LP)."); render(); }
    catch (e) { toast(e.message); }
  }

  // ---- Tab: Ausrüstung -----------------------------------------------------
  function tabAusruestung(c) {
    var box = h('<div></div>');
    var p = h('<div class="panel"></div>');
    p.appendChild(h('<h2>Ausrüstung <a class="deeplink" href="' + R.deeplinks.ausruestung + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));

    // Nahwaffe
    var nahOpts = R.waffen.filter(function (w) { return w.art === "nah" || w.art === "beides"; });
    p.appendChild(waffenSelect(c, "nahwaffe", "Nahkampfwaffe (WB → Schlagen)", nahOpts));
    // Fernwaffe
    var fernOpts = R.waffen.filter(function (w) { return w.art === "fern" || w.art === "beides"; });
    p.appendChild(waffenSelect(c, "fernwaffe", "Fernkampfwaffe (WB → Schießen)", fernOpts));

    // Rüstungen (mehrere)
    p.appendChild(h('<h3>Rüstung & Schild <span class="muted">(PA stapelt)</span></h3>'));
    var rl = h('<div></div>');
    (c.ausruestung.ruestungen || []).forEach(function (rn, idx) {
      var r = E.findeRuestung(rn);
      var pill = h('<span class="pill">' + esc(rn) + ' (PA ' + (r ? r.pa : "?") + ') ✕</span>');
      pill.style.cursor = "pointer";
      pill.onclick = function () { c.ausruestung.ruestungen.splice(idx, 1); E.log(c, "Ausrüstung", rn + " abgelegt"); S.upsert(c); render(); };
      rl.appendChild(pill);
    });
    if (!(c.ausruestung.ruestungen || []).length) rl.appendChild(h('<span class="muted">— keine —</span>'));
    p.appendChild(rl);
    var addRow = h('<div class="inline" style="margin-top:10px"></div>');
    var rsel = h('<select style="max-width:280px"><option value="">— Rüstung/Schild hinzufügen —</option>' +
      R.ruestungen.map(function (r) { return '<option value="' + esc(r.name) + '">' + esc(r.name) + ' (PA ' + r.pa + (r.mods && r.mods.laufen ? ", Laufen " + r.mods.laufen + "m" : "") + ')</option>'; }).join("") + '</select>');
    rsel.onchange = function () {
      if (!rsel.value) return;
      c.ausruestung.ruestungen = c.ausruestung.ruestungen || [];
      c.ausruestung.ruestungen.push(rsel.value);
      E.log(c, "Ausrüstung", rsel.value + " angelegt"); S.upsert(c); render();
    };
    addRow.appendChild(rsel);
    p.appendChild(addRow);

    // Inventar
    p.appendChild(h('<h3>Inventar</h3>'));
    var inv = h('<div></div>');
    (c.ausruestung.inventar || []).forEach(function (it, idx) {
      var pill = h('<span class="pill">' + esc(it) + ' ✕</span>'); pill.style.cursor = "pointer";
      pill.onclick = function () { c.ausruestung.inventar.splice(idx, 1); S.upsert(c); render(); };
      inv.appendChild(pill);
    });
    if (!(c.ausruestung.inventar || []).length) inv.appendChild(h('<span class="muted">— leer —</span>'));
    p.appendChild(inv);
    var invRow = h('<div class="inline" style="margin-top:10px"></div>');
    var invInput = h('<input type="text" placeholder="Gegenstand" style="max-width:240px"/>');
    var invBtn = h('<button class="btn">Hinzufügen</button>');
    invBtn.onclick = function () { var v = invInput.value.trim(); if (!v) return; c.ausruestung.inventar = c.ausruestung.inventar || []; c.ausruestung.inventar.push(v); S.upsert(c); render(); };
    invRow.appendChild(invInput); invRow.appendChild(invBtn);
    p.appendChild(invRow);

    box.appendChild(p);

    // Auswirkung auf Kampfwerte (live)
    var kw = E.kampfwerte(c);
    var pe = h('<div class="panel"></div>');
    pe.appendChild(h('<h2>Wirkung auf Kampfwerte</h2>'));
    pe.appendChild(h('<div class="statgrid">' +
      '<div class="stat"><div class="v">' + kw.schlagen + '</div><div class="k">Schlagen</div></div>' +
      '<div class="stat"><div class="v">' + kw.schiessen + '</div><div class="k">Schießen</div></div>' +
      '<div class="stat"><div class="v">' + kw.abwehr + '</div><div class="k">Abwehr (PA ' + kw._pa + ')</div></div>' +
      '<div class="stat"><div class="v">' + kw.initiative + '</div><div class="k">Initiative</div></div>' +
      '<div class="stat"><div class="v">' + kw.laufen + 'm</div><div class="k">Laufen</div></div>' +
      '</div>'));
    box.appendChild(pe);
    return box;
  }

  function waffenSelect(c, slot, label, opts) {
    var field = h('<div class="field"><label>' + label + '</label></div>');
    var sel = h('<select><option value="">— keine —</option>' +
      opts.map(function (w) {
        return '<option value="' + esc(w.name) + '" ' + (c.ausruestung[slot] === w.name ? "selected" : "") + '>' +
          esc(w.name) + ' (WB ' + (w.wb >= 0 ? "+" : "") + w.wb + ')</option>';
      }).join("") + '</select>');
    sel.onchange = function () { c.ausruestung[slot] = sel.value || null; E.log(c, "Ausrüstung", label + ": " + (sel.value || "keine")); S.upsert(c); render(); };
    field.appendChild(sel);
    var w = E.findeWaffe(c.ausruestung[slot]);
    if (w && w.besonderes) field.appendChild(h('<div class="help">' + esc(w.besonderes) + '</div>'));
    return field;
  }

  // ---- Tab: Verlauf --------------------------------------------------------
  function tabVerlauf(c) {
    var box = h('<div class="panel"></div>');
    box.appendChild(h('<h2>Aufstiegs- & Änderungs-Historie</h2>'));
    if (!c.log || !c.log.length) { box.appendChild(h('<div class="muted">Noch keine Einträge.</div>')); return box; }
    var list = h('<div></div>');
    c.log.slice().reverse().forEach(function (entry) {
      var when = entry.ts ? new Date(entry.ts).toLocaleString("de-DE") : "";
      list.appendChild(h('<div class="log-entry"><div class="when">' + esc(when) + ' · Stufe ' + entry.stufe + '</div><b>' + esc(entry.aktion) + '</b> — ' + esc(entry.details) + '</div>'));
    });
    box.appendChild(list);
    box.appendChild(h('<div class="help" style="margin-top:12px">Tipp: „Export JSON“ lädt den Charakter herunter; committe ihn ins Repo, um jeden Aufstieg dauerhaft zu versionieren.</div>'));
    return box;
  }

  // ---- Talente-Panel (datengetrieben, mit klickbarer Beschreibung) ---------
  function tabTalente(c) {
    var hatDaten = !!(R.talente && R.talente.length);
    var pt = h('<div class="panel"></div>');
    pt.appendChild(h('<h2>Talente <span class="muted">(' + c.konten.tpOffen + ' TP offen)</span> ' +
      '<a class="deeplink" href="' + R.deeplinks.talente + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));

    // Bereits gelernte Talente
    if (c.talente.length) {
      var tt = h('<table></table>');
      tt.appendChild(h('<tr><th>Talent</th><th class="num">Rang</th><th></th></tr>'));
      c.talente.forEach(function (t) {
        var def = hatDaten ? E.talentDef(t.name) : null;
        var z = def ? E.talentZugang(c, def) : null;
        var maxR = z ? z.rang : null;
        var tr = h('<tr></tr>');
        var nameCell = h('<td></td>');
        if (def) {
          var link = h('<a style="cursor:pointer">' + esc(t.name) + ' ℹ</a>');
          link.onclick = function () { openTalent(def, c); };
          nameCell.appendChild(link);
        } else { nameCell.textContent = t.name; }
        tr.appendChild(nameCell);
        tr.appendChild(h('<td class="num">' + roman(t.rang) + (maxR ? ' <span class="muted">/ ' + roman(maxR) + '</span>' : '') + '</td>'));
        var actCell = h('<td class="right"></td>');
        var p = def ? E.talentVerfuegbar(c, def) : { ok: c.konten.tpOffen >= 1 };
        var up = h('<button class="btn btn-sm"' + (p.ok ? "" : ' disabled title="' + esc(p.grund || "") + '"') + '>+1 Rang (1 TP)</button>');
        up.onclick = function () { try { E.talentLernen(c, t.name); S.upsert(c); toast(t.name + " auf Rang " + E.aktuellerRang(c, t.name) + "."); render(); } catch (e) { toast(e.message); } };
        actCell.appendChild(up);
        tr.appendChild(actCell);
        tt.appendChild(tr);
      });
      pt.appendChild(tt);
    } else {
      pt.appendChild(h('<div class="muted">Noch keine Talente gelernt.</div>'));
    }

    if (!hatDaten) {
      // Fallback: freie Eingabe (sollte nicht passieren, Daten sind eingebunden)
      var talRow = h('<div class="inline" style="margin-top:10px"></div>');
      var talInput = h('<input type="text" placeholder="Talentname" style="max-width:260px"/>');
      var talBtn = h('<button class="btn" ' + (c.konten.tpOffen < 1 ? "disabled" : "") + '>Talent lernen (1 TP)</button>');
      talBtn.onclick = function () { var n = talInput.value.trim(); if (!n) return; try { E.talentLernen(c, n); S.upsert(c); render(); } catch (e) { toast(e.message); } };
      talRow.appendChild(talInput); talRow.appendChild(talBtn);
      pt.appendChild(talRow);
      return pt;
    }

    // Auswahl lernbarer Talente (Voraussetzung erfüllt, Rang noch offen)
    pt.appendChild(h('<h3>Neues Talent lernen</h3>'));
    var lernbar = R.talente.filter(function (t) {
      var z = E.talentZugang(c, t);
      return z && c.stufe >= z.ab && E.aktuellerRang(c, t.name) < z.rang;
    });
    if (!lernbar.length) {
      pt.appendChild(h('<div class="muted">Derzeit keine weiteren Talente verfügbar (Stufe/Rang).</div>'));
      return pt;
    }

    var sel = h('<select style="max-width:320px"></select>');
    lernbar.forEach(function (t) {
      var z = E.talentZugang(c, t);
      var cur = E.aktuellerRang(c, t.name);
      sel.appendChild(h('<option value="' + esc(t.name) + '">' + esc(t.name) +
        ' — ab ' + z.ab + ', Rang ' + cur + '/' + z.rang + '</option>'));
    });
    var descBox = h('<div class="help" style="margin:8px 0;min-height:1.2em"></div>');
    var infoBtn = h('<button class="btn btn-sm btn-subtle">ℹ Beschreibung</button>');
    var learnBtn = h('<button class="btn btn-primary btn-sm"' + (c.konten.tpOffen < 1 ? ' disabled title="Kein TP offen"' : "") + '>Lernen (1 TP)</button>');
    function refreshDesc() {
      var t = E.talentDef(sel.value);
      descBox.textContent = t ? t.beschreibung : "";
    }
    sel.addEventListener("change", refreshDesc);
    infoBtn.onclick = function () { var t = E.talentDef(sel.value); if (t) openTalent(t, c); };
    learnBtn.onclick = function () {
      try { E.talentLernen(c, sel.value); S.upsert(c); toast("Talent „" + sel.value + "“ gelernt."); render(); }
      catch (e) { toast(e.message); }
    };
    var row = h('<div class="inline" style="margin-top:6px;flex-wrap:wrap"></div>');
    row.appendChild(sel); row.appendChild(infoBtn); row.appendChild(learnBtn);
    pt.appendChild(row);
    pt.appendChild(descBox);
    refreshDesc();
    return pt;
  }

  // Talent-Beschreibung als Overlay lesen.
  function openTalent(t, c) {
    var z = c ? E.talentZugang(c, t) : null;
    var zugaenge = Object.keys(t.zugang || {}).map(function (k) {
      var e = t.zugang[k];
      return '<span class="pill">' + esc(k) + ' ' + e.ab + ' (' + roman(e.rang) + ')</span>';
    }).join("");
    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" style="max-width:560px"></div>');
    var head = h('<div class="modal-head"><h2>' + esc(t.name) + '</h2></div>');
    var hb = h('<div class="inline no-print"></div>');
    var ref = h('<a class="btn btn-sm" href="' + t.ref + '" target="_blank" rel="noopener">↗ Regeln</a>');
    var close = h('<button class="btn btn-sm">Schließen ✕</button>');
    close.onclick = closeTalent;
    hb.appendChild(ref); hb.appendChild(close); head.appendChild(hb);
    modal.appendChild(head);
    var bodyHtml = '<div class="sheet-section"><div style="white-space:pre-line;margin-bottom:14px">' + esc(t.beschreibung) + '</div>';
    if (z) bodyHtml += '<div class="help">Für ' + esc(c.klasse) + (c.unterklasse ? "/" + esc(c.unterklasse) : "") +
      ': ab Stufe <b>' + z.ab + '</b>, Maximalrang <b>' + roman(z.rang) + '</b>.</div>';
    bodyHtml += '<h3 style="margin-top:14px">Zugangsstufen</h3><div>' + zugaenge + '</div></div>';
    modal.appendChild(h('<div class="modal-body">' + bodyHtml + '</div>'));
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeTalent(); });
    document.addEventListener("keydown", escCloseTalent);
    document.body.appendChild(overlay);
    overlay.id = "talent-overlay";
  }
  function escCloseTalent(ev) { if (ev.key === "Escape") closeTalent(); }
  function closeTalent() {
    var o = document.getElementById("talent-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escCloseTalent);
  }

  // ---- Zauber-Panel (datengetrieben, mit klickbarer Beschreibung) ----------
  function tabZauber(c) {
    var hatDaten = !!(R.zauber && R.zauber.length);
    var pz = h('<div class="panel"></div>');
    var rest = E.zauberRest(c), gesamt = E.zauberBudgetGesamt(c);
    pz.appendChild(h('<h2>Zauber <span class="muted">(' + c.unterklasse + ' · Budget ' + E.zauberStufensumme(c) + '/' + gesamt + ')</span> ' +
      '<a class="deeplink" href="' + R.deeplinks.zauber + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));

    if (c.zauber.length) {
      var tt = h('<table></table>');
      tt.appendChild(h('<tr><th>Zauber</th><th class="num">Stufe</th><th>Art</th><th></th></tr>'));
      c.zauber.slice().sort(function (a, b) { return (a.stufe || 0) - (b.stufe || 0); }).forEach(function (z) {
        var def = hatDaten ? E.zauberDef(z.name) : null;
        var tr = h('<tr></tr>');
        var nameCell = h('<td></td>');
        if (def) { var lk = h('<a style="cursor:pointer">' + esc(z.name) + ' ℹ</a>'); lk.onclick = function () { openZauber(def, c); }; nameCell.appendChild(lk); }
        else nameCell.textContent = z.name;
        tr.appendChild(nameCell);
        tr.appendChild(h('<td class="num">' + (z.stufe || "?") + '</td>'));
        tr.appendChild(h('<td>' + (def ? esc(def.art) : "—") + '</td>'));
        var act = h('<td class="right"></td>');
        var del = h('<button class="btn btn-sm" title="Vergessen">✕</button>');
        del.onclick = function () { c.zauber = c.zauber.filter(function (x) { return x.name !== z.name; }); E.log(c, "Zauber vergessen", z.name); S.upsert(c); render(); };
        act.appendChild(del); tr.appendChild(act);
        tt.appendChild(tr);
      });
      pz.appendChild(tt);
    } else {
      pz.appendChild(h('<div class="muted">Noch keine Zauber gelernt.</div>'));
    }

    if (!hatDaten) return pz;

    pz.appendChild(h('<h3>Neuen Zauber lernen <span class="muted">(kostet keine LP/TP · Rest-Budget ' + rest + ')</span></h3>'));
    var lernbar = R.zauber.filter(function (z) { return E.zauberVerfuegbar(c, z).ok; });
    if (!lernbar.length) {
      pz.appendChild(h('<div class="muted">Derzeit keine weiteren Sprüche verfügbar (Zugangsstufe/Budget).</div>'));
      return pz;
    }
    var sel = h('<select style="max-width:340px"></select>');
    lernbar.forEach(function (z) {
      var st = E.zauberZugangsstufe(c, z);
      sel.appendChild(h('<option value="' + esc(z.name) + '">' + esc(z.name) + ' — Stufe ' + st + ' (' + esc(z.art) + ')</option>'));
    });
    var descBox = h('<div class="help" style="margin:8px 0;min-height:1.2em"></div>');
    var infoBtn = h('<button class="btn btn-sm btn-subtle">ℹ Beschreibung</button>');
    var learnBtn = h('<button class="btn btn-primary btn-sm">Lernen</button>');
    function refreshDesc() { var z = E.zauberDef(sel.value); descBox.textContent = z ? (z.art + " · ZB " + z.zb + " · " + z.beschreibung) : ""; }
    sel.addEventListener("change", refreshDesc);
    infoBtn.onclick = function () { var z = E.zauberDef(sel.value); if (z) openZauber(z, c); };
    learnBtn.onclick = function () { try { E.zauberLernen(c, sel.value); S.upsert(c); toast("Zauber „" + sel.value + "“ gelernt."); render(); } catch (e) { toast(e.message); } };
    var row = h('<div class="inline" style="margin-top:6px;flex-wrap:wrap"></div>');
    row.appendChild(sel); row.appendChild(infoBtn); row.appendChild(learnBtn);
    pz.appendChild(row); pz.appendChild(descBox);
    refreshDesc();
    return pz;
  }

  function openZauber(z, c) {
    var zugaenge = Object.keys(z.zugang || {}).map(function (k) {
      return '<span class="pill">' + esc(k) + ' ' + z.zugang[k] + '</span>';
    }).join("") || '<span class="muted">—</span>';
    var attrs = [["Art", z.art], ["ZB", z.zb], ["Dauer", z.dauer], ["Distanz", z.distanz], ["Abklingzeit", z.abklingzeit], ["Preis", z.preis]]
      .filter(function (a) { return a[1]; })
      .map(function (a) { return '<dt>' + a[0] + '</dt><dd>' + esc(a[1]) + '</dd>'; }).join("");
    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" style="max-width:560px"></div>');
    var head = h('<div class="modal-head"><h2>' + esc(z.name) + '</h2></div>');
    var hb = h('<div class="inline no-print"></div>');
    hb.appendChild(h('<a class="btn btn-sm" href="' + z.ref + '" target="_blank" rel="noopener">↗ Regeln</a>'));
    var close = h('<button class="btn btn-sm">Schließen ✕</button>'); close.onclick = closeZauber;
    hb.appendChild(close); head.appendChild(hb); modal.appendChild(head);
    var body = '<div class="sheet-section"><dl class="kv">' + attrs + '</dl>' +
      '<div style="white-space:pre-line;margin:14px 0">' + esc(z.beschreibung) + '</div>' +
      '<h3>Zugangsstufen</h3><div>' + zugaenge + '</div></div>';
    modal.appendChild(h('<div class="modal-body">' + body + '</div>'));
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeZauber(); });
    document.addEventListener("keydown", escCloseZauber);
    document.body.appendChild(overlay); overlay.id = "zauber-overlay";
  }
  function escCloseZauber(ev) { if (ev.key === "Escape") closeZauber(); }
  function closeZauber() {
    var o = document.getElementById("zauber-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escCloseZauber);
  }

  // ---- Gesamtansicht (Steckbrief, alles auf einen Blick) -------------------
  function openGesamt(c) {
    var kw = E.kampfwerte(c);
    var caps = E.caps(c);
    var dash = '<span class="muted">—</span>';

    function section(titel, inner) {
      return '<div class="sheet-section"><h3>' + titel + '</h3>' + inner + '</div>';
    }
    function kv(pairs) {
      return '<dl class="kv">' + pairs.map(function (p) {
        return '<dt>' + p[0] + '</dt><dd>' + (p[1] === "" || p[1] == null ? dash : p[1]) + '</dd>';
      }).join("") + '</dl>';
    }

    // Stammdaten
    var stamm = kv([
      ["Name", esc(c.name)],
      ["Geschlecht", esc(c.geschlecht)],
      ["Volk", esc(c.volk)],
      ["Klasse", esc(c.klasse + (c.unterklasse ? " · " + c.unterklasse : ""))],
      ["Heldenklasse", c.heldenklasse ? esc(c.heldenklasse) : ""],
      ["Stufe", c.stufe],
      ["Erfahrung", c.ep + " EP"],
      ["Offen", c.konten.lpOffen + " LP · " + c.konten.tpOffen + " TP"]
    ]);

    // Attribute & Eigenschaften
    var attrRows = ATTR.map(function (a) {
      var eigCells = a.eigenschaften.map(function (eid) {
        return eigKurz(eid) + " <b>" + c.eigenschaften[eid] + "</b> <span class='muted'>/" + caps[eid] + "</span>";
      }).join(" &nbsp; ");
      return '<tr><td>' + a.name + ' (' + a.kurz + ')</td><td class="num"><b>' + c.attribute[a.id] + '</b></td><td>' + eigCells + '</td></tr>';
    }).join("");
    var attr = '<table><tr><th>Attribut</th><th class="num">Wert</th><th>Eigenschaften (Wert / Cap)</th></tr>' + attrRows + '</table>';

    // Kampfwerte
    var kwDefs = [
      ["Lebenskraft", kw.lebenskraft], ["Abwehr", kw.abwehr + " (PA " + kw._pa + ")"],
      ["Initiative", kw.initiative], ["Laufen", kw.laufen + " m"],
      ["Schlagen", kw.schlagen], ["Schießen", kw.schiessen]
    ];
    if (E.istZauberwirker(c)) { kwDefs.push(["Zaubern", kw.zaubern + " (+ZB)"]); kwDefs.push(["Zielzauber", kw.zielzauber + " (+ZB)"]); }
    var kampf = kv(kwDefs.map(function (d) { return [d[0], d[1]]; }));

    // Ausrüstung
    var ruest = (c.ausruestung.ruestungen || []).map(function (rn) {
      var r = E.findeRuestung(rn); return esc(rn) + (r ? " (PA " + r.pa + ")" : "");
    }).join(", ");
    var ausr = kv([
      ["Nahkampfwaffe", c.ausruestung.nahwaffe ? esc(c.ausruestung.nahwaffe) + waffenWB(c.ausruestung.nahwaffe) : ""],
      ["Fernkampfwaffe", c.ausruestung.fernwaffe ? esc(c.ausruestung.fernwaffe) + waffenWB(c.ausruestung.fernwaffe) : ""],
      ["Rüstung & Schild", ruest],
      ["Inventar", (c.ausruestung.inventar || []).map(esc).join(", ")]
    ]);

    // Talente / Zauber / Volk / Sprachen
    var talente = c.talente.length ? c.talente.map(function (t) { return '<span class="pill">' + esc(t.name) + ' ' + roman(t.rang) + '</span>'; }).join("") : dash;
    var zauber = c.zauber.length ? c.zauber.map(function (z) { return '<span class="pill">' + esc(z.name) + ' (St. ' + z.stufe + ')</span>'; }).join("") : dash;
    var voelk = (c.volksfaehigkeiten && c.volksfaehigkeiten.length) ? c.volksfaehigkeiten.map(function (f) { return '<span class="pill">' + esc(f) + '</span>'; }).join("") : dash;
    var sprachen = c.sprachen.length ? c.sprachen.map(esc).join(", ") : "";
    var schrift = (c.schriftzeichen && c.schriftzeichen.length) ? c.schriftzeichen.map(esc).join(", ") : "";
    var meta = kv([["Volksfähigkeiten", voelk], ["Sprachen", sprachen], ["Schriftzeichen", schrift]]);

    var body =
      section("Stammdaten", stamm) +
      section("Attribute & Eigenschaften", attr) +
      section("Kampfwerte", kampf + (E.istZauberwirker(c) ? '<div class="help">ZB = Zauberbonus des aktiven Spruchs, kommt situativ dazu.</div>' : "")) +
      section("Ausrüstung", ausr) +
      section("Talente", '<div>' + talente + '</div>') +
      (E.istZauberwirker(c) ? section("Zauber", '<div>' + zauber + '</div>') : "") +
      section("Volk, Sprachen & Schrift", meta) +
      (c.notizen ? section("Notizen", '<div>' + esc(c.notizen).replace(/\n/g, "<br>") + '</div>') : "");

    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" role="dialog" aria-label="Gesamtansicht"></div>');
    var head = h('<div class="modal-head"><h2>📋 ' + esc(c.name) + ' <span class="muted" style="font-weight:400;font-size:14px">· Steckbrief</span></h2></div>');
    var headBtns = h('<div class="inline no-print"></div>');
    var bPrint = h('<button class="btn btn-sm">Drucken</button>');
    bPrint.onclick = function () { window.print(); };
    var bClose = h('<button class="btn btn-sm">Schließen ✕</button>');
    bClose.onclick = closeGesamt;
    headBtns.appendChild(bPrint); headBtns.appendChild(bClose);
    head.appendChild(headBtns);
    modal.appendChild(head);
    modal.appendChild(h('<div class="modal-body">' + body + '</div>'));
    overlay.appendChild(modal);

    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeGesamt(); });
    document.addEventListener("keydown", escClose);
    document.body.appendChild(overlay);
    overlay.id = "gesamt-overlay";
  }
  function escClose(ev) { if (ev.key === "Escape") closeGesamt(); }
  function closeGesamt() {
    var o = document.getElementById("gesamt-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escClose);
  }
  function waffenWB(name) { var w = E.findeWaffe(name); return w ? " (WB " + (w.wb >= 0 ? "+" : "") + w.wb + ")" : ""; }

  // ===========================================================================
  // BESTIARIUM / MONSTER (für den SL)
  // ===========================================================================
  var MONSTER_GRUPPEN = ["Alle", "Humanoide", "Tiere", "Untote", "Magische Wesen", "Konstrukte", "Pflanzenwesen"];

  function renderMonster() {
    var monster = R.monster || [];
    var wrap = h('<div></div>');
    wrap.appendChild(h('<h2 style="margin:0 0 4px">🐉 Bestiarium <span class="muted">(' + monster.length + ' Kreaturen)</span></h2>'));
    wrap.appendChild(h('<div class="help" style="margin-bottom:6px">Karte anklicken = zur Begegnung hinzufügen · ℹ = Statblock lesen.</div>'));

    // --- Begegnung (kompakt, oben) ---
    wrap.appendChild(begegnungPanel(true));

    // --- Quick-Filter (Gruppen) + Suche ---
    var chips = h('<div class="chip-row"></div>');
    MONSTER_GRUPPEN.forEach(function (g) {
      var chip = h('<span class="chip' + (state.monster.gruppe === g ? " active" : "") + '">' + g + '</span>');
      chip.onclick = function () { state.monster.gruppe = g; state.monster.limit = MONSTER_LIMIT; render(); };
      chips.appendChild(chip);
    });
    wrap.appendChild(chips);
    var suche = h('<input type="text" id="m-suche" placeholder="🔎 Suche (Name)…" value="' + esc(state.monster.suche) + '" style="max-width:280px;margin-bottom:12px"/>');
    suche.addEventListener("input", function () {
      state.monster.suche = suche.value;
      state.monster.limit = MONSTER_LIMIT;
      var cur = suche.selectionStart;
      renderCardsOnly();
      var s2 = document.getElementById("m-suche"); if (s2) { s2.focus(); s2.setSelectionRange(cur, cur); }
    });
    wrap.appendChild(suche);

    var cardsWrap = h('<div id="m-cards"></div>');
    wrap.appendChild(cardsWrap);
    app.appendChild(wrap);
    renderCardsOnly();
  }

  function gefilterteMonster() {
    var q = state.monster.suche.trim().toLowerCase();
    return (R.monster || []).filter(function (m) {
      if (state.monster.gruppe !== "Alle" && m.gruppe !== state.monster.gruppe) return false;
      if (q && m.name.toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }

  var MONSTER_LIMIT = 24; // wie viele Karten anfangs zeigen (Pagination)

  function renderCardsOnly() {
    var box = document.getElementById("m-cards");
    if (!box) return;
    box.innerHTML = "";
    var liste = gefilterteMonster();
    var limit = state.monster.limit || MONSTER_LIMIT;
    var sichtbar = liste.slice(0, limit);
    box.appendChild(h('<div class="help" style="margin-bottom:8px">' + liste.length + ' Treffer' +
      (liste.length > sichtbar.length ? ' · ' + sichtbar.length + ' angezeigt' : '') + '</div>'));
    var grid = h('<div class="grid grid-cards"></div>');
    sichtbar.forEach(function (m) {
      var card = h('<div class="card mcard">' +
        '<span class="ghbadge">GH ' + (m.gh != null ? m.gh : "?") + ' · ' + m.ep + ' EP</span>' +
        '<div class="mname">' + esc(m.name) + '</div>' +
        '<div class="mgrp">' + esc(m.gruppe) + ' · ' + esc(m.gk) + '</div>' +
        '<div class="mstats"><span>LK <b>' + (m.kw.lk != null ? m.kw.lk : "?") + '</b></span>' +
        '<span>Abw <b>' + (m.kw.abwehr != null ? m.kw.abwehr : "?") + '</b></span>' +
        '<span>Schl <b>' + (m.kw.schlagen != null ? m.kw.schlagen : "–") + '</b></span>' +
        (m.kw.schiessen != null ? '<span>Schie <b>' + m.kw.schiessen + '</b></span>' : '') +
        '</div>' +
        '<span class="info">ℹ Statblock</span></div>');
      card.onclick = function () { S.begegnungAddInstanz(m, 1); toast(m.name + " zur Begegnung hinzugefügt."); refreshBegegnung(); };
      card.querySelector(".info").onclick = function (ev) { ev.stopPropagation(); openMonster(m); };
      grid.appendChild(card);
    });
    box.appendChild(grid);
    if (liste.length > sichtbar.length) {
      var mehr = h('<button class="btn" style="margin-top:14px;width:100%">Mehr anzeigen (' + (liste.length - sichtbar.length) + ' weitere)</button>');
      mehr.onclick = function () { state.monster.limit = limit + MONSTER_LIMIT; renderCardsOnly(); };
      box.appendChild(mehr);
    }
  }

  // Panel-Baustein. sticky=true für die kompakte Anzeige im Bestiarium-Tab.
  function begegnungPanel(sticky) {
    var panel = h('<div class="panel ' + (sticky ? "encounter" : "encounter-full") + '" id="begegnung"></div>');
    fillBegegnung(panel);
    return panel;
  }
  function refreshBegegnung() {
    var p = document.getElementById("begegnung");
    if (p) { p.innerHTML = ""; fillBegegnung(p); }
  }

  // Eigener Tab: Begegnung im Vordergrund (Kampf-Manager, ohne Monsterliste).
  function renderBegegnung() {
    var wrap = h('<div></div>');
    var head = h('<div class="inline" style="justify-content:space-between;width:100%;margin-bottom:10px"></div>');
    head.appendChild(h('<h2 style="margin:0">⚔️ Begegnung</h2>'));
    var addBtn = h('<button class="btn btn-primary">+ Monster aus dem Bestiarium</button>');
    addBtn.onclick = function () { go("monster"); };
    head.appendChild(addBtn);
    wrap.appendChild(head);
    wrap.appendChild(begegnungPanel(false));
    wrap.appendChild(beutePanel());
    wrap.appendChild(h('<div class="help" style="margin-top:10px">Tipp: Monster fügst du im Tab „🐉 Monster" hinzu — die Begegnung bleibt dort oben sichtbar.</div>'));
    app.appendChild(wrap);
  }
  var ZUSTAENDE_PRESETS = ["Geblendet", "Schlafend", "Vergiftet", "Brennend", "Verlangsamt", "Gelähmt", "Niedergeschlagen", "Bewusstlos", "In Furcht", "Festgehalten", "Verwirrt", "Stumm"];

  function fillBegegnung(panel) {
    var list = S.begegnungLoad();
    var bySlug = {}; (R.monster || []).forEach(function (m) { bySlug[m.slug] = m; });
    var lebend = list.filter(function (e) { return !e.tot; });
    var sumEp = list.reduce(function (a, e) { var m = bySlug[e.slug]; return a + (m ? (m.ep || 0) : 0); }, 0);
    var maxGh = list.reduce(function (a, e) { var m = bySlug[e.slug]; return Math.max(a, m ? (m.gh || 0) : 0); }, 0);

    var head = h('<div class="inline" style="justify-content:space-between;width:100%"></div>');
    head.appendChild(h('<h2 style="margin:0">Begegnung <span class="muted">' +
      (list.length ? "(" + lebend.length + "/" + list.length + " aktiv · Σ " + sumEp + " EP · max GH " + maxGh + ")" : "(leer)") + '</span></h2>'));
    if (list.length) {
      var btns = h('<div class="inline"></div>');
      var lootbar = list.filter(function (e) { return e.tot && !e.beute; });
      if (lootbar.length && global.DS_BEUTE && R.beute) {
        var lootAll = h('<button class="btn btn-sm">💰 Alle looten (' + lootbar.length + ')</button>');
        lootAll.onclick = function () {
          lootbar.forEach(function (e) { var m = bySlug[e.slug]; if (m) S.begegnungUpdate(e.id, { beute: global.DS_BEUTE.lootMonster(m) }); });
          refreshBegegnung();
        };
        btns.appendChild(lootAll);
      }
      var clear = h('<button class="btn btn-sm btn-danger">Leeren</button>');
      clear.onclick = function () { if (confirm("Begegnung leeren?")) { S.begegnungClear(); refreshBegegnung(); } };
      btns.appendChild(clear);
      head.appendChild(btns);
    }
    panel.appendChild(head);

    if (!list.length) {
      panel.appendChild(h('<div class="muted" style="margin-top:6px">Noch keine Monster — im Tab „🐉 Monster" eine Karte anklicken.</div>'));
      return;
    }

    list.forEach(function (e) {
      var m = bySlug[e.slug];
      var frac = e.lkMax ? Math.max(0, e.lk) / e.lkMax : 0;
      var farbe = e.tot ? "var(--muted)" : (frac <= 0.25 ? "var(--bad)" : (frac <= 0.6 ? "var(--accent-2)" : "var(--good)"));
      var inst = h('<div class="enc-inst' + (e.tot ? " tot" : "") + '"></div>');

      // Zeile 1: Name + LK + Steuerung
      var z1 = h('<div class="enc-line1"></div>');
      var name = h('<span class="en"><a style="cursor:pointer">' + esc(e.label) + '</a></span>');
      if (m) name.querySelector("a").onclick = function () { openMonster(m); };
      z1.appendChild(name);
      z1.appendChild(h('<span class="lkval" style="color:' + farbe + '">LK ' + Math.max(0, e.lk) + '/' + e.lkMax + '</span>'));

      // LK-Steuerung (Gruppe): Eingabe + Schaden + Heilen
      var hp = h('<div class="enc-grp"></div>');
      var dmg = h('<input type="number" class="dmg" placeholder="±" title="Schaden/Heilung" />');
      var bDmg = h('<button class="btn enc-btn" title="Schaden abziehen">💥</button>');
      var bHeal = h('<button class="btn enc-btn" title="heilen">＋</button>');
      function applyLk(sign) {
        var v = parseInt(dmg.value, 10);
        if (isNaN(v) || v <= 0) { v = 1; }
        var neu = e.lk + sign * v;
        if (neu < 0) neu = 0;
        if (neu > e.lkMax) neu = e.lkMax;
        S.begegnungUpdate(e.id, { lk: neu, tot: neu <= 0 });
        refreshBegegnung();
      }
      bDmg.onclick = function () { applyLk(-1); };
      bHeal.onclick = function () { applyLk(1); };
      dmg.addEventListener("keydown", function (ev) { if (ev.key === "Enter") applyLk(-1); });
      hp.appendChild(dmg); hp.appendChild(bDmg); hp.appendChild(bHeal);
      z1.appendChild(hp);

      // Status-Steuerung (abgesetzte Gruppe rechts): kampfunfähig + entfernen
      var dg = h('<div class="enc-grp enc-danger"></div>');
      var bTot = h('<button class="btn enc-btn" title="' + (e.tot ? "wiederbeleben" : "als kampfunfähig markieren") + '">' + (e.tot ? "↺" : "💀") + '</button>');
      bTot.onclick = function () { S.begegnungUpdate(e.id, { tot: !e.tot, lk: e.tot && e.lk <= 0 ? e.lkMax : e.lk }); refreshBegegnung(); };
      var del = h('<button class="btn enc-btn btn-danger" title="entfernen">✕</button>');
      del.onclick = function () { S.begegnungRemove(e.id); refreshBegegnung(); };
      dg.appendChild(bTot); dg.appendChild(del);
      z1.appendChild(dg);
      inst.appendChild(z1);

      // Kompakte Kampfwerte direkt am Monster — Stil wie die Bestiarium-Karten
      // (Label weiß, Wert gold), einheitlich über .mstats.
      if (m) {
        var kw = m.kw || {};
        var stat = function (label, titel, val, suffix) {
          if (val == null || val === "") return "";
          return '<span title="' + titel + '">' + label + ' <b>' + val + (suffix || "") + '</b></span>';
        };
        var statsHtml = stat("Schl", "Schlagen", kw.schlagen) + stat("Schie", "Schießen", kw.schiessen) +
          stat("Abw", "Abwehr", kw.abwehr) + stat("Lauf", "Laufen", kw.laufen, " m");
        if (statsHtml) inst.appendChild(h('<div class="enc-stats mstats">' + statsHtml + '</div>'));
      }

      // Zeile 2: Zustände
      var z2 = h('<div class="enc-line2"></div>');
      (e.zustaende || []).forEach(function (z) {
        var pill = h('<span class="pill bad" style="cursor:pointer" title="entfernen">' + esc(z) + ' ✕</span>');
        pill.onclick = function () {
          S.begegnungUpdate(e.id, { zustaende: e.zustaende.filter(function (x) { return x !== z; }) });
          refreshBegegnung();
        };
        z2.appendChild(pill);
      });
      var addZ = h('<button class="btn btn-sm btn-subtle">+ Zustand</button>');
      addZ.onclick = function () { openZustaende(e); };
      z2.appendChild(addZ);
      inst.appendChild(z2);

      // Zeile 3: Beute (erst wenn besiegt)
      if (e.tot && global.DS_BEUTE && R.beute && m) {
        var z3 = h('<div class="enc-loot"></div>');
        if (!e.beute) {
          var prof = global.DS_BEUTE.profilFuerMonster(m);
          // Tabelle pro Gegner wählbar (Vorschlag nach Kreaturentyp), Anzahl = BW
          var lootRow = h('<div class="inline" style="flex-wrap:wrap;gap:6px"></div>');
          var tsel = h('<select title="Beutetabelle" style="max-width:170px"></select>');
          BEUTE_TABS.forEach(function (tb) { tsel.appendChild(h('<option value="' + tb[0] + '"' + (prof.tabelle === tb[0] ? " selected" : "") + '>' + tb[1] + ' (' + tb[0] + ')</option>')); });
          var cnt = h('<input type="number" min="1" value="' + prof.anzahl + '" title="Anzahl Funde" style="width:56px"/>');
          var bl = h('<button class="btn btn-sm">💰 Looten</button>');
          bl.onclick = function () { lootInstanzMit(e, tsel.value, Math.max(1, parseInt(cnt.value, 10) || 1)); };
          lootRow.appendChild(h('<span class="enc-meta">Beute:</span>'));
          lootRow.appendChild(tsel); lootRow.appendChild(cnt); lootRow.appendChild(bl);
          z3.appendChild(lootRow);
        } else {
          z3.appendChild(renderLoot(e.beute));
          var rr = h('<button class="btn btn-sm btn-subtle" title="neu auswürfeln">🎲 neu</button>');
          rr.onclick = function () { lootInstanzMit(e, e.beute.tabelle, e.beute.anzahl); };
          var cl = h('<button class="btn btn-sm" title="Beute entfernen">✕</button>');
          cl.onclick = function () { S.begegnungUpdate(e.id, { beute: null }); refreshBegegnung(); };
          var ctr = h('<div class="inline" style="margin-top:4px"></div>');
          ctr.appendChild(rr); ctr.appendChild(cl);
          z3.appendChild(ctr);
        }
        inst.appendChild(z3);
      }

      panel.appendChild(inst);
    });
  }

  function lootInstanz(e, m) {
    var beute = global.DS_BEUTE.lootMonster(m);
    S.begegnungUpdate(e.id, { beute: beute });
    refreshBegegnung();
  }
  // Beute mit explizit gewählter Tabelle + Anzahl auswürfeln.
  function lootInstanzMit(e, tabelle, anzahl) {
    var z = [];
    for (var i = 0; i < anzahl; i++) z.push(global.DS_BEUTE.ziehung(tabelle, {}));
    S.begegnungUpdate(e.id, { beute: { tabelle: tabelle, anzahl: anzahl, ziehungen: z } });
    refreshBegegnung();
  }

  // Beute eines Gegners als Block rendern.
  function renderLoot(beute) {
    var box = h('<div class="loot-box"></div>');
    box.appendChild(h('<div class="muted" style="font-size:11px">Beute (Tabelle ' + beute.tabelle + ', ' + beute.anzahl + ' Fund' + (beute.anzahl > 1 ? "e" : "") + ')</div>'));
    (beute.ziehungen || []).forEach(function (z) {
      (z.zeilen || []).forEach(function (zl) {
        box.appendChild(h('<div style="margin-left:' + (zl.tiefe * 14) + 'px;font-size:13px">' + (zl.tiefe ? "" : "• ") + esc(zl.text) + '</div>'));
      });
    });
    return box;
  }

  function openZustaende(e) {
    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" style="max-width:460px"></div>');
    var head = h('<div class="modal-head"><h2>Zustände — ' + esc(e.label) + '</h2></div>');
    var close = h('<button class="btn btn-sm no-print">Fertig</button>'); close.onclick = closeZustaende;
    head.appendChild(close); modal.appendChild(head);
    var body = h('<div class="modal-body"></div>');
    var chips = h('<div class="chip-row"></div>');
    ZUSTAENDE_PRESETS.forEach(function (z) {
      var aktiv = (e.zustaende || []).indexOf(z) >= 0;
      var chip = h('<span class="chip' + (aktiv ? " active" : "") + '">' + z + '</span>');
      chip.onclick = function () {
        var cur = S.begegnungLoad().filter(function (x) { return x.id === e.id; })[0];
        if (!cur) return;
        var zs = cur.zustaende || [];
        zs = zs.indexOf(z) >= 0 ? zs.filter(function (x) { return x !== z; }) : zs.concat([z]);
        S.begegnungUpdate(e.id, { zustaende: zs });
        e.zustaende = zs;
        chip.classList.toggle("active");
        refreshBegegnung();
      };
      chips.appendChild(chip);
    });
    body.appendChild(h('<div class="help" style="margin-bottom:6px">Häufige Zustände (an-/abwählen). Eigene unten ergänzen.</div>'));
    body.appendChild(chips);
    var row = h('<div class="inline" style="margin-top:10px"></div>');
    var inp = h('<input type="text" placeholder="Eigener Zustand…" style="max-width:240px"/>');
    var addBtn = h('<button class="btn btn-sm">Hinzufügen</button>');
    addBtn.onclick = function () {
      var v = inp.value.trim(); if (!v) return;
      var cur = S.begegnungLoad().filter(function (x) { return x.id === e.id; })[0]; if (!cur) return;
      var zs = (cur.zustaende || []);
      if (zs.indexOf(v) < 0) zs = zs.concat([v]);
      S.begegnungUpdate(e.id, { zustaende: zs }); e.zustaende = zs;
      inp.value = ""; refreshBegegnung(); closeZustaende(); openZustaende(e);
    };
    inp.addEventListener("keydown", function (ev) { if (ev.key === "Enter") addBtn.onclick(); });
    row.appendChild(inp); row.appendChild(addBtn);
    body.appendChild(row);
    modal.appendChild(body);
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeZustaende(); });
    document.addEventListener("keydown", escCloseZustaende);
    document.body.appendChild(overlay); overlay.id = "zustaende-overlay";
  }
  function escCloseZustaende(ev) { if (ev.key === "Escape") closeZustaende(); }
  function closeZustaende() {
    var o = document.getElementById("zustaende-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escCloseZustaende);
  }

  function openMonster(m) {
    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" style="max-width:600px"></div>');
    var head = h('<div class="modal-head"><h2>' + esc(m.name) + ' <span class="muted" style="font-weight:400;font-size:14px">· ' + esc(m.gruppe) + ' · ' + esc(m.gk) + '</span></h2></div>');
    var hb = h('<div class="inline no-print"></div>');
    var addBtn = h('<button class="btn btn-sm btn-primary">+ Begegnung</button>');
    addBtn.onclick = function () { S.begegnungAddInstanz(m, 1); toast(m.name + " hinzugefügt."); refreshBegegnung(); };
    hb.appendChild(addBtn);
    hb.appendChild(h('<a class="btn btn-sm" href="' + m.ref + '" target="_blank" rel="noopener">↗ Regeln</a>'));
    var close = h('<button class="btn btn-sm">Schließen ✕</button>'); close.onclick = closeMonster;
    hb.appendChild(close); head.appendChild(hb); modal.appendChild(head);

    function sb(k, v) { return v == null || v === "" ? "" : '<div class="sb"><span>' + k + '</span><b>' + v + '</b></div>'; }
    var grid = '<div class="statblock">' +
      sb("KÖR", m.attr.koer) + sb("AGI", m.attr.agi) + sb("GEI", m.attr.gei) +
      sb("ST", m.eig.st) + sb("BE", m.eig.be) + sb("VE", m.eig.ve) +
      sb("HÄ", m.eig.hae) + sb("GE", m.eig.ge) + sb("AU", m.eig.au) + '</div>';
    var kw = '<div class="statblock" style="margin-top:8px">' +
      sb("LK", m.kw.lk) + sb("Abwehr", m.kw.abwehr) + sb("Initiative", m.kw.init) +
      sb("Laufen", m.kw.laufen != null ? m.kw.laufen + " m" : null) + sb("Schlagen", m.kw.schlagen) + sb("Schießen", m.kw.schiessen) +
      sb("GH", m.gh) + sb("EP", m.ep) + '</div>';
    var body = '<div class="sheet-section">' + grid + kw;
    if (m.bewaffnung.length) body += '<h3 style="margin-top:14px">Bewaffnung</h3><div>' + m.bewaffnung.map(function (w) { return '<span class="pill">' + esc(w) + '</span>'; }).join("") + '</div>';
    if (m.panzerung.length) body += '<h3>Panzerung</h3><div>' + m.panzerung.map(function (p) { return '<span class="pill">' + esc(p) + '</span>'; }).join("") + '</div>';
    if (m.faehigkeiten.length) {
      body += '<h3>Fähigkeiten</h3>';
      m.faehigkeiten.forEach(function (f) { body += '<div style="margin-bottom:8px"><b class="faeh-name">' + esc(f.name) + ':</b> ' + esc(f.text) + '</div>'; });
    }
    body += '</div>';
    modal.appendChild(h('<div class="modal-body">' + body + '</div>'));
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeMonster(); });
    document.addEventListener("keydown", escCloseMonster);
    document.body.appendChild(overlay); overlay.id = "monster-overlay";
  }
  function escCloseMonster(ev) { if (ev.key === "Escape") closeMonster(); }
  function closeMonster() {
    var o = document.getElementById("monster-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escCloseMonster);
  }

  // ---- Beute (Schätze auswürfeln, Spieler würfelt selbst oder Tool) ---------
  var beuteErgebnisse = []; // { tabelle, ueberschrift, zeilen } — überlebt HP-Refreshes
  var BEUTE_TABS = [["A", "Münzen"], ["B", "Primitive Hum."], ["C", "Zivil. Wildnis"], ["D", "Zivil. Urban"], ["M", "Magisch"]];

  function beutePanel() {
    if (!global.DS_BEUTE || !R.beute) return h('<div></div>');
    if (!state.beute) state.beute = { tabelle: "C", wuerfe: 1, pw: "", manuell: "" };
    if (state.beuteOffen === undefined) state.beuteOffen = false;
    var st = state.beute;
    var p = h('<div class="panel"></div>');
    // Einklappbarer Kopf — standardmäßig zu, da Nebenfunktion (Truhen)
    var phead = h('<div class="inline" style="justify-content:space-between;width:100%;cursor:pointer"></div>');
    phead.appendChild(h('<h2 style="margin:0">💰 Freie Beute <span class="muted" style="font-weight:400;font-size:14px">· Truhen & Schätze</span></h2>'));
    phead.appendChild(h('<button class="btn btn-sm btn-subtle">' + (state.beuteOffen ? "▲" : "▼") + '</button>'));
    phead.onclick = function () { state.beuteOffen = !state.beuteOffen; render(); };
    p.appendChild(phead);
    if (!state.beuteOffen && !beuteErgebnisse.length) return p;
    if (!state.beuteOffen) { // zu, aber es gibt Ergebnisse -> nur die zeigen lassen über Öffnen
      p.appendChild(h('<div class="help" style="margin-top:4px">' + beuteErgebnisse.length + ' Ergebnis(se) — zum Ansehen öffnen.</div>'));
      return p;
    }
    p.appendChild(h('<div class="help" style="margin:6px 0 8px">Für Schätze ohne Gegner (Truhen, Horte). Gegner-Beute kommt direkt beim besiegten Monster oben („💰 Looten"). Spieler würfelt W20 selbst — oder „🎲 Auswürfeln" löst Verweise + Münzwürfe auf. Mit Probenwert (PW): Wurf ≤ PW = Treffer.</div>'));

    var chips = h('<div class="chip-row"></div>');
    BEUTE_TABS.forEach(function (tb) {
      var chip = h('<span class="chip' + (st.tabelle === tb[0] ? " active" : "") + '">' + tb[1] + ' (' + tb[0] + ')</span>');
      chip.onclick = function () { st.tabelle = tb[0]; render(); };
      chips.appendChild(chip);
    });
    var more = h('<select style="max-width:150px"></select>');
    more.appendChild(h('<option value="">weitere…</option>'));
    Object.keys(R.beute).forEach(function (id) { more.appendChild(h('<option value="' + id + '"' + (st.tabelle === id ? " selected" : "") + '>' + id + ' · ' + esc(R.beute[id].name).slice(0, 24) + '</option>')); });
    more.onchange = function () { if (more.value) { st.tabelle = more.value; render(); } };
    chips.appendChild(more);
    p.appendChild(chips);

    var row = h('<div class="inline" style="flex-wrap:wrap;gap:10px;margin:6px 0"></div>');
    var wuerfe = h('<input type="number" min="1" value="' + (st.wuerfe || 1) + '" title="Anzahl Würfe" style="width:70px"/>');
    wuerfe.onchange = function () { st.wuerfe = Math.max(1, parseInt(wuerfe.value, 10) || 1); };
    var pw = h('<input type="number" placeholder="PW (optional)" value="' + esc(st.pw) + '" title="Probenwert — leer = probenlos" style="width:130px"/>');
    pw.onchange = function () { st.pw = pw.value; };
    var btnAuto = h('<button class="btn btn-primary">🎲 Auswürfeln</button>');
    btnAuto.onclick = function () {
      var n = Math.max(1, parseInt(wuerfe.value, 10) || 1);
      var opts = pw.value ? { mode: "probe", pw: parseInt(pw.value, 10) } : {};
      for (var i = 0; i < n; i++) { var z = global.DS_BEUTE.ziehung(st.tabelle, opts); z.tabelle = st.tabelle; beuteErgebnisse.unshift(z); }
      render();
    };
    row.appendChild(h('<span class="enc-meta">Würfe</span>')); row.appendChild(wuerfe);
    row.appendChild(pw); row.appendChild(btnAuto);
    p.appendChild(row);

    var row2 = h('<div class="inline" style="flex-wrap:wrap;gap:8px;margin-bottom:6px"></div>');
    var man = h('<input type="number" placeholder="eigener W20…" style="width:130px"/>');
    var btnMan = h('<button class="btn">✍️ Wurf anwenden</button>');
    btnMan.onclick = function () {
      var v = parseInt(man.value, 10); if (isNaN(v)) { toast("W20-Ergebnis eingeben."); return; }
      var opts = pw.value ? { mode: "probe", pw: parseInt(pw.value, 10), forcedRoll: v } : { forcedRoll: v };
      var z = global.DS_BEUTE.ziehung(st.tabelle, opts); z.tabelle = st.tabelle; beuteErgebnisse.unshift(z); man.value = ""; render();
    };
    var btnTab = h('<button class="btn btn-subtle">📖 Tabelle ansehen</button>');
    btnTab.onclick = function () { openBeuteTabelle(st.tabelle); };
    row2.appendChild(man); row2.appendChild(btnMan); row2.appendChild(btnTab);
    p.appendChild(row2);

    // Ergebnisse
    if (beuteErgebnisse.length) {
      var head = h('<div class="inline" style="justify-content:space-between;width:100%;margin-top:6px"></div>');
      head.appendChild(h('<h3 style="margin:0">Ergebnisse</h3>'));
      var clr = h('<button class="btn btn-sm btn-danger">Leeren</button>');
      clr.onclick = function () { beuteErgebnisse = []; render(); };
      head.appendChild(clr); p.appendChild(head);
      beuteErgebnisse.forEach(function (z) {
        var card = h('<div class="beute-erg"></div>');
        card.appendChild(h('<div class="muted" style="font-size:12px">Tabelle ' + z.tabelle + (z.ueberschrift ? " · " + esc(z.ueberschrift) : "") + '</div>'));
        if (!z.zeilen.length) card.appendChild(h('<div class="muted">—</div>'));
        z.zeilen.forEach(function (zl) {
          card.appendChild(h('<div style="margin-left:' + (zl.tiefe * 16) + 'px">' + (zl.tiefe ? "" : "• ") + esc(zl.text) + ' <span class="muted" style="font-size:11px">' + esc(zl.info) + '</span></div>'));
        });
        p.appendChild(card);
      });
    }
    return p;
  }

  function openBeuteTabelle(id) {
    var t = R.beute[id]; if (!t) return;
    var overlay = h('<div class="overlay"></div>');
    var modal = h('<div class="modal" style="max-width:560px"></div>');
    var head = h('<div class="modal-head"><h2>Tabelle ' + id + ' <span class="muted" style="font-weight:400;font-size:14px">· ' + esc(t.name) + ' (' + t.dice + ')</span></h2></div>');
    var close = h('<button class="btn btn-sm no-print">Schließen ✕</button>'); close.onclick = closeBeuteTabelle;
    head.appendChild(close); modal.appendChild(head);
    var body = h('<div class="modal-body"></div>');
    var tbl = h('<table></table>');
    tbl.appendChild(h('<tr><th>' + t.dice + '</th><th>Ergebnis</th></tr>'));
    (t.rows || []).forEach(function (r) {
      if (r.raw != null) { tbl.appendChild(h('<tr><td colspan="2">' + esc(r.raw) + '</td></tr>')); return; }
      var rng = r.lo === r.hi ? r.lo : r.lo + "–" + r.hi;
      tbl.appendChild(h('<tr><td class="num">' + rng + '</td><td>' + esc(r.text) + '</td></tr>'));
    });
    body.appendChild(tbl);
    modal.appendChild(body); overlay.appendChild(modal);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) closeBeuteTabelle(); });
    document.addEventListener("keydown", escCloseBeute);
    document.body.appendChild(overlay); overlay.id = "beute-overlay";
  }
  function escCloseBeute(ev) { if (ev.key === "Escape") closeBeuteTabelle(); }
  function closeBeuteTabelle() {
    var o = document.getElementById("beute-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escCloseBeute);
  }

  // ---- Diverses ------------------------------------------------------------
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n] || ("×" + n); }

  // ===========================================================================
  function render() {
    app.innerHTML = "";
    if (state.view === "create") renderCreate();
    else if (state.view === "generator") renderGenerator();
    else if (state.view === "monster") renderMonster();
    else if (state.view === "begegnung") renderBegegnung();
    else if (state.view === "sheet") renderSheet();
    else renderRoster();
  }

  // ---- Nav / Import --------------------------------------------------------
  function wireNav() {
    document.getElementById("nav-home").onclick = function () { go("roster"); };
    document.getElementById("nav-roster").onclick = function () { go("roster"); };
    document.getElementById("nav-monster").onclick = function () { go("monster"); };
    document.getElementById("nav-begegnung").onclick = function () { go("begegnung"); };
    document.getElementById("nav-create").onclick = function () { startCreate(); };
    var fileInput = document.getElementById("import-file");
    document.getElementById("nav-import").onclick = function () { fileInput.click(); };
    fileInput.onchange = function () {
      var file = fileInput.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var res = S.parseImport(reader.result);
          var imported = S.importChars(res.chars);
          toast(imported.length + " Charakter(e) importiert.");
          go("roster");
        } catch (e) { toast("Import fehlgeschlagen: " + e.message); }
        fileInput.value = "";
      };
      reader.readAsText(file);
    };
  }

  // ---- Init ----------------------------------------------------------------
  S.seedIfEmpty();
  wireNav();
  render();

  global.DS_APP = { render: render, go: go, state: state };
})(typeof window !== "undefined" ? window : this);
