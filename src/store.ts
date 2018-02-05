import { IRootState } from 'constants/types';
import createReducer from 'reducers';
import { applyMiddleware, createStore, ReducersMapObject, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware, Task } from 'redux-saga';
import { AllEffect } from 'redux-saga/effects';

export interface IDescriptor {
  saga: () => IterableIterator<AllEffect>;
}

interface IInjectedSaga extends IDescriptor {
  task: Task;
}

export interface IStore extends Store<IRootState> {
  injectedReducers: ReducersMapObject;
  injectedSagas: { [key: string]: IInjectedSaga };
  runSaga(saga: () => IterableIterator<AllEffect>, args: any): Task;
}

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

export default function configureStore() {
  const store: Store<IRootState> = createStore(
    createReducer(),
    applyMiddleware(sagaMiddleware)
  );

  (store as IStore).injectedReducers = {};
  (store as IStore).injectedSagas = {};
  (store as IStore).runSaga = sagaMiddleware.run;

  return store;
}
