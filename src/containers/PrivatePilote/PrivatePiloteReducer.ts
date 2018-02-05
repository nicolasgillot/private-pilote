import {
  CHOOSE_ITEM,
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
  KEY_ITEM_CHANGE,
  ON_RESIZE_WINDOW,
  POST_RIDE_REQUESTED,
  POST_RIDE_SUCCEEDED,
  RESTART,
  STEP_CHANGE,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import {
  IPrivatePiloteState,
  steps,
  Steps,
} from 'containers/PrivatePilote/types';
import { AnyAction } from 'redux';

const initialState: IPrivatePiloteState = {
  choices: {
    [Steps.people]: [],
    [Steps.planets]: [],
    [Steps.sides]: [],
    [Steps.starships]: [],
  },
  currentId: 0,
  error: null,
  loading: true,
  [Steps.people]: [],
  [Steps.planets]: [],
  price: null,
  [Steps.sides]: [{ id: 1, name: 'Light' }, { id: 2, name: 'Dark' }],
  [Steps.starships]: [],
  step: Steps.starships,
  windowWidth: window.innerWidth,
};

export default function privatePiloteReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case CHOOSE_ITEM:
      const [starshipId] = state.choices[Steps.starships];
      const starship = state.starships.find(
        starshipItem => starshipItem.id === starshipId
      );
      const capacity = starship == null ? 0 : starship.capacity;
      const add = () => {
        if (
          state.step === Steps.people &&
          capacity > 1 &&
          state.choices[Steps.people].length < capacity
        ) {
          return [...state.choices[state.step], state.currentId];
        }

        return [state.currentId];
      };
      const remove = () =>
        state.choices[state.step].filter(itemId => itemId !== state.currentId);
      const newSelection = state.choices[state.step].includes(state.currentId)
        ? remove()
        : add();

      return {
        ...state,
        choices: { ...state.choices, [state.step]: newSelection },
      };

    case GET_ITEM_SUCCEEDED:
      const { data, id, step } = action;
      const newState = { ...state, loading: false };

      if (step === Steps.people) {
        const { eye_color, gender, hair_color, height, mass } = data;

        newState.people = state.people.map(
          passengerItem =>
            passengerItem.id === id
              ? {
                  ...passengerItem,
                  eye_color,
                  gender,
                  hair_color,
                  height,
                  mass,
                }
              : passengerItem
        );
      }

      if (step === Steps.planets) {
        const { climate, gravity, name, population } = data;

        newState.planets = state.planets.map(
          planetItem =>
            planetItem.id === id
              ? { ...planetItem, climate, gravity, name, population }
              : planetItem
        );
      }

      if (step === Steps.starships) {
        const { length, manufacturer, model, passengers } = data;
        const numberOfPassengers = Number(passengers);

        newState.starships = state.starships.map(
          starshipItem =>
            starshipItem.id === id
              ? {
                  ...starshipItem,
                  capacity: Number.isNaN(numberOfPassengers)
                    ? passengers
                    : numberOfPassengers + 1,
                  length,
                  manufacturer,
                  model,
                }
              : starshipItem
        );
      }

      return newState;

    case GET_ITEM_FAILED:
    case GET_PASSENGERS_FAILED:
    case GET_PLANETS_FAILED:
    case GET_STARSHIPS_FAILED:
      const { message } = action;

      alert(message);
      return { ...state, loading: false };

    case GET_PASSENGERS_SUCCEEDED:
      return { ...state, loading: false, people: action.data };

    case GET_PLANETS_SUCCEEDED:
      return { ...state, loading: false, planets: action.data };

    case GET_PRICE_SUCCEEDED:
      return { ...state, loading: false, price: action.data.price };

    case GET_PRICE_FAILED:
      return {
        ...state,
        error: { message: action.response.data.detail, type: 'price' },
        loading: false,
      };

    case GET_STARSHIPS_SUCCEEDED:
      return { ...state, loading: false, starships: action.data };

    case KEY_ITEM_CHANGE:
      return { ...state, currentId: action.id };

    case ON_RESIZE_WINDOW:
      return { ...state, windowWidth: action.width };

    case POST_RIDE_SUCCEEDED:
      return { ...state, loading: false, step: Steps.done };

    case RESTART:
      return {
        ...state,
        choices: initialState.choices,
        step: initialState.step,
      };

    case STEP_CHANGE:
      const currentIndex = steps.indexOf(state.step);
      const newIndex = steps.indexOf(action.step);
      const isPreviousAction = newIndex < currentIndex;

      return {
        ...state,
        choices: {
          ...state.choices,
          [state.step]: isPreviousAction ? [] : state.choices[state.step],
        },
        currentId: 0,
        error: null,
        price:
          isPreviousAction && steps[currentIndex] === Steps.planets
            ? null
            : state.price,
        step: action.step,
      };

    case GET_ITEM_REQUESTED:
    case GET_PASSENGERS_REQUESTED:
    case GET_PLANETS_REQUESTED:
    case GET_PRICE_REQUESTED:
    case GET_STARSHIPS_REQUESTED:
    case POST_RIDE_REQUESTED:
      return { ...state, loading: true };

    default:
      return state;
  }
}
