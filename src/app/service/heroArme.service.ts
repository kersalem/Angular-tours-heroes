import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HeroArme } from '../data/HeroArme';
import {MessageService} from './message.service';

import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroArmeService {
  private static url = 'heroArme';

  constructor(private db: AngularFirestore) { }


  // RÃ©cupÃ©ration des hÃ©ros
  getHeroes(): Observable<HeroArme[]> {
    return this.db.collection<HeroArme>(HeroArmeService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();
            // New Hero
            const heroArme = new HeroArme().fromJSON(data);
            // Get document id
            const id = item.payload.doc.id;
            heroArme.id = id;

            // Use spread operator to add the id to the document data
            return heroArme;

          });
        })
      );
  }

  // RÃ©cupÃ©ration d'un hÃ©ro en fonction de son id
  getHeroArme(id: string): Observable<HeroArme> {

    // Return hero observable
    return this.getHeroArmeDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const heroArme = new HeroArme().fromJSON(data);
          heroArme.id = id;

          // log
          console.log('getHero(' + id + ')');

          // Use spread operator to add the id to the document data
          return heroArme;
        })
      );
  }

  // Ajout d'un hÃ©ro
  addHeroArme(heroArme: HeroArme) {
    this.db.collection<HeroArme>(HeroArmeService.url).add(Object.assign({}, heroArme));
  }
  // Modifier un héro
  updateHeroArme(heroArme: HeroArme, updateHeroArme: HeroArme) {
    this.db.doc<HeroArme>(HeroArmeService.url + `/` + heroArme.id).update(Object.assign({}, updateHeroArme));
  }

  // Suppression d'un hÃ©ro
  deleteHeroArme(id: string) {
    // Delete the document
    this.db.doc<HeroArme>(HeroArmeService.url + `/` + id).delete();

  }
  // Création du service Firebase en fonction de l'id du hÃ©ro
  private getHeroArmeDocument(id: string): AngularFirestoreDocument<HeroArme> {

    // return document
    return this.db.doc<HeroArme>(HeroArmeService.url + `/` + id);
  }
}


