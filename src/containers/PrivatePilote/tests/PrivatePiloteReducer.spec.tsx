import { expect } from 'chai';
import {
  GET_ITEM_SUCCEEDED,
  GET_PASSENGERS_SUCCEEDED,
  GET_PLANETS_SUCCEEDED,
  GET_STARSHIPS_SUCCEEDED,
} from 'containers/PrivatePilote/PrivatePiloteContants';
import PrivatePiloteReducer from 'containers/PrivatePilote/PrivatePiloteReducer';
import { Steps } from 'containers/PrivatePilote/types';

const initialState = {
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

describe('PrivatePiloteReducer', () => {
  it('should return the initial state', () => {
    expect(PrivatePiloteReducer(undefined, {} as any)).to.eql(initialState);
  });

  it('should get people', () => {
    const passengers = [
      { id: 1, name: 'Luke Skywalker', side: 'light' },
      { id: 4, name: 'Darth Vader', side: 'dark' },
    ];

    expect(
      PrivatePiloteReducer(undefined, {
        data: passengers,
        type: GET_PASSENGERS_SUCCEEDED,
      })
    ).to.eql({ ...initialState, loading: false, people: passengers });
  });

  it('should get planets', () => {
    const planets = [{ id: 4, name: 'Hoth' }, { id: 5, name: 'Dagobah' }];

    expect(
      PrivatePiloteReducer(undefined, {
        data: planets,
        type: GET_PLANETS_SUCCEEDED,
      })
    ).to.eql({ ...initialState, loading: false, planets });
  });

  it('should get starships', () => {
    const starships = [
      { id: 10, name: 'Millennium Falcon' },
      { id: 11, name: 'Y-wing' },
    ];

    expect(
      PrivatePiloteReducer(undefined, {
        data: starships,
        type: GET_STARSHIPS_SUCCEEDED,
      })
    ).to.eql({ ...initialState, loading: false, starships });
  });

  it('should get item: starship)', () => {
    const starships = [
      { id: 10, name: 'Millennium Falcon' },
      { id: 11, name: 'Y-wing' },
    ];

    expect(
      PrivatePiloteReducer(
        { ...initialState, loading: false, starships } as any,
        {
          data: {
            length: '34.37',
            manufacturer: 'Corellian Engineering Corporation',
            model: 'YT-1300 light freighter',
            passengers: '6',
          },
          id: 10,
          step: Steps.starships,
          type: GET_ITEM_SUCCEEDED,
        }
      )
    ).to.eql({
      ...initialState,
      loading: false,
      starships: [
        {
          capacity: 7,
          id: 10,
          length: '34.37',
          manufacturer: 'Corellian Engineering Corporation',
          model: 'YT-1300 light freighter',
          name: 'Millennium Falcon',
        },
        { id: 11, name: 'Y-wing' },
      ],
    });
  });
});
