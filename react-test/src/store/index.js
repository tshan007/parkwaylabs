import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";

import reducers from './reducer';
import logger from './middleware/logger';
import { watchIngredients } from "./saga";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ingredients'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(logger, thunk, sagaMiddleware))
);

sagaMiddleware.run(watchIngredients);

export const persistor = persistStore(store);

export default store;
