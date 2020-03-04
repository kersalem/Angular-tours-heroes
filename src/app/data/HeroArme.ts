import {Serializable} from './serializable';

export class HeroArme extends Serializable  {
  id: string;
  idHero: string;
  idArme: number;

  uneMethode(): string {
    return 'le nom de mon hero' + this.idHero + '' + this.idArme;
  }
}
