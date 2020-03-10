import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  id_arme: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointDeVie: number;

/*  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }*/
}
