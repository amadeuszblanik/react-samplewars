# React - Sample Wars
MIT &copy; December 2019

Hello there,
This is my sample of code written in React, Next.JS, SASS, TypeScript and Jest.
If you have any questions, feel free to contact me by mail (amadeusz@blanik.me).

## Heroku
This app is on live on heroku:
https://react-samplewars.herokuapp.com

## Assumptions
A simple game in React (Next.JS) that allows you to fight between two characters or starships from SWAPI (https://swapi.co).
* There's score counter which counts how many wins player and opponent.
* Option to select resources for each player
* Material-UI components (Focused only on TypeScript part).

## Git (GitHub)
There's are pre-commits that's check eslint (with auto-fixes), JEST and Next Build before every commits.
*GitHub only* actions for performing pre-commits check on every commits for NodeJS 10.x and 12.x.

## Api
I used SWAPI (https://swapi.co) that fetch and transform all data during first visit (page: `/index.tsx`). Then data is stored on client side (in `localStorage`) and it's valid for 8 hours. 
 * src/dao/swapi.ts
 * pages/index.tsx
 
## React
Higher-order component (HOC):
 * src/services/withSettings.tsx
 
Class components:
 * src/services/withSettings.tsx (wrapped in HOC)
 * pages/_document.tsx
 * pages/_app.tsx
 
Functional Components:
 * Every elsewhere 🙌🏻
 
## Styled-components 💅
 * src/modules/Game/index.tsx
 * src/components/TopBar/index.tsx
 
## Material-UI
* You will find them in every component! 🤷🏻‍♂️

makeStyles():
 * src/components/Scoreboard/index.tsx

## RxJS
RxJS is used as HOC and Hook just to show my abilities.
Hooks are used in:
 * src/components/SelectKind/index.tsx
 * src/components/Scoreboard/index.tsx

Higher-order-component:
 * src/components/Result/index.tsx
 * src/components/Details/index.tsx
 
BehaviorSubject:
 * src/services/settings.ts

## Jest
* src/components/SelectCharacter/__test__

## Express.JS
* server.js

## How to run
Best with *yarn* and *node 10.16*

### Development
1. Just download it with `git clone`
2. Run `yarn` or `npm install`
3. Run `yarn dev` or `npm run dev`
4. Enjoy 🔥

### Production
1. Just download it with `git clone`
2. Run `yarn` or `npm install`
3. Run `yarn build` or `npm run build`
4. Run `yarn start` or `npm run start`
5. Enjoy 🚀
