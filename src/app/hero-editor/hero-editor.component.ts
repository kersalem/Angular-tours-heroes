import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';
import {MessageService} from '../service/message.service';
import {ArmeService} from '../service/arme.service';
import {Arme} from '../data/Arme';
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
    arme: new FormControl(''),
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
  pointsRestant: number;
  armes: Arme[];
  armeHero: Arme;
  constructor(private router: Router,
              private heroService: HeroService,
              private armeService: ArmeService,
              private messageService: MessageService) { }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }
  getArmeCaracteristiques(event): void {
    this.armeHero = null;
    if (event.value !== '') {
      console.log('event', event);
      this.armeService.getArme(event.value)
        .subscribe(armeHero => this.armeHero = armeHero);
    }
  }
  ngOnInit(): void {
    this.profileForm.get('attaque').setValue(1);
    this.getHeroes();
    this.getArmes();
    this.ifCorrect = true;
    this.attaqueValid = true;
    this.esquiveValid = true;
    this.degatsValid = true;
    this.pvValid = true;
    this.pointsRestant = 36;
    this.message = '';
    if (this.heroService.idHero) {
      // Recp données d'un hero à modifier
      this.heroService.getHero(this.heroService.idHero).subscribe(
        value => {
          this.getHero = value;
          console.log('this.getHeroes', this.getHero);
          this.pointsRestant = 40 - this.getHero.attaque - this.getHero.esquive - this.getHero.degats - this.getHero.pointDeVie;
        });
      // REINITIALISER Le idHero
      this.heroService.idHero = null;
    }
  }
  saveHero() {
    const hero = new Hero();
    // recup valeur du formulaire
    hero.name = this.profileForm.get('name').value;
    hero.attaque = this.profileForm.get('attaque').value;
    hero.esquive = this.profileForm.get('esquive').value;
    hero.degats = this.profileForm.get('degats').value;
    hero.pointDeVie = this.profileForm.get('pointDeVie').value;
    hero.id_arme = this.profileForm.get('arme').value;
    if (this.pointsRestant >= 0 && this.pointsRestant <= 36) {
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
    this.totalPoints = this.profileForm.get('attaque').value +
      this.profileForm.get('esquive').value +
      this.profileForm.get('degats').value +
      this.profileForm.get('pointDeVie').value;
    this.pointsRestant = 40 - this.totalPoints;
    if (this.totalPoints > 40) {
      this.message = 'Le total doit être supérieur à 4 et inférieur à 41 et non ' + this.totalPoints;
    } else {
      this.message = '';
    }
  }
}
