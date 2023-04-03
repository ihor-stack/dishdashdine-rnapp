import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';

import rootReducer from './reducer';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

const setupReduxFlipper = <M>(middlewares: M[]) => {
  // @ts-ignore
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());

  return middlewares;
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefault => {
    const defaultMiddlewares = getDefault({
      serializableCheck: {
        ignoredActions: [
          'persist/REGISTER',
          'persist/REHYDRATE',
          'persist/PERSIST',
        ],
      },
    });

    if (__DEV__) {
      return setupReduxFlipper([...defaultMiddlewares]);
    }

    return [...defaultMiddlewares];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppReducerType = typeof rootReducer;
export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppReducerType> = useSelector;

const persistor = persistStore(store);
export {store, persistor};
