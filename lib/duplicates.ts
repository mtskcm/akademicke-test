/**
 * Duplicitné otázky — v PDF podkladoch sa rovnaká otázka opakovala viackrát
 * (často s preusporiadanými možnosťami, alebo len ako „(opakovanie)"). Pre
 * režimy, ktoré vyberajú podmnožinu (skúškový), chceme aby sa rovnaká otázka
 * v jednom teste neobjavila dva razy.
 *
 * Každá skupina obsahuje ID otázok, ktoré pýtajú konceptuálne to isté.
 */
const DUPLICATE_GROUPS: ReadonlyArray<ReadonlyArray<number>> = [
  [12, 35], // citačný zápis na článok z časopisu
  [20, 36, 70], // OBERT, V., 2006 — citujeme ako (Obert 2006)
  [18, 38], // nepovinné súčasti bakalárskej práce
  [2, 39, 79], // pri štylizácii abstraktu sa používa
  [10, 42], // tabuľky, grafy a obrázky sa číslujú
  [11, 53], // za relevantný zdroj nemožno považovať
  [44, 55], // text BP sa má písať
  [8, 80], // snowballing
  [64, 87], // usmernenie sa riadi
  [67, 97], // citačný zápis za priamou citáciou
  [28, 74], // autorský vklad
  [22, 85], // doslovne prevzatý text v úvodzovkách = citát
  [7, 75], // vyjadrenia platia pre abstrakt
  [54, 65], // citovať nemusíme (multi vs single)
  [6, 71], // porovnávať teoretické koncepty (T/F)
];

const groupForId = new Map<number, string>();
DUPLICATE_GROUPS.forEach((group, idx) => {
  const key = `dup-${idx}`;
  for (const id of group) {
    groupForId.set(id, key);
  }
});

export const groupKeyForQuestion = (id: number): string =>
  groupForId.get(id) ?? `solo-${id}`;
