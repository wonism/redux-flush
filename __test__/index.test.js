import { applyMiddleware, createStore } from 'redux';
import createFlush from '../es';

const simpleReducer = (state, { type, meta, ...action }) => {
  if (type === 'foo') {
    return {
      ...state,
      ...action,
    };
  }

  return state;
};

describe('Redux Flush', () => {
  it('Output of Middleware', () => {
    const middleware = createFlush();

    expect(typeof middleware).toBe('function');

    const nextHandler = middleware({});

    expect(typeof nextHandler).toBe('function');
    expect(nextHandler.length).toBe(1);

    const actionHandler = nextHandler();

    expect(typeof actionHandler).toBe('function');
    expect(actionHandler.length).toBe(1);
  });

  it('Create an Action without Flushed', async () => {
    const middleware = createFlush();
    const store = createStore(simpleReducer, applyMiddleware(middleware));

    const num = 1;

    await store.dispatch({
      type: 'foo',
      num,
      meta: {
        flush: false,
      },
    });

    expect(store.getState()).toEqual({ num });
  });

  it('Create an Action with Flushed - single payload', async () => {
    const middleware = createFlush();
    const store = createStore(simpleReducer, applyMiddleware(middleware));

    const interval = 10;
    const num = 1;

    const willBeDispatched = {
      type: 'foo',
      num,
      meta: {
        flush: true,
        interval,
      },
    };

    await store.dispatch(willBeDispatched);

    expect(store.getState()).toEqual({ num: [num] });
  });

  it('Create an Action with Flushed - multiple payloads', async () => {
    const middleware = createFlush();
    const store = createStore(simpleReducer, applyMiddleware(middleware));

    const interval = 10;
    const num = 1;
    const str = 'a';

    const willBeDispatched = {
      type: 'foo',
      num,
      str,
      meta: {
        flush: true,
        interval,
      },
    };

    await store.dispatch(willBeDispatched);

    expect(store.getState()).toEqual({ num: [num], str: [str] });
  });

  it('Create an Action with Flushed and omitKey', async () => {
    const middleware = createFlush();
    const store = createStore(simpleReducer, applyMiddleware(middleware));

    const interval = 10;
    const num = 1;

    const willBeDispatched = {
      type: 'foo',
      num,
      meta: {
        flush: true,
        interval,
        omitKey: ['num'],
      },
    };

    await store.dispatch(willBeDispatched);

    expect(store.getState()).toEqual({ num });
  });
});
