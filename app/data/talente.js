/*
 * DS_REGELN.talente — Talentdaten (DS4 SRD+), grounded.
 * Generiert aus den Talentdateien des SRD (grw/talente.md + /talente/<slug>.md).
 * Quelle: https://github.com/RoninEighty/Dungeonslayers  ·  © Christian Kennig, CC BY-NC-SA 4.0
 *
 * Schema je Talent:
 *   { name, slug, ref, beschreibung,
 *     zugang: { <Klasse|Unterklasse|Heldenklasse>: { ab: minStufe, rang: maxRang } } }
 * Klassenschlüssel sind die vollen deutschen Namen (Krieger, Späher, Zauberwirker,
 * Heiler, Zauberer, Schwarzmagier, sowie die Heldenklassen für später).
 */
(function (global) {
  "use strict";
  if (!global.DS_REGELN) { console.error("DS_REGELN fehlt — talente.js muss nach regeln.js geladen werden."); return; }
  global.DS_REGELN.talente = [
  {
    "name": "Abklingen",
    "slug": "abklingen",
    "ref": "https://immersieg.de/talente/abklingen.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 4,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      }
    },
    "beschreibung": "Dieses Talent senkt die Zauberabklingzeit jedes Zaubers um 1 Runde pro Talentrang. Es ist jedoch nicht möglich, die Abklingzeit eines Zaubers unter Null zu senken."
  },
  {
    "name": "Aderschlitzer",
    "slug": "aderschlitzer",
    "ref": "https://immersieg.de/talente/aderschlitzer.html",
    "zugang": {
      "Krieger": {
        "ab": 12,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      }
    },
    "beschreibung": "Wird bei einem Angriff mit einem Messer, Dolch oder Einhandschwert bzw. mit einer Schußwaffe ein Würfelergebnis erzielt, welches gleich oder kleiner als der Talentrang in Aderschlitzer ist, wird die Abwehr des Gegners gegen diesen Angriff pro Talentrang um 5 gesenkt."
  },
  {
    "name": "Akrobat",
    "slug": "akrobat",
    "ref": "https://immersieg.de/talente/akrobat.html",
    "zugang": {
      "Krieger": {
        "ab": 4,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 4,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein geübter Kletterer und Turner. Auf alle Proben, bei denen es um athletisches Geschick, Balancieren oder Kletterkunst geht, erhält der Charakter einen Bonus von +2 pro Talentrang."
  },
  {
    "name": "Alchemie",
    "slug": "alchemie",
    "ref": "https://immersieg.de/talente/alchemie.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      }
    },
    "beschreibung": "Dieses Talent wird benötigt, um magische Tränke zu brauen (siehe [Tränke brauen](../spielleitung-schaetze.md#tränke-brauen)). Jeder Talentrang reduziert die Zubereitungsdauer von Tränken und gibt +1 auf Proben, um diese herzustellen oder zu identifizieren (siehe [Magie analysieren](../regeln-magie.md#magie-analysieren))."
  },
  {
    "name": "Arkane Explosion",
    "slug": "arkane-explosion",
    "ref": "https://immersieg.de/talente/arkane-explosion.html",
    "zugang": {
      "Zauberer": {
        "ab": 8,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 8,
        "rang": 3
      },
      "Erzmagier": {
        "ab": 12,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter einmal alle 24 Stunden sein magisches Potenzial in einer kugelförmigen, arkanen Explosion entladen, deren Mittelpunkt er bildet. Die Kugel hat einen festen Durchmesser von Stufe/2 Meter und verursacht nicht abwehrbaren Schaden mit einem Probenwert von 10 pro Talentrang. Pro Gefährten, der im Explosionsradius steht, kann der Charakter GEI+VE würfeln, um ihn vor dem Schaden zu bewahren. Das Talent Explosionskontrolle kann hier ebenfalls angewendet werden."
  },
  {
    "name": "Ausweichen",
    "slug": "ausweichen",
    "ref": "https://immersieg.de/talente/ausweichen.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter einmal pro Kampf einen gegen ihn gerichteten Nahkampfangriff komplett ignorieren (zählt als freie Aktion). Dass der Charakter einem Angriff ausweichen will, muss angesagt werden, bevor feststeht, ob dieser Schlag ihn trifft oder nicht. Gegen Angriffe von Gegnern, die 2+Größenkategorien größer sind, ist das Talent wirkungslos."
  },
  {
    "name": "Beschwörer",
    "slug": "beschwoerer",
    "ref": "https://immersieg.de/talente/beschwoerer.html",
    "zugang": {
      "Schwarzmagier": {
        "ab": 12,
        "rang": 3
      },
      "Dämonologe": {
        "ab": 10,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 16,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter ist ein Experte im Beschwören von Dämonen. Er erhält auf alle Versuche, Dämonen zu beschwören und diese zu kontrollieren einen Bonus von +2 pro Talentrang."
  },
  {
    "name": "Bildung",
    "slug": "bildung",
    "ref": "https://immersieg.de/talente/bildung.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 5
      },
      "Späher": {
        "ab": 1,
        "rang": 5
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter hat einen gewissen Grad an Bildung erworben. Im Gegensatz zu dem Talent Wissensgebiet, welches nur einzelne Themengebiete umfasst, erhält man durch das Talent Bildung einen +2 Bonus pro Talentrang auf alle Proben, bei denen es um Allgemeinwissen oder das Lösen von Rätseln geht."
  },
  {
    "name": "Blitzmacher",
    "slug": "blitzmacher",
    "ref": "https://immersieg.de/talente/blitzmacher.html",
    "zugang": {
      "Heiler": {
        "ab": 12,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 8,
        "rang": 3
      },
      "Zauberer": {
        "ab": 8,
        "rang": 3
      },
      "Elementarist": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 12,
        "rang": 5
      }
    },
    "beschreibung": "Der Zauberwirker ist geübt im Umgang mit Zaubersprüchen, die Blitze erzeugen. Er erhält auf alle Zauber, die Blitzschaden verursachen, einen Bonus von +1 pro Talentrang."
  },
  {
    "name": "Blocker",
    "slug": "blocker",
    "ref": "https://immersieg.de/talente/blocker.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 4,
        "rang": 3
      },
      "Heiler": {
        "ab": 8,
        "rang": 3
      },
      "Kleriker": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Paladin": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter versteht es, im Kampf seinen Schild geschickt einzusetzen. In jeder Kampfrunde, in der er keine offensive Handlung unternimmt, dabei einen Schild führt und sich nicht einen Schritt bewegt, erhält er pro Talentrang +2 auf seine Abwehr gegen alle Angriffe, derer er sich bewusst ist und die nicht von hinten erfolgen. Zusätzlich kann er mit demselben Bonus KÖR+HÄ aktionsfrei würfeln, um im Kampf nicht zurückgedrängt zu werden (siehe [Zurückdrängen](../regeln-kampfdetails.md#zurückdrängen)). Einmal pro Kampf kann ein Blocker pro Talentrang einen Patzer bei der Abwehr wiederholen, auch wenn er gerade eine offensiv Handlung unternimmt."
  },
  {
    "name": "Brutaler Hieb",
    "slug": "brutaler-hieb",
    "ref": "https://immersieg.de/talente/brutaler-hieb.html",
    "zugang": {
      "Krieger": {
        "ab": 4,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Berserker": {
        "ab": 10,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 14,
        "rang": 3
      },
      "Kleriker": {
        "ab": 14,
        "rang": 3
      },
      "Kriegszauberer": {
        "ab": 16,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter einmal pro Kampf seinen Wert in Schlagen für einen Angriff um den Wert von KÖR erhöhen. Es ist möglich, mehrere Talentränge in einem einzigen Schlag zu vereinen."
  },
  {
    "name": "Charmant",
    "slug": "charmant",
    "ref": "https://immersieg.de/talente/charmant.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      }
    },
    "beschreibung": "Auf sämtliche Proben sozialer Interaktion, beispielsweise um sympathisch aufzutreten oder eine Geschichte glaubhafter zu berichten, erhält der Charakter pro Talentrang einen Bonus von +2 (bei Vertretern des anderen Geschlechts sogar +3). Settingoption: In vielen Settings ist es Zwergen verwehrt, dieses Talent zu erlernen."
  },
  {
    "name": "Diebeskunst",
    "slug": "diebeskunst",
    "ref": "https://immersieg.de/talente/diebeskunst.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter erhält einen Bonus von +2 pro Talentrang auf alle Proben, bei denen es darum geht, Fallen zu entdecken und zu entschärfen, fremde Taschen zu leeren, Schlösser zu öffnen oder Glücksspiele zu manipulieren."
  },
  {
    "name": "Diener der Dunkelheit",
    "slug": "diener-der-dunkelheit",
    "ref": "https://immersieg.de/talente/diener-der-dunkelheit.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter dient den Mächten der Dunkelheit. Er erhält auf alle Angriffe gegen Wesen / Diener des Lichts einen Bonus von +1 pro Talentrang. Gleiches gilt für seine Abwehr gegen Schaden von Lichtzaubern. Charakter mit diesem Talent können nicht das Talent Diener des Lichts erlernen."
  },
  {
    "name": "Diener des Lichts",
    "slug": "diener-des-lichts",
    "ref": "https://immersieg.de/talente/diener-des-lichts.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Heiler": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Paladin": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter dient den Mächten des Lichts. Er erhält gegen alle Angriffe von Wesen / Dienern der Dunkelheit einen Bonus von +1 pro Talentrang auf seine Abwehr. Gleiches gilt bei Schaden von Schattenzaubern. Charaktere, die gegen die Prinzipien des Lichts verstoßen (beispielsweise sinnlos Morden) verlieren Talentränge ersatzlos. Charaktere mit diesem Talent können nicht das Talent Diener der Dunkelheit erlernen."
  },
  {
    "name": "Einbetten",
    "slug": "einbetten",
    "ref": "https://immersieg.de/talente/einbetten.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 10,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      }
    },
    "beschreibung": "Dieses Talent wird benötigt, um magische Gegenstände herzustellen (siehe [Gegenstände herstellen](../spielleitung-schaetze.md#gegenstände-herstellen)). Jeder Talentrang reduziert die Herstellungsdauer von magischen Gegenständen und gibt +1 auf Einbetten-Proben, um diese zu fertigen. Einbetten hilft zwar auch bei der Herstellung von Tränken bzw. Schriftrollen, dennoch wird dafür zunächst immer noch das Talent Alchemie bzw. Runenkunde benötigt."
  },
  {
    "name": "Einstecker",
    "slug": "einstecker",
    "ref": "https://immersieg.de/talente/einstecker.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 5
      },
      "Späher": {
        "ab": 1,
        "rang": 4
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Berserker": {
        "ab": 10,
        "rang": 10
      },
      "Blutmagier": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter versteht es, ordentlich Schaden einzustecken. Pro Talentrang steigt die Lebenskraft (LK) um +3."
  },
  {
    "name": "Feuermagier",
    "slug": "feuermagier",
    "ref": "https://immersieg.de/talente/feuermagier.html",
    "zugang": {
      "Zauberer": {
        "ab": 4,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 1,
        "rang": 3
      },
      "Elementarist": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 12,
        "rang": 5
      }
    },
    "beschreibung": "Der Zauberwirker ist geübt im Umgang mit Feuermagie. Er erhält auf alle Zauber, die einen Feuereffekt haben, einen Bonus von +1 pro Talentrang."
  },
  {
    "name": "Fieser Schuss",
    "slug": "fieser-schuss",
    "ref": "https://immersieg.de/talente/fieser-schuss.html",
    "zugang": {
      "Späher": {
        "ab": 4,
        "rang": 3
      },
      "Attentäter": {
        "ab": 12,
        "rang": 5
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter einmal pro Kampf seinen Wert in Schießen einen Angriff lang um den Wert von Agilität erhöhen. Es ist möglich, mehrere Talentränge in einem einzigen Schuß zu vereinen. Zielzauber profitieren nicht von diesem Talent."
  },
  {
    "name": "Flink",
    "slug": "flink",
    "ref": "https://immersieg.de/talente/flink.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 4,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter ist schnell und gut zu Fuß. Der Wert für Laufen wird pro Erwerb des Talents um 1m erhöht."
  },
  {
    "name": "Frontheiler",
    "slug": "frontheiler",
    "ref": "https://immersieg.de/talente/frontheiler.html",
    "zugang": {
      "Heiler": {
        "ab": 12,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang kann der Heiler einmal alle 24 Stunden die Abklingzeit eines Heilzaubers (so auch Wiederbelebung) ignorieren."
  },
  {
    "name": "Fürsorger",
    "slug": "fuersorger",
    "ref": "https://immersieg.de/talente/fuersorger.html",
    "zugang": {
      "Heiler": {
        "ab": 1,
        "rang": 3
      },
      "Paladin": {
        "ab": 10,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter ist geübt im Umgang mit heilender und schützender Magie. Er erhält auf alle Heil-und Schutzzauber +1 pro Talentrang."
  },
  {
    "name": "Genesung",
    "slug": "genesung",
    "ref": "https://immersieg.de/talente/genesung.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 5
      },
      "Späher": {
        "ab": 1,
        "rang": 5
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      }
    },
    "beschreibung": "War ein Charakter vorübergehend tot und hat dadurch Punkte des Attributs KÖR eingebüßt, kann pro Talentrang +1 KÖR wiederhergestellt werden. Es ist mit diesem Talent nicht möglich, KÖR über den ursprünglichen Wert zu steigern."
  },
  {
    "name": "Glückspilz",
    "slug": "glueckspilz",
    "ref": "https://immersieg.de/talente/glueckspilz.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Meisterdieb": {
        "ab": 16,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein wahrer Glückspilz, kann er doch einmal pro Talentrang alle 24 Stunden einen Patzer ignorieren und den jeweiligen Wurf wiederholen. Sollte der neue Wurf ebenfalls ein Patzer sein, man aber über mehr als einen Talentrang verfügt, kann dieser ebenfalls ausgeglichen werden."
  },
  {
    "name": "Handwerk",
    "slug": "handwerk",
    "ref": "https://immersieg.de/talente/handwerk.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      }
    },
    "beschreibung": "Dieses Talent wird für jede Handwerksart (Bogenbauer, Schreiner, Steinmetz, Waffenschmied usw.) individuell erlernt, kann also mehrmals bis Höchstrang III erworben werden. Man beherrscht das jeweilige Handwerk und erhält auf alle diesbezüglichen Proben, sei es um Gegenstände herzustellen oder beschädigte Ausrüstung zu reparieren (siehe [Waren herstellen](../spielleitung-sprachen-ep-vergabe.md#waren-herstellen)), einen Bonus von +3 pro Talentrang, den man für dieses Handwerk erworben hat."
  },
  {
    "name": "Heimlichkeit",
    "slug": "heimlichkeit",
    "ref": "https://immersieg.de/talente/heimlichkeit.html",
    "zugang": {
      "Krieger": {
        "ab": 4,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 4,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein geübter Schleicher und versteht sich darauf, nicht bemerkt zu werden. Er erhält +2 auf alle Proben, bei denen es darum geht, leise zu sein, sich zu verbergen, nicht bemerkt zu werden oder etwas heimlich zu tun, wie beispielsweise Taschendiebstahl."
  },
  {
    "name": "Heldenglück",
    "slug": "heldenglueck",
    "ref": "https://immersieg.de/talente/heldenglueck.html",
    "zugang": {
      "Krieger": {
        "ab": 10,
        "rang": 3
      },
      "Späher": {
        "ab": 10,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 10,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter ist wahrlich vom Glück gesegnet, kann er doch einmal pro Talentrang alle 24 Stunden einen beliebigen Würfelwurf wiederholen. Sollte das neue Wurfergebnis ebenfalls nicht gefallen, kann man erneut die Probe wiederholen, sofern man noch über weitere Talentränge verfügt."
  },
  {
    "name": "In Deckung",
    "slug": "in-deckung",
    "ref": "https://immersieg.de/talente/in-deckung.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter versteht es, im Kampf geschickt in die Defensive zu gehen. Pro Talentrang werden in jeder Kampfrunde, in der er keine offensive Handlung unternimmt, alle Angriffe gegen ihn um 2 gesenkt, sofern er sich ihrer bewusst ist."
  },
  {
    "name": "Instrument",
    "slug": "instrument",
    "ref": "https://immersieg.de/talente/instrument.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      }
    },
    "beschreibung": "Dieses Talent wird für jedes Instrument (Flöte, Mandoline, Harfe, Trommel usw.) individuell erlernt, kann also mehrmals bis Höchstrang III erworben werden. Man beherrscht das jeweilige Instrument und erhält auf alle diesbezüglichen Proben einen Bonus von +3 pro Talentrang, den man für dieses Instrument erworben hat"
  },
  {
    "name": "Jäger",
    "slug": "jaeger",
    "ref": "https://immersieg.de/talente/jaeger.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 12,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter wandert oft durch die Wildnis und erhält durch dieses Talent +2 auf Proben, mit denen Spuren gelesen, Wild gejagt oder die richtige Marschrichtung wiedergefunden werden soll. Pro Talentrang kann außerdem eine Mahlzeit (von denen 3 einer Tagesration entsprechen) problemlos beschafft werden (Beeren pflücken, Kleintier erlegen usw.)"
  },
  {
    "name": "Kämpfer",
    "slug": "kaempfer",
    "ref": "https://immersieg.de/talente/kaempfer.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      },
      "Attentäter": {
        "ab": 12,
        "rang": 5
      },
      "Berserker": {
        "ab": 10,
        "rang": 5
      },
      "Kleriker": {
        "ab": 12,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 12,
        "rang": 5
      },
      "Paladin": {
        "ab": 12,
        "rang": 5
      },
      "Waffenmeister": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein geübter Nahkämpfer: Er erhält pro Talentrang auf Schlagen einen Bonus von +1."
  },
  {
    "name": "Magieresistent",
    "slug": "magieresistent",
    "ref": "https://immersieg.de/talente/magieresistent.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 3
      }
    },
    "beschreibung": "Gegen den Charakter gerichtete Zauber werden um +2 pro Talentrang erschwert. Dies gilt jedoch nicht für Zauber, die Elementarschaden (beispielsweise mit Blitzen, Eis oder Feuer) verursachen."
  },
  {
    "name": "Manipulator",
    "slug": "manipulator",
    "ref": "https://immersieg.de/talente/manipulator.html",
    "zugang": {
      "Heiler": {
        "ab": 1,
        "rang": 3
      },
      "Zauberer": {
        "ab": 8,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 8,
        "rang": 3
      },
      "Erzmagier": {
        "ab": 12,
        "rang": 5
      },
      "Kampfmönch": {
        "ab": 14,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein Meister der magischen Beeinflussung des Geistes. Er erhält auf alle geistesbeeinflussenden Zauber (mit gekennzeichnet) einen Bonus von +1 pro Talentrang."
  },
  {
    "name": "Meister aller Klassen",
    "slug": "meister-aller-klassen",
    "ref": "https://immersieg.de/talente/meister-aller-klassen.html",
    "zugang": {
      "Krieger": {
        "ab": 20,
        "rang": 1
      },
      "Späher": {
        "ab": 20,
        "rang": 1
      },
      "Zauberwirker": {
        "ab": 20,
        "rang": 1
      }
    },
    "beschreibung": "Der Charakter kann eines seiner drei Attribute ( KÖR, AGI oder GEI) um +1 steigern."
  },
  {
    "name": "Meister seiner Klasse",
    "slug": "meister-seiner-klasse",
    "ref": "https://immersieg.de/talente/meister-seiner-klasse.html",
    "zugang": {
      "Krieger": {
        "ab": 15,
        "rang": 1
      },
      "Späher": {
        "ab": 15,
        "rang": 1
      },
      "Zauberwirker": {
        "ab": 15,
        "rang": 1
      }
    },
    "beschreibung": "Der Charakter kann das primäre Attribut seiner Klasse um +1 steigern: Krieger steigern KÖR, Späher steigern AGI und Zauberwirker steigern GEI."
  },
  {
    "name": "Nekromantie",
    "slug": "nekromantie",
    "ref": "https://immersieg.de/talente/nekromantie.html",
    "zugang": {
      "Heiler": {
        "ab": 8,
        "rang": 3
      },
      "Schwarzmagier": {
        "ab": 8,
        "rang": 3
      },
      "Nekromant": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter kennt sich sehr gut mit nekromantischen Zaubern aus. Er erhält auf alle Zauber, die Untote bannen, erwecken oder kontrollieren, einen Bonus von +2 pro Talentrang."
  },
  {
    "name": "Panzerung zerschmettern",
    "slug": "panzerung-zerschmettern",
    "ref": "https://immersieg.de/talente/panzerung-zerschmettern.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Berserker": {
        "ab": 12,
        "rang": 5
      }
    },
    "beschreibung": "Jedesmal, wenn ein Charakter mit einem Nahkampfangriff bei einem Gegner Schaden verursacht, sinkt der PA-Wert eines zufällig zu ermittelnden Rüstungsteils des Opfers um 1 Punkt pro Talentrang. Welches einzelne Rüstungsteil der getragenen Panzerung betroffen ist, wird zufällig ermittelt. Wird dabei ein magisches Rüstungsteil getroffen, zeigt das Talent allerdings keine Wirkung. Sinkt der PA-Wert eines Rüstungsteils auf Null oder niedriger, gilt es als zerstört, kann aber von einem findigen Handwerker wieder repariert werden (8). Gegen natürliche Rüstungen (Chitinpanzer, Drachenschuppen, Hornpanzer u.ä.) ist das Talent dagegen wirkungslos."
  },
  {
    "name": "Parade",
    "slug": "parade",
    "ref": "https://immersieg.de/talente/parade.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 12,
        "rang": 3
      },
      "Waffenmeister": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter hat gelernt, die Nahkampfangriffe seiner Gegner zu parieren. Sofern er eine Nahkampfwaffe gezogen hat, erhält der Charakter pro Talentrang +1 auf seine Abwehr gegen jeden Nahkampfangriff, dessen er sich bewusst ist und der nicht von hinten erfolgt."
  },
  {
    "name": "Präziser Schuss",
    "slug": "praeziser-schuss",
    "ref": "https://immersieg.de/talente/praeziser-schuss.html",
    "zugang": {
      "Späher": {
        "ab": 15,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang kann der Späher einmal alle 24 Stunden mit einem Fernkampfangriff einen präzisen Schuß abfeuern, gegen den keine Abwehr gewürfelt wird. Der präzise Schuß muss vor dem Würfeln der Schießen-Probe angesagt werden und kann pro Talentrang mit einem Talentrang eines anderen Talents (beispielsweise Fieser Schuß) kombiniert werden."
  },
  {
    "name": "Prügler",
    "slug": "pruegler",
    "ref": "https://immersieg.de/talente/pruegler.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      }
    },
    "beschreibung": "Wird bei einem Angriff mit stumpfen Waffen, Äxten oder zweihändigen Waffen ein Immersieg erzielt, wird die Abwehr des Gegners gegen diesen Angriff pro Talentrang um 5 gesenkt."
  },
  {
    "name": "Reiten",
    "slug": "reiten",
    "ref": "https://immersieg.de/talente/reiten.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Druide": {
        "ab": 10,
        "rang": 5
      },
      "Paladin": {
        "ab": 10,
        "rang": 5
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Charaktere mit diesem Talent haben reiten gelernt, können also problemlos die Richtung oder Geschwindigkeit ihres Reittieres um einen Schritt ändern und vom Pferderücken aus angreifen (siehe [Reiten](../spielleitung-erweiterte-proben.md#reiten-agibeau)). Pro Talentrang erhalten sie bei Sprüngen oder Proben, um die Reitrichtung oder die Geschwindigkeit um mehr als einen Schritt zu wechseln, einen Bonus von +2. Im berittenen Kampf erhalten sie pro Talentrang +1 auf Schlagen-Proben gegen unberittene Gegner."
  },
  {
    "name": "Runenkunde",
    "slug": "runenkunde",
    "ref": "https://immersieg.de/talente/runenkunde.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      }
    },
    "beschreibung": "Dieses Talent wird benötigt, will man Schriftrollen herstellen (siehe [SChriftrollen fertigen](../spielleitung-schaetze.md#schriftrollen-fertigen)). Jeder Talentrang reduziert die Zubereitungsdauer von Schriftrollen und gibt +1 auf Proben, um diese zu fertigen, oder gefundene Schriftrollen zu identifizieren. Es handelt sich bei den magischen Runen auf einer Schriftrolle um keine tatsächlichen Schriftzeichen, die man lesen, geschweige denn übersetzen könnte."
  },
  {
    "name": "Rüstträger",
    "slug": "ruesttraeger",
    "ref": "https://immersieg.de/talente/ruesttraeger.html",
    "zugang": {
      "Krieger": {
        "ab": 4,
        "rang": 5
      },
      "Späher": {
        "ab": 8,
        "rang": 5
      },
      "Kleriker": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist es gewohnt, schwere Rüstung zu tragen und sich in ihr zu bewegen. Der durch Rüstung verursachte Malus auf Laufen wird pro Talentrang um 0,5m gemindert."
  },
  {
    "name": "Rüstzauberer",
    "slug": "ruestzauberer",
    "ref": "https://immersieg.de/talente/ruestzauberer.html",
    "zugang": {
      "Heiler": {
        "ab": 1,
        "rang": 1
      },
      "Kleriker": {
        "ab": 10,
        "rang": 3
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 3
      },
      "Paladin": {
        "ab": 10,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang kann ein Panzerungsmalus (PA) in Höhe von 2 beim Zaubern/Zielzaubern ignoriert werden. Beispielsweise benötigt es 2 Talentränge, um ungehindert in einem Plattenpanzer (PA 3) samt Metallhelm (PA 1) zaubern zu können."
  },
  {
    "name": "Scharfschütze",
    "slug": "scharfschuetze",
    "ref": "https://immersieg.de/talente/scharfschuetze.html",
    "zugang": {
      "Krieger": {
        "ab": 12,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 12,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Waffenmeister": {
        "ab": 14,
        "rang": 5
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Im Fernkampf zielt der Charakter auf die verletzliche Körperpartien seines Ziels: Die Abwehr des Gegners wird gegen die Fernkampfangriffe des Charakters mittels Schießen um 1 pro Talentrang gesenkt."
  },
  {
    "name": "Schlitzohr",
    "slug": "schlitzohr",
    "ref": "https://immersieg.de/talente/schlitzohr.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Auf alle Proben sozialer Interaktion, bei denen geblufft, gefeilscht oder verhandelt wird, erhält der Charakter einen Bonus von +3 pro Talentrang."
  },
  {
    "name": "Schnelle Reflexe",
    "slug": "schnelle-reflexe",
    "ref": "https://immersieg.de/talente/schnelle-reflexe.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Berserker": {
        "ab": 12,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 5
      },
      "Waffenmeister": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter kann schnell reagieren. Im Kampf erhält er pro Talentrang einen Bonus von +2 auf seine Initiative. Zusätzlich kann man pro Talentrang einmal im Kampf eine Waffe als freie Aktion ziehen, wechseln oder vom Boden aufheben."
  },
  {
    "name": "Schütze",
    "slug": "schuetze",
    "ref": "https://immersieg.de/talente/schuetze.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      },
      "Attentäter": {
        "ab": 10,
        "rang": 5
      },
      "Elementarist": {
        "ab": 16,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Meisterdieb": {
        "ab": 14,
        "rang": 5
      },
      "Waffenmeister": {
        "ab": 12,
        "rang": 5
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter ist ein geübter Fernkämpfer: Er erhält auf Schießen und Zielzauber einen Bonus von +1 pro Talentrang."
  },
  {
    "name": "Schwimmen",
    "slug": "schwimmen",
    "ref": "https://immersieg.de/talente/schwimmen.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter kann schwimmen (siehe [Schwimmen](../spielleitung-erweiterte-proben.md#schwimmen-agibe)) und erhält pro Talentrang auf alle diesbezüglichen Proben +3."
  },
  {
    "name": "Spruchmeister",
    "slug": "spruchmeister",
    "ref": "https://immersieg.de/talente/spruchmeister.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 15,
        "rang": 3
      }
    },
    "beschreibung": "Der Zauberwirker kann einmal alle 24 Stunden die Abklingzeit eines bestimmten Zauberspruchs ignorieren. Bei Erwerb eines Talentranges muss festgelegt werden, um welchen Zauber es sich dabei handelt. Werden mehrere Talentränge in ein und den selben Zauberspruch investiert, kann seine Abklingzeit einmal mehr pro Talentrang innerhalb der 24 Stunden ignoriert werden. Zaubersprüche, deren reguläre Abklingzeit mehr als 24 Stunden beträgt, können nicht gewählt werden."
  },
  {
    "name": "Standhaft",
    "slug": "standhaft",
    "ref": "https://immersieg.de/talente/standhaft.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 4,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang sinkt die Lebenskraft-Grenze, ab der ein Charakter bewusstlos wird, um jeweils 3. Ein Charakter mit Standhaft III wird also erst mit -9 l bewusstlos, statt schon bei Null. Alles natürlich nur unter der Voraussetzung, dass man so viele negative LK auch überleben kann (siehe [Schaden und Heilung](../regeln-schaden-heilung.md))."
  },
  {
    "name": "Tod entrinnen",
    "slug": "tod-entrinnen",
    "ref": "https://immersieg.de/talente/tod-entrinnen.html",
    "zugang": {
      "Heiler": {
        "ab": 12,
        "rang": 3
      },
      "Paladin": {
        "ab": 16,
        "rang": 3
      }
    },
    "beschreibung": "Sobald der Charakter weniger als 1 LK besitzt, aber immer noch lebt, heilt er automatisch nach 5 Runden (-1 Runde pro Talentrang) 1LK pro Talentrang pro Runde. Sobald seine LK wieder im positiven Bereich sind, endet der Heileffekt und der Charakter ist augenblicklich voll einsatzfähig."
  },
  {
    "name": "Umdenken",
    "slug": "umdenken",
    "ref": "https://immersieg.de/talente/umdenken.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      },
      "Paladin": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Zauberwirker kann eine Anzahl von Zauberstufen gleich seiner eigenen Stufe einmalig pro Talentrang verlernen und durch andere Zaubersprüche der gleichen Stufensumme ersetzen. Durch das Umdenken können Zauberwirker, die mit ihrem Zauberrepertoire nicht zufrieden sind, dieses noch einmal umgestalten."
  },
  {
    "name": "Vergeltung",
    "slug": "vergeltung",
    "ref": "https://immersieg.de/talente/vergeltung.html",
    "zugang": {
      "Heiler": {
        "ab": 12,
        "rang": 3
      },
      "Kleriker": {
        "ab": 16,
        "rang": 5
      },
      "Paladin": {
        "ab": 16,
        "rang": 3
      }
    },
    "beschreibung": "Im Kampf kann der Charakter einmal pro Talentrang seinen Wert in Schlagen für eine Runde um seinen vierfachen Talentrang in Diener der Dunkelheit bzw. Diener des Lichts erhöhen. Es ist nicht mögliche, mehrere Talentränge von Vergeltung in einer einzelnen Probe zu vereinen. Eine Kombination mit Talenten wie beispielsweise Brutaler Hieb ist allerdings uneingeschränkt möglich."
  },
  {
    "name": "Verheerer",
    "slug": "verheerer",
    "ref": "https://immersieg.de/talente/verheerer.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 8,
        "rang": 3
      },
      "Elementarist": {
        "ab": 12,
        "rang": 5
      },
      "Kleriker": {
        "ab": 16,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Paladin": {
        "ab": 14,
        "rang": 3
      }
    },
    "beschreibung": "Der Charakter versteht es, seine Magie verheerend einzusetzen: Die Abwehr des Gegners wird gegen Schaden durch die Zauberangriffe des Charakters (mittels Zaubern oder Zielzaubern) um 1 pro Talentrang gesenkt."
  },
  {
    "name": "Verletzen",
    "slug": "verletzen",
    "ref": "https://immersieg.de/talente/verletzen.html",
    "zugang": {
      "Krieger": {
        "ab": 4,
        "rang": 3
      },
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 12,
        "rang": 3
      },
      "Attentäter": {
        "ab": 12,
        "rang": 5
      },
      "Berserker": {
        "ab": 14,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 16,
        "rang": 5
      },
      "Waffenmeister": {
        "ab": 14,
        "rang": 5
      }
    },
    "beschreibung": "Im Nahkampf zielt der Charakter auf die verletzlichen Körperpartien seines Gegenübers: Die Abwehr des Gegners wird gegen die Nahkampfangriffe des Charakters mittels Schlagen um 1 pro Talentrang gesenkt."
  },
  {
    "name": "Vernichtender Schlag",
    "slug": "vernichtender-schlag",
    "ref": "https://immersieg.de/talente/vernichtender-schlag.html",
    "zugang": {
      "Krieger": {
        "ab": 15,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang kann der Krieger einmal alle 24 Stunden mit einem Nahkampfangriff einen vernichtenden Schlag ausführen, gegen den keine Abwehr gewürfelt wird. Der vernichtende Schlag muss vor dem Würfeln der Schlagen-Probe angekündigt werden und kann pro Talentrang mit maximal einem Talentrang eines anderen Talents (beispielsweise Brutaler Hieb) kombiniert werden."
  },
  {
    "name": "Vertrauter",
    "slug": "vertrauter",
    "ref": "https://immersieg.de/talente/vertrauter.html",
    "zugang": {
      "Späher": {
        "ab": 8,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 4,
        "rang": 3
      },
      "Druide": {
        "ab": 10,
        "rang": 10
      },
      "Paladin": {
        "ab": 10,
        "rang": 1
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang schließt sich Spähern ein Tier (Falke, Hund, Pferd, Wolf usw.), Zauberwirkern ein Kleintier (Katze, Kröte, Rabe usw.) und Paladinen ein Schlachtross an. Ein Druide kann jede Art von Tier bis Größenkategorie “groß” wählen.\n\nDie treuen Tiere befolgen einfache, einsilbige Befehle wie “Platz!” und “Fass!” und haben Verstand +1, auch wenn mit ihnen keine intelligente Kommunikation möglich ist und sie auch nicht zum heimlichen Auskundschaften etc. abgerichtet werden können. Ein Vertrauter gewährt seinem Besitzer, sofern er nicht mehr als AU x 5 (des Charakters) in Metern von ihm entfernt ist, einen Bonus von +1 auf einen von zwei Kampfwerten.\n\n| KLASSE       |     VERTRAUTENBONUS      |\n| ------------ | :----------------------: |\n| Späher       | Initiative oder Schießen |\n| Zauberwirker | Zaubern oder Zielzauber  |\n| Paladin      |   Abwehr oder Schlagen   |\n\nDer gewählte Kampfwert wird bei Erhalt des Vertrauten ausgewählt.\n\nWird ein Vertrauter getötet, erleidet der Charakter im selben Moment W20/2 nicht abwehrbaren Schaden und die Boni auf die Kampfwerte erlischen. Wird der Vertraute nicht wiederbelebt, kann für seinen Talentrang ein neuer Vertrauter gewählt werden, allerdings erst nach frühestens W20 Wochen. Bis dahin hat der Charakter temporär KÖR-1."
  },
  {
    "name": "Waffenkenner",
    "slug": "waffenkenner",
    "ref": "https://immersieg.de/talente/waffenkenner.html",
    "zugang": {
      "Krieger": {
        "ab": 8,
        "rang": 3
      },
      "Späher": {
        "ab": 12,
        "rang": 3
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 3
      },
      "Waffenmeister": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter besondere Kenntnisse im Umgang mit einer bestimmten Art von Nahkampf-waffe erlangen (beispielsweise Dolche, Langschwerter oder Streitäxte). Er erhält im Kampf mit dieser Waffenart Schlagen +1 und die Abwehr des Gegners wird um 1 gesenkt. Es ist nicht möglich, Waffenkenner mehrmals für ein und dieselbe Waffenart zu erlangen, jedoch kann der Talentrang mit Hilfe des Talents Perfektion weiter ausgebaut werden."
  },
  {
    "name": "Wahrnehmung",
    "slug": "wahrnehmung",
    "ref": "https://immersieg.de/talente/wahrnehmung.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 5
      },
      "Späher": {
        "ab": 1,
        "rang": 5
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      },
      "Attentäter": {
        "ab": 10,
        "rang": 10
      },
      "Meisterdieb": {
        "ab": 10,
        "rang": 10
      },
      "Waldläufer": {
        "ab": 10,
        "rang": 10
      }
    },
    "beschreibung": "Der Charakter ist ein aufmerksamer Beobachter. Auf alle Bemerken-Proben erhält er +2 pro Talentrang."
  },
  {
    "name": "Wechsler",
    "slug": "wechsler",
    "ref": "https://immersieg.de/talente/wechsler.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 1,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 10
      },
      "Paladin": {
        "ab": 10,
        "rang": 5
      }
    },
    "beschreibung": "Der Charakter hat gelernt, sich auf das Auswechseln seines aktiven Zaubers zu konzentrieren: Er erhält auf Proben, um seine Zauber zu wechseln, pro Talentrang einen Bonus von +2."
  },
  {
    "name": "Wissensgebiet",
    "slug": "wissensgebiet",
    "ref": "https://immersieg.de/talente/wissensgebiet.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 3
      },
      "Späher": {
        "ab": 1,
        "rang": 3
      },
      "Zauberwirker": {
        "ab": 1,
        "rang": 3
      }
    },
    "beschreibung": "Dieses Talent wird für jedes Wissensgebiet (Alte Sagen, Mathematik, Naturkunde, Sternenkunde, Zwergische Religion usw.) individuell erlernt, kann also mehrmals bis Höchstrang III erworben werden. Man beherrscht das jeweilige Wissensgebiet und erhält auf alle diesbezüglichen Proben einen Bonus von +3 pro Talentrang, den man für dieses Wissensgebiet erworben hat."
  },
  {
    "name": "Zaubermacht",
    "slug": "zaubermacht",
    "ref": "https://immersieg.de/talente/zaubermacht.html",
    "zugang": {
      "Zauberwirker": {
        "ab": 4,
        "rang": 3
      },
      "Elementarist": {
        "ab": 10,
        "rang": 5
      },
      "Erzmagier": {
        "ab": 10,
        "rang": 5
      },
      "Kriegszauberer": {
        "ab": 10,
        "rang": 5
      },
      "Paladin": {
        "ab": 12,
        "rang": 3
      }
    },
    "beschreibung": "Pro Talentrang kann der Charakter einmal pro Kampf seinen Wert in Zaubern oder Zielzaubern eine Runde lang um den Wert von Geist erhöhen, sofern es sich dabei um einen Zauber handelt, der andere schädigt oder heilt. Es ist möglich, mehrere Talentränge in einem einzigen Zauber zu vereinen."
  },
  {
    "name": "Zwei Waffen",
    "slug": "zwei-waffen",
    "ref": "https://immersieg.de/talente/zwei-waffen.html",
    "zugang": {
      "Krieger": {
        "ab": 1,
        "rang": 5
      },
      "Späher": {
        "ab": 8,
        "rang": 5
      }
    },
    "beschreibung": "Pro Talentrang wird der Malus von -10 auf Schlagen und Abwehr beim Kampf mit zwei Waffen um jeweils 2 Punkte gemindert."
  }
];
})(typeof window !== "undefined" ? window : this);
