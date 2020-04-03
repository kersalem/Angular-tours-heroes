import { Component, OnInit } from '@angular/core';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import {Arme} from '../data/Arme';
import {ArmeService} from '../service/arme.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
        this.getArmeHero(this.hero.id_arme);
      });
  }
  // Obtenir infos hero en fonction de son id
  getArmeHero(id) {
    this.armeService.getArme(id)
      .subscribe(arme => this.arme = arme);
  }
  updateHero(): void {
    this.heroService.updateHero(this.hero, this.hero);
  }
  // Retour url précédente
  goBack(): void {
    this.location.back();
  }
}

