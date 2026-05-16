import type { SubjectId } from "./types";

/**
 * Duplicitné otázky — rovnaký koncept sa v podkladoch vyskytuje viackrát.
 * Pre režimy, ktoré vyberajú podmnožinu (skúškový), chceme aby sa rovnaká
 * otázka v jednom teste neobjavila dva razy. Mapa je per-subject — IDs sú
 * stabilné v rámci jedného predmetu.
 */
const DUPLICATE_GROUPS: Record<SubjectId, ReadonlyArray<ReadonlyArray<number>>> = {
  akademicke: [
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
  ],
  spravanie: [
    [11, 25], // „Pri požiadavke → Únik" — dve rôzne formulácie tej istej otázky
  ],
  patopsychologia: [
    [18, 25], // „Porucha správania je" — dve verzie tej istej otázky (3 vs 2 správne)
    [12, 28], // pamäť/pozornosť triedenie informácií (multi-choice vs T/F variant)
  ],
};

const groupMaps = new Map<SubjectId, Map<number, string>>();

const buildMap = (subjectId: SubjectId): Map<number, string> => {
  const m = new Map<number, string>();
  const groups = DUPLICATE_GROUPS[subjectId] ?? [];
  groups.forEach((group, idx) => {
    const key = `${subjectId}-dup-${idx}`;
    for (const id of group) m.set(id, key);
  });
  return m;
};

const mapFor = (subjectId: SubjectId): Map<number, string> => {
  let m = groupMaps.get(subjectId);
  if (!m) {
    m = buildMap(subjectId);
    groupMaps.set(subjectId, m);
  }
  return m;
};

export const groupKeyForQuestion = (subjectId: SubjectId, id: number): string =>
  mapFor(subjectId).get(id) ?? `${subjectId}-solo-${id}`;
