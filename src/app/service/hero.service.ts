import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../data/Hero';
import { HEROES } from '../data/mock-heroes';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {
    name: any;

  constructor(private messageService: MessageService) { }
  heroes: Hero[];

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  addHero(item) {
    HEROES.push(item);
    const nom =  this.name.getValue(item);
    /* console.log('this.heroes', this.heroes);
     this.heroes.push(nom);*/

    console.log('Je suis dans addHero()');
    console.log('HEROES*************', HEROES);
    console.log('item---------------------', nom);

  }
}
