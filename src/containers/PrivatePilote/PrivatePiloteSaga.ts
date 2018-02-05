import {
  GET_ITEM_FAILED,
  GET_ITEM_REQUESTED,
  GET_ITEM_SUCCEEDED,
  GET_PASSENGERS_FAILED,
  GET_PASSENGERS_REQUESTED,
  GET_PASSENGERS_SUCCEEDED,
  GET_PLANETS_FAILED,
  GET_PLANETS_REQUESTED,
  GET_PLANETS_SUCCEEDED,
  GET_PRICE_FAILED,
  GET_PRICE_REQUESTED,
  GET_PRICE_SUCCEEDED,
  GET_STARSHIPS_FAILED,
  GET_STARSHIPS_REQUESTED,
  GET_STARSHIPS_SUCCEEDED,
  POST_RIDE_FAILED,
  POST_RIDE_REQUESTED,
  POST_RIDE_SUCCEEDED,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import {
  getCurrentId,
  getPassengersChoiceIds,
  getPlanetsChoiceId,
  getStarshipChoiceId,
} from 'containers/PrivatePilote/selectors';
import { AnyAction } from 'redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import WebApi from 'services/WebApi';

export function* getItem({ id, step }: AnyAction) {
  try {
    const { data } = yield call(WebApi.getItem, step, id);

    yield put({ data, id, step, type: GET_ITEM_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: GET_ITEM_FAILED });
  }
}

export function* getPassengers() {
  try {
    const { data } = yield call(WebApi.getPassengers);

    yield put({ data, type: GET_PASSENGERS_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: GET_PASSENGERS_FAILED });
  }
}

export function* getPlanets() {
  try {
    const { data } = yield call(WebApi.getPlanets);

    yield put({ data, type: GET_PLANETS_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: GET_PLANETS_FAILED });
  }
}

export function* getPrice() {
  const starshipId = yield select(getStarshipChoiceId);
  const planetId = yield select(getCurrentId);
  const passengerIds = yield select(getPassengersChoiceIds);

  try {
    const { data } = yield call(
      WebApi.getPrice,
      starshipId,
      planetId,
      passengerIds
    );

    yield put({ data, type: GET_PRICE_SUCCEEDED });
  } catch ({ message, response }) {
    yield put({ message, response, type: GET_PRICE_FAILED });
  }
}

export function* getStarships() {
  try {
    const { data } = yield call(WebApi.getStarships);

    yield put({ data, type: GET_STARSHIPS_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: GET_STARSHIPS_FAILED });
  }
}

export function* postRide() {
  const starshipId = yield select(getStarshipChoiceId);
  const planetId = yield select(getPlanetsChoiceId);
  const passengerIds = yield select(getPassengersChoiceIds);

  try {
    const { data } = yield call(
      WebApi.postRide,
      starshipId,
      planetId,
      passengerIds
    );

    yield put({ data, type: POST_RIDE_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: POST_RIDE_FAILED });
  }
}

export default function* pilotePrivateSaga() {
  yield all([takeEvery(GET_ITEM_REQUESTED, getItem)]);
  yield all([takeEvery(GET_PASSENGERS_REQUESTED, getPassengers)]);
  yield all([takeEvery(GET_PLANETS_REQUESTED, getPlanets)]);
  yield all([takeEvery(GET_PRICE_REQUESTED, getPrice)]);
  yield all([takeEvery(GET_STARSHIPS_REQUESTED, getStarships)]);
  yield all([takeEvery(POST_RIDE_REQUESTED, postRide)]);
}
