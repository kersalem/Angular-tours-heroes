import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})

export class NameEditorComponent implements OnInit {
  formHero = new FormGroup({
    name: new FormControl(''),
  });
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}
  name = new FormControl('');

  OnInit() {
    this.getHeroes();
  }
  /*  updateName() {
      this.name.setValue('toto');
    }*/

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addName(value: any): void {
  this.heroService.addHero(value);
  }
  saveHero() {
    const hero = new Hero();
    // hero.id = '22';
    hero.name = this.formHero.get('name').value;
    this.heroService.addHero(hero);
  }

  ngOnInit(): void {
  }
}




