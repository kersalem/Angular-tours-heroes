import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Hero} from '../data/Hero';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

/*  saveHero() {
    const hero = new Hero();
    // hero.id = '22';
    hero.name = this.formHero.get('name').value;
    this.heroService.addHero(hero);
  }*/

}
