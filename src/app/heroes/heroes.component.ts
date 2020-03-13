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
  order: boolean;
  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.order = false;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  updateHero(id: string) {
    this.heroService.idHero = id;
    this.router.navigateByUrl('/heroEditor');
  }

  triHero(element) {
    this.order = !this.order;
    // si order true ascendant si false descendant
    // Trier les noms des héros par ordre alphabétique
    // Récupérer les noms dans un tab. et appliquer array.sort()
    // appliquer cette methode au click du bouton tri
    console.log('je rentre dans la fonction tri');
    console.log('heroes avant', this.heroes);
    if (this.order) {
      this.heroes.sort(function(h1, h2) {
        return (h1[element] < h2[element]) ? 1 : -1;
      });
    } else {
      this.heroes.sort(function(h1, h2) {
        return (h2[element] <= h1[element]) ? 1 : -1;
      });
    }
    console.log('heroes apres', this.heroes);

    /*    items.sort(function (a, b) {
          return a.value - b.valu  e;
        });*/

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
