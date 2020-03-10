import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ArmeService} from '../service/arme.service';
import {Arme} from '../data/Arme';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  arme: Arme;
  rest: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armeService: ArmeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        console.log('hero =', hero);
        this.getArme(this.hero.id_arme);
      });
  }
  getArme(id) {
    this.armeService.getArme(id)
      .subscribe(arme => this.arme = arme);
  }
  goBack(): void {
    this.location.back();
  }

  updateHero(): void {
    this.heroService.updateHero(this.hero, this.hero);
  }

/*  goCheckConstraint {
     this.rest = 40 - (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pointDeVie);
  }*/

/*  save() {
    this.heroService.updateHero(this.hero);
  }*/
}

