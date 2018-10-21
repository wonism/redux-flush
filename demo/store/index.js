import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createFlush from 'es';
import appInitialState from './app/initialState';
import appReducers from './app/reducers';

const reducers = combineReducers({
  app: appReducers,
});

const isProduction = process.env.NODE_ENV === 'production';

const flushMiddleware = createFlush();
const middleware = applyMiddleware(flushMiddleware);
const composeEnhancers = !isProduction ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools : compose;
const store = createStore(reducers, { app: appInitialState }, composeEnhancers(middleware));

export default store;
