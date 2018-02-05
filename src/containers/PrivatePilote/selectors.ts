import { IRootState } from 'constants/types';
import { Steps } from 'containers/PrivatePilote/types';

export const getCurrentId = ({ privatePilote }: IRootState): number =>
  privatePilote.currentId;

export const getPassengersChoiceIds = ({
  privatePilote,
}: IRootState): number[] => privatePilote.choices[Steps.people];

export const getPlanetsChoiceId = ({ privatePilote }: IRootState): number =>
  privatePilote.choices[Steps.planets][0];

export const getStarshipChoiceId = ({ privatePilote }: IRootState): number =>
  privatePilote.choices[Steps.starships][0];
