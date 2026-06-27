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
    view: "roster",   // 'roster' | 'create' | 'sheet'
    currentId: null,
    tab: "uebersicht",
    create: null      // Arbeitszustand der Erschaffung
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
    var btnNew = h('<button class="btn btn-primary">+ Neuer Charakter</button>');
    btnNew.onclick = function () { startCreate(); };
    actions.appendChild(btnNew);
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
    var bExp = h('<button class="btn">Export JSON</button>');
    bExp.onclick = function () { S.exportChar(c); toast(c.id + ".json heruntergeladen — ins Repo committen."); };
    var bDel = h('<button class="btn btn-danger">Löschen</button>');
    bDel.onclick = function () { if (confirm("„" + c.name + "“ wirklich löschen? (Export vorher empfohlen)")) { S.remove(c.id); toast("Gelöscht."); go("roster"); } };
    ha.appendChild(bExp); ha.appendChild(bDel);
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
    var pt = h('<div class="panel"></div>');
    pt.appendChild(h('<h2>Talente <span class="muted">(' + c.konten.tpOffen + ' TP offen)</span> <a class="deeplink" href="' + R.deeplinks.talente + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));
    if (c.talente.length) {
      var tt = h('<table></table>');
      tt.appendChild(h('<tr><th>Talent</th><th class="num">Rang</th><th></th></tr>'));
      c.talente.forEach(function (t) {
        var tr = h('<tr><td>' + esc(t.name) + '</td><td class="num">' + roman(t.rang) + ' (' + t.rang + ')</td><td class="right"></td></tr>');
        var up = h('<button class="btn btn-sm" ' + (c.konten.tpOffen < 1 ? "disabled" : "") + '>+1 Rang (1 TP)</button>');
        up.onclick = function () { try { E.talentLernen(c, t.name); S.upsert(c); toast(t.name + " erhöht."); render(); } catch (e) { toast(e.message); } };
        tr.querySelector("td.right").appendChild(up);
        tt.appendChild(tr);
      });
      pt.appendChild(tt);
    } else {
      pt.appendChild(h('<div class="muted">Noch keine Talente gelernt.</div>'));
    }
    var talRow = h('<div class="inline" style="margin-top:10px"></div>');
    var talInput = h('<input type="text" id="tal-input" placeholder="Talentname (z.B. Schütze)" style="max-width:260px"/>');
    var talBtn = h('<button class="btn" ' + (c.konten.tpOffen < 1 ? "disabled" : "") + '>Talent lernen (1 TP)</button>');
    talBtn.onclick = function () {
      var name = talInput.value.trim();
      if (!name) { toast("Talentname eingeben."); return; }
      try { E.talentLernen(c, name); S.upsert(c); toast("Talent „" + name + "“ gelernt."); render(); } catch (e) { toast(e.message); }
    };
    talRow.appendChild(talInput); talRow.appendChild(talBtn);
    pt.appendChild(talRow);
    pt.appendChild(h('<div class="help">Talente haben klassen-/stufengebundene Voraussetzungen und Ränge I–X (siehe SRD). Voraussetzungs-Prüfung folgt mit der strukturierten Talentliste — derzeit frei eintragbar.</div>'));
    box.appendChild(pt);

    // Zauber (Zauberwirker)
    if (E.istZauberwirker(c)) {
      var pz = h('<div class="panel"></div>');
      pz.appendChild(h('<h2>Zauber <span class="muted">(Budget pro Stufe = ' + E.zauberBudget(c.stufe) + ')</span> <a class="deeplink" href="' + R.deeplinks.zauber + '" target="_blank" rel="noopener">↗ Regeln</a></h2>'));
      if (c.zauber.length) {
        pz.appendChild(h('<div>' + c.zauber.map(function (z) { return '<span class="pill">' + esc(z.name) + ' (St. ' + z.stufe + ')</span>'; }).join("") + '</div>'));
        pz.appendChild(h('<div class="help">Gelernte Stufensumme gesamt: ' + E.zauberStufensumme(c) + '</div>'));
      } else {
        pz.appendChild(h('<div class="muted">Noch keine Zauber gelernt.</div>'));
      }
      var zRow = h('<div class="inline" style="margin-top:10px"></div>');
      var zName = h('<input type="text" placeholder="Zaubername" style="max-width:200px"/>');
      var zStufe = h('<input type="number" min="1" value="1" style="max-width:80px" title="Spruchstufe"/>');
      var zBtn = h('<button class="btn">Zauber hinzufügen</button>');
      zBtn.onclick = function () {
        var nm = zName.value.trim(); var st = parseInt(zStufe.value, 10) || 1;
        if (!nm) { toast("Zaubername eingeben."); return; }
        E.zauberLernen(c, nm, st); S.upsert(c); toast("Zauber „" + nm + "“ hinzugefügt."); render();
      };
      zRow.appendChild(zName); zRow.appendChild(zStufe); zRow.appendChild(zBtn);
      pz.appendChild(zRow);
      pz.appendChild(h('<div class="help">Zauber lernen kostet weder LP noch TP; pro Stufe ist die Stufensumme neuer Sprüche ≤ Charakterstufe (SRD). Budget-Prüfung wird mit der Zauberliste ergänzt.</div>'));
      box.appendChild(pz);
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

  // ---- Diverses ------------------------------------------------------------
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n] || ("×" + n); }

  // ===========================================================================
  function render() {
    app.innerHTML = "";
    if (state.view === "create") renderCreate();
    else if (state.view === "sheet") renderSheet();
    else renderRoster();
  }

  // ---- Nav / Import --------------------------------------------------------
  function wireNav() {
    document.getElementById("nav-home").onclick = function () { go("roster"); };
    document.getElementById("nav-roster").onclick = function () { go("roster"); };
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
