export enum Steps {
  done = 'done',
  people = 'people',
  planets = 'planets',
  sides = 'sides',
  starships = 'starships',
  trip = 'trip',
}

interface IItem {
  id: number;
  name: string;
  [propertyKey: string]: number | string;
}

export interface IPassenger extends IItem {
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  side: 'dark' | 'light';
}

export interface IPlanet extends IItem {
  climate: string;
  gravity: string;
  population: string;
}

export interface IStarship extends IItem {
  capacity: number | string;
  length: string;
  manufacturer: string;
  model: string;
}

export interface IPrivatePiloteState {
  readonly choices: {
    [stepKey: string]: number[];
  };
  readonly currentId: number;
  readonly error: { message: string; type: string } | null;
  readonly loading: boolean;
  readonly [Steps.people]: IPassenger[];
  readonly [Steps.planets]: IPlanet[];
  readonly price: number | null;
  readonly [Steps.sides]: IItem[];
  readonly [Steps.starships]: IStarship[];
  readonly step: Steps;
  readonly windowWidth: number;
}

export const steps: Steps[] = [
  Steps.starships,
  Steps.sides,
  Steps.people,
  Steps.planets,
  Steps.trip,
  Steps.done,
];

export const properties: { [stepKey: string]: string[] } = {
  [Steps.people]: ['eye_color', 'gender', 'hair_color', 'height', 'mass'],
  [Steps.planets]: ['climate', 'gravity', 'population'],
  [Steps.starships]: ['capacity', 'manufacturer', 'model', 'length'],
};
