import { IDescriptor, IStore } from 'store';

export function injectSagaFactory(store: IStore) {
  return function injectSaga(
    key: string,
    descriptor: IDescriptor = {} as any,
    args: any
  ) {
    const newDescriptor = { ...descriptor };
    const { saga } = newDescriptor;
    const hasSaga = Reflect.has(store.injectedSagas, key);

    if (!hasSaga) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
    }
  };
}

export function ejectSagaFactory(store: IStore) {
  return function ejectSaga(key: string) {
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];

      descriptor.task.cancel();
    }
  };
}

export default function getInjectors(store: IStore) {
  return {
    ejectSaga: ejectSagaFactory(store),
    injectSaga: injectSagaFactory(store),
  };
}
