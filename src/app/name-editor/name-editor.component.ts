import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroService } from '../service/hero.service';
import { Hero } from '../data/Hero';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})

export class NameEditorComponent implements OnInit {
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

  addName(): void {
  this.heroService.addHero();
  }

  ngOnInit(): void {
  }
}




