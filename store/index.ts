import {combineReducers, configureStore, createListenerMiddleware} from '@reduxjs/toolkit';

import jokesReducer from '@/store/reducers/JokesSlice';

const rootReducer = combineReducers({
  jokesReducer,
});

const listenerMiddleware = createListenerMiddleware();

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
