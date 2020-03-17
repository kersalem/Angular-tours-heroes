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
  heroFilter: Hero[];
  selectedHero: Hero;
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
    // console.log('je rentre dans la fonction tri');
    // console.log('heroes avant', this.heroes);
      if (this.order) {
      this.heroFilter.sort(function(h1, h2) {
        if (h1[element] !== h2[element]) {
          return (h1[element] < h2[element]) ? 1 : -1;
        }
      });
    } else {
      this.heroFilter.sort(function(h1, h2) {
        if (h1[element] !== h2[element]) {
          return (h2[element] < h1[element]) ? 1 : -1;
        }
      });
    }
  }
  saisiesFilter(event) {
    this.heroFilter = [];
    for (const heroF of this.heroes) {
      if (heroF.name.indexOf(event.value) === 0) {
        this.heroFilter.push(heroF);
      }
    }
  }

  deleteHero(id: string) {
    this.heroService.deleteHero(id);
  }
}
