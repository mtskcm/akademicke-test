import type { Question } from "../types";

/**
 * Otázky pre predmet „Problémové správanie" (PdF Prešov).
 * Zdroj: ručne písané poznámky (35 otázok) + Moodle screenshoty.
 * Pri rozpore medzi Moodle a poznámkami sú autoritou poznámky.
 *
 * Konkrétne opravy oproti Moodle:
 *  - Q19 (antecedenty): Motivácia a diskriminačný stimul (Moodle označoval „Trest a vyhasínanie" ako nesprávne)
 *  - Q24 (plač v noci): Pozitívne posilnenie, dieťa získa prítomnosť rodiča (Moodle označoval „vynucuje" ako nesprávne)
 *  - Q29 (výhoda soc. príbehov): „b + d" (compound) — nie iba „d"
 */

export const questions: Question[] = [
  {
    id: 1,
    type: "single",
    text: "Čo je pravdivé o alternatívnom správaní?",
    options: [
      "Učí sa vždy po výskyte správania ako reaktívna stratégia",
      "Malo by mať rovnakú funkciu ako problémové správanie",
      "Nemá rovnakú funkciu ako problémové správanie",
    ],
    answer: 1,
  },
  {
    id: 2,
    type: "single",
    text: "Ktorých je 5 funkcií správania?",
    options: [
      "pozornosť, únik, senzorická, nuda, získanie niečoho",
      "zdravotná, únik, pozornosť, senzorická, získanie niečoho",
      "zdravotná, pozornosť, senzorická, hnev, získanie niečoho",
    ],
    answer: 1,
  },
  {
    id: 3,
    type: "single",
    text: "Čo je základom riešenia problémového správania?",
    options: [
      "Naučiť dieťa mať úctu k dospelým",
      "Používanie iba reaktívnych stratégií",
      "Byť proaktívny",
    ],
    answer: 2,
  },
  {
    id: 4,
    type: "single",
    text: "Ak dieťa náhle prejavuje zhoršenie v správaní a problémové správanie sa objavuje aj počas obľúbených aktivít, môže ísť o akú funkciu?",
    options: ["Zdravotnú", "Únik", "Pozornosť", "Senzorickú"],
    answer: 0,
  },
  {
    id: 5,
    type: "single",
    text: "Koľko percent by mali obsahovať naše reaktívne stratégie (čiže to, čo robíme po tom ako správanie vznikne)?",
    options: ["50% (polovica z celkového času)", "10%", "90%"],
    answer: 1,
  },
  {
    id: 6,
    type: "single",
    text: "Striedanie ľahkých a ťažkých úloh môže byť jedna z možných proaktívnych stratégií pri riešení problémového správania s akou funkciou?",
    options: ["Získať niečo", "Pozornosť", "Zdravotná", "Únik"],
    answer: 3,
  },
  {
    id: 7,
    type: "single",
    text: "Čo označuje C v ABC modely správania?",
    options: [
      "Kontingencia (contingency)",
      "Nápravu (correction)",
      "Následok (consequences)",
    ],
    answer: 2,
  },
  {
    id: 8,
    type: "single",
    text: "Čo nám napomáha k správnemu identifikovaniu podnetov v prostredí, ktoré správanie posilňujú?",
    options: [
      "ABC model správania",
      "História učenia nových správaní",
      "Dĺžka problémového správania",
    ],
    answer: 0,
  },
  {
    id: 9,
    type: "single",
    text: "Ak dieťa plače, lebo sa nechce hrať s bábikou, ako alternatívne správanie je vhodné ho učiť:",
    options: [
      "Akceptovať hru aspoň na 5 minút",
      "Povedať „nechcem bábiku\"",
      "Vedieť sa upokojiť seba-relaxačnými aktivitami",
    ],
    answer: 1,
  },
  {
    id: 10,
    type: "single",
    text: "Na čo je dôležité myslieť pri výbere alternatívneho a žiadúceho správania?",
    options: [
      "Ich topografia by mala byť ľahšia ako je aktuálne problémové správanie",
      "Nedá sa učiť oboje naraz",
      "Alternatívne správanie sa dá učiť ako proaktívna stratégia pred výskytom správania, ale žiadúce správanie sa učí až po výskyte problémového správania",
    ],
    answer: 0,
  },
  {
    id: 11,
    type: "single",
    text: "Ak dieťa prejaví problémové správanie pri požiadavke, pravdepodobná funkcia správania je:",
    options: ["Únik", "Neposlušnosť", "Lenivosť"],
    answer: 0,
  },
  {
    id: 12,
    type: "single",
    text: "K čomu vedú Sociálne príbehy dopomôcť?",
    options: [
      "Prečo sa ľudia správajú tak ako sa správajú",
      "Pochopiť svojím vlastným pocitom",
      "Oboznámiť sa so zmenami",
      "Všetky odpovede sú správne",
      "Iba a + c je správne",
    ],
    answer: 1,
    note: "⚠️ Formulácia odpovede je podľa ručne písaných poznámok — pôvodne v Moodle bola študentkina voľba „b\" označená ako nesprávna. Možný správny zámer je „Pochopiť situácie a pocity iných\" — overiť so smernicou.",
  },
  {
    id: 13,
    type: "single",
    text: "Ak chce dospelý znížiť problémové správanie a určiť efektívne alternatívne alebo žiaduce správanie, čo by sa mal sám seba spýtať?",
    options: [
      "Koľko času na to mám?",
      "Chcem, aby dieťa rozkazovalo mne alebo ja jemu?",
      "Čo chcem, aby dieťa robilo namiesto problémového správania?",
    ],
    answer: 2,
  },
  {
    id: 14,
    type: "single",
    text: "Kedy učiť žiaduce správanie?",
    options: [
      "Ak o tom rozhodne učiteľ",
      "Ak sa alternatívne správanie nedá učiť",
      "Ak o tom rozhodne rodič",
    ],
    answer: 1,
  },
  {
    id: 15,
    type: "single",
    text: "Čo je súčasťou behaviorálneho plánu riešenia problémového správania?",
    options: [
      "Proaktívne stratégie",
      "Reaktívne stratégie",
      "Učenie alternatívneho a žiaduceho správania",
      "Všetky odpovede sú správne",
      "Iba proaktívne a reaktívne stratégie",
    ],
    answer: 3,
  },
  {
    id: 16,
    type: "truefalse",
    text: "Problémové správanie sa často vyskytuje z dôsledku limitovaných zručností.",
    answer: true,
  },
  {
    id: 17,
    type: "single",
    text: "Vnútorné správania:",
    options: [
      "Neexistujú, iba tie vonkajšie, ktoré vieme merať a pozorovať",
      "Vie merať a pozorovať iba samotný človek",
      "Vie byť viditeľné, pozorovateľné a merateľné iným človekom",
    ],
    answer: 1,
  },
  {
    id: 18,
    type: "single",
    text: "V ktorom z nasledujúcich príkladov ide o úplatkárstvo?",
    options: [
      "Rodič povie dcére, že za dobrú známku pôjdu cez víkend na výlet",
      "Rodič zoberie synovi, ktorý plače, mobil a vráti mu ho hneď ako sa ukľudní",
      "Učiteľ povie žiakovi, že môže sedieť na svojom obľúbenom mieste, hneď po tom ako žiak začne vrieskať, že nechce sedieť na hodine",
    ],
    answer: 2,
  },
  {
    id: 19,
    type: "single",
    text: "Ktoré z nasledujúcich patria medzi antecedenty správania?",
    options: [
      "Motivácia a diskriminačný stimul",
      "Posilnenie a motivácia",
      "Trest a vyhasínanie",
    ],
    answer: 0,
  },
  {
    id: 20,
    type: "single",
    text: "Dieťa plače v noci vo svojej postieľke. Rodičia k nemu stále prídu, aby ho upokojili. Dieťa teraz v noci plače častejšie. O aké posilnenie ide, ak sa pozeráme na správanie dieťaťa — plač?",
    options: [
      "Pozitívne posilnenie, lebo dieťa získa prítomnosť rodiča",
      "Negatívne posilnenie, lebo správanie sa opakuje",
      "Negatívne posilnenie, lebo nie je dobré ak rodič chodí k postieľke dieťaťa a utišuje ho",
      "Pozitívne posilnenie, lebo si tým dieťa vynucuje, že nechce byť samo",
    ],
    answer: 0,
  },
  {
    id: 21,
    type: "single",
    text: "Ak dospelý používa vyhasínanie ako reaktívnu stratégiu, s čím musí rátať?",
    options: [
      "Že nastane výbuch pri vyhasínaní, ktorý dočasne zvýši frekvenciu, intenzitu a dĺžku správania",
      "Že nastane výbuch pri vyhasínaní, ktorý ihneď zníži frekvenciu, intenzitu a dĺžku správania",
      "Že nastane výbuch pri vyhasínaní, ktorý natrvalo zvýši frekvenciu, intenzitu a dĺžku správania",
    ],
    answer: 0,
  },
  {
    id: 22,
    type: "single",
    text: "Pri správaní je dôležité nielen ho opísať z hľadiska topografie, ale aj…",
    options: [
      "Z hľadiska jeho funkcie",
      "Spýtať sa dieťaťa, prečo správanie vykonáva",
      "Správanie pozorovať z hľadiska jeho pôsobenia na psychiku dieťaťa",
    ],
    answer: 0,
  },
  {
    id: 23,
    type: "truefalse",
    text: "Je dobré, ak sa v rámci funkčného behaviorálneho hodnotenia pozeráme aj na to, kedy (v akých situáciách) sa správanie NEvyskytuje.",
    answer: true,
  },
  {
    id: 24,
    type: "single",
    text: "Ktorá je najčastejšia chyba pri používaní Sociálnych príbehov?",
    options: [
      "Že sú používané ako reaktívna stratégia na korekciu správania",
      "Že ich deti nevedia prečítať",
      "Že sú často veľmi krátke",
    ],
    answer: 0,
  },
  {
    id: 25,
    type: "single",
    text: "Ak dieťa prejavuje problémové správanie, ak mu je daná požiadavka, aby niečo urobilo, môže ísť o akú funkciu?",
    options: ["Získať niečo", "Senzorickú", "Únik", "Pozornosť"],
    answer: 2,
  },
  {
    id: 26,
    type: "single",
    text: "Čo je potrebné pri písaní Sociálnych príbehov?",
    options: [
      "Písať v druhej osobe ako príkaz, čo majú deti robiť",
      "Písať ho z pozitívneho hľadiska a nevhodné správanie zmierniť len opatrne",
      "Sústrediť sa na problémové správanie a dôkladne ho popísať",
    ],
    answer: 1,
  },
  {
    id: 27,
    type: "single",
    text: "Čo je základom modifikácie správania?",
    options: [
      "Pozorovať a merať pocity detí",
      "Merať správanie určené na zmenu",
      "Zmeniť správanie tak, ako si to predstavuje učiteľ",
    ],
    answer: 1,
  },
  {
    id: 28,
    type: "single",
    text: "Môžeme označiť sebastimulačné správanie ako problémové správanie?",
    options: [
      "Nie, sebastimulačné správanie je prirodzené každému človeku a nie je potrebné ho odstraňovať",
      "Iba ak bráni osobe vo vzdelávaní a socializácii",
      "Áno vždy, lebo je to správanie, ktoré je nefunkčné a neslúži k ničomu",
    ],
    answer: 1,
  },
  {
    id: 29,
    type: "single",
    text: "Aká je výhoda sociálnych príbehov?",
    options: [
      "Vedia ich vytvoriť aj samotné deti s autizmom",
      "Popis Sociálnych príbehov je voľne dostupný pre všetkých",
      "Veľmi rýchlo vedia odstrániť problémové správanie",
      "Dajú sa využiť v prirodzených podmienkach dieťaťa",
      "b + d (Popis sociálnych príbehov je voľne dostupný + Dajú sa využiť v prirodzených podmienkach dieťaťa)",
      "b + c + d",
    ],
    answer: 4,
  },
  {
    id: 30,
    type: "single",
    text: "Ak dieťa plače, lebo chce hračku, ktorú má iné dieťa, a preto ju mať nemôže, ako žiaduce správanie je vhodné učiť:",
    options: [
      "Akceptáciu „Nie\"",
      "Vedieť si to pekne vypýtať",
      "Vedieť za hračkou počkať",
      "Iba a + b",
      "Iba a + c",
      "Všetky sú vhodné formy žiadúceho",
    ],
    answer: 2,
  },
  {
    id: 31,
    type: "single",
    text: "V akej podobe sa objavujú Sociálne príbehy?",
    options: [
      "Vo forme rozprávania a knižnej",
      "Vo vizuálnej a hranej",
      "V textovej a vizuálnej",
    ],
    answer: 2,
  },
  {
    id: 32,
    type: "single",
    text: "Čo je cieľom pri riešení problémového správania?",
    options: [
      "Naučiť dieťa spoločensky prijateľné správanie",
      "Naučiť dieťa ako poslúchať",
      "Prispôsobiť prostredie dieťaťu",
    ],
    answer: 0,
  },
  {
    id: 33,
    type: "single",
    text: "Ak dieťa prejavuje problémové správanie vždy, keď sa dospelý venuje iným, môže ísť o akú funkciu?",
    options: ["Únik", "Pozornosť", "Získať niečo", "Senzorickú"],
    answer: 1,
  },
  {
    id: 34,
    type: "single",
    text: "Čo môže byť súčasťou funkčného hodnotenia správania?",
    options: [
      "Rozhovor a pozorovanie dieťaťa",
      "Aplikácia trestu v prípade veľmi závažného problémového správania",
      "Nastavenie medikamentóznej liečby",
    ],
    answer: 0,
  },
  {
    id: 35,
    type: "single",
    text: "Kedy je vhodné používať Sociálne príbehy?",
    options: [
      "Hneď po výskyte problémového správania, aby sme dieťaťu vysvetlili, ako sa má nabudúce správať",
      "Na hodinách Slovenského jazyka",
      "V rámci preventívnych aktivít s cieľom naučiť dieťa funkčným zručnostiam",
    ],
    answer: 2,
  },
];
