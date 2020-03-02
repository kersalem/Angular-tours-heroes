import {Serializable} from './serializable';

export class Arme extends Serializable {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointDeVie: number;
}
