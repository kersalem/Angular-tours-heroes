import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';
import {Router} from '@angular/router';
import {MessageService} from '../service/message.service';

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
  ifCorrect: boolean;
  attaqueValid: boolean;
  esquiveValid: boolean;
  degatsValid: boolean;
  pvValid: boolean;
  message: string;

  constructor(private router: Router, private heroService: HeroService, private messageService: MessageService) { }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.profileForm.get('attaque').setValue(1);
    this.getHeroes();
    this.ifCorrect = true;
    this.attaqueValid = true;
    this.esquiveValid = true;
    this.degatsValid = true;
    this.pvValid = true;
    this.message = '';
    if (this.heroService.idHero) {
      // subscribe voir le resultat de la fonction
      // Recp données d'un hero à modifier
      this.heroService.getHero(this.heroService.idHero).subscribe(value => this.getHero = value);
      // REINITIALISER Le idHero
      this.heroService.idHero = null;
      console.log('this.totalPoints', this.totalPoints);
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
    console.log('total P', this.totalPoints);

    if (this.totalPoints > 1 && this.totalPoints < 40) {
      // Si hero à modifier
      if (this.getHero) {
        hero.id = this.getHero.id;
        this.heroService.updateHero(this.getHero, hero);
        this.router.navigateByUrl('/heroes');
      } else {
        // sinon l'ajoute
        this.heroService.addHero(hero);
        this.router.navigateByUrl('/heroes');
      }
    } else {
      this.messageService.add('Le total doit être entre 1 et 40');
    }
  }
  limitNumber() {
    // je recupere les saisies du form
    const totalPoints = this.profileForm.get('attaque').value +
      this.profileForm.get('esquive').value +
      this.profileForm.get('degats').value +
      this.profileForm.get('pointDeVie').value;
    if (totalPoints > 40) {
      this.message = 'Le total doit être supérieur à 4 et inférieur à 41 et non ' + totalPoints;
    } else {
      this.message = '';
    }
  }
  // attaque: number, esquive: number, degats: number, pointDeVie: number
}
