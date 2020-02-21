import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.css']
})
export class HeroEditorComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(''),
    attaque: new FormControl(''),
    esquive: new FormControl(''),
    degats: new FormControl(''),
    pointDeVie: new FormControl(''),
  });
  heroes: Hero[];
  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  saveHero() {
    const hero = new Hero();
    // hero.id = '22';
    hero.name = this.profileForm.get('name').value;
    hero.attaque = this.profileForm.get('attaque').value;
    hero.esquive = this.profileForm.get('esquive').value;
    hero.degats = this.profileForm.get('degats').value;
    hero.pointDeVie = this.profileForm.get('pointDeVie').value;
    this.heroService.addHero(hero);
  }
}
