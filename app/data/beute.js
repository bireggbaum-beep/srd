/*
 * DS_REGELN.beute — Beutetabellen (DS4 SRD+), grounded.
 * Generiert aus grw/anhang-beutetabellen.md.
 * Quelle: https://github.com/RoninEighty/Dungeonslayers  ·  © Christian Kennig, CC BY-NC-SA 4.0
 *
 * Schema: DS_REGELN.beute = { <ID>: { id, name, dice, complex,
 *   rows:[{lo,hi,text}] | (complex) [{raw}] } }
 * Verweise stehen als Text in den Zeilen (z.B. "Beutetabelle M:5", "(WN1)")
 * und werden vom Auflöser (js/beute.js) zur Laufzeit verfolgt.
 */
(function (global) {
  "use strict";
  if (!global.DS_REGELN) { console.error("DS_REGELN fehlt — beute.js nach regeln.js laden."); return; }
  global.DS_REGELN.beute = {
 "A": {
  "id": "A",
  "name": "MÜNZEN",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "1d20 KM"
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "2d20 KM"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "3d20 KM"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "4d20 KM"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "5d20 KM"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "1d20 SM"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "2d20 SM"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "3d20 SM"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "4d20 SM"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "5d20 SM"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "1d20 GM"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "2d20 GM"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "3d20 GM"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "4d20 GM"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "5d20 GM"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "6d20 GM"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "7d20 GM"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "8d20 GM"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "9d20 GM"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "10d20 GM"
   }
  ],
  "complex": false
 },
 "B": {
  "id": "B",
  "name": "PRIMITIVE HUMANOIDE",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "Fischgräte, madiges Fleisch o.ä."
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "kaputter Wasserschlauch"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Apfelgriebsch, Brotkanten, Knochen o.ä."
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Wasserschlauch"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "frischer Proviant (erlegtes Kleintier o.ä.)"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "blutige Lumpen"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Stück Schnur"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "ausgefranste, schmuddelige Decke"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "verbogenes Stück Draht"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "bunte Murmel oder Kerzenstummel"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Feuerstein & Zunder"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Kette aus Zähnen, Schrumpfkopf o.ä."
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "einfacher Angelhaken ohne Schnur"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "1d20/2 m modriges Seil"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "1d20 bunte, aber wertlose Steine"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Edelsteinsplitter (1d20 KM)"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "1d20 KM, 1d20 SM"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "1d20 KM, 1d20 SM, 1d20 GM"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "1d20 GM + Beutetabelle M:5"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "1d20 Edelsteine (je 1d20 GM)"
   }
  ],
  "complex": false
 },
 "C": {
  "id": "C",
  "name": "ZIVILISIERTE HUMANOIDE (WILDNIS)",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "Wasserschlauch oder Lederbecher"
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "Feuerstein & Zunder"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Wegzehrung (1 Mahlzeit)"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "1d20/2 Fackeln"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Decke oder Metallkrug"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Angel oder Holzbesteck"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Lederschnur oder 1d20 KM"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Topf oder Pfanne"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Feuerholz oder 1d20 SM"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Proviant (1d20 Tagesrationen)"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Nadel & Faden oder Bierfässchen"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "1d20/2 Meter Seil oder 1d20 GM"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "1 Heilkraut oder Pfeife mit Rauchkraut"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Kletterausrüstung oder Laterne mit Öl"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Beutetabelle M:5"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Zelt (2 Mann) oder Bärenfalle"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Beutetabelle A:15"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Kompass oder Goldzähne (1d20/2 GM)"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "1d20/2 Heilkraut oder Ring (1d20 GM)"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Beutetabelle M:10"
   }
  ],
  "complex": false
 },
 "D": {
  "id": "D",
  "name": "ZIVILISIERTE HUMANOIDE (URBAN)",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "1 KM"
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "Brotkrümel oder Kamm"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Stück Kohle oder leerer Lederbeutel"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Stück Draht oder benutztes Schneuztuch"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Eingewickeltes Brotstück oder ein Apfel"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Holzwürfel (sechseitig) oder Schnitzfigur"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Pfeife mit Rauchkraut oder Halstuch"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Holzwürfel (sechseitig) oder Schnitzfigur"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Brechstange oder ein Schlüssel"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "1d20 KM oder Ring (1 SM)"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "verzierte Gürtelschnalle (1d20/2 SM)"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "1 Heilkraut oder Kartenspiel"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "versteckter Dolch oder Kette (1d20 SM)"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Goldzahn (1 GM) oder Kerzenlaterne"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "5 Dietriche oder Schlüsselbund"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Beutetabelle A:15"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Goldzähne (1d20/2 GM) oder Heiltrank"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "wertvolles Schmuckstück (1d20 GM)"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Beutetabelle M:5"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Beutetabelle M:10"
   }
  ],
  "complex": false
 },
 "M": {
  "id": "M",
  "name": "MAGISCHE GEGENSTÄNDE",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "Trank (Beutetabelle T: Tränke)"
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "Trank (Beutetabelle T: Tränke)"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Trank (Beutetabelle T: Tränke)"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Trank (Beutetabelle T: Tränke)"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Trank (Beutetabelle T: Tränke)"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Schriftrolle (Beutetabelle Z: Zauber)"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Schriftrolle (Beutetabelle Z: Zauber)"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Waffe (Beutetabelle W: Waffen mit E: Effekt)"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Schriftrolle (Beutetabelle Z: Zauber)"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Waffe (Beutetabelle W: Waffen mit E: Effekt)"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Rüstung (Beutetabelle R: Rüstungen mit E: Effekt)"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Schriftrolle (Beutetabelle Z: Zauber)"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Rüstung (Beutetabelle R: Rüstungen mit E: Effekt)"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Schriftrolle (Beutetabelle Z: Zauber)"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Waffe (Beutetabelle W: Waffen mit E: Effekt)"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Rüstung (Beutetabelle R: Rüstungen mit E: Effekt)"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Waffe (Beutetabelle W: Waffen mit E: Effekt)"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Einzigartig (Beutetabelle X: Einzigartig )"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Gegenstand (Beutetabelle G: mag. Gegenstände)"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Einzigartig (Beutetabelle X: Einzigartig )"
   }
  ],
  "complex": false
 },
 "T": {
  "id": "T",
  "name": "TRÄNKE",
  "dice": "5W20",
  "rows": [
   {
    "lo": 5,
    "hi": 5,
    "text": "Allheilungstrank"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Berserkertrank"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Trank der Gasgestalt"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Vergrößerungstrank"
   },
   {
    "lo": 9,
    "hi": 10,
    "text": "Alterungstrank"
   },
   {
    "lo": 11,
    "hi": 12,
    "text": "Schnelligkeitstrank"
   },
   {
    "lo": 13,
    "hi": 14,
    "text": "Talenttrank"
   },
   {
    "lo": 15,
    "hi": 16,
    "text": "Trank der Zwergensicht"
   },
   {
    "lo": 17,
    "hi": 18,
    "text": "Unverwundbarkeitstrank"
   },
   {
    "lo": 19,
    "hi": 20,
    "text": "Verkleinerungstrank"
   },
   {
    "lo": 21,
    "hi": 23,
    "text": "Atemfreitrank"
   },
   {
    "lo": 24,
    "hi": 26,
    "text": "Klettertrank"
   },
   {
    "lo": 27,
    "hi": 28,
    "text": "großer Heiltrank"
   },
   {
    "lo": 29,
    "hi": 31,
    "text": "Wachsamkeitstrank"
   },
   {
    "lo": 32,
    "hi": 33,
    "text": "Gift (PW: 20, keine Abw.)"
   },
   {
    "lo": 34,
    "hi": 36,
    "text": "Wasserwandeltrank"
   },
   {
    "lo": 37,
    "hi": 38,
    "text": "Weihwasser"
   },
   {
    "lo": 39,
    "hi": 42,
    "text": "Zauberwechseltrank"
   },
   {
    "lo": 43,
    "hi": 46,
    "text": "Zieltrank"
   },
   {
    "lo": 47,
    "hi": 51,
    "text": "Abklingtrank"
   },
   {
    "lo": 52,
    "hi": 56,
    "text": "Heiltrank"
   },
   {
    "lo": 57,
    "hi": 61,
    "text": "Waffenweih"
   },
   {
    "lo": 62,
    "hi": 65,
    "text": "Andauernder Heiltrank"
   },
   {
    "lo": 66,
    "hi": 69,
    "text": "Schutztrank"
   },
   {
    "lo": 70,
    "hi": 73,
    "text": "großer Schutztrank"
   },
   {
    "lo": 74,
    "hi": 77,
    "text": "Stärketrank"
   },
   {
    "lo": 78,
    "hi": 80,
    "text": "Kampftrank"
   },
   {
    "lo": 81,
    "hi": 83,
    "text": "Schwebentrank"
   },
   {
    "lo": 84,
    "hi": 85,
    "text": "Allsichttrank"
   },
   {
    "lo": 86,
    "hi": 87,
    "text": "Fliegentrank"
   },
   {
    "lo": 88,
    "hi": 89,
    "text": "Giftbanntrank"
   },
   {
    "lo": 90,
    "hi": 91,
    "text": "Glückstrank"
   },
   {
    "lo": 92,
    "hi": 93,
    "text": "Konzentrationstrank"
   },
   {
    "lo": 94,
    "hi": 95,
    "text": "Trank der Lebenskraft"
   },
   {
    "lo": 96,
    "hi": 97,
    "text": "Zaubertrank"
   },
   {
    "lo": 98,
    "hi": 98,
    "text": "Teleporttrank"
   },
   {
    "lo": 99,
    "hi": 99,
    "text": "Unsichtbarkeitstrank"
   },
   {
    "lo": 100,
    "hi": 100,
    "text": "Verjüngungstrank"
   }
  ],
  "complex": false
 },
 "W": {
  "id": "W",
  "name": "WAFFENART",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 5,
    "text": "Fernkampfwaffe (WF)"
   },
   {
    "lo": 6,
    "hi": 20,
    "text": "Nahkampfwaffe (WN)"
   }
  ],
  "complex": false
 },
 "WF": {
  "id": "WF",
  "name": "WF: Fernkampfwaffe",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 2,
    "text": "1d20 Armbrustbolzen¹"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Armbrust, leicht"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Armbrust, schwer"
   },
   {
    "lo": 5,
    "hi": 6,
    "text": "1d20 Bogenpfeile¹"
   },
   {
    "lo": 7,
    "hi": 11,
    "text": "Bogen, Kurz-"
   },
   {
    "lo": 12,
    "hi": 14,
    "text": "Bogen, Lang-"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Elfenbogen"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Schleuderstab"
   },
   {
    "lo": 17,
    "hi": 19,
    "text": "Speer²"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Wurfmesser"
   }
  ],
  "complex": false
 },
 "WN": {
  "id": "WN",
  "name": "NAHKAMPFWAFFENART",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 12,
    "text": "mit Klinge (WN1)"
   },
   {
    "lo": 13,
    "hi": 20,
    "text": "ohne Klinge (WN2)"
   }
  ],
  "complex": false
 },
 "WN1": {
  "id": "WN1",
  "name": "WN1: MIT KLINGE",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 2,
    "text": "Bihänder"
   },
   {
    "lo": 3,
    "hi": 6,
    "text": "Dolch"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Hellebarde"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Schlachtbeil"
   },
   {
    "lo": 9,
    "hi": 11,
    "text": "Schwert, Breit-"
   },
   {
    "lo": 12,
    "hi": 14,
    "text": "Schwert, Kurz-"
   },
   {
    "lo": 15,
    "hi": 17,
    "text": "Schwert, Lang-"
   },
   {
    "lo": 18,
    "hi": 19,
    "text": "Streitaxt"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Zwergenaxt"
   }
  ],
  "complex": false
 },
 "WN2": {
  "id": "WN2",
  "name": "WN2: OHNE KLINGE",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "Flegel"
   },
   {
    "lo": 2,
    "hi": 4,
    "text": "Hammer"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Kampfstab¹"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Keule¹"
   },
   {
    "lo": 7,
    "hi": 8,
    "text": "Morgenstern"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Schlagring"
   },
   {
    "lo": 10,
    "hi": 12,
    "text": "Speer¹"
   },
   {
    "lo": 13,
    "hi": 16,
    "text": "Streithammer"
   },
   {
    "lo": 17,
    "hi": 20,
    "text": "Streitkolben"
   }
  ],
  "complex": false
 },
 "R": {
  "id": "R",
  "name": "RÜSTUNGSART",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 3,
    "text": "Ergänzende Rüstung"
   },
   {
    "lo": 4,
    "hi": 7,
    "text": "Robe"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "runenbestickte Robe"
   },
   {
    "lo": 9,
    "hi": 13,
    "text": "Lederpanzer"
   },
   {
    "lo": 14,
    "hi": 17,
    "text": "Kettenpanzer"
   },
   {
    "lo": 18,
    "hi": 20,
    "text": "Plattenpanzer"
   }
  ],
  "complex": false
 },
 "ER": {
  "id": "ER",
  "name": "ERGÄNZENDE RÜSTUNG",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 5,
    "text": "Lederschienen"
   },
   {
    "lo": 6,
    "hi": 8,
    "text": "Plattenarmschienen"
   },
   {
    "lo": 9,
    "hi": 11,
    "text": "Plattenbeinschienen"
   },
   {
    "lo": 12,
    "hi": 15,
    "text": "Plattenhelm"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Holzschild (zerbricht nicht bei einem Patzer)"
   },
   {
    "lo": 17,
    "hi": 19,
    "text": "Metallschild"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Turmschild"
   }
  ],
  "complex": false
 },
 "E": {
  "id": "E",
  "name": "BONUS AUF WB BZW. PA W20 SONSTIGE EFFEKTE W20 ART DES EFFEKTS",
  "dice": "W20",
  "rows": [
   {
    "raw": "1 | kein Bonus, aber 1 Effekt | 1-15 | Kein Effekt | 1-5 | Freiaktion (EA)"
   },
   {
    "raw": "2-17 | Bonus +1 | 16-18 | 1 Effekt | 6-13 | Bonus (EB)"
   },
   {
    "raw": "18-19 | Bonus +2 | 19 | 2 Effekte | 14-17 | Talent (ET)"
   },
   {
    "raw": "20 | Bonus +3 | 20 | 2 Effekte + weiterer Wurf | 18-20 | Zaubereffekt (EZ)"
   }
  ],
  "complex": true
 },
 "EA": {
  "id": "EA",
  "name": "AKTIONSFREI",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 6,
    "text": "Aufstehen¹"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Konzentrieren²"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Rennen¹"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Schießen¹"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Schlagen¹"
   },
   {
    "lo": 11,
    "hi": 13,
    "text": "Waffe aufheben¹"
   },
   {
    "lo": 14,
    "hi": 16,
    "text": "Waffe ziehen"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Zaubern¹"
   },
   {
    "lo": 18,
    "hi": 19,
    "text": "Zauber wechseln¹"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Zielzauber¹"
   }
  ],
  "complex": false
 },
 "ET": {
  "id": "ET",
  "name": "TALENTRANG¹",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 12,
    "text": "+I (ET1)"
   },
   {
    "lo": 13,
    "hi": 17,
    "text": "+II (ET1)"
   },
   {
    "lo": 18,
    "hi": 19,
    "text": "+III (ET1)"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "+I und weiterer Wurf"
   }
  ],
  "complex": false
 },
 "EB": {
  "id": "EB",
  "name": "BONUSHÖHE (2. W20)",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 9,
    "text": "einzelne Probe (EB1) 1-10 11-17 18-20"
   },
   {
    "lo": 10,
    "hi": 13,
    "text": "einzelnen Zauber (Z) 1-15 16-19 20"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Zaubergruppe (EB2) 1-15 16-19 20"
   },
   {
    "lo": 15,
    "hi": 17,
    "text": "Kampfwert¹ (EB3) 1-10 11-17 18-20"
   },
   {
    "lo": 18,
    "hi": 19,
    "text": "Eigenschaft (EB4) 1-10 11-17 18-20"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Attribut (EB5) 1-10 11-17 18-20"
   }
  ],
  "complex": false
 },
 "EB1": {
  "id": "EB1",
  "name": "EB1: EINZELNE PROBE",
  "dice": "2W20",
  "rows": [
   {
    "lo": 2,
    "hi": 3,
    "text": "Flirten"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Krankheit trotzen"
   },
   {
    "lo": 5,
    "hi": 6,
    "text": "Taschendiebstahl"
   },
   {
    "lo": 7,
    "hi": 8,
    "text": "Schwimmen"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Mechanismus öffnen"
   },
   {
    "lo": 10,
    "hi": 11,
    "text": "Spuren lesen"
   },
   {
    "lo": 12,
    "hi": 14,
    "text": "Schleichen"
   },
   {
    "lo": 15,
    "hi": 17,
    "text": "Feilschen"
   },
   {
    "lo": 18,
    "hi": 20,
    "text": "Bemerken"
   },
   {
    "lo": 21,
    "hi": 25,
    "text": "Wissen"
   },
   {
    "lo": 26,
    "hi": 29,
    "text": "Verbergen"
   },
   {
    "lo": 30,
    "hi": 31,
    "text": "Schlösser öffnen"
   },
   {
    "lo": 32,
    "hi": 33,
    "text": "Klettern"
   },
   {
    "lo": 34,
    "hi": 35,
    "text": "Fallen entschärfen"
   },
   {
    "lo": 36,
    "hi": 37,
    "text": "Reiten"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Springen"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Schätzen"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Gift trotzen"
   }
  ],
  "complex": false
 },
 "EB2": {
  "id": "EB2",
  "name": "EB2: ZAUBERGRUPPE",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 2,
    "text": "Blitzzauber"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Erd-, Fels- & Steinzauber"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Eis-, Frost- & Wasserzauber"
   },
   {
    "lo": 5,
    "hi": 6,
    "text": "Feuerzauber"
   },
   {
    "lo": 7,
    "hi": 9,
    "text": "Heilzauber"
   },
   {
    "lo": 10,
    "hi": 12,
    "text": "Lichtzauber"
   },
   {
    "lo": 13,
    "hi": 14,
    "text": "Luft- & Transportzauber"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Schadenszauber"
   },
   {
    "lo": 16,
    "hi": 17,
    "text": "Schattenzauber"
   },
   {
    "lo": 18,
    "hi": 20,
    "text": "Schutzzauber"
   }
  ],
  "complex": false
 },
 "EB3": {
  "id": "EB3",
  "name": "EB3: KAMPFWERT",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 3,
    "text": "Lebenskraft"
   },
   {
    "lo": 4,
    "hi": 6,
    "text": "Abwehr"
   },
   {
    "lo": 7,
    "hi": 9,
    "text": "Initiative"
   },
   {
    "lo": 10,
    "hi": 11,
    "text": "Laufen¹"
   },
   {
    "lo": 12,
    "hi": 14,
    "text": "Schlagen"
   },
   {
    "lo": 15,
    "hi": 16,
    "text": "Schießen"
   },
   {
    "lo": 17,
    "hi": 18,
    "text": "Zaubern"
   },
   {
    "lo": 19,
    "hi": 20,
    "text": "Zielzauber"
   }
  ],
  "complex": false
 },
 "EB5": {
  "id": "EB5",
  "name": "EB5: ATTRIBUT",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 7,
    "text": "Körper"
   },
   {
    "lo": 8,
    "hi": 13,
    "text": "Agilität"
   },
   {
    "lo": 14,
    "hi": 20,
    "text": "Geist"
   }
  ],
  "complex": false
 },
 "EZ": {
  "id": "EZ",
  "name": "EZ: ZAUBEREFFEKT",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 12,
    "text": "Zauber normal eingebettet (Z)"
   },
   {
    "lo": 13,
    "hi": 16,
    "text": "1d20 Ladungen eingebettet (Z)"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Abklingzeit verkürzt (EZ1 & Z)"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Abklingzeit eines Trägerzaubers verkürzt (EZ1 & Z)"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Abklingzeit aller Trägerzauber verkürzt (EZ1)"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Abklingzeit ignorieren (EZ2 & Z)"
   }
  ],
  "complex": false
 },
 "EZ1": {
  "id": "EZ1",
  "name": "EZ1: VERKÜRZT W20 EZ2: IGNORIEREN",
  "dice": "W20",
  "rows": [
   {
    "raw": "1-10 | 1 Kampfrunde | 1-16 1x täglich"
   },
   {
    "raw": "11-14 | 2 Kampfrunden | 17-18 2x täglich"
   },
   {
    "raw": "15-17 | 3 Kampfrunden | 19 3x täglich"
   },
   {
    "raw": "18-19 | 4 Kampfrunden | 20 Permanent"
   },
   {
    "raw": "20 | 5 Kampfrunden | "
   }
  ],
  "complex": true
 },
 "ET1": {
  "id": "ET1",
  "name": "ET1: TALENT",
  "dice": "4W20",
  "rows": [
   {
    "lo": 4,
    "hi": 5,
    "text": "Heldenglück"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Arkane Explosion"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Adlergestalt"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Blutschild"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Salve"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Abklingendes Blut"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Blutige Heilung"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Blitzmacher"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Frontheiler"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Glückspilz"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Dämonen zerschm."
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Gerüstet"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Instrument"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Ich muß weg!"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Fürsorger"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Herr der Elemente"
   },
   {
    "lo": 21,
    "hi": 21,
    "text": "Feuermagier"
   },
   {
    "lo": 22,
    "hi": 22,
    "text": "In Deckung"
   },
   {
    "lo": 23,
    "hi": 23,
    "text": "Elementen trotzen"
   },
   {
    "lo": 24,
    "hi": 24,
    "text": "Fieser Schuß"
   },
   {
    "lo": 25,
    "hi": 25,
    "text": "Bärengestalt"
   },
   {
    "lo": 26,
    "hi": 26,
    "text": "Blocker"
   },
   {
    "lo": 27,
    "hi": 27,
    "text": "Beute schätzen"
   },
   {
    "lo": 28,
    "hi": 28,
    "text": "Handwerk"
   },
   {
    "lo": 29,
    "hi": 29,
    "text": "Ausweichen"
   },
   {
    "lo": 30,
    "hi": 30,
    "text": "Charmant"
   },
   {
    "lo": 31,
    "hi": 31,
    "text": "Bildung"
   },
   {
    "lo": 32,
    "hi": 32,
    "text": "Abklingen"
   },
   {
    "lo": 33,
    "hi": 33,
    "text": "Jäger"
   },
   {
    "lo": 34,
    "hi": 34,
    "text": "Kämpfer"
   },
   {
    "lo": 35,
    "hi": 35,
    "text": "Diebeskunst"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Schütze"
   },
   {
    "lo": 37,
    "hi": 37,
    "text": "Parade"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Schwimmen"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Beschwörer"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Einstecker"
   },
   {
    "lo": 41,
    "hi": 41,
    "text": "Heimlichkeit"
   },
   {
    "lo": 42,
    "hi": 42,
    "text": "Akrobat"
   },
   {
    "lo": 43,
    "hi": 43,
    "text": "Flink"
   },
   {
    "lo": 44,
    "hi": 44,
    "text": "Kletterass"
   },
   {
    "lo": 45,
    "hi": 45,
    "text": "Brutaler Hieb"
   },
   {
    "lo": 46,
    "hi": 46,
    "text": "Magieresistent"
   },
   {
    "lo": 47,
    "hi": 47,
    "text": "Langfinger"
   },
   {
    "lo": 48,
    "hi": 48,
    "text": "Schlitzohr"
   },
   {
    "lo": 49,
    "hi": 49,
    "text": "Schlossknacker"
   },
   {
    "lo": 50,
    "hi": 50,
    "text": "Schlachtruf"
   },
   {
    "lo": 51,
    "hi": 51,
    "text": "Schutz v. Elementen"
   },
   {
    "lo": 52,
    "hi": 52,
    "text": "Scharfschütze"
   },
   {
    "lo": 53,
    "hi": 53,
    "text": "Sattelschütze"
   },
   {
    "lo": 54,
    "hi": 54,
    "text": "Panzerung zerschm."
   },
   {
    "lo": 55,
    "hi": 55,
    "text": "Rüstzauberer"
   },
   {
    "lo": 56,
    "hi": 56,
    "text": "Nekromantie"
   },
   {
    "lo": 57,
    "hi": 57,
    "text": "Manipulator"
   },
   {
    "lo": 58,
    "hi": 58,
    "text": "Wahrnehmung"
   },
   {
    "lo": 59,
    "hi": 59,
    "text": "Verletzen"
   },
   {
    "lo": 60,
    "hi": 60,
    "text": "Verdrücken"
   },
   {
    "lo": 61,
    "hi": 61,
    "text": "Tiermeister"
   },
   {
    "lo": 62,
    "hi": 62,
    "text": "Schnelle Reflexe"
   },
   {
    "lo": 63,
    "hi": 63,
    "text": "Standhaft"
   },
   {
    "lo": 64,
    "hi": 64,
    "text": "Tiergestalt"
   },
   {
    "lo": 65,
    "hi": 65,
    "text": "Untote zerschm."
   },
   {
    "lo": 66,
    "hi": 66,
    "text": "Zwei Waffen"
   },
   {
    "lo": 67,
    "hi": 67,
    "text": "Waffenl. Meister"
   },
   {
    "lo": 68,
    "hi": 68,
    "text": "Waffenkenner (WN)"
   },
   {
    "lo": 69,
    "hi": 69,
    "text": "Wissensgebiet"
   },
   {
    "lo": 70,
    "hi": 70,
    "text": "Wechsler"
   },
   {
    "lo": 71,
    "hi": 71,
    "text": "Zaubermacht"
   },
   {
    "lo": 72,
    "hi": 72,
    "text": "Teufelchen"
   },
   {
    "lo": 73,
    "hi": 73,
    "text": "Zauber auslösen"
   },
   {
    "lo": 74,
    "hi": 74,
    "text": "Schmerzh. Wechsel"
   },
   {
    "lo": 75,
    "hi": 75,
    "text": "Zehrender Spurt"
   },
   {
    "lo": 76,
    "hi": 76,
    "text": "Zauberqual"
   },
   {
    "lo": 77,
    "hi": 77,
    "text": "Tod entrinnen"
   },
   {
    "lo": 78,
    "hi": 78,
    "text": "Todeskraft"
   },
   {
    "lo": 79,
    "hi": 79,
    "text": "Spruchmeister (Z)"
   },
   {
    "lo": 80,
    "hi": 80,
    "text": "Sensenspotter"
   }
  ],
  "complex": false
 },
 "Z": {
  "id": "Z",
  "name": "ZAUBER",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 8,
    "text": "gebräuchlich (Z1)"
   },
   {
    "lo": 9,
    "hi": 14,
    "text": "selten (Z2)"
   },
   {
    "lo": 15,
    "hi": 18,
    "text": "sehr selten (Z3)"
   },
   {
    "lo": 19,
    "hi": 20,
    "text": "äußerst selten (Z4)"
   }
  ],
  "complex": false
 },
 "Z1": {
  "id": "Z1",
  "name": "GEBR. ZAUBER",
  "dice": "2W20",
  "rows": [
   {
    "lo": 2,
    "hi": 3,
    "text": "Flackern"
   },
   {
    "lo": 4,
    "hi": 5,
    "text": "Balancieren"
   },
   {
    "lo": 6,
    "hi": 7,
    "text": "Reinigen"
   },
   {
    "lo": 8,
    "hi": 9,
    "text": "Nahrung zaubern"
   },
   {
    "lo": 10,
    "hi": 11,
    "text": "Magische Waffe"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Springen"
   },
   {
    "lo": 13,
    "hi": 14,
    "text": "Giftschutz"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Lauschen"
   },
   {
    "lo": 16,
    "hi": 17,
    "text": "Heilende Hand"
   },
   {
    "lo": 18,
    "hi": 19,
    "text": "Wolke der Reue"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Putzteufel"
   },
   {
    "lo": 21,
    "hi": 22,
    "text": "Heilende Aura"
   },
   {
    "lo": 23,
    "hi": 24,
    "text": "Öffnen"
   },
   {
    "lo": 25,
    "hi": 26,
    "text": "Licht"
   },
   {
    "lo": 27,
    "hi": 28,
    "text": "Volksgestalt"
   },
   {
    "lo": 29,
    "hi": 29,
    "text": "Schattenpfeil"
   },
   {
    "lo": 30,
    "hi": 31,
    "text": "Manabrot"
   },
   {
    "lo": 32,
    "hi": 33,
    "text": "Schutzschild"
   },
   {
    "lo": 34,
    "hi": 35,
    "text": "Feuerstrahl"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Versetzte Stimme"
   },
   {
    "lo": 37,
    "hi": 38,
    "text": "Heilbeeren"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Magische Rüstung"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Tarnender Nebel"
   }
  ],
  "complex": false
 },
 "Z2": {
  "id": "Z2",
  "name": "SELTENE ZAUBER",
  "dice": "W20",
  "rows": [
   {
    "lo": 1,
    "hi": 1,
    "text": "Blenden"
   },
   {
    "lo": 2,
    "hi": 2,
    "text": "Duftnote"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Federgleich"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Flammenklinge"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Frostwaffe"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Heilendes Licht"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Kleiner Terror"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Lichtpfeil"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Schatten"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Schutzfeld"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Schweben"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Steinwand"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Stolpern"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Verwandlung"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Telekinese"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Tiere besänftigen"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Trugbild"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Verlangsamen"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Waffe des Lichts"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Wasserwandeln"
   }
  ],
  "complex": false
 },
 "Z3": {
  "id": "Z3",
  "name": "SEHR SELTENE ZAUBER",
  "dice": "2W20",
  "rows": [
   {
    "lo": 2,
    "hi": 2,
    "text": "Schleudern"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Verwirren"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Versetzen"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Feuerwand"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Schattenlanze"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Schattenklinge"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Niesanfall"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Rost"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Heiliger Hammer"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Wächter"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Lichtlanze"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Wolke des Todes"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Heilende Strahlen"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Erdspalte"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Netz"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Verkleinern"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Kontrollieren"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Schutzschild dehnen"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Wasser weihen"
   },
   {
    "lo": 21,
    "hi": 21,
    "text": "Magisches Schloss"
   },
   {
    "lo": 22,
    "hi": 22,
    "text": "Zauberleiter"
   },
   {
    "lo": 23,
    "hi": 23,
    "text": "Tierbeherrschung"
   },
   {
    "lo": 24,
    "hi": 24,
    "text": "Schutzschild stärken"
   },
   {
    "lo": 25,
    "hi": 25,
    "text": "Blitz"
   },
   {
    "lo": 26,
    "hi": 26,
    "text": "Feuerlanze"
   },
   {
    "lo": 27,
    "hi": 27,
    "text": "Feueratem"
   },
   {
    "lo": 28,
    "hi": 28,
    "text": "Spurt"
   },
   {
    "lo": 29,
    "hi": 29,
    "text": "Botschaft"
   },
   {
    "lo": 30,
    "hi": 30,
    "text": "Fluch"
   },
   {
    "lo": 31,
    "hi": 31,
    "text": "Segen"
   },
   {
    "lo": 32,
    "hi": 32,
    "text": "Einschläfern"
   },
   {
    "lo": 33,
    "hi": 33,
    "text": "Wandöffnung"
   },
   {
    "lo": 34,
    "hi": 34,
    "text": "Geben und Nehmen"
   },
   {
    "lo": 35,
    "hi": 35,
    "text": "Halt"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Arkanes Schwert"
   },
   {
    "lo": 37,
    "hi": 37,
    "text": "Durchsicht"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Schweig"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Freund"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Durchlässig"
   }
  ],
  "complex": false
 },
 "Z4": {
  "id": "Z4",
  "name": "ÄUSSERST SELTENE ZAUBER",
  "dice": "2W20",
  "rows": [
   {
    "lo": 2,
    "hi": 2,
    "text": "Blut kochen"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Dämonen beschwören"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Ebenentor"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Elementar herbeirufen¹"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Gasgestalt"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Flammeninferno"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Gehorche"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "Unsichtbarkeit"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Vergrössern"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Zeitstop"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Wiederbelebung"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Zauberabklang"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Wechselzauber"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Allheilung"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Feuerball"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Vertreiben"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "Tanz"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Frostschock"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Giftbann"
   },
   {
    "lo": 21,
    "hi": 21,
    "text": "Heilendes Feld"
   },
   {
    "lo": 22,
    "hi": 22,
    "text": "Kettenblitz"
   },
   {
    "lo": 23,
    "hi": 23,
    "text": "Magische Barriere"
   },
   {
    "lo": 24,
    "hi": 24,
    "text": "Skelette erwecken"
   },
   {
    "lo": 25,
    "hi": 25,
    "text": "Fliegen"
   },
   {
    "lo": 26,
    "hi": 26,
    "text": "Zombies erwecken"
   },
   {
    "lo": 27,
    "hi": 27,
    "text": "Bannen"
   },
   {
    "lo": 28,
    "hi": 28,
    "text": "Schutzkuppel"
   },
   {
    "lo": 29,
    "hi": 29,
    "text": "Magie bannen"
   },
   {
    "lo": 30,
    "hi": 30,
    "text": "Schatten erwecken"
   },
   {
    "lo": 31,
    "hi": 31,
    "text": "Schattensäule"
   },
   {
    "lo": 32,
    "hi": 32,
    "text": "Lichtsäule"
   },
   {
    "lo": 33,
    "hi": 33,
    "text": "Spionage"
   },
   {
    "lo": 34,
    "hi": 34,
    "text": "Teleport"
   },
   {
    "lo": 35,
    "hi": 35,
    "text": "Terror"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Totengespräch"
   },
   {
    "lo": 37,
    "hi": 37,
    "text": "Unsichtbares sehen"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Verborgenes sehen"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Verdampfen"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Körperexplosion"
   }
  ],
  "complex": false
 },
 "X": {
  "id": "X",
  "name": "ZUFÄLLIGE GEGENSTÄNDE",
  "dice": "2W20",
  "rows": [
   {
    "lo": 2,
    "hi": 2,
    "text": "Kette der Regeneration"
   },
   {
    "lo": 3,
    "hi": 3,
    "text": "Karten des Schummlers"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "Fliegender Teppich"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Feuerballzepter"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Gürtel der Trollstärke"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "Fäustlinge der Verstümmelung"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "Elfischer Sattel"
   },
   {
    "lo": 9,
    "hi": 10,
    "text": "Schutzring +2"
   },
   {
    "lo": 11,
    "hi": 12,
    "text": "Armreif des Bogners"
   },
   {
    "lo": 13,
    "hi": 14,
    "text": "Elfenstiefel"
   },
   {
    "lo": 15,
    "hi": 16,
    "text": "Elfischer Tarnumhang"
   },
   {
    "lo": 17,
    "hi": 20,
    "text": "Schutzring +1"
   },
   {
    "lo": 21,
    "hi": 23,
    "text": "Geisterbote"
   },
   {
    "lo": 24,
    "hi": 25,
    "text": "Abklingring"
   },
   {
    "lo": 26,
    "hi": 27,
    "text": "Spruchspeicherring"
   },
   {
    "lo": 28,
    "hi": 29,
    "text": "Wechselring"
   },
   {
    "lo": 30,
    "hi": 31,
    "text": "Schlafstaub"
   },
   {
    "lo": 32,
    "hi": 32,
    "text": "Zauberstab (Zauber Beutetabelle Z)"
   },
   {
    "lo": 33,
    "hi": 33,
    "text": "Kriegshorn"
   },
   {
    "lo": 34,
    "hi": 34,
    "text": "Schwebenamulett"
   },
   {
    "lo": 35,
    "hi": 35,
    "text": "Smaragd-Schlüssel"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Schutzring +3"
   },
   {
    "lo": 37,
    "hi": 37,
    "text": "Zauberköcher"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Mantel der Augen"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Unsichtbarkeitsring"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Kristallkugel"
   }
  ],
  "complex": false
 },
 "G": {
  "id": "G",
  "name": "MAG. GEGENSTÄNDE",
  "dice": "3W20",
  "rows": [
   {
    "lo": 3,
    "hi": 3,
    "text": "Drachenschuppe (E)"
   },
   {
    "lo": 4,
    "hi": 4,
    "text": "ausgestopftes Tier (E)"
   },
   {
    "lo": 5,
    "hi": 5,
    "text": "Flöte (E)"
   },
   {
    "lo": 6,
    "hi": 6,
    "text": "Kamm (E)"
   },
   {
    "lo": 7,
    "hi": 7,
    "text": "getrocknetes Auge (E)"
   },
   {
    "lo": 8,
    "hi": 8,
    "text": "bunte Feder (E)"
   },
   {
    "lo": 9,
    "hi": 9,
    "text": "knorrige Astwurzel (E)"
   },
   {
    "lo": 10,
    "hi": 10,
    "text": "Halstuch (E)"
   },
   {
    "lo": 11,
    "hi": 11,
    "text": "Krähenfuß (E)"
   },
   {
    "lo": 12,
    "hi": 12,
    "text": "Diadem (E)"
   },
   {
    "lo": 13,
    "hi": 13,
    "text": "Kugel (E)"
   },
   {
    "lo": 14,
    "hi": 14,
    "text": "Gürtel (E)"
   },
   {
    "lo": 15,
    "hi": 15,
    "text": "Handschuhe (E)"
   },
   {
    "lo": 16,
    "hi": 16,
    "text": "Schal (E)"
   },
   {
    "lo": 17,
    "hi": 17,
    "text": "Hut (E)"
   },
   {
    "lo": 18,
    "hi": 18,
    "text": "funkelnder Kristall (E)"
   },
   {
    "lo": 19,
    "hi": 19,
    "text": "Stirnreif (E)"
   },
   {
    "lo": 20,
    "hi": 20,
    "text": "Brosche (E)"
   },
   {
    "lo": 21,
    "hi": 21,
    "text": "Armreif (E)"
   },
   {
    "lo": 22,
    "hi": 22,
    "text": "Edelstein (E)"
   },
   {
    "lo": 23,
    "hi": 23,
    "text": "Armband (E)"
   },
   {
    "lo": 24,
    "hi": 24,
    "text": "Umhang (E)"
   },
   {
    "lo": 25,
    "hi": 25,
    "text": "Trinkhorn (E)"
   },
   {
    "lo": 26,
    "hi": 26,
    "text": "Mantel (E)"
   },
   {
    "lo": 27,
    "hi": 27,
    "text": "Wanderstab (E)"
   },
   {
    "lo": 28,
    "hi": 28,
    "text": "Stiefel (E)"
   },
   {
    "lo": 29,
    "hi": 29,
    "text": "Waffenrock (E)"
   },
   {
    "lo": 30,
    "hi": 30,
    "text": "Sandalen (E)"
   },
   {
    "lo": 31,
    "hi": 31,
    "text": "Kette (E)"
   },
   {
    "lo": 32,
    "hi": 32,
    "text": "Maske (E)"
   },
   {
    "lo": 33,
    "hi": 33,
    "text": "Weste (E)"
   },
   {
    "lo": 34,
    "hi": 34,
    "text": "Lederband (E)"
   },
   {
    "lo": 35,
    "hi": 35,
    "text": "Zahn (E)"
   },
   {
    "lo": 36,
    "hi": 36,
    "text": "Ohrring (E)"
   },
   {
    "lo": 37,
    "hi": 37,
    "text": "Kerzenständer (E)"
   },
   {
    "lo": 38,
    "hi": 38,
    "text": "Tatze (E)"
   },
   {
    "lo": 39,
    "hi": 39,
    "text": "Ring (E)"
   },
   {
    "lo": 40,
    "hi": 40,
    "text": "Krug (E)"
   },
   {
    "lo": 41,
    "hi": 41,
    "text": "Köcher (E)"
   },
   {
    "lo": 42,
    "hi": 42,
    "text": "Kralle (E)"
   },
   {
    "lo": 43,
    "hi": 43,
    "text": "Statuette (E)"
   },
   {
    "lo": 44,
    "hi": 44,
    "text": "Kelch (E)"
   },
   {
    "lo": 45,
    "hi": 45,
    "text": "Waffenscheide (E)"
   },
   {
    "lo": 46,
    "hi": 46,
    "text": "Vase (E)"
   },
   {
    "lo": 47,
    "hi": 47,
    "text": "Würfel (E)"
   },
   {
    "lo": 48,
    "hi": 48,
    "text": "Trommel (E)"
   },
   {
    "lo": 49,
    "hi": 49,
    "text": "Zepter (E)"
   },
   {
    "lo": 50,
    "hi": 50,
    "text": "Stab (E)"
   },
   {
    "lo": 51,
    "hi": 51,
    "text": "Harfe (E)"
   },
   {
    "lo": 52,
    "hi": 52,
    "text": "Puppe (E)"
   },
   {
    "lo": 53,
    "hi": 53,
    "text": "Krone (E)"
   },
   {
    "lo": 54,
    "hi": 54,
    "text": "Schale (E)"
   },
   {
    "lo": 55,
    "hi": 55,
    "text": "Schnitzfigur (E)"
   },
   {
    "lo": 56,
    "hi": 56,
    "text": "Schrumpfkopf (E)"
   },
   {
    "lo": 57,
    "hi": 57,
    "text": "Spiegel (E)"
   },
   {
    "lo": 58,
    "hi": 58,
    "text": "Schädel (E)"
   },
   {
    "lo": 59,
    "hi": 59,
    "text": "getrocknetes Herz (E)"
   },
   {
    "lo": 60,
    "hi": 60,
    "text": "Dämonenzunge (E)"
   }
  ],
  "complex": false
 }
};
})(typeof window !== "undefined" ? window : this);
