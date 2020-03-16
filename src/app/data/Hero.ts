import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pointDeVie: number;
  id_arme: string;

/*  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }*/
}
