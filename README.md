# Mates per a petits

Aplicació web perquè els infants de primària practiquin matemàtiques amb jocs visuals i adaptats al seu nivell. Tot el text és en català i la interfície és alegre i senzilla.

## Tecnologies
- [Next.js 14](https://nextjs.org/) amb App Router
- React + TypeScript
- Tailwind CSS
- Estat global amb Zustand i emmagatzematge local
- API senzilla amb rutes de Next.js i fitxer JSON per a perfils

## Instal·lació i scripts
```bash
npm install
npm run dev   # entorn de desenvolupament
npm run build # build de producció
npm start     # arrenca el servidor de producció (cal haver fet el build)
npm run lint  # comprova l'estil
```

## Arquitectura
- `app/` pàgines amb App Router. 
  - `page.tsx`: portada
  - `seleccio/`: flux de selecció de curs, operacions i dificultat
  - `joc/[mode]/`: pantalla de joc amb diferents modes
  - `com-funciona/`: guia ràpida
  - `api/profiles/`: API per desar perfils a `data/profiles.json`
- `src/components/`: components d'interfície (selectors, targetes de mode, temporitzador, etc.)
- `src/constants/texts.ts`: text en català centralitzat per poder traduir fàcilment
- `src/lib/`: lògica de configuració i generació de preguntes
  - `gameConfig.ts`: mapatge de rangs per curs/dificultat, modes recomanats i generació de preguntes
  - `questionGenerator.ts`: generació d'operacions, opcions i ID de pregunta
- `src/context/GameContext.tsx`: estat global de configuració i sessió amb persistència a localStorage
- `src/types/game.ts`: tipus compartits

## Afegir nous modes o regles
1. Defineix el text i icona a `src/constants/texts.ts` i opcionalment a `GameModeCard`.
2. A `src/lib/gameConfig.ts`, afegeix el mode a les recomanacions i adapta `generateQuestion` si necessita regles específiques.
3. Amplia `QuestionArea` a `app/joc/[mode]/page.tsx` per tractar el nou mode (per exemple, ronda ràpida amb temporitzador global).
4. Actualitza `gameConfig` amb nous rangs o operacions per cada curs i dificultat.

## Estil i accessibilitat
- Colors suaus i gradients (`candyPink`, `skySplash`, `sunny`, `minty`).
- Targetes i botons arrodonits, tipografia gran i espaiada.
- Temporitzador visual per al mode cronometrat.
- Feedback immediat en verd/vermell amb emoticones.

## Notes de backend
- L'API escriu en un fitxer JSON dins `data/profiles.json`. En entorns sense permís d'escriptura es pot substituir per memòria.
- No hi ha autenticació; pensat per ser ampliable en el futur.
