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
