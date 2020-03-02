import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../data/hero';
import {MessageService} from './message.service';

import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private static url = 'heroes';
  idHero: string;

  constructor(private messageService: MessageService,
              private db: AngularFirestore) { }

  /*getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.db.collection<Hero>('heroes').valueChanges();
  }*/

  // RÃ©cupÃ©ration des hÃ©ros
  getHeroes(): Observable<Hero[]> {
    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          this.messageService.add('HeroService: Voici la liste des héros');

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            // New Hero
            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            hero.id = id;

            // log
            console.log('   hero ' + id);
            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }

  // RÃ©cupÃ©ration d'un hÃ©ro en fonction de son id
  getHero(id: string): Observable<Hero> {

    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const hero = new Hero().fromJSON(data);
          hero.id = id;

          // log
          console.log('getHero(' + id + ')');

          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  // Ajout d'un hÃ©ro
  addHero(hero: Hero) {
    this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
  }
  // Modifier un héro
  updateHero(hero: Hero, updateHero: Hero) {
    this.db.doc<Hero>(HeroService.url + `/` + hero.id).update(Object.assign({}, updateHero));
  }

  // Suppression d'un hÃ©ro
  deleteHero(id: string) {
    // Delete the document
    this.db.doc<Hero>(HeroService.url + `/` + id).delete();

  }
  // Création du service Firebase en fonction de l'id du hÃ©ro
  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {

    // return document
    return this.db.doc<Hero>(HeroService.url + `/` + id);
  }
}


