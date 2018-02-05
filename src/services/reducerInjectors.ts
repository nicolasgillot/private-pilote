import { IRootState } from 'constants/types';
import createReducer from 'reducers';
import { Reducer } from 'redux';
import { IStore } from 'store';

export function injectReducerFactory(store: IStore) {
  return function injectReducer(key: string, reducer: Reducer<IRootState>) {
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: IStore) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}
