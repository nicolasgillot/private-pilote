import axios from 'axios';
import { Steps } from 'containers/PrivatePilote/types';

export default {
  getItem(step: Steps, id: number) {
    return axios.get(`https://swapi.co/api/${step}/${id}`);
  },
  getPassengers() {
    return axios.get('https://test-pilote-prive.herokuapp.com/api/passengers');
  },
  getPlanets() {
    return axios.get('https://test-pilote-prive.herokuapp.com/api/planets');
  },
  getStarships() {
    return axios.get('https://test-pilote-prive.herokuapp.com/api/starships');
  },
  getPrice(starship_id: number, planet_id: number, passengers: number[]) {
    return axios.post(
      'https://test-pilote-prive.herokuapp.com/api/price/quote',
      {
        passengers,
        planet_id,
        starship_id,
      }
    );
  },
  postRide(starship_id: number, planet_id: number, passengers: number[]) {
    return axios.post(
      'https://test-pilote-prive.herokuapp.com/api/ride/order',
      {
        passengers,
        planet_id,
        starship_id,
      }
    );
  },
};
