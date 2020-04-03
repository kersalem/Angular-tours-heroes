import { Component, OnInit } from '@angular/core';

import { HeroService } from '../service/hero.service';
import { Hero } from '../data/hero';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroFilter: Hero[];
  order: boolean;
  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.order = false;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => { this.heroes = heroes; this.heroFilter = heroes; } );
  }
  // Mise à jour héro
  updateHero(id: string) {
    this.heroService.idHero = id;
    this.router.navigateByUrl('/heroEditor');
  }
  // Trier colonnes héros
  triHero(element) {
      this.order = !this.order;
    // si order true ascendant si false descendant
    // Trier les noms des héros par ordre alphabétique
    // Récupérer les noms dans un tab. et appliquer array.sort()
    // appliquer cette methode au click du bouton tri
      if (this.order) {
      this.heroFilter.sort((h1, h2) => {
        if (h1[element] !== h2[element]) {
          return (h1[element] < h2[element]) ? 1 : -1;
        }
      });
    } else {
      this.heroFilter.sort((h1, h2) => {
        if (h1[element] !== h2[element]) {
          return (h2[element] < h1[element]) ? 1 : -1;
        }
      });
    }
  }
  // Filtrer nom héro
  saisiesFilter(event) {
    this.heroFilter = [];
    for (const heroF of this.heroes) {
      if (heroF.name.toLowerCase().indexOf(event.value.toLowerCase()) === 0) {
        this.heroFilter.push(heroF);
      }
    }
  }

  deleteHero(id: string) {
    this.heroService.deleteHero(id);
  }
}
