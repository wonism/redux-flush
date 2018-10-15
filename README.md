# Redux Flush
> Redux middleware for flushing frequent actions.
> It optimizes the redux based application via reducing re-rendering caused of changed state.

[![npm version](https://badge.fury.io/js/redux-flush.svg)](https://badge.fury.io/js/redux-flush)
[![Build Status](https://travis-ci.org/wonism/redux-flush.svg)](https://travis-ci.org/wonism/redux-flush)

## Installation
```
$ npm i -S redux-flush
```

## Demo
```
$ npm run dev
# and visit localhost:7777
```

## Usage
__⚠ Caution__

Basically, The action with `meta.flush = true` will have array-like payload.
So, when you write reducers, please be **CAREFUL**.

If you want to pass just action payload, you can add `omitKey`. And it **MUST** be array.

__Example__

![Example Image](https://raw.githubusercontent.com/wonism/redux-flush/master/demo/redux-flush.gif)

__Example with codes__

```js
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createFlush from '../es';

const reducers = combineReducers({
  app: (state = {}, { type, num, rand }) => {
    // payload will be delivered as a stream
    if (type === 'CLICK_EVENT') {
      return {
        ...state,
        num,
        rand: [...state.rand, ...rand],
      };
    }

    return state;
  },
});

const isProduction = process.env.NODE_ENV === 'production';

const flushMiddleware = createFlush();
const middleware = applyMiddleware(flushMiddleware);
const composeEnhancers = !isProduction ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools : compose;
const store = createStore(reducers, { app: { num: -1, rand: [], } }, composeEnhancers(middleware));

store.subscribe(() => {
  const state = store.getState();
  const { num, rand } = state.app;

  document.getElementById('number').textContent = num;
  document.getElementById('random').textContent = rand.join(', ');
});

{
  let num = 0;

  document.querySelector('button').addEventListener('click', () => {
    store.dispatch({
      type: 'CLICK_EVENT',
      num,
      rand: Math.floor(Math.random() * 10) + 1,
      meta: {
        flush: true,
        interval: 1000,
        omitKey: ['num'],
      },
    });

    num += 1;
  });
}
```
