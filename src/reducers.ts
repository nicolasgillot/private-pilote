import { IRootState } from 'constants/types';
import { Action, combineReducers, Reducer, ReducersMapObject } from 'redux';

const routeInitialState = {};

function routeReducer(state = routeInitialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default function createReducer(
  injectedReducers?: ReducersMapObject
): Reducer<IRootState> {
  return combineReducers<IRootState>({
    route: routeReducer,
    ...injectedReducers,
  });
}
