import { expect } from 'chai';
import {
  GET_ITEM_FAILED,
  GET_ITEM_REQUESTED,
  GET_ITEM_SUCCEEDED,
  GET_PASSENGERS_FAILED,
  GET_PASSENGERS_SUCCEEDED,
  GET_PLANETS_FAILED,
  GET_PLANETS_SUCCEEDED,
  GET_PRICE_FAILED,
  GET_PRICE_SUCCEEDED,
  GET_STARSHIPS_FAILED,
  GET_STARSHIPS_SUCCEEDED,
  POST_RIDE_FAILED,
  POST_RIDE_SUCCEEDED,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import {
  getItem,
  getPassengers,
  getPlanets,
  getPrice,
  getStarships,
  postRide,
} from 'containers/PrivatePilote/PrivatePiloteSaga';
import {
  getCurrentId,
  getPassengersChoiceIds,
  getPlanetsChoiceId,
  getStarshipChoiceId,
} from 'containers/PrivatePilote/selectors';
import { Steps } from 'containers/PrivatePilote/types';
import { call, put, select } from 'redux-saga/effects';
import WebApi from 'services/WebApi';

describe('FeatureListSaga', () => {
  it('should getItem yield an Effect call', () => {
    const data = {};
    const id = 1;
    const step = Steps.starships;
    const addItemIterator = getItem({ id, step, type: GET_ITEM_REQUESTED });
    const expected = { data, id, step, type: GET_ITEM_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getItem, step, id)
    );
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch getItem', () => {
    const id = 1;
    const step = Steps.starships;
    const addItemIterator = getItem({ id, step, type: GET_ITEM_REQUESTED });
    const errorMessage = 'unexpected network error';
    const expected = { message: errorMessage, type: GET_ITEM_FAILED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getItem, step, id)
    );
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });

  it('should getPassengers yield an Effect call', () => {
    const data = {};
    const addItemIterator = getPassengers();
    const expected = { data, type: GET_PASSENGERS_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getPassengers)
    );
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch getPassengers', () => {
    const addItemIterator = getPassengers();
    const errorMessage = 'unexpected network error';
    const expected = { message: errorMessage, type: GET_PASSENGERS_FAILED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getPassengers)
    );
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });

  it('should getPlanets yield an Effect call', () => {
    const data = {};
    const addItemIterator = getPlanets();
    const expected = { data, type: GET_PLANETS_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(call(WebApi.getPlanets));
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch getPlanets', () => {
    const addItemIterator = getPlanets();
    const errorMessage = 'unexpected network error';
    const expected = { message: errorMessage, type: GET_PLANETS_FAILED };

    expect(addItemIterator.next().value).to.deep.equal(call(WebApi.getPlanets));
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });

  it('should getStarships yield an Effect call', () => {
    const data = {};
    const addItemIterator = getStarships();
    const expected = { data, type: GET_STARSHIPS_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getStarships)
    );
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch getStarships', () => {
    const addItemIterator = getStarships();
    const errorMessage = 'unexpected network error';
    const expected = { message: errorMessage, type: GET_STARSHIPS_FAILED };

    expect(addItemIterator.next().value).to.deep.equal(
      call(WebApi.getStarships)
    );
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });

  it('should getPrice yield an Effect call', () => {
    const data = {};
    const passengerIds = [1, 2];
    const planetId = 1;
    const starshipId = 1;
    const addItemIterator = getPrice();
    const expected = { data, type: GET_PRICE_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(
      select(getStarshipChoiceId)
    );
    expect(addItemIterator.next(starshipId).value).to.deep.equal(
      select(getCurrentId)
    );
    expect(addItemIterator.next(planetId).value).to.deep.equal(
      select(getPassengersChoiceIds)
    );
    expect(addItemIterator.next(passengerIds).value).to.deep.equal(
      call(WebApi.getPrice, starshipId, planetId, passengerIds)
    );
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch getPrice', () => {
    const passengerIds = [1, 2];
    const planetId = 1;
    const starshipId = 1;
    const addItemIterator = getPrice();
    const errorMessage = 'unexpected network error';
    const response = undefined;
    const expected = {
      message: errorMessage,
      response,
      type: GET_PRICE_FAILED,
    };

    expect(addItemIterator.next().value).to.deep.equal(
      select(getStarshipChoiceId)
    );
    expect(addItemIterator.next(starshipId).value).to.deep.equal(
      select(getCurrentId)
    );
    expect(addItemIterator.next(planetId).value).to.deep.equal(
      select(getPassengersChoiceIds)
    );
    expect(addItemIterator.next(passengerIds).value).to.deep.equal(
      call(WebApi.getPrice, starshipId, planetId, passengerIds)
    );
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });

  it('should postRide yield an Effect call', () => {
    const data = {};
    const passengerIds = [1, 2];
    const planetId = 1;
    const starshipId = 1;
    const addItemIterator = postRide();
    const expected = { data, type: POST_RIDE_SUCCEEDED };

    expect(addItemIterator.next().value).to.deep.equal(
      select(getStarshipChoiceId)
    );
    expect(addItemIterator.next(starshipId).value).to.deep.equal(
      select(getPlanetsChoiceId)
    );
    expect(addItemIterator.next(planetId).value).to.deep.equal(
      select(getPassengersChoiceIds)
    );
    expect(addItemIterator.next(passengerIds).value).to.deep.equal(
      call(WebApi.postRide, starshipId, planetId, passengerIds)
    );
    expect(addItemIterator.next({ data }).value).to.deep.equal(put(expected));
  });

  it('should fail to fetch postRide', () => {
    const passengerIds = [1, 2];
    const planetId = 1;
    const starshipId = 1;
    const addItemIterator = postRide();
    const errorMessage = 'unexpected network error';
    const expected = { message: errorMessage, type: POST_RIDE_FAILED };

    expect(addItemIterator.next().value).to.deep.equal(
      select(getStarshipChoiceId)
    );
    expect(addItemIterator.next(starshipId).value).to.deep.equal(
      select(getPlanetsChoiceId)
    );
    expect(addItemIterator.next(planetId).value).to.deep.equal(
      select(getPassengersChoiceIds)
    );
    expect(addItemIterator.next(passengerIds).value).to.deep.equal(
      call(WebApi.postRide, starshipId, planetId, passengerIds)
    );
    expect(
      (addItemIterator as any).throw(new Error(errorMessage)).value
    ).to.deep.equal(put(expected));
  });
});
