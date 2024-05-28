import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import balanceReducer from './balanceSlice';
import resultsRouletteReducer from './resultsRouletteSlice';
import resultsWheelReducer from './resultWheelSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['balance', 'resultsRoulette', 'resultsWheel'],
};

const rootReducer = combineReducers({
  balance: balanceReducer,
  resultsRoulette: resultsRouletteReducer,
  resultsWheel: resultsWheelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
