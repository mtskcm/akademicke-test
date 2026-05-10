# Akademický test

Interaktívny test pre študentku PdF Prešov — bakalárska práca: citačná etika, štruktúra, formálne náležitosti. **100 otázok**, 5 rôznych formátov (pravda/nepravda, jedna odpoveď, viac odpovedí, priraďovanie, doplň odpoveď).

## Funkcie

- **Tréningový režim** — okamžitá spätná väzba po každej odpovedi
- **Testový režim** — vyhodnotenie a skóre až na konci
- **Automatické ukladanie progressu** v `localStorage` — refresh / zatvorenie tabu nezničí prácu
- **Mobile-first dizajn** — ide z mobilu rovnako dobre ako z desktopu
- **Filter zlých odpovedí** — po vyhodnotení sa dá precvičovať len na čom sme padli

## Lokálne spustenie

```bash
npm install
npm run dev
```

Otvor [http://localhost:3000](http://localhost:3000).

## Nasadenie na Vercel

### Najrýchlejšia cesta — Vercel CLI

```bash
npx vercel
```

Pri prvom spustení sa prihlásiš (cez GitHub / email), potvrdíš pár otázok (názov projektu, framework auto-detekuje Next.js), a po pár sekundách dostaneš preview URL. Pre produkčný deploy:

```bash
npx vercel --prod
```

Vráti niečo ako `https://akademicke-test.vercel.app` — túto URL pošli priateľke.

### Cez GitHub (auto-deploy pri každom push)

1. `git init && git add . && git commit -m "init"`
2. Vytvor nové repo na GitHube a `git push`
3. Na [vercel.com](https://vercel.com) klikni *Import Project*, vyber to repo, klikni *Deploy*
4. Hotovo — každý budúci push na `main` sa automaticky nasadí

## Štruktúra projektu

```
akademicke-test/
├── app/
│   ├── layout.tsx         # root layout (font, metadata)
│   ├── page.tsx           # úvodná obrazovka — výber režimu
│   ├── test/page.tsx      # test runner (paginovaný)
│   └── globals.css        # Tailwind + farebné tokeny
├── components/
│   ├── QuestionCard.tsx   # dispatcher pre typy otázok
│   ├── types/             # 5 typových komponentov
│   ├── ProgressBar.tsx
│   ├── QuestionGrid.tsx   # mriežka 1..100 s farebnými stavmi
│   └── Results.tsx        # záverečná obrazovka
├── lib/
│   ├── questions.ts       # všetkých 100 otázok
│   ├── types.ts           # Question union type
│   ├── grading.ts         # vyhodnocovanie odpovedí
│   ├── normalize.ts       # porovnanie textu (diakritika, case)
│   └── storage.ts         # localStorage helpers
└── package.json
```

## Otázky na overenie

Pri otázkach označených v UI symbolom **⚠️** je odpoveď doplnená najlepším odhadom (úryvok chýba v podkladoch alebo bola odpoveď v podkladoch nejasná). Konkrétne ide o otázky **24, 45, 55, 93, 98, 99**. Odporúčam priateľke tieto overiť so smernicou PU alebo pedagógom.

## Stack

- **Next.js 15** (App Router) — server-side rendering, automatický kód-splitting
- **React 19**
- **TypeScript** v striktnom režime
- **Tailwind CSS v4** — všetky štýly priamo v JSX, žiadne externé CSS
- **Žiadny backend** — všetko je klientske, žiadna databáza, žiadne API
