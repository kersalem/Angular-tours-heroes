import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
