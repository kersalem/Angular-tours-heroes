import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.css']
})
export class HeroEditorComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(''),
    attaque: new FormControl(0),
    esquive: new FormControl(0),
    degats: new FormControl(0),
    pointDeVie: new FormControl(0),
  });
  heroes: Hero[];
  getHero: Hero;
  totalPoints: number;


  constructor(private router: Router, private heroService: HeroService) { }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
    if (this.heroService.idHero) {
      // subscribe voir le resultat de la fonction
      // Recp données d'un hero à modifier
      this.heroService.getHero(this.heroService.idHero).subscribe(value => this.getHero = value);
      // REINITIALISER Le idHero
      this.heroService.idHero = null;
    }
  }
  saveHero() {
    const hero = new Hero();
    // recup valeur du formulaire
    this.totalPoints = 0;
    hero.name = this.profileForm.get('name').value;
    hero.attaque = this.profileForm.get('attaque').value;
    hero.esquive = this.profileForm.get('esquive').value;
    hero.degats = this.profileForm.get('degats').value;
    hero.pointDeVie = this.profileForm.get('pointDeVie').value;
    this.totalPoints = hero.attaque.valueOf() + hero.esquive.valueOf() + hero.degats.valueOf() + hero.pointDeVie.valueOf();
    console.log(typeof this.profileForm.get('attaque').value);
    console.log(this.totalPoints);
    if (this.totalPoints > 1 && this.totalPoints < 40) {
      // Si hero à modifier
      this.router.navigateByUrl('/heroes');
      if (this.getHero) {
        hero.id = this.getHero.id;
        console.log('modiffffffff');

        this.heroService.updateHero(this.getHero, hero);
      } else {
        // sinon l'ajoute
        console.log('creationnnnnnnnnnnnnnnnnnnn');
        this.heroService.addHero(hero);
      }
    }
  }
}
