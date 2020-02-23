import {Serializable} from './serializable';

export class Arme extends Serializable {
  id: string;
  nom: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointDeVie: number;
}
