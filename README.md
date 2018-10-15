# Redux Flush
> Redux middleware for flushing frequent actions.
> It optimizes the redux based application via reducing re-rendering caused of changed state.

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

The action with `meta.flush = true` will have array-like payload.
So, when you write reducers, please be careful.

__Example with codes__

```js
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createFlush from '../es';

const reducers = combineReducers({
  app: (state = {}, { type, idx, rand }) => {
    // payload will be delivered as a stream
    if (type === 'CLICK_EVENT') {
      return {
        ...state,
        idx: [...state.idx, ...idx],
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
const store = createStore(reducers, { app: { idx: [], rand: [], } }, composeEnhancers(middleware));

{
  let idx = 0;

  document.querySelector('button').addEventListener('click', () => {
    store.dispatch({
      type: 'CLICK_EVENT',
      idx,
      rand: Math.floor(Math.random() * 10) + 1,
      meta: {
        flush: true,
        interval: 1000,
      },
    });

    idx += 1;
  });
}
```
