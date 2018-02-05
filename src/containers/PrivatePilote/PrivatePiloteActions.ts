import {
  CHOOSE_ITEM,
  GET_ITEM_REQUESTED,
  GET_PASSENGERS_REQUESTED,
  GET_PLANETS_REQUESTED,
  GET_PRICE_REQUESTED,
  GET_STARSHIPS_REQUESTED,
  KEY_ITEM_CHANGE,
  ON_RESIZE_WINDOW,
  POST_RIDE_REQUESTED,
  RESTART,
  STEP_CHANGE,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import { Steps } from 'containers/PrivatePilote/types';

export function chooseItem() {
  return {
    type: CHOOSE_ITEM,
  };
}

export function getItem(step: Steps, id: number) {
  return {
    id,
    step,
    type: GET_ITEM_REQUESTED,
  };
}

export function getPassengers() {
  return {
    type: GET_PASSENGERS_REQUESTED,
  };
}

export function getPlanets() {
  return {
    type: GET_PLANETS_REQUESTED,
  };
}

export function getPrice() {
  return {
    type: GET_PRICE_REQUESTED,
  };
}

export function getStarships() {
  return {
    type: GET_STARSHIPS_REQUESTED,
  };
}

export function keyItemChange(id: number) {
  return {
    id,
    type: KEY_ITEM_CHANGE,
  };
}

export function onResizeWindow(width: number) {
  return {
    type: ON_RESIZE_WINDOW,
    width,
  };
}

export function postRide() {
  return {
    type: POST_RIDE_REQUESTED,
  };
}

export function restart() {
  return {
    type: RESTART,
  };
}

export function stepChange(step: Steps) {
  return {
    step,
    type: STEP_CHANGE,
  };
}
