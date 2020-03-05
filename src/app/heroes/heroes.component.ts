import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  updateHero(id: string) {
    this.heroService.idHero = id;
    this.router.navigateByUrl('/heroEditor');
  }

  triHeroNom() {
    // Trier les noms des héros par ordre alphabétique
    // Récupérer les noms dans un tab. et appliquer array.sort()
    // appliquer cette methode au click du bouton tri
    console.log('je rentre dans la fonction tri');
    const array = [];
    console.log(' this.getHeroes()',  this.getHeroes());
    this.getHeroes();
  }

  deleteHero(id: string) {
    this.heroService.deleteHero(id);
  }
  // TOut supprimer - tab. vide
  //
/*  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  }*/
}
