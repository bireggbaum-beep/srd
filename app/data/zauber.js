/*
 * DS_REGELN.zauber — Zauberspruch-Daten (DS4 SRD+), grounded.
 * Generiert aus den Spruchdateien des SRD (grw/zaubersprueche.md + /zauber/<slug>.md).
 * Quelle: https://github.com/RoninEighty/Dungeonslayers  ·  © Christian Kennig, CC BY-NC-SA 4.0
 *
 * Schema je Zauber:
 *   { name, slug, ref, art ("Zaubern"|"Zielzauber"), zb, dauer, distanz,
 *     abklingzeit, preis, beschreibung,
 *     zugang: { Heiler: stufe, Zauberer: stufe, Schwarzmagier: stufe } }
 *   - zugang enthält nur Klassen mit Zahlenwert (Zugangsstufe); "-" = kein Zugang.
 *   - die Zugangsstufe ist zugleich die "Spruchstufe" fürs Lern-Budget der Klasse.
 */
(function (global) {
  "use strict";
  if (!global.DS_REGELN) { console.error("DS_REGELN fehlt — zauber.js muss nach regeln.js geladen werden."); return; }
  global.DS_REGELN.zauber = [
  {
    "name": "Allheilung",
    "slug": "allheilung",
    "ref": "https://immersieg.de/zauber/allheilung.html",
    "zugang": {
      "Heiler": 10
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "650GM",
    "beschreibung": "Dieser Zauber heilt sämtliche Verletzungen und schließt jede noch so große Wunde, ohne Narben zu hinterlassen. Selbst abgetrennte Gliedmaßen (sofern nicht mehr als W20 Stunden abgetrennt) lassen sich mit diesem Spruch wieder anfügen."
  },
  {
    "name": "Arkanes Schwert",
    "slug": "arkanes-schwert",
    "ref": "https://immersieg.de/zauber/arkanes-schwert.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE x 2 KR",
    "distanz": "Radius von VE m",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Ein Schwert aus hellem (oder je nach Belieben auch dunklem) Licht erscheint innerhalb eines Radius von VE in Metern um den ZAW herum.\n\nInnerhalb dieses Wirkungsbereiches kämpft es völlig selbstständig, hört jedoch auf gedankliche Kampfkommandos seines Beschwöreres wie \"Greif den großen Troll an\" oder \"Schütze mich\".\n\nBewegt sich der ZAW, wandert der Wirkungsbereich des Schwertes mit ihm mit, so dass die magische Klinge niemals mehr als VE in Metern von ihm getrennt sein kann.\n\nDas Schwert löst sich in seine arkanen Bestandteile auf, sobald seine (nicht heilbaren) LK auf Null oder niedriger sinken bzw. die Zauberdauer verstrichen ist.\n\nSämtliche Kampfwerte des Schwertes entsprechen der Stufe des ZAW +10.\n\nDie einzige Ausnahme bildet der Laufen-Wert, der dem doppelten Laufen-Wert des ZAW entspricht."
  },
  {
    "name": "Balancieren",
    "slug": "balancieren",
    "ref": "https://immersieg.de/zauber/balancieren.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 3,
      "Schwarzmagier": 6
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Bis Strecke zurückgelegt",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Das Ziel kann absolut sicher mit seinem reinen Laufen-Wert über dünne Seile u.ä. balancieren.\n\nSobald der Zauber gewirkt wurde, gilt der Balancieren-Effekt und endet, nachdem der Charakter eine Strecke in Höhe des eigenen, doppelten Laufen-Wertes in Metern zurückgelegt hat."
  },
  {
    "name": "Bannen",
    "slug": "bannen",
    "ref": "https://immersieg.de/zauber/bannen.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 18,
      "Schwarzmagier": 14
    },
    "art": "Zaubern",
    "zb": "-(KÖR+AU)/2 der Wesenheit",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "255GM",
    "beschreibung": "Dieser Zauber vernichtet feindliche Dämonen, Elementare und Untote im Wirkungsradius. Maximal wird eine Anzahl von Wesenheiten vernichtet, die der halbierten Stufe des ZAW entspricht. Bei zu vielen Wesenheiten entscheidet der Zufall, welche betroffen sind.\n\nAlternativ können auch bestimmte, einzelne Wesenheiten als Ziel des Bannes bestimmt werden. Pro misslungenen Bannversuch steigt die Schwierigkeit um 2."
  },
  {
    "name": "Blenden",
    "slug": "blenden",
    "ref": "https://immersieg.de/zauber/blenden.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 5
    },
    "art": "Zielzauber",
    "zb": "-(AGI+AU)/2 des Ziels",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 5 m",
    "abklingzeit": "5 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Ein gleißender Lichtstrahl schießt aus der Hand des ZAW und blendet bei Erfolg das Ziel (welches dagegen keine Abwehr würfeln darf).\n\nEin geblendetes Ziel hat -8 auf alle Handlungen, bei denen es sehen können sollte.\n\nSelbst augenlose Untote, wie beispielsweise Skelette, werden durch das magische Licht geblendet. Blinde Lebewesen sind dagegen nicht betroffen."
  },
  {
    "name": "Blitz",
    "slug": "blitz",
    "ref": "https://immersieg.de/zauber/blitz.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 7,
      "Schwarzmagier": 7
    },
    "art": "Zielzauber",
    "zb": "+3",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 m",
    "abklingzeit": "1 Kampfrunden",
    "preis": "310GM",
    "beschreibung": "Der ZAW schießt einen Blitz auf einen Feind. Gegner in Metallrüstung dürfen keine Abwehr gegen Blitze würfeln."
  },
  {
    "name": "Blut kochen",
    "slug": "blut-kochen",
    "ref": "https://immersieg.de/zauber/blut-kochen.html",
    "zugang": {
      "Zauberer": 17,
      "Schwarzmagier": 13
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "VE m",
    "abklingzeit": "24 Stunden",
    "preis": "1580GM",
    "beschreibung": "Das Blut des Ziels beginnt auf magische Art und Weise zu kochen, ohne dass es gerinnt.\n\nDer innerlich wirkende Schaden entspricht dem doppelten Probenergebnis, das Ziel würfelt seine Abwehr ohne die Panzerungsboni seiner Gegenstände.\n\nDer Zauber ist gegen Wesen ohne Blut - wie beispielsweise viele Untote - nicht einsetzbar."
  },
  {
    "name": "Botschaft",
    "slug": "botschaft",
    "ref": "https://immersieg.de/zauber/botschaft.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 6,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Bis ausformuliert",
    "distanz": "VE x 5 km",
    "abklingzeit": "24 Stunden",
    "preis": "510GM",
    "beschreibung": "Beauftragt ein geisterhaftes Abbild des Zaubernden bei einem ihm bekannten Wesen in Reichweite zu erscheinen und bis zu VE x 2 Wortsilben zu zitieren."
  },
  {
    "name": "Dämonen beschwören",
    "slug": "daemonen-beschwoeren",
    "ref": "https://immersieg.de/zauber/daemonen-beschwoeren.html",
    "zugang": {
      "Zauberer": 17,
      "Schwarzmagier": 10
    },
    "art": "Zaubern",
    "zb": "-(KÖR+AU) des Dämonen und +BB",
    "dauer": "VE x 2 Stunden",
    "distanz": "Radius von VE m",
    "abklingzeit": "24 Stunden",
    "preis": "1190GM",
    "beschreibung": "Mit diesem Zauber beschwört der Zauberwirker einen Dämon aus einer anderen Existenzebene.\n\nDer Charakter kann dabei frei wählen, was für eine Dämonenart (siehe Seite 107-108) er beschwören will und ob die Kreatur fliegen können soll (was ihre Beschwörung aber auch erschwert). Alle Dämonen hassen die niederen Wesen, die es wagen, sie zu beschwören, können ihnen bei einer erfolgreichen Beschwörung aber nichts anhaben. Beschworene Dämonen können nur jemanden angreifen, wenn ihr Beschwörer es ihnen befiehlt oder sie selbst angegriffen werden.\n\n**Aufträge:** Ein Dämon kann erst auf seine Existenzebene zurückkehren, wenn er für seinen Beschwörer eine Anzahl von Aufträgen gleich dessen VE ausgeführt hat (Dämonen verstehen immer die Sprache ihres Beschwörers). Dabei kann es sich um das simple Beantworten von Fragen handeln, aber auch komplexere Anweisungen enthalten wie: “Folge der Straße bis zur nächsten Ortschaft (Auftrag 1) und vernichte jeden, dem Du unterwegs begegnest (Auftrag 2).” Wird der Dämon von seinem Beschwörer vor Ablauf der Zauberdauer (VE x 2 Stunden) entlassen oder hat er alle seine Aufträge erfüllt, kehrt er augenblicklich zurück auf seine Existenzebene.\n\nBeschwörungskreise: Um einen Dämon zu beschwören, wird immer ein Beschwörungskreis benötigt. Dieser kann hastig auf den Boden gekritzelt oder in langen Stunden aufwendig gezeichnet werden. Je mehr Arbeit in einem Beschwörungskreis steckt, desto eher gelingt die Beschwörung: Jeder Beschwörungskreis verfügt über einen Beschwörenbonus (BB), der die ZaubernProbe beim Beschwören erleichtert.\n\n| BESCHWÖRUNGSKREIS ZEICHNEN            | BB  |\n| ------------------------------------- | --- |\n| Innerhalb 1 Kampfrunde gekritzelt     | -2  |\n| Innerhalb weniger Minuten gefertigt   | +0  |\n| Pro Zeichenstunde (max. VE Stunden)   | +1  |\n| Mit Blut gezeichnet                   | +2  |\n| Nachts gezeichnet                     | +2  |\n| 13 brennende Kerzen auf Kreis stellen | +1  |\n\n| WEITERE MODIFIKATOREN (KREIS NÖTIG) | BB      |\n| ----------------------------------- | ------- |\n| Bestimmter Dämon (Name bekannt)     | +2      |\n| Dämon soll fliegen können           | -KÖR/2¹ |\n| Singsang zum Ende (max. VE/2 Rd.)   | +1/Rd.  |\n| Todesopfer (intelligentes Wesen)    | +KÖR²   |\n\n¹: KÖR des Dämonen\n²: KÖR des Opfers\n\n**_Beispiel:_**\n_Ein hoher Dämon (KÖR 7 AU 3 = ZB -10), der zudem auch noch fliegen können soll (KÖR 7/2 = 3,5, aufgerundet zu 4), würde die Zaubern Probe um -14 erschweren._\n\n_Ein Beschwörer mit VE 8 könnte, um diesen Malus zu reduzieren, maximal 8 Stunden (+8) in der Nacht (+2) den Beschwörungskreis zeichnen und 13 Kerzen ringsum entzünden (+2)._\n\n_Würde er die ihm möglichen 4 Kampfrunden (VE/2) vor der eigentlichen Beschwörung noch einen Singsang anstimmen, wäre der endgültige ZB sogar +2 (= -14 + 8 + 2 + 2 + 4)._\n\nMisslungenes Beschwören: Ein Dämon wird auch beschworen, wenn die Zaubern-Probe misslingt, steht dann jedoch nicht unter der Kontrolle seines Beschwörers und kann frei handeln. Ein fehlerhaft beschworener Dämon hat nur ein Ziel vor Augen: Augenblicklich seinen Beschwörer zu vernichten, wodurch er wieder auf seine Existenzebene zurückkehren kann (ansonsten müsste er die Zauberdauer abwarten, ein inakzeptabler Zustand).\n\nCharaktere mit dem Talent **Diener des Lichts** können den Zauber nicht anwenden."
  },
  {
    "name": "Duftnote",
    "slug": "duftnote",
    "ref": "https://immersieg.de/zauber/duftnote.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 1,
      "Schwarzmagier": 2
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in Minuten",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Das Ziel wird vom ZAW mit einem Duft versehen.\n\nDieser Geruch kann angenehm oder unangenehm sein und erleichtert bzw.\n\nerschwert sämtliche sozialen Proben des Ziels für die Wirkungsdauer um 2."
  },
  {
    "name": "Durchlässig",
    "slug": "durchlaessig",
    "ref": "https://immersieg.de/zauber/durchlaessig.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "VE/2 KR",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Der ZAW wird mit samt seiner getragenen Ausrüstung durchlässig und kann für VE/2 KR durch nichtmagische, unbelebte Objekte schreiten."
  },
  {
    "name": "Durchsicht",
    "slug": "durchsicht",
    "ref": "https://immersieg.de/zauber/durchsicht.html",
    "zugang": {
      "Heiler": 7,
      "Zauberer": 3,
      "Schwarzmagier": 3
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "VE KR",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "220GM",
    "beschreibung": "Der ZAW kann durch nichtmagische, unbelebte Objekte VE/2 m weit sehen."
  },
  {
    "name": "Ebenentor",
    "slug": "ebenentor",
    "ref": "https://immersieg.de/zauber/ebenentor.html",
    "zugang": {
      "Zauberer": 18,
      "Schwarzmagier": 16
    },
    "art": "Zaubern",
    "zb": "-8",
    "dauer": "VE Minuten",
    "distanz": "VE m",
    "abklingzeit": "W20 Tage",
    "preis": "2580GM",
    "beschreibung": "Öffnet ein Tor zu einer anderen Existenzebene, die der ZAW namentlich nennen muss. Das Tor schließt sich, sobald VE/2 Wesen es durchschritten haben, oder die Spruchdauer abgelaufen ist."
  },
  {
    "name": "Einschläfern",
    "slug": "einschlaefern",
    "ref": "https://immersieg.de/zauber/einschlaefern.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(KÖR+VE)/2 des jeweiligen Ziels",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Dieser Zauber schläfert eine maximale Anzahl von Zielen gleich der Stufe des ZAW ein. Es handelt sich dabei um einen natürlichen Schlaf, aus dem man durch Kampflärm u.ä. erwachen kann."
  },
  {
    "name": "Elementar herbeirufen",
    "slug": "elementar-herbeirufen",
    "ref": "https://immersieg.de/zauber/elementar-herbeirufen.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 16
    },
    "art": "Zaubern",
    "zb": "-Elementarstufe x 5",
    "dauer": "VE Stunden",
    "distanz": "Radius von VE m",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Dieser Zauber ruft ein Elementar von seiner Ebene herbei und existiert in vier unterschiedlichen Varianten (Erde, Feuer, Luft und Wasser - jeweils ein einzelner Spruch). Alle Elementare (siehe Seite 110-112) existieren in drei verschiedenen Elementarstufen (I-III), zwischen denen man frei wählen kann. Elementare verachten die niederen Wesen, die es wagen, sie herbeizurufen, können ihnen bei einer erfolgreichen Herbeirufung aber nichts anhaben und kämpfen nur, wenn man sie angreift oder ihr Herbeirufer es befiehlt.\n\n**Aufträge:** Ein Elementar kann erst auf seine Existenzebene zurückkehren, wenn es für seinen Beschwörer eine Anzahl von Aufträgen gleich dessen hablierter VE ausgeführt hat (Elementare verstehen immer die Sprache ihres Herbeirufers). Dabei kann es sich um das simple Beantworten von Fragen handeln, aber auch komplexere Anweisungen enthalten wie: “Begebe Dich zu dem Dorf dort vorne (Auftrag 1) und entzünde die Strohdächer (Auftrag 2).”\n\nWird das Elementar vor Ablauf der Zauberdauer entlassen oder hat es alle Aufträge erfüllt, kehrt es augenblicklich zurück auf seine Ebene. Nach jeder Stunde besteht zudem eine Chance von 1-5 auf W20, dass es sich befreit und sofort verschwindet.\n\n**Elementarportale:** Um ein Elementar zu beschwören, wird immer sein Element in irgendeiner Form benötigt, das als Portal dient, um das Elementar von seiner Ebene zu rufen. So kann man unter Wasser keine Feuer- oder Luftelementare beschwören, wohl aber Wasserlementare. Die Größe des Portals regelt, wieviel Elementarstufen insgesamt herbeigerufen werden können. Dabei ist die Stufe senk- und aufsplittbar: Beispielsweise kann man mit einem Lagerfeuer ein Elementar der Stufe II herbeirufen. Alternativ kann man auch zwei Elementare der Stufe I herbeirufen oder gar nur eins. Die Stufensumme, die am Ende insgesamt herbeigerufen wird (I-III), wird mit 5 multipliziert und ergibt den Malus auf den ZB. Die Größe des Elementarportals gibt wiederum einen Herbeirufungsbonus (HB) auf die Zaubern-Probe.\n\n| ELEMENTARPORTAL                     | STUFE |\n| ----------------------------------- | ----- |\n| Feuer: Kerzenflamme bis Fackel      | I     |\n| Feuer: Lagerfeuer                   | II    |\n| Feuer: Brand/Lava                   | III   |\n| Erde: Erdboden/Kiesel/Sand          | I     |\n| Erde: Felsen/Findling               | II    |\n| Erde: Steinhügel oder größer        | III   |\n| Wasser: Pfütze/Regen/Wassertonne    | I     |\n| Wasser: Brunnen/Teich/Weiher o.ä.   | II    |\n| Wasser: Fluss/Meer/See              | III   |\n| Luft: Leichte Brise/Windiges Wetter | I     |\n| Luft: Stürmisch                     | II    |\n| Luft: Gewittersturm                 | III   |\n\n| GRÖSSE DES ELEMENTARPORTALS      | HB  |\n| -------------------------------- | --- |\n| Pro m² Feuer-/Lava-/Wasserfläche | +1¹ |\n| Pro m3 Erde/Gestein/Luft         | +1¹ |\n\n¹: Maximal erreichbarer Bonus entspricht VE\n\n**Misslungenes Herbeirufen:** Ein Elementar wird auch herbeigerufen, wenn die Zaubern-Probe misslingt, steht dann jedoch nicht unter der Kontrolle seines Herbeirufers. Ein fehlerhaft herbeigerufenes Elementar hat nur ein Ziel im Sinn: Seinen Herbeirufer zu vernichten, damit es bereits vor Ablauf der Zauberdauer wieder auf seine eigene Heimatebene zurückkehren kann."
  },
  {
    "name": "Erdspalt",
    "slug": "erdspalt",
    "ref": "https://immersieg.de/zauber/erdspalt.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 10,
      "Schwarzmagier": 14
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "VE KR",
    "distanz": "VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "325GM",
    "beschreibung": "Auf festem Boden öffnet der Zauber einen Erdspalt. Der Erdspalt ist bis zu VE in m breit und VE/2 in Metern lang und tief. Stehen Wesen an der Stelle, unter der der Erdspalt erscheint, können sie mit AGI+BE augenblicklich versuchen, noch in Sicherheit zu springen (zählt als freie Aktion).\n\nWesen, die sich in der Erdspalte befinden, wenn diese sich wieder schließt, erhalten augenblicklich 2W20 nicht abwehrbaren Schaden und sind - ohne noch richtig atmen zu können - eingeschlossen."
  },
  {
    "name": "Federgleich",
    "slug": "federgleich",
    "ref": "https://immersieg.de/zauber/federgleich.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 3,
      "Schwarzmagier": 3
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "1 Minute und bis Distanz gefallen",
    "distanz": "Berühren",
    "abklingzeit": "0 Kampfrunden",
    "preis": "110GM",
    "beschreibung": "Das Ziel - samt seiner getragenen Ausrüstung - kann aus einer Höhe gleich dem doppelten Probenergebniss in Metern sanft wie ein Feder ungelenkt zu Boden gleiten (1m pro KR).\n\nDer federgleiche Fall muss spätestens 1 Minute, nachdem der Zauber gewirkt wurde, begonnen werden, sonst verfällt sein Effekt."
  },
  {
    "name": "Feueratem",
    "slug": "feueratem",
    "ref": "https://immersieg.de/zauber/feueratem.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "+3",
    "dauer": "Augenblicklich",
    "distanz": "VE m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "460GM",
    "beschreibung": "Aus dem Mund des ZAW schießt eine lodernde Säule, die alle hintereinander stehenden Gegner in einer 1m breiten, geraden Schneise in Flammen hüllt. Der feurige Atem verursacht nicht abwehrbaren Schaden in Höhe des Probenergebnisses."
  },
  {
    "name": "Feuerball",
    "slug": "feuerball",
    "ref": "https://immersieg.de/zauber/feuerball.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "+3",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "460GM",
    "beschreibung": "Der ZAW schießt einen flammenden Ball auf seine Gegner, der in einer feurigen Explosion - ihr Radius entspricht der VE des ZAW in Metern - endet, welche nicht abwehrbaren Schaden in Höhe des Probenergebnisses verursacht."
  },
  {
    "name": "Feuerlanze",
    "slug": "feuerlanze",
    "ref": "https://immersieg.de/zauber/feuerlanze.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "Zielzauber",
    "zb": "+2",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 m",
    "abklingzeit": "0 Kampfrunden",
    "preis": "210GM",
    "beschreibung": "Dies ist eine mächtigere Variante des Zaubers Feuerstrahl."
  },
  {
    "name": "Feuerstrahl",
    "slug": "feuerstrahl",
    "ref": "https://immersieg.de/zauber/feuerstrahl.html",
    "zugang": {
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zielzauber",
    "zb": "+1",
    "dauer": "Augenblicklich",
    "distanz": "VE x 5 m",
    "abklingzeit": "0 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Der ZAW schießt einen Feuerstrahl auf einen Feind, dessen Schaden dem Probenergebnis entspricht."
  },
  {
    "name": "Feuerwand",
    "slug": "feuerwand",
    "ref": "https://immersieg.de/zauber/feuerwand.html",
    "zugang": {
      "Zauberer": 8,
      "Schwarzmagier": 10
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "VE KR",
    "distanz": "VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "360GM",
    "beschreibung": "Der ZAW lässt eine Feuerwand erscheinen, die Ausmaße von maximal 1m x VE m x VE m annehmen kann. Wesen, die an der Stelle stehen, wo die Feuerwand erscheint, oder durch sie hindurch springen, erhalten 2W20 abwehrbaren Schaden."
  },
  {
    "name": "Flackern",
    "slug": "flackern",
    "ref": "https://immersieg.de/zauber/flackern.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 4,
      "Schwarzmagier": 4
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Probenergebnis x 2 KR",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Der ZAW beginnt zu flackern und ist dadurch schwieriger zu treffen.\n\nSeine Abwehr wird für die Dauer des Zaubers um seinen halbierten Wert in GEI erhöht (nur nicht gegen alles einhüllenden Flächenschaden)."
  },
  {
    "name": "Flammeninferno",
    "slug": "flammeninferno",
    "ref": "https://immersieg.de/zauber/flammeninferno.html",
    "zugang": {
      "Zauberer": 15,
      "Schwarzmagier": 15
    },
    "art": "Zielzauber",
    "zb": "+5",
    "dauer": "VE KR",
    "distanz": "VE x 10 m",
    "abklingzeit": "24 Stunden",
    "preis": "1420GM",
    "beschreibung": "Eine kreisrunde Fläche mit einem Radius von VE in Metern geht in Flammen auf. Jeder in dem Inferno erhält pro KR nicht abwehrbaren Schaden in Höhe des Probenergebnisses."
  },
  {
    "name": "Flammenklinge",
    "slug": "flammenklinge",
    "ref": "https://immersieg.de/zauber/flammenklinge.html",
    "zugang": {
      "Zauberer": 4,
      "Schwarzmagier": 4
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "160GM",
    "beschreibung": "Der ZAW kann eine Metallklinge in lodernde Flammen hüllen.\n\nDabei handelt es sich um ein magisches Feuer, das keinen Sauerstoff benötigt und dessen Flammenfarbe der ZAW frei bestimmen kann.\n\nFür die Dauer des Zauberspruchs wird der WB der Waffe um +1 erhöht und ihr Schaden gilt als magisch.\n\nEin Immersieg bei einem Angriff erzeugt eine kleine Explosion, wodurch der erwürfelte Schaden in dieser KR um zusätzliche W20 erhöht wird.\n\nFlammenklinge ist nicht mit Frostwaffe kombinierbar."
  },
  {
    "name": "Fliegen",
    "slug": "fliegen",
    "ref": "https://immersieg.de/zauber/fliegen.html",
    "zugang": {
      "Heiler": 20,
      "Zauberer": 10,
      "Schwarzmagier": 10
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis x 5 KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "460GM",
    "beschreibung": "Das Ziel kann fliegen. Die Fortbewegungsgeschwindigkeit ist im Flug doppelt so hoch wie am Boden (zusätzlich kann man sie wie beim \"Rennen\" verdoppeln).\n\nEin Charakter mit Laufen 4,5m fliegt also 9m in einer KR, \"rennend\" 18m."
  },
  {
    "name": "Fluch",
    "slug": "fluch",
    "ref": "https://immersieg.de/zauber/fluch.html",
    "zugang": {
      "Zauberer": 6,
      "Schwarzmagier": 2
    },
    "art": "Zaubern",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "Probenergebnis Tage",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "150GM",
    "beschreibung": "Der ZAW benötigt etwas vom Ziel in seinem Besitz, wie beispielsweise ein Haar, ein Kleidungsstück o.ä., das beim Zaubern - ob erfolgreich oder nicht - zerstört wird. Das Ziel wird verflucht und erhält auf alle Proben -2, bis die Zauberdauer verstrichen ist oder der Fluch mittels Magie bannen schon vorher entfernt wird.\n\nEin Ziel kann mehrmals verflucht werden.\n\nAlle Flüche müssen einzeln gebannt werden, stammen sie nicht vom selben ZAW."
  },
  {
    "name": "Freund",
    "slug": "freund",
    "ref": "https://immersieg.de/zauber/freund.html",
    "zugang": {
      "Heiler": 6,
      "Zauberer": 7,
      "Schwarzmagier": 8
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(GEI+VE)/2 des Ziels",
    "dauer": "VE Minuten",
    "distanz": "VE x 2 m",
    "abklingzeit": "24 Stunden",
    "preis": "370GM",
    "beschreibung": "Bei Erfolg hält das Ziel den ZAW (und nur ihn!) für einen sehr guten Freund.\n\nDas Ziel wird ihm alles anvertrauen, was er auch einem sehr guten Freund verraten würde und alles für ihn machen, was er auch für einen guten Freund tun würde."
  },
  {
    "name": "Frostschock",
    "slug": "frostschock",
    "ref": "https://immersieg.de/zauber/frostschock.html",
    "zugang": {
      "Zauberer": 12,
      "Schwarzmagier": 16
    },
    "art": "Zielzauber",
    "zb": "+3",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "560GM",
    "beschreibung": "Ein Eisstrahl schießt aus den Händen des ZAW. Gegen den Schaden dieses frostigen Zauber ist keine Abwehr zulässig.\n\nZudem wird das Ziel magisch eingefroren, bis VE KR verstrichen sind oder es Schaden erhält."
  },
  {
    "name": "Frostwaffe",
    "slug": "frostwaffe",
    "ref": "https://immersieg.de/zauber/frostwaffe.html",
    "zugang": {
      "Zauberer": 4
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "160GM",
    "beschreibung": "Der ZAW kann eine Waffe in eisige Kälte hüllen. Für die Dauer des Zauberspruchs wird der WB der Waffe um +1 erhöht und ihr Schaden gilt als magisch.\n\nEin Immersieg bei einem Angriff friert den Gegner für eine KR lang ein, als wirke auf ihn der Zauber Halt. Frostwaffe ist nicht mit Flammenklinge kombinierbar."
  },
  {
    "name": "Gasgestalt",
    "slug": "gasgestalt",
    "ref": "https://immersieg.de/zauber/gasgestalt.html",
    "zugang": {
      "Zauberer": 15,
      "Schwarzmagier": 18
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis x 5 KR",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "1420GM",
    "beschreibung": "Das Ziel - samt seiner getragenen Ausrüstung - wird gasförmig und kann durch jede noch so kleine Öffnung gleiten.\n\nDas Ziel kann jederzeit die Wirkung des Zaubers als freie Aktion beenden. In Gasform wird der Laufen-Wert vervierfacht, der Charakter kann seine Umgebung weiterhin wahrnehmen. In Gastgestalt ist es allerdings nicht möglich, zu zaubern, zu sprechen, anzugreifen oder in andere Wesen einzudringen."
  },
  {
    "name": "Geben und Nehmen",
    "slug": "geben-und-nehmen",
    "ref": "https://immersieg.de/zauber/geben-und-nehmen.html",
    "zugang": {
      "Heiler": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "5 Kampfrunden",
    "preis": "115GM",
    "beschreibung": "Das Ziel des Zaubers erhält 50% des Schadens, den es per Schlagen im Nahkampf verursacht (also abzüglich des Abwehrwurfs des Gegners), in Form von heilender Magie auf die eigene Lebenskraft gutgeschrieben."
  },
  {
    "name": "Gehorche",
    "slug": "gehorche",
    "ref": "https://immersieg.de/zauber/gehorche.html",
    "zugang": {
      "Zauberer": 12,
      "Schwarzmagier": 10
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(GEI+VE)/2 des Ziels",
    "dauer": "VE/2 KR",
    "distanz": "VE x 2 m",
    "abklingzeit": "24 Stunden",
    "preis": "1120GM",
    "beschreibung": "Bei Erfolg wird das Ziel dem ZAW hörig und führt bedingungslos jeden seiner Befehle aus (außer Selbstmord oder -verstümmelung). Es würde sogar seine eigenen Kameraden angreifen."
  },
  {
    "name": "Giftbann",
    "slug": "giftbann",
    "ref": "https://immersieg.de/zauber/giftbann.html",
    "zugang": {
      "Heiler": 3,
      "Zauberer": 6,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "80GM",
    "beschreibung": "Neutralisiert augenblicklich ein nichtmagisches Gift, sofern es noch nicht zu spät ist."
  },
  {
    "name": "Giftschutz",
    "slug": "giftschutz",
    "ref": "https://immersieg.de/zauber/giftschutz.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 2,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Stunden",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Das Ziel erhält einen Bonus auf Abwehr-Proben gegen Gifte in Höhe der Stufe des ZAW. Der alleinige Bonus (ohne den normalen Abwehr-Wert) wirkt auch gegen Gifte, bei denen normalerweise keine Abwehr erlaubt ist."
  },
  {
    "name": "Glühender Glaube",
    "slug": "gluehender-glaube",
    "ref": "https://immersieg.de/zauber/gluehender-glaube.html",
    "zugang": {
      "Heiler": 6
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "185GM",
    "beschreibung": "Die berührte Waffe - das Ziel des Zaubers - erglüht vor heiliger Kraft. Für die Wirkungsdauer des Zaubers gilt der mit der Waffe verursachte Schaden als magisch und der WB wird um VE/2 erhöht, während die Abwehr getroffener Gegner gegen Angriffe mit dieser Waffe um VE/2 gesenkt wird."
  },
  {
    "name": "Halt",
    "slug": "halt",
    "ref": "https://immersieg.de/zauber/halt.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 6,
      "Schwarzmagier": 6
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "VE KR",
    "distanz": "VE x 5 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Bei Erfolg kann sich das Ziel, welches keine Abwehr gegen den Zauber würfeln darf, nicht mehr bewegen.\n\nDie Starre endet vorzeitig, sollte das Ziel Schaden erhalten. Während der Starre ist es dem Ziel möglich, die Augen zu bewegen, zu atmen und klar zu denken. Ein erstarrter ZAW könnte also immer noch seine Zauber wechseln oder gar versuchen, ohne Worte und Gesten (sh. GRW S. 47) einen Zauber zu wagen."
  },
  {
    "name": "Heilbeeren",
    "slug": "heilbeeren",
    "ref": "https://immersieg.de/zauber/heilbeeren.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 10
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "20GM",
    "beschreibung": "Der ZAW benötigt frische Beeren, kleine Nüsse, schmackhafte Blätter o.ä. für diesen Zauber. Insgesamt wird von ihnen eine Anzahl gleich dem Probenergebnis (bei Druiden x 2) mit einem Heileffekt versehen: Jede Heilbeere heilt augenblicklich 1LK (pro Aktion können bis zu 10 Heilbeeren verzehrt werden). Die Heilbeeren verlieren nach VE Tagen ihre Wirkung, oder wenn der ZAW den Zauber erneut anwendet."
  },
  {
    "name": "Heilende Aura",
    "slug": "heilende-aura",
    "ref": "https://immersieg.de/zauber/heilende-aura.html",
    "zugang": {
      "Heiler": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis x 2 KR",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Der Heiler und alle seine Gefährten in einem Radius von VE in Metern erhalten 1LK jede KR geheilt."
  },
  {
    "name": "Heilende Hand",
    "slug": "heilende-hand",
    "ref": "https://immersieg.de/zauber/heilende-hand.html",
    "zugang": {
      "Heiler": 1
    },
    "art": "Zaubern",
    "zb": "+1",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "0 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Durch Hand auflegen wird bei dem Ziel Lebenskraft in Höhe des Probenergebnisses geheilt."
  },
  {
    "name": "Heilende Strahlen",
    "slug": "heilende-strahlen",
    "ref": "https://immersieg.de/zauber/heilende-strahlen.html",
    "zugang": {
      "Heiler": 12
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "VE x 2 m",
    "abklingzeit": "2 Kampfrunden",
    "preis": "395GM",
    "beschreibung": "Lichtstrahlen schießen vom Heiler aus und heilen die Wunden von bis zu VE/2 Gefährten, die Lebenskraft in Höhe des Probenergebnisses dazu erhalten. Es wird nur eine Probe für diesen Zielzauber gewürfelt: Einzig der Distanzmalus (sh. GRW. S. 43) des Ziels, das am weitesten entfernt steht, wird als Malus gewertet."
  },
  {
    "name": "Heilendes Feld",
    "slug": "heilendes-feld",
    "ref": "https://immersieg.de/zauber/heilendes-feld.html",
    "zugang": {
      "Heiler": 18
    },
    "art": "Zielzauber",
    "zb": "+2",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "24 Stunden",
    "preis": "1210GM",
    "beschreibung": "Dieser Zauber heilt bei allen Gefährten im Wirkungsradius die Lebenskraft um das Probenergebnis."
  },
  {
    "name": "Heilendes Licht",
    "slug": "heilendes-licht",
    "ref": "https://immersieg.de/zauber/heilendes-licht.html",
    "zugang": {
      "Heiler": 4
    },
    "art": "Zielzauber",
    "zb": "+2",
    "dauer": "Augenblicklich",
    "distanz": "VE x 2 m",
    "abklingzeit": "2 Kampfrunden",
    "preis": "115GM",
    "beschreibung": "Ein vom Heiler ausgehender Lichtstrahl heilt die Lebenskraft des Ziels in Höhe des Probenergebnisses."
  },
  {
    "name": "Heiliger Hammer",
    "slug": "heiliger-hammer",
    "ref": "https://immersieg.de/zauber/heiliger-hammer.html",
    "zugang": {
      "Heiler": 10
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE KR",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "325GM",
    "beschreibung": "Ein Hammer aus hellem Licht erscheint innerhalb eines Radius von VE in Metern um den Heiler herum.\n\nInnerhalb dieses Wirkungsbereiches kämpft er völlig selbstständig, hört jedoch auf gedankliche Kampfkommandos des ZAW wie \"Halte den Dämon auf\" oder \"Helfe dem Paladin\".\n\nBewegt sich der Charakter, wandert der Wirkungsbereich des Hammers mit ihm mit, so dass die heilige Waffe niemals mehr als VE x 2 in Metern von ihm entfernt sein kann. Der heilige Hammer verschwindet, sobald seine (nicht heilbaren) LK auf Null oder niedriger sinken bzw. die Zauberdauer abgelaufen ist.\n\nSämtliche Kampfwerte des heiligen Hammers entsprechen der Stufe des Heilers +8. Die einzige Ausnahme bildet der Laufen-Wert, der dem doppelten Laufen-Wert des Heilers entspricht."
  },
  {
    "name": "Kettenblitz",
    "slug": "kettenblitz",
    "ref": "https://immersieg.de/zauber/kettenblitz.html",
    "zugang": {
      "Heiler": 16,
      "Zauberer": 10,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "+3",
    "dauer": "Augenblicklich",
    "distanz": "VE x 5 m",
    "abklingzeit": "5 Kampfrunden",
    "preis": "460GM",
    "beschreibung": "Der ZAW schießt einen Blitz auf einen Feind, der auf bis zu VE weitere Gegner in seiner Nähe überspringt.\n\nNur Gegner, die 2 oder mehr m von einem ihrer getroffenen Mitstreiter entfernt stehen, kann der Kettenblitz nicht erreichen (sh. GRW S. 60).\n\nGetroffene Gegner in Metallrüstung dürfen keine Abwehr gegen einen Kettenblitz würfeln.\n\n![Kettenblitz springt auf Gegner](../images/kettenblitz.png)"
  },
  {
    "name": "Kleiner Terror",
    "slug": "kleiner-terror",
    "ref": "https://immersieg.de/zauber/kleiner-terror.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 6,
      "Schwarzmagier": 4
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(GEI+VE)/2 des Ziels",
    "dauer": "VE KR",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "100 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Bei Erfolg fliehen betroffene Ziele - maximal eine Anzahl gleich der halbierten Stufe des ZAW - so schnell wie möglich in panischer Angst und können erst nach Ablauf der Zauberdauer wieder umkehren. Der Effekt endet bei jedem Fliehenden, der Schaden erleidet."
  },
  {
    "name": "Kontrollieren",
    "slug": "kontrollieren",
    "ref": "https://immersieg.de/zauber/kontrollieren.html",
    "zugang": {
      "Zauberer": 8,
      "Schwarzmagier": 4
    },
    "art": "Zaubern",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "Bis erlöst",
    "distanz": "VE x 2 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "205GM",
    "beschreibung": "Bei Erfolg bringt der ZAW eine maximale Anzahl untoter Ziele gleich seiner Stufe unter Kontrolle, selbst wenn diese einem anderen ZAW unterstehen.\n\nBei zu vielen Untoten entscheidet der Zufall, welche durch den Zauber betroffen sind.\n\nAlternativ kann auch ein einzelner Untoter als Ziel bestimmt werden.\n\nKontrollierte Untote unterstehen dem ZAW, führen bedingungslos seine Befehle aus und können nur auf Wunsch des ZAW wieder ihren Frieden finden, oder wenn dieser stirbt.\n\nEin ZAW kann nicht mehr Untote gleichzeitig kontrollieren, als seine eigene Stufe beträgt."
  },
  {
    "name": "Körperexplosion",
    "slug": "koerperexplosion",
    "ref": "https://immersieg.de/zauber/koerperexplosion.html",
    "zugang": {
      "Schwarzmagier": 20
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "VE m",
    "abklingzeit": "W20 Tage",
    "preis": "3735GM",
    "beschreibung": "Der Zauber versucht das Ziel zur Explosion zu bringen. Der verursachte Schaden entspricht dem vierfachen Probenergebnis, das Ziel würfelt Abwehr ohne Panzerungsboni von Gegenständen.\n\nDer Zauber ist gegen körperlose Wesen - wie beispielsweise Geister - nicht einsetzbar."
  },
  {
    "name": "Lauschen",
    "slug": "lauschen",
    "ref": "https://immersieg.de/zauber/lauschen.html",
    "zugang": {
      "Heiler": 6,
      "Zauberer": 2,
      "Schwarzmagier": 2
    },
    "art": "Zaubern",
    "zb": "-1 pro 10 m Entfernung",
    "dauer": "VE x 2 KR",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "60GM",
    "beschreibung": "Der ZAW kann sein Hörzentrum an einen bis zu VE x 5 m entfernten Punkt verlagern (eine klare Sichtlinie vorausgesetzt) und vernimmt dadurch alles, was dort zu hören ist, als würde er sich dort befinden.\n\nDieser Punkt kann eine freie Stelle im Raum sein oder auch ein Kleidungsstück des Belauschten."
  },
  {
    "name": "Licht",
    "slug": "licht",
    "ref": "https://immersieg.de/zauber/licht.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 1,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "+5",
    "dauer": "Probenergebnis in Minuten",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Das berührte, leblose Ziel - beipielsweise ein Stab oder eine kleine, abdeckbare Münze - leuchtet fackelhell auf."
  },
  {
    "name": "Lichtlanze",
    "slug": "lichtlanze",
    "ref": "https://immersieg.de/zauber/lichtlanze.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 12
    },
    "art": "Zielzauber",
    "zb": "+5",
    "dauer": "Augenblicklich",
    "distanz": "VE x 5 m",
    "abklingzeit": "1 Kampfrunden",
    "preis": "325GM",
    "beschreibung": "Dies ist eine mächtigere Variante des Zaubers Lichtpfeil, gegen dessen Schaden Wesen der Dunkelheit einen Malus von 2 auf ihre Abwehr erhalten.\n\nCharaktere mit dem Talent Diener der Dunkelheit können diesen Zauber nicht anwenden."
  },
  {
    "name": "Lichtpfeil",
    "slug": "lichtpfeil",
    "ref": "https://immersieg.de/zauber/lichtpfeil.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 5
    },
    "art": "Zielzauber",
    "zb": "+2",
    "dauer": "Augenblicklich",
    "distanz": "VE x 5 m",
    "abklingzeit": "1 Kampfrunden",
    "preis": "45GM",
    "beschreibung": "Gegen den Schaden dieses Zielzaubers erhalten Wesen der Dunkelheit einen Malus von 2 auf ihre Abwehr.\n\nCharaktere mit dem Talent Diener der Dunkelheit können diesen Zauber nicht anwenden."
  },
  {
    "name": "Lichtsäule",
    "slug": "lichtsaeule",
    "ref": "https://immersieg.de/zauber/lichtsaeule.html",
    "zugang": {
      "Heiler": 16,
      "Zauberer": 19
    },
    "art": "Zielzauber",
    "zb": "+8",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 m",
    "abklingzeit": "1 Kampfrunden",
    "preis": "535GM",
    "beschreibung": "Dies ist eine mächtigere Variante des Zaubers Lichtlanze, gegen dessen Schaden Wesen der Dunkelheit ebenfalls einen Malus von 2 auf ihre Abwehr erhalten.\n\nCharaktere mit dem Talent Diener der Dunkelheit können diesen Zauber nicht anwenden.\n\nCharaktere mit dem Talent Vergeltung addieren ihren Talentrang auf den PW der Zielzaubern-Probe der Lichtsäule."
  },
  {
    "name": "Magie bannen",
    "slug": "magie-bannen",
    "ref": "https://immersieg.de/zauber/magie-bannen.html",
    "zugang": {
      "Heiler": 12,
      "Zauberer": 7,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "-Wirkerstufe bzw. -LK/2",
    "dauer": "Augenblicklich",
    "distanz": "VE m",
    "abklingzeit": "24 Stunden",
    "preis": "620GM",
    "beschreibung": "Der ZAW bannt permanent einen Zauberspruch oder magischen Effekt. Die Probe wird durch die Stufe des Wesens, welches den Zauber wirkte, gemindert. Wird der Zauberspruch gegen ein magisches Wesen (z.B. ZAW) angewendet, gilt dessen halbierte LK als Malus auf die Probe. Bei Erfolg wird das Ziel nicht automatisch gebannt - es erhält nicht abwehrbaren Schaden in Höhe des doppelten Probenergebnisses. Stirbt das Ziel, verschwindet es spurlos inkl. getragener Ausrüstung.\n\nSchafft der bannende Charakter die Probe nicht, wird er selbst Ziel des Zaubers: Er würfelt augenblicklich und aktionsfrei erneut den Zauber (Ziel: Er selbst). Angewendete, verstärkende Zaubereffekte (z.B. durch Talente), gelten auch beim zweiten Wurf. Das kommt auch zur Anwendung, wenn der ZAW versucht, den magischen Effekt eines Gegenstandes zu bannen. Der ZB-Malus entspricht der Stufensumme aller Erschaffer."
  },
  {
    "name": "Magie entdecken",
    "slug": "magie-entdecken",
    "ref": "https://immersieg.de/zauber/magie-entdecken.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Radius von VE x 2 m",
    "abklingzeit": "10 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Scheitert ein ZAW, die Magie einer Örtlichkeit, eines Objektes oder eines Wesen zu erspüren (sh. GRW S. 47), kann er sämtliche Magie im Wirkungsbreich - nur für ihn sichtbar - mit Hilfe dieses Zaubers für kurze Zeit aufleuchten sehen, sofern sie nicht verborgen ist (unter einem Umhang, in einer Truhe usw.).\n\nBetrachtet man ZAW, leuchten diese ebenfalls kurz auf, je heller, desto mächtiger ist die Magie in ihnen."
  },
  {
    "name": "Magie identifizieren",
    "slug": "magie-identifizieren",
    "ref": "https://immersieg.de/zauber/magie-identifizieren.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "1 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Offenbart dem ZAW die Quelle und/oder Funktion der Magie eines Objektes oder einer Örtlichkeit."
  },
  {
    "name": "Magische Barriere",
    "slug": "magische-barriere",
    "ref": "https://immersieg.de/zauber/magische-barriere.html",
    "zugang": {
      "Heiler": 14,
      "Zauberer": 10,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "VE Minuten oder Konzentration",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Der ZAW erschafft ein unbewegliches, würfelförmiges Kraftfeld mit einer Größe von maximal VE/2 mÂ³, welches sämtliche Magie- und Zaubersprucheffekte nach innen und außen hin komplett abblockt.\n\nWeder Feuerbälle, noch Lauschen- oder Teleport-Zauber können diese magische Barriere durchbrechen.\n\nDie magische Barriere verschwindet, sofern der Zauerwirker sie nicht - nach Ablauf der Spruchdauer - durch ununterbrochene Konzentration (zählt als ganze Aktion) aufrecht erhält."
  },
  {
    "name": "Magische Rüstung",
    "slug": "magische-ruestung",
    "ref": "https://immersieg.de/zauber/magische-ruestung.html",
    "zugang": {
      "Heiler": 4,
      "Zauberer": 8,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "230GM",
    "beschreibung": "Die Lebenskraft des Charakters erhöht sich um das Wurfergebnis. Erhält der ZAW Schaden, kostet ihn das zuerst immer die (nicht heilbare) Lebenskraft der magischen Rüstung, bevor es an die eigene Lebenskraft geht. Die LK der magischen Rüstung bleiben erhalten, bis sie durch Schaden verloren sind, oder wenn der Charakter den Zauber abermals anwendet."
  },
  {
    "name": "Magische Waffe",
    "slug": "magische-waffe",
    "ref": "https://immersieg.de/zauber/magische-waffe.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Minuten",
    "distanz": "Berühren",
    "abklingzeit": "1 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Dieser Zauber verleiht einer Waffe magische Kräfte. Ihr WB erhöht sich für die Dauer des Zauber um +1 und der mit ihr verursachte Schaden gilt als magisch, verletzt beispielsweise also auch körperlose Wesen wie Geister."
  },
  {
    "name": "Magisches Schloss",
    "slug": "magisches-schloss",
    "ref": "https://immersieg.de/zauber/magisches-schloss.html",
    "zugang": {
      "Heiler": 3,
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Bis Schloss geöffnet",
    "distanz": "Berühren",
    "abklingzeit": "5 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Dieser Zauber verschließt auf magische Weise eine Klappe, Truhe, Tür oder ähnliche Öffnung.\n\nDas Probenergebnis stellt die Erschwernis dar, um dieses Schloss zu öffnen (ob nun mit einem Dietrich, roher Gewalt oder Magie), nur der ZAW selbst kann es ohne Probleme öffnen.\n\nDer Zauber kann auch auf ein mechanisches Schloss gesprochen werden, um dessen Schlosswert (SW) zu verstärken."
  },
  {
    "name": "Manabrot",
    "slug": "manabrot",
    "ref": "https://immersieg.de/zauber/manabrot.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "VE Meter",
    "abklingzeit": "24 Stunden",
    "preis": "420GM",
    "beschreibung": "Der ZAW bündelt die magische Energien um sich herum und erschafft daraus warmes, aber geschmackloses Manabrot.\n\nMaximal kann der ZAW eine Anzahl von Manabrot gleich seiner halbierten Stufe erschaffen. Jeder der blau-violetten, teigähnlichen Klumpen, entspricht einer ganzen Mahlzeit (von denen ein Erwachsener 3 pro Tag benötigt) für eine Person."
  },
  {
    "name": "Nahrung zaubern",
    "slug": "nahrung-zaubern",
    "ref": "https://immersieg.de/zauber/nahrung-zaubern.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 7
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "VE Meter",
    "abklingzeit": "24 Stunden",
    "preis": "90GM",
    "beschreibung": "Der ZAW bündelt die magische Energien um sich herum und erschafft daraus die Grundzutat einer einfachen Mahlzeit, wie etwa Linsen, Reis oder Rüben.\n\nMaximal kann der ZAW genügend Zutaten für ein Anzahl von Mahlzeiten (von denen ein Erwachsener 3 pro Tag benötigt) gleich seiner Stufe erschaffen."
  },
  {
    "name": "Netz",
    "slug": "netz",
    "ref": "https://immersieg.de/zauber/netz.html",
    "zugang": {
      "Heiler": 4,
      "Zauberer": 9,
      "Schwarzmagier": 9
    },
    "art": "Zielzauber",
    "zb": "-(AGI+ST)/2 des Ziels",
    "dauer": "Probenergebnis/2 KR",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "115GM",
    "beschreibung": "Ein Netz aus klebriger Astralmasse mit einem Radius von VE/2 in Metern erscheint.\n\nVom Netz getroffene Wesen, welche keine Abwehr dagegen würfeln dürfen, halbieren für die Dauer des Zaubers Initiative, Laufen und Schlagen.\n\nDer Zauber wirkt nicht gegen Wesen, die 2+ Größenkategorien (sh. GRW S. 104) größer sind."
  },
  {
    "name": "Niesanfall",
    "slug": "niesanfall",
    "ref": "https://immersieg.de/zauber/niesanfall.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 3,
      "Schwarzmagier": 3
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "1 KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "0 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Bei Erfolg kann das Ziel, welches keine Abwehr gegen den Zauber würfeln darf, sich vor lauter Niesen nur (mit halbierten Laufen-Wert) bewegen, bis der Spruchwirker wieder an der Reihe ist.\n\nDer Niesanfall endet vorzeitig, sollte das Ziel Schaden erhalten."
  },
  {
    "name": "Öffnen",
    "slug": "oeffnen",
    "ref": "https://immersieg.de/zauber/oeffnen.html",
    "zugang": {
      "Heiler": 2,
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "-SW",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Öffnet ein Schloss, ohne es zu beschädigen. Der normalerweise immer +0 betragende Schlosswert (SW) kann durch bessere Qualität oder den Zauberspruch Magisches Schloss erhöht werden.\n\nMisslingt der Zauber, kann der ZAW es erneut versuchen. Jeder Folgewurf senkt den PW der Zaubern-Proben bei diesem speziellen Schloss jedoch um jeweils 2.\n\nDieser kumulative Malus gegen dieses eine Schloss erlöschen erst, wenn der ZAW eine neue Stufe erreicht."
  },
  {
    "name": "Putzteufel",
    "slug": "putzteufel",
    "ref": "https://immersieg.de/zauber/putzteufel.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "bis zu VE/2 Stunden",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "420GM",
    "beschreibung": "Der ZAW erschafft einen kleinen, magischen Diener, der für ihn unglaublich flink putzt, aufräumt und packt.\n\nAnsonsten ist der Putzteufel völlig unütz, befolgt keine andersartigen Befehle und verpufft bei Schaden."
  },
  {
    "name": "Reinigen",
    "slug": "reinigen",
    "ref": "https://immersieg.de/zauber/reinigen.html",
    "zugang": {
      "Heiler": 3,
      "Zauberer": 7
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "0 Kampfrunden",
    "preis": "80GM",
    "beschreibung": "Dieser Zauber reinigt eine ungewaschene Person, einen Gegenstand (wie einen schlammbesudelten Umhang) oder auch eine Mahlzeit (von Bakterien, Fäulnis und Gift)."
  },
  {
    "name": "Rost",
    "slug": "rost",
    "ref": "https://immersieg.de/zauber/rost.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 7,
      "Schwarzmagier": 8
    },
    "art": "Zielzauber",
    "zb": "-WB der Waffe bzw. -PA der Rüstung",
    "dauer": "Augenblicklich",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "150GM",
    "beschreibung": "Dieser Zauber lässt bei Erfolg eine nichtmagische Waffe oder ein nichtmagisches Rüstungsteil aus Metall augenblicklich zu rostigen Staub zerfallen."
  },
  {
    "name": "Schatten",
    "slug": "schatten",
    "ref": "https://immersieg.de/zauber/schatten.html",
    "zugang": {
      "Zauberer": 6,
      "Schwarzmagier": 2
    },
    "art": "Zielzauber",
    "zb": "-(AGI+AU)/2 des Ziels",
    "dauer": "Probenergebnis/2 KR",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "5 Kampfrunden",
    "preis": "75GM",
    "beschreibung": "Dunkle Schatten umhüllen das Ziel (welches keine Abwehr dagegen würfeln darf), wodurch es -8 auf alle Handlungen hat, bei denen es besser sehen können sollte.\n\nAugenlosen Untoten, wie beispielsweise Skeletten, aber auch blinden Lebewesen, kann der Zauber nichts anhaben."
  },
  {
    "name": "Schatten erwecken",
    "slug": "schatten-erwecken",
    "ref": "https://immersieg.de/zauber/schatten-erwecken.html",
    "zugang": {
      "Schwarzmagier": 13
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "1580GM",
    "beschreibung": "Der Schwarzmagier kann die Seelen von einer maximalen Anzahl von Toten im Wirkungsradius gleich seiner eigenen Stufe verderben und in Form tödlicher Schatten (sh. GRW S. 121) zu gequältem Unleben erwecken. Die Schatten benötigen drei Kampfrunden, um sich zu bilden, danach wollen sie ihren Erwecker vernichten, um wieder Erlösung zu finden, gelingt es diesem nicht, sie mit dem Zauber Kontrollieren zu beherrschen.\n\nCharaktere mit dem Talent Diener des Lichts können den Zauber nicht anwenden."
  },
  {
    "name": "Schattenklinge",
    "slug": "schattenklinge",
    "ref": "https://immersieg.de/zauber/schattenklinge.html",
    "zugang": {
      "Zauberer": 8,
      "Schwarzmagier": 7
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "360GM",
    "beschreibung": "Die verzauberte Klinge verströmt rauchartige Schatten voll dunkler Magie.\n\nDie folgenden Effekte gelten nur, wenn ein Charakter mit dem Talent Diener der Dunkelheit die Waffe benutzt: Für die Dauer des Zauberspruchs wird der WB der Waffe um +1 erhöht und ihr Schaden gilt als magisch. Jedesmal, wenn mit der Waffe Schaden verursacht wird, sinkt die Abwehr des Ziels um 1. Dieser Effekt endet, wenn die Zauberdauer abgelaufen ist.\n\nSchattenklinge ist nicht mit Flammenklinge, Frostwaffe, Glühender Glaube oder Waffe des Lichts kombinierbar.\n\nCharaktere mit dem Talent Diener des Lichts können diesen Zauber nicht anwenden."
  },
  {
    "name": "Schattenlanze",
    "slug": "schattenlanze",
    "ref": "https://immersieg.de/zauber/schattenlanze.html",
    "zugang": {
      "Zauberer": 15,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "+5",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 Meter",
    "abklingzeit": "0 Kampfrunden",
    "preis": "595GM",
    "beschreibung": "Dies ist eine mächtigere Variante des Zaubers Schattenpfeil, gegen dessen Schaden Wesen des Lichts einen Malus von 2 auf ihre Abwehr erhalten.\n\nCharaktere mit dem Talent Diener des Lichts können diesen Zauber nicht anwenden."
  },
  {
    "name": "Schattenpfeil",
    "slug": "schattenpfeil",
    "ref": "https://immersieg.de/zauber/schattenpfeil.html",
    "zugang": {
      "Zauberer": 6,
      "Schwarzmagier": 2
    },
    "art": "Zielzauber",
    "zb": "+2",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 Meter",
    "abklingzeit": "0 Kampfrunden",
    "preis": "75GM",
    "beschreibung": "Gegen den Schaden dieses Zielzaubers erhalten Wesen des Lichts einen Malus von 2 auf ihre Abwehr.\n\nCharaktere mit dem Talent Diener des Lichts können diesen Zauber nicht anwenden."
  },
  {
    "name": "Schattensäule",
    "slug": "schattensaeule",
    "ref": "https://immersieg.de/zauber/schattensaeule.html",
    "zugang": {
      "Zauberer": 20,
      "Schwarzmagier": 15
    },
    "art": "Zielzauber",
    "zb": "+8",
    "dauer": "Augenblicklich",
    "distanz": "VE x 10 Meter",
    "abklingzeit": "1 Kampfrunden",
    "preis": "920GM",
    "beschreibung": "Dies ist eine mächtigere Variante des Zaubers Schattenlanze, gegen dessen Schaden Wesen des Lichts ebenfalls einen Malus von 2 auf ihre Abwehr erhalten.\n\nCharaktere mit dem Talent Diener des Lichts können diesen Zauber nicht anwenden.\n\nCharaktere mit dem Talent Vergeltung addieren ihren Talentrang auf den PW der Zielzaubern-Probe Schattensäule."
  },
  {
    "name": "Schleudern",
    "slug": "schleudern",
    "ref": "https://immersieg.de/zauber/schleudern.html",
    "zugang": {
      "Heiler": 16,
      "Zauberer": 12,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "VE/2 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "535GM",
    "beschreibung": "Diese Zauberspruch, gegen den das Ziel keine Abwehr würfeln kann, schleudert das Ziel (Probenergebnis/3) Meter weit fort.\n\nDas Ziel erhält für die Distanz, die es geschleudert wird (auch wenn eine Wand den Flug bremst) Sturzschaden (sh. GRW S. 85), gegen den es ganz normal Abwehr würfelt.\n\nNach dem Fortschleudern liegt das Ziel immer am Boden."
  },
  {
    "name": "Schutzfeld",
    "slug": "schutzfeld",
    "ref": "https://immersieg.de/zauber/schutzfeld.html",
    "zugang": {
      "Heiler": 4,
      "Zauberer": 8,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "115GM",
    "beschreibung": "Ein Schutzfeld mit einem Radius von VE in Metern erscheint um den ZAW herum, an dem nichtmagische Geschosse von außen her wirkungslos abprallen."
  },
  {
    "name": "Schutzkuppel",
    "slug": "schutzkuppel",
    "ref": "https://immersieg.de/zauber/schutzkuppel.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 12,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Konzentration",
    "distanz": "Selbst",
    "abklingzeit": "W20 Tage",
    "preis": "765GM",
    "beschreibung": "Eine Schutzkuppel mit einem Radius von VE in Metern erscheint um den ZAW herum, solange er sich konzentriert (zählt als ganze Aktion).\n\nDie unbewegliche Kuppel ist von beiden Seiten unpassierbar - weder Angriffe, Personen noch Zauber wie Teleport gelangen hindurch."
  },
  {
    "name": "Schutzschild",
    "slug": "schutzschild",
    "ref": "https://immersieg.de/zauber/schutzschild.html",
    "zugang": {
      "Heiler": 4,
      "Zauberer": 8,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "115GM",
    "beschreibung": "Das Ziel erhält das Probenergebnis als Bonus auf seine Abwehr, bis die Dauer des Zaubers abgelaufen ist."
  },
  {
    "name": "Schutzschild dehnen",
    "slug": "schutzschild-dehnen",
    "ref": "https://immersieg.de/zauber/schutzschild-dehnen.html",
    "zugang": {
      "Heiler": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "230GM",
    "beschreibung": "Verdoppelt die erwürfelte Dauer eines Schutzschild-Zaubers, der bereits auf das Ziel wirkt."
  },
  {
    "name": "Schutzschild stärken",
    "slug": "schutzschild-staerken",
    "ref": "https://immersieg.de/zauber/schutzschild-staerken.html",
    "zugang": {
      "Heiler": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "230GM",
    "beschreibung": "Verdoppelt den Bonus auf die Abwehr eines Schutzschild-Zaubers, der bereits auf das Ziel wirkt."
  },
  {
    "name": "Schweben",
    "slug": "schweben",
    "ref": "https://immersieg.de/zauber/schweben.html",
    "zugang": {
      "Heiler": 7,
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "0 Kampfrunden",
    "preis": "210GM",
    "beschreibung": "Das Ziel kann statt zu laufen auch lotrecht hoch und runter schweben.\n\nDer Laufen-Wert beim Schweben ist dabei genau so hoch, wie am Boden (man kann im Schweben nicht rennen)."
  },
  {
    "name": "Schweig",
    "slug": "schweig",
    "ref": "https://immersieg.de/zauber/schweig.html",
    "zugang": {
      "Heiler": 12,
      "Zauberer": 10,
      "Schwarzmagier": 8
    },
    "art": "Zielzauber",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "VE/2 KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "395GM",
    "beschreibung": "Das Ziel, welches keine Abwehr gegen den Zauber würfeln darf, verstummt für die Dauer des Zauberspruchs. Verstummte ZAW können solange nur wortlos zaubern (sh. GRW S. 47)."
  },
  {
    "name": "Segen",
    "slug": "segen",
    "ref": "https://immersieg.de/zauber/segen.html",
    "zugang": {
      "Heiler": 2
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Stunden",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "90GM",
    "beschreibung": "Der ZAW und bis zu VE x 2 Kameraden in VE x 2 Meter Umkreis werden gesegnet.\n\nFür die Dauer des Zauberspruchs erhalten sie auf alle Proben einen PW-Bonus von +1."
  },
  {
    "name": "Skelette erwecken",
    "slug": "skelette-erwecken",
    "ref": "https://immersieg.de/zauber/skelette-erwecken.html",
    "zugang": {
      "Schwarzmagier": 6
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "670GM",
    "beschreibung": "Der Schwarzmagier kann eine maximale Anzahl von Skeletten (sh. GRW S. 122) im Wirkungsradius gleich seiner eigenen Stufe zu untotem Leben erwecken.\n\nDie Skelette benötigen drei Kampfrunden, um sich zu erheben, danach wollen sie ihren Erwecker vernichten, um wieder Erlösung zu finden, gelingt es diesem nicht, sie mit dem Zauber Kontrollieren zu beherrschen.\n\nCharaktere mit dem Talent Diener des Lichts können den Zauber nicht anwenden."
  },
  {
    "name": "Spionage",
    "slug": "spionage",
    "ref": "https://immersieg.de/zauber/spionage.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 6,
      "Schwarzmagier": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE x 2 Kampfrunden",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "205GM",
    "beschreibung": "Der ZAW begibt sich in einen tranceähnlichen Zustand, in dem seine optischen und akustischen Sinne sich von seinem Körper lösen können.\n\nSein unsichtbarer, hörender Blick bewegt sich mit einer konstanten Geschwindigkeit von VE Meter pro Kampfrunde und kann durch die kleinsten Öffnungen dringen. Der ZAW sieht und hört dabei alles, als wäre er selbst vor Ort."
  },
  {
    "name": "Springen",
    "slug": "springen",
    "ref": "https://immersieg.de/zauber/springen.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 2,
      "Schwarzmagier": 3
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Selbst",
    "abklingzeit": "10 Kampfrunden",
    "preis": "60GM",
    "beschreibung": "Der ZAW springt augenblicklich bis zu Probenergebnis/2 Meter weit und landet dabei wieder sicher auf seinen Beinen. Alternativ kann man auch hoch oder runter springen, beispielsweise um einen Balkon zu erreichen."
  },
  {
    "name": "Spurt",
    "slug": "spurt",
    "ref": "https://immersieg.de/zauber/spurt.html",
    "zugang": {
      "Heiler": 7,
      "Zauberer": 7,
      "Schwarzmagier": 7
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "220GM",
    "beschreibung": "Der Laufen-Wert des Ziels wird für die Dauer des Zaubers verdoppelt."
  },
  {
    "name": "Steinwand",
    "slug": "steinwand",
    "ref": "https://immersieg.de/zauber/steinwand.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 14
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Augenblicklich",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Der ZAW erschafft eine Steinwand, die Ausmaße von bis zu 1m x VE m x VE m annehmen kann und nicht wieder verschwindet.\n\nDie Steinwand muss auf festen Boden stehen und kann nicht an einem Ort erscheinen, wo sich bereits etwas befindet.\n\nDie Steinwand hat eine Abwehr gleich der dreifachen Stufe des ZAW, für den Fall, dass jemand sie mit Gewalt durchdringen will. Jeder einzelne Kubikmeter der Steinwand verfügt über LK in Höhe der Stufe des ZAW."
  },
  {
    "name": "Stolpern",
    "slug": "stolpern",
    "ref": "https://immersieg.de/zauber/stolpern.html",
    "zugang": {
      "Zauberer": 4,
      "Schwarzmagier": 3
    },
    "art": "Zielzauber",
    "zb": "-(AGI+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "140GM",
    "beschreibung": "Das Ziel, welches keine Abwehr gegen den Zauber würfeln darf, stürzt augenblicklich zu Boden.\n\nMisslingt ihm außerdem eine Probe auf AGI+GE, lässt er alles Gehaltene fallen."
  },
  {
    "name": "Stossgebet",
    "slug": "stossgebet",
    "ref": "https://immersieg.de/zauber/stossgebet.html",
    "zugang": {
      "Heiler": 5
    },
    "art": "Zaubern",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "150GM",
    "beschreibung": "Eine Druckwelle heiliger Macht schießt aus dem Heiler und bringt Gegner in einem Radius gleich seiner doppelten Stufe in Metern zu Fall."
  },
  {
    "name": "Tanz",
    "slug": "tanz",
    "ref": "https://immersieg.de/zauber/tanz.html",
    "zugang": {
      "Zauberer": 8,
      "Schwarzmagier": 10
    },
    "art": "Zielzauber",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "VE/2 Minuten",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "360GM",
    "beschreibung": "Das Ziel, welches keine Abwehr gegen den Zauber würfeln darf, kann für die Dauer des Zauberspruchs nur tanzen (und dabei höchstens 1m pro Kampfrunde laufen).\n\nDas groteske Schauspiel endet vorzeitig, sollte das Ziel Schaden erhalten."
  },
  {
    "name": "Tarnender Nebel",
    "slug": "tarnender-nebel",
    "ref": "https://immersieg.de/zauber/tarnender-nebel.html",
    "zugang": {
      "Zauberer": 4,
      "Schwarzmagier": 3
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "VE x 2 KR",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "140GM",
    "beschreibung": "Eine Nebelwolke mit einem Radius von maximal VE in Metern entsteht.\n\nAngriffe gegen Ziele in der Nebelwolke werden um 8 erschwert, gleichsam erhalten alle innerhalb des Nebels -8 auf alle Proben, bei denen man besser sehen können sollte.\n\nEine Nebelwolke kann durch Wind bewegt oder gar auseinander geweht werden."
  },
  {
    "name": "Telekinese",
    "slug": "telekinese",
    "ref": "https://immersieg.de/zauber/telekinese.html",
    "zugang": {
      "Zauberer": 6,
      "Schwarzmagier": 6
    },
    "art": "Zielzauber",
    "zb": "-1 pro (Stufe x 5) kg Gewicht",
    "dauer": "Konzentration",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "0 Kampfrunden",
    "preis": "260GM",
    "beschreibung": "Mit diesem Zauber lässt der ZAW einen unbelebten Gegenstand mit einer Geschwindigkeit von 1m pro Kampfrunde schweben, solange er sich ununterbrochen konzentriert (zählt als ganze Aktion)."
  },
  {
    "name": "Teleport",
    "slug": "teleport",
    "ref": "https://immersieg.de/zauber/teleport.html",
    "zugang": {
      "Heiler": 20,
      "Zauberer": 10,
      "Schwarzmagier": 10
    },
    "art": "Zaubern",
    "zb": "-1 pro Begleiter",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Dieser Zauber teleportiert den ZAW und bis zu VE Begleiter an einen ihm bekannten Ort. War der ZAW nur einmal dort und kennt ihn nur flüchtig, wird der PW der Zaubern-Probe halbiert. Bei einem Teleport-Patzer erscheinen die Charaktere in einem Objekt (zu tief im Boden, ein naher Baum) und erhalten W20 nicht abwehrbaren Schaden (2W20, wenn der Ort nur flüchtig bekannt ist)."
  },
  {
    "name": "Terror",
    "slug": "terror",
    "ref": "https://immersieg.de/zauber/terror.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 9,
      "Schwarzmagier": 7
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(GEI+VE)/2 des Ziels",
    "dauer": "VE Minuten",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "300GM",
    "beschreibung": "Bei Erfolg fliehen betroffene Ziele - maximal eine Anzahl gleich der Stufe des ZAW - so schnell wie möglich in panischer Angst und können erst nach Ablauf der Zauberdauer wieder umkehren.\n\nDer Effekt endet bei jedem Fliehenden, der Schaden erleidet."
  },
  {
    "name": "Tierbeherrschung",
    "slug": "tierbeherrschung",
    "ref": "https://immersieg.de/zauber/tierbeherrschung.html",
    "zugang": {
      "Zauberer": 9,
      "Schwarzmagier": 8
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-LK/2 des Ziels",
    "dauer": "VE Stunden",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "410GM",
    "beschreibung": "Bei Erfolg wird das Tier zu einem willenlosen Sklaven des ZAW.\n\nEs befolgt alle seine einsilbigen Befehle, auch wenn diese den eigenen Tod bedeuten können.\n\nEin ZAW kann niemals mehr als VE Tiere gleichzeitig durch diesen Zauber beherrschen.\n\nEndet der Zauber, nimmt das Tier wieder sein ursprüngliches Verhalten an."
  },
  {
    "name": "Tiere besänftigen",
    "slug": "tiere-besaenftigen",
    "ref": "https://immersieg.de/zauber/tiere-besaenftigen.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 7
    },
    "art": "Zaubern",
    "zb": "-LK/5 des Ziels",
    "dauer": "VE Stunden",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "20GM",
    "beschreibung": "Aggressive Tiere im Wirkungsradius können mit diesem Zauber besänftigt werden. Magische Wesen (wie beispielsweise Einhörner oder Unwölfe) sind gegen den Zauber immun, ebenso Tiere, die unter einem Kontrollzauber wie Tierbeherrschung o.ä. stehen."
  },
  {
    "name": "Totengespräch",
    "slug": "totengespraech",
    "ref": "https://immersieg.de/zauber/totengespraech.html",
    "zugang": {
      "Schwarzmagier": 9
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Fragen bzw. VE Minuten",
    "distanz": "Berühren",
    "abklingzeit": "W20 Tage",
    "preis": "1590GM",
    "beschreibung": "Der ZAW kann den Geist eines Toten befragen, dieser muss ihm antworten, allerdings nicht automatisch wahrheitsgemäß.\n\nMaximal wirkt der Zauber VE Minuten oder bis dem Geist VE Fragen gestellt wurden, die dieser nur mit \"Ja\" oder \"Nein\" beantwortet. Der Geist versteht die Sprache des ZAW und antwortet in dieser."
  },
  {
    "name": "Trugbild",
    "slug": "trugbild",
    "ref": "https://immersieg.de/zauber/trugbild.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 7
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-2",
    "dauer": "VE/2 Stunden",
    "distanz": "VE Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "210GM",
    "beschreibung": "Dieser Zauber erschafft eine rein optische, unbewegliche Illusion, deren Ausmaße maximal VE/2 Kubikmeter betragen können. Die Illusion ist mit einer erfolgreichen Bemerken-Probe (sh. GRW S. 89) - abzüglich des halbierten Probenergebnisses der Trugbild Zaubern-Probe - durchschaubar."
  },
  {
    "name": "Unsichtbares Sehen",
    "slug": "unsichtbares-sehen",
    "ref": "https://immersieg.de/zauber/unsichtbares-sehen.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 12,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "325GM",
    "beschreibung": "Das Ziel erhält für die Dauer des Zauberspruchs die Fähigkeit, unsichtbare Objekte und Lebewesen ganz normal erkennen zu können.\n\nMagie, magische Effekte - bis auf den Zauberspruch Unsichtbarkeit - oder auch verborgene Fallen gelten nicht als unsichtbar in Bezug auf diesen Zauberspruch."
  },
  {
    "name": "Unsichtbarkeit",
    "slug": "unsichtbarkeit",
    "ref": "https://immersieg.de/zauber/unsichtbarkeit.html",
    "zugang": {
      "Heiler": 20,
      "Zauberer": 12,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in Minuten",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "1120GM",
    "beschreibung": "Macht ein Lebewesen (samt seiner getragenen Ausrüstung) oder ein Objekt für die Dauer des Zauberspruchs unsichtbar.\n\nDer Zauberspruch endet vorzeitig, wenn das Ziel jemanden angreift, zaubert oder selbst Schaden erhält."
  },
  {
    "name": "Verborgenes sehen",
    "slug": "verborgenes-sehen",
    "ref": "https://immersieg.de/zauber/verborgenes-sehen.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 8,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "Radius von VE x 2 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "510GM",
    "beschreibung": "Der ZAW kann unbelebte Dinge - die verborgen oder absichtlich versteckt sind (Fallen, Geheimtüren u.ä.) - mit Hilfe dieses Zaubers für kurze Zeit aufleuchten sehen, selbst wenn sie durch etwas verdeckt sind, wie ein Vorhang oder ein Behältnis.\n\nDer Zauber funktioniert nicht bei magischen oder unsichtbaren Objekten."
  },
  {
    "name": "Verdampfen",
    "slug": "verdampfen",
    "ref": "https://immersieg.de/zauber/verdampfen.html",
    "zugang": {
      "Zauberer": 20,
      "Schwarzmagier": 18
    },
    "art": "Zielzauber",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "VE Meter",
    "abklingzeit": "24 Stunden",
    "preis": "1920GM",
    "beschreibung": "Das Ziel beginnt vor magischer Hitze regelrecht zu verdampfen.\n\nDer innerlich wirkende Schaden entspricht dem dreifachen Probenergebnis, das Ziel würfelt seine Abwehr ohne die Panzerungsboni von seinen Gegenständen.\n\nDer Zauber ist gegen wasserlose Wesen - wie beispielsweise Skelette oder Feuerelementare - nicht einsetzbar."
  },
  {
    "name": "Vergrössern",
    "slug": "vergroessern",
    "ref": "https://immersieg.de/zauber/vergroessern.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "Probenergebnis/2 in KR",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Die Körpergröße des freiwilligen Ziels - samt seiner Ausrüstung - verdoppelt sich augenblicklich. Charaktere nehmen die Größenkategorie \"groß\" (sh. GRW S. 104) an.\n\nFür die Dauer des Zauberspruchs werden KÖR, ST und HÄ sowie Laufen verdoppelt."
  },
  {
    "name": "Verkleinern",
    "slug": "verkleinern",
    "ref": "https://immersieg.de/zauber/verkleinern.html",
    "zugang": {
      "Zauberer": 10,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "Probenergebnis in Minuten",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "920GM",
    "beschreibung": "Das freiwillige Ziel - samt seiner Ausrüstung - wird auf ein Zehntel seiner Körpergröße verkleinert.Charaktere nehmen die Größenkategorie \"winzig\" (sh. GRW S. 104) an.\n\nFür die Dauer des Zauberspruchs werden KÖR, ST und HÄ halbiert und Laufen durch 10 geteilt."
  },
  {
    "name": "Verlangsamen",
    "slug": "verlangsamen",
    "ref": "https://immersieg.de/zauber/verlangsamen.html",
    "zugang": {
      "Heiler": 3,
      "Zauberer": 8,
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "VE KR",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "80GM",
    "beschreibung": "Dieser Zauber halbiert den Laufen-Wert von einer maximalen Anzahl von Zielen gleich der halbierten Stufe des ZAW."
  },
  {
    "name": "Versetzen",
    "slug": "versetzen",
    "ref": "https://immersieg.de/zauber/versetzen.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 6,
      "Schwarzmagier": 6
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "10 Kampfrunden",
    "preis": "260GM",
    "beschreibung": "Das einwilligende Ziel wird bis zu Probenergebnis/2 Meter weit teleportiert, eine klare Sichtlinie vorausgesetzt.\n\nReicht die ermittelte Entfernung nicht aus, um den Zielpunkt zu erreichen, wird der Charakter dennoch - so weit wie möglich - in dessen Richtung versetzt."
  },
  {
    "name": "Versetzte Stimme",
    "slug": "versetzte-stimme",
    "ref": "https://immersieg.de/zauber/versetzte-stimme.html",
    "zugang": {
      "Zauberer": 2,
      "Schwarzmagier": 3
    },
    "art": "Zaubern",
    "zb": "-1 pro 10 Meter Entfernung",
    "dauer": "VE x 2 KR",
    "distanz": "Selbst",
    "abklingzeit": "100 Kampfrunden",
    "preis": "60GM",
    "beschreibung": "Der ZAW kann das von ihm Gesagte an einen bis zu VE x 10 Meter entfernten Punkt verlagern (eine klare Sichtlinie vorausgesetzt).\n\nDieser Punkt kann eine freie Stelle im Raum sein oder auch ein Kleidungsstück einer Person.\n\nJeder in Hörweite dieses Punktes kann den ZAW hören."
  },
  {
    "name": "Verteidigung",
    "slug": "verteidigung",
    "ref": "https://immersieg.de/zauber/verteidigung.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 4,
      "Schwarzmagier": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "1 KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "0 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Das Ziel erhält das Probenergebnis als Bonus auf seine Abwehr, bis der ZAW in der nächsten Kampfrunde wieder an der Reihe ist."
  },
  {
    "name": "Vertreiben",
    "slug": "vertreiben",
    "ref": "https://immersieg.de/zauber/vertreiben.html",
    "zugang": {
      "Heiler": 1
    },
    "art": "Zaubern",
    "zb": "-(KÖR+AU)/2 des Ziels",
    "dauer": "Probenergebnis/2 Minuten",
    "distanz": "Radius von VE x 2 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Vertreibt eine Anzahl von Untoten im Wirkungsbereich gleich der halbierten Stufe des ZAW.\n\nFür die Dauer der Vertreibung ziehen sich die Untoten so schnell wie möglich von dem ZAW zurück bis auf eine Distanz von Probenergebnis x 5m.\n\nBis zum Ablauf des Zaubers können die Untoten niemanden in seinem Wirkungsbereich angreifen.\n\nDer Effekt endet bei jedem Untoten, der Schaden erleidet.\n\nBei zu vielen Untoten entscheidet der Zufall, welche betroffen sind. Alternativ kann auch ein bestimmter Untoter als Ziel der Vertreibung bestimmt werden.\n\nWird beim Vertreiben ein Immersieg gewürfelt, erhalten die betroffenen Untoten zusätzlichen abwehrbaren Schaden in der tatsächlichen Höhe des Immersiegs."
  },
  {
    "name": "Verwandlung",
    "slug": "verwandlung",
    "ref": "https://immersieg.de/zauber/verwandlung.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 10
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-2",
    "dauer": "Probenergebnis/2 in Stunden",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "420GM",
    "beschreibung": "Der ZAW nimmt das Aussehen einer anderen Person an, die seinem Volk angehören und gleichen Geschlechts sein muss.\n\nHandelt es sich um eine bestimmte Person, die der Charakter jedoch nur flüchtig oder aus der Ferne kennt, können ihm Fehler unterlaufen, wodurch Bekannte der Zielperson mit einer Bemerken-Probe den Zauber durchschauen können.\n\nUntote Wesen u.ä. kann man mit diesem rein optischen Effekt nicht täuschen."
  },
  {
    "name": "Verwirren",
    "slug": "verwirren",
    "ref": "https://immersieg.de/zauber/verwirren.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "geistesbeeinflussende Zauber",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "Probenergebnis in KR",
    "distanz": "Radius von VE x 2 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "210GM",
    "beschreibung": "Dieser Zauberspruch verwirrt bei Erfolg das Ziel, dessen Handeln für die gesamte Zauberdauer auf folgender Tabelle jede Kampfrunde neu ermittelt wird:\n\nW20\n\n1-5 Der Verwirrte greift seine Gegner an.\n\n6-10 Der Verwirrte läuft verwirrt in eine zuf. Richtung.\n\n11-15 Der Verwirrte steht verwirrt herum.\n\n16+ Der Verwirrte greift seine eigenen Verbündeten an."
  },
  {
    "name": "Volksgestalt",
    "slug": "volksgestalt",
    "ref": "https://immersieg.de/zauber/volksgestalt.html",
    "zugang": {
      "Zauberer": 5,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "Probenergebnis in Stunden",
    "distanz": "VE Meter",
    "abklingzeit": "24 Stunden",
    "preis": "420GM",
    "beschreibung": "Bis zu VE einwilligende, humanoide Ziele (zu denen natürlich auch der ZAW selbst gehören kann) in Reichweite werden in die Gestalt eines anderen humanoiden Volkes der gleichen Größenkategorie (sh. GRW S. 104) verwandelt (nicht jedoch seine Ausrüstung).\n\nBeispielsweise könnte man einen Menschen in einen Ork oder sogar in einen uralten Zwerg verwandeln.\n\nDer Charakter behält dabei all seine Fähigkeiten und erhält umgekehrt auch keine Fähigkeiten des Volkes, in das er verwandelt wurde.\n\nWährend die Stimme sich dem neuen Volk anpasst, erinnern Augen und Gesichtszüge weiterhin an die eigentliche Gestalt des verwandelten Charakters."
  },
  {
    "name": "Wächter",
    "slug": "waechter",
    "ref": "https://immersieg.de/zauber/waechter.html",
    "zugang": {
      "Heiler": 4,
      "Zauberer": 6,
      "Schwarzmagier": 5
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Stunden",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "230GM",
    "beschreibung": "Ein magischer Wächter alarmiert bzw. weckt den ZAW, sobald ein Wesen sich bis auf VE x 2 Meter oder weniger dem Zielpunkt nähert.\n\nDies gilt nicht für Wesen, die sich während des Zaubervorgangs bereits in diesem Bereich aufhielten."
  },
  {
    "name": "Waffe des Lichts",
    "slug": "waffe-des-lichts",
    "ref": "https://immersieg.de/zauber/waffe-des-lichts.html",
    "zugang": {
      "Heiler": 7,
      "Zauberer": 8
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "220GM",
    "beschreibung": "Die anvisierte Waffe erstrahlt mit der heiligen Kraft des Lichts.\n\nDie folgenden Effekte gelten nur, wenn ein Charakter mit dem Talent Diener des Lichts die Waffe benutzt: Für die Dauer des Zauberspruchs wird der WB der Waffe um +1 erhöht und ihr Schaden gilt als magisch.\n\nJedesmal, wenn mit der Waffe Schaden verursacht wird, erhöht sich die Abwehr des Waffenträgers um 1.\n\nDieser Effekt endet, wenn die Zauberdauer abgelaufen ist oder der Charakter die Waffe fallen lässt.\n\nWaffe des Lichts kann man nicht mit Flammenklinge, Frostwaffe oder Schattenklinge kombinieren.\n\nCharaktere mit dem Talent Diener der Dunkelheit können diesen Zauber nicht anwenden."
  },
  {
    "name": "Wahnsinn",
    "slug": "wahnsinn",
    "ref": "https://immersieg.de/zauber/wahnsinn.html",
    "zugang": {
      "Schwarzmagier": 15
    },
    "art": "Zaubern",
    "zb": "-(GEI+AU)/2 des Ziels",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "W20 Tage",
    "preis": "2760GM",
    "beschreibung": "Das Ziel des Zaubers wird auf der Stelle wahnsinnig und zu einem sabbernden Schwachsinnigen, dessen Geist fortan auf 0 gesenkt ist.\n\nNur der Zauberspruch Allheilung kann diesen Effekt bannen, wofür pro wiederherzustellenden Punkt in GEI der Spruch jeweils einmal auf das Ziel angewendet werden muss."
  },
  {
    "name": "Wandöffnung",
    "slug": "wandoeffnung",
    "ref": "https://immersieg.de/zauber/wandoeffnung.html",
    "zugang": {
      "Zauberer": 6,
      "Schwarzmagier": 14
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis/2 KR",
    "distanz": "Berühren",
    "abklingzeit": "100 Kampfrunden",
    "preis": "260GM",
    "beschreibung": "Der ZAW öffnet ein kreisrundes Loch von 1m Durchmesser in einer bis zu VE x 10 cm dicken, nichtmagischen Wand.\n\nNach Ablauf des Zaubers verschwindet das Loch ohne Spuren zu hinterlassen."
  },
  {
    "name": "Wasser teilen",
    "slug": "wasser-teilen",
    "ref": "https://immersieg.de/zauber/wasser-teilen.html",
    "zugang": {
      "Heiler": 12
    },
    "art": "Zielzauber",
    "zb": "+0",
    "dauer": "Konzentration",
    "distanz": "Berühren",
    "abklingzeit": "W20 Tage",
    "preis": "1185GM",
    "beschreibung": "Der ZAW kann jegliche Gewässer teilen und eine 1m breite Schneise bis zum Grund in sie schlagen, ihre Länge einzig und allein begrenzt durch den Entfernungsmalus auf Zielzauber (sh. GRW S. 43).\n\nWird der Zauber gegen flüssige Wesen wie beispielsweise Wasserlementare eingesetzt, entspricht das Wurfergebnis nicht abwehrbarem Schaden, während die Zauberdauer nur noch augenblicklich ist."
  },
  {
    "name": "Wasser weihen",
    "slug": "wasser-weihen",
    "ref": "https://immersieg.de/zauber/wasser-weihen.html",
    "zugang": {
      "Heiler": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Stunden",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "20GM",
    "beschreibung": "Berührtes, reines Wasser wird zu heiligem Weihwasser (sh. GRW S. 75). Bei jeder Anwendung des Zaubers stellt der Heiler eine Anzahl an Weihwassereinheiten (etwa 1/2 Liter) gleich dem halbierten Probenergebnis her, genügend \"normales\" Wasser als Rohstoff vorausgesetzt."
  },
  {
    "name": "Wasserwandeln",
    "slug": "wasserwandeln",
    "ref": "https://immersieg.de/zauber/wasserwandeln.html",
    "zugang": {
      "Heiler": 5,
      "Zauberer": 9,
      "Schwarzmagier": 9
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "VE Stunden",
    "distanz": "Berühren",
    "abklingzeit": "0 Kampfrunden",
    "preis": "150GM",
    "beschreibung": "Das Ziel des Zaubers kann eine Anzahl von Runden gleich dem Probenergebnis auf Wasser laufen, als befände es sich an Land."
  },
  {
    "name": "Wechselzauber",
    "slug": "wechselzauber",
    "ref": "https://immersieg.de/zauber/wechselzauber.html",
    "zugang": {
      "Heiler": 12,
      "Zauberer": 10,
      "Schwarzmagier": 12
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "790GM",
    "beschreibung": "Präpariert einen Zauberspruch des ZAW, um einmalig aktionsfrei zu diesem zu wechseln."
  },
  {
    "name": "Wiederbelebung",
    "slug": "wiederbelebung",
    "ref": "https://immersieg.de/zauber/wiederbelebung.html",
    "zugang": {
      "Heiler": 10
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Berühren",
    "abklingzeit": "24 Stunden",
    "preis": "650GM",
    "beschreibung": "Dieser Zauber belebt einen Charakter, der nicht eines natürlichen Todes starb, wieder zum Leben mit 1LK.\n\nDas Ziel darf höchstens seit W20 Tagen tot sein und verliert bei der Wiederbelebung permanent 1 Punkt KÖR (sh. GRW S. 42).\n\nCharaktere mit KÖR 1 können folglich also nicht mehr mit Hilfe dieses Zauberspruchs wiederbelebt bleiben.\n\nZu beachten ist, dass dieser Zauber keine besonderen Verletzungen heilt - beispielsweise sollte ein aufgeschlitzte Kehle oder ein zerstampfter Körper vor der Wiederbelebung mit dem Zauber Allheilung behandelt werden, um ein erneutes Ableben gleich nach der Wiederbelebung zu verhindern."
  },
  {
    "name": "Wolke der Reue",
    "slug": "wolke-der-reue",
    "ref": "https://immersieg.de/zauber/wolke-der-reue.html",
    "zugang": {
      "Heiler": 1,
      "Zauberer": 6
    },
    "art": "Zaubern",
    "zb": "-2",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Eine unsichtbare Wolke der Reue mit einem Radius von maximal VE in Metern entsteht.\n\nJeder Charakter innerhalb der Wolke empfindet ein unterschwelliges Schuldgefühl, wirkt leicht verunsichert und erhält dadurch -1 auf alle Proben.\n\nEine Wolke kann durch Wind bewegt oder gar auseinander geweht werden."
  },
  {
    "name": "Wolke des Todes",
    "slug": "wolke-des-todes",
    "ref": "https://immersieg.de/zauber/wolke-des-todes.html",
    "zugang": {
      "Schwarzmagier": 13
    },
    "art": "Zaubern",
    "zb": "-4",
    "dauer": "Probenergebnis x 2 KR",
    "distanz": "VE x 5 Meter",
    "abklingzeit": "100 Kampfrunden",
    "preis": "790GM",
    "beschreibung": "Eine schwarze, qualmende Wolke des Todes mit einem Radius von maximal VE in Metern entsteht.\n\nZwar ist die Wolke nicht undurchsichtig, dennoch werden Angriffe gegen Ziele darin um 2 erschwert, gleichsam erhalten alle innerhalb der Wolke -2 auf alle Proben, bei denen man besser sehen können sollte.\n\nJeder Charakter innerhalb der Wolke erleidet pro Runde automatisch einen nicht abwehrbaren Punkt Schaden.\n\nSollte der Schwarzmagier über das Talent Diener der Dunkelheit verfügen, wird sein Talentrang auf den nicht abwehrbaren Schaden, den jedes Opfer pro Kampfrunde erleidet, addiert.\n\nEine Wolke kann durch Wind bewegt oder gar auseinander geweht werden."
  },
  {
    "name": "Zauberabklang",
    "slug": "zauberabklang",
    "ref": "https://immersieg.de/zauber/zauberabklang.html",
    "zugang": {
      "Heiler": 10,
      "Zauberer": 5,
      "Schwarzmagier": 9
    },
    "art": "Zaubern",
    "zb": "-eigene Zugangsstufe für den Spruch",
    "dauer": "Augenblicklich",
    "distanz": "Selbst",
    "abklingzeit": "24 Stunden",
    "preis": "420GM",
    "beschreibung": "Mit diesem Zauber kann versucht werden, die Abklingzeit eines zuvor (innerhalb der letzten VE Kamfprunden) erfolgreich gewirkten Zauberspruchs wieder auf Null zu senken.\n\nMisslingt die Probe, kann man den Zauberabklang bei diesem speziellen Zauberspruch erst wieder versuchen, wenn der ZAW ihn abermals gewirkt hat."
  },
  {
    "name": "Zauberleiter",
    "slug": "zauberleiter",
    "ref": "https://immersieg.de/zauber/zauberleiter.html",
    "zugang": {
      "Heiler": 8,
      "Zauberer": 4,
      "Schwarzmagier": 4
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Konzentration",
    "distanz": "VE Meter",
    "abklingzeit": "24 Stunden",
    "preis": "320GM",
    "beschreibung": "Eine magische Leiter entsteht, die bis zu VE x ZAWtufe Meter hoch sein kann.\n\nDie Leiter steht fest im Raum und benötigt keinen Halt. Sie bleibt, solange der ZAW sich ununterbrochen konzentriert (zählt als ganze Aktion)."
  },
  {
    "name": "Zaubertrick",
    "slug": "zaubertrick",
    "ref": "https://immersieg.de/zauber/zaubertrick.html",
    "zugang": {
      "Zauberer": 1,
      "Schwarzmagier": 1
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Probenergebnis in KR",
    "distanz": "VE x 2 Meter",
    "abklingzeit": "10 Kampfrunden",
    "preis": "10GM",
    "beschreibung": "Dieser Zauberspruch erzeugt kleine, unschädliche Illusionen. Beispielsweise kann der ZAW schwebende Bälle zaubern oder die Illusion eines Kaninchens aus einem Hut ziehen."
  },
  {
    "name": "Zeitstop",
    "slug": "zeitstop",
    "ref": "https://immersieg.de/zauber/zeitstop.html",
    "zugang": {
      "Zauberer": 15,
      "Schwarzmagier": 20
    },
    "art": "Zaubern",
    "zb": "-5",
    "dauer": "Probenergebnis in KR",
    "distanz": "Selbst",
    "abklingzeit": "W20 Tage",
    "preis": "2130GM",
    "beschreibung": "Der ZAW hält die Zeit an, bis die Zauberdauer endet oder er Schaden verursacht bzw. selber erleidet.\n\nAndere Objekte und Lebewesen können nicht bewegt werden - sie sind starr in der Zeit eingefroren."
  },
  {
    "name": "Zombies erwecken",
    "slug": "zombies-erwecken",
    "ref": "https://immersieg.de/zauber/zombies-erwecken.html",
    "zugang": {
      "Schwarzmagier": 8
    },
    "art": "Zaubern",
    "zb": "+0",
    "dauer": "Augenblicklich",
    "distanz": "Radius von VE x 5 Meter",
    "abklingzeit": "24 Stunden",
    "preis": "930GM",
    "beschreibung": "Der Schwarzmagier kann eine maximale Anzahl an Leichen gleich seiner eigenen Stufe im Wirkungsradius zu untotem Leben erwecken.\n\nDie Zombies (sh. GRW S. 125) benötigen drei Kampfrunden, um sich zu erheben, danach wollen sie ihren Erwecker vernichten, um wieder Erlösung zu finden, gelingt es diesem nicht, sie mit dem Zauber Kontrollieren zu beherrschen.\n\nCharaktere mit dem Talent Diener des Lichts können den Zauber nicht anwenden."
  }
];
})(typeof window !== "undefined" ? window : this);
