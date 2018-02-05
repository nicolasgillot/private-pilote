import { expect } from 'chai';
import {
  chooseItem,
  getItem,
  getPassengers,
  getPlanets,
  getPrice,
  getStarships,
  keyItemChange,
  postRide,
  stepChange,
} from 'containers/PrivatePilote/PrivatePiloteActions';
import {
  CHOOSE_ITEM,
  GET_ITEM_REQUESTED,
  GET_PASSENGERS_REQUESTED,
  GET_PLANETS_REQUESTED,
  GET_PRICE_REQUESTED,
  GET_STARSHIPS_REQUESTED,
  KEY_ITEM_CHANGE,
  POST_RIDE_REQUESTED,
  STEP_CHANGE,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import { Steps } from 'containers/PrivatePilote/types';

describe('PrivatePiloteActions', () => {
  it('should create an action to choose an item', () => {
    const expectedAction = {
      type: CHOOSE_ITEM,
    };

    expect(chooseItem()).to.eql(expectedAction);
  });

  it('should create an action to get an item', () => {
    const id = 1;
    const step = Steps.starships;
    const expectedAction = {
      id,
      step,
      type: GET_ITEM_REQUESTED,
    };

    expect(getItem(step, id)).to.eql(expectedAction);
  });

  it('should create an action to get passengers', () => {
    const expectedAction = {
      type: GET_PASSENGERS_REQUESTED,
    };

    expect(getPassengers()).to.eql(expectedAction);
  });

  it('should create an action to get planets', () => {
    const expectedAction = {
      type: GET_PLANETS_REQUESTED,
    };

    expect(getPlanets()).to.eql(expectedAction);
  });

  it('should create an action to get price', () => {
    const expectedAction = {
      type: GET_PRICE_REQUESTED,
    };

    expect(getPrice()).to.eql(expectedAction);
  });

  it('should create an action to get starships', () => {
    const expectedAction = {
      type: GET_STARSHIPS_REQUESTED,
    };

    expect(getStarships()).to.eql(expectedAction);
  });

  it('should create an action to change the item key', () => {
    const id = 1;
    const expectedAction = {
      id,
      type: KEY_ITEM_CHANGE,
    };

    expect(keyItemChange(id)).to.eql(expectedAction);
  });

  it('should create an action to post a ride', () => {
    const expectedAction = {
      type: POST_RIDE_REQUESTED,
    };

    expect(postRide()).to.eql(expectedAction);
  });

  it('should create an action to change the step', () => {
    const step = Steps.starships;
    const expectedAction = {
      step,
      type: STEP_CHANGE,
    };

    expect(stepChange(step)).to.eql(expectedAction);
  });
});
