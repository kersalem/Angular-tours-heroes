import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Arme } from '../data/arme';
import { MessageService } from './message.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArmeService {

  private static url = 'armes';
  idArme: string;
  constructor(private db: AngularFirestore, private messageService: MessageService) { }

  getArmes(): Observable<Arme[]> {
    return this.db.collection<Arme>(ArmeService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          return liste.map(item => {

            const data = item.payload.doc.data();
            const arme = new Arme().fromJSON(data);
            const id = item.payload.doc.id;
            arme.id = id;
            return arme;
          });
        })
      );
  }

  getArme(id: string): Observable<Arme> {
    // Return arme observable
    return this.getArmeDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          // Get document data
          const data = item.payload.data();
          // New Arme
          const arme = new Arme().fromJSON(data);
          arme.id = id;
          console.log('arme: ', arme );
          // Use spread operator to add the id to the document data
          return arme;
        })
      );
  }

  // Ajouter une arme
  addArme(arme: Arme) {
    this.db.collection<Arme>(ArmeService.url).add(Object.assign({}, arme));
  }
  // Modifier une arme
  updateArme(arme: Arme, updateArme: Arme) {
    this.db.doc<Arme>(ArmeService.url + `/` + arme.id).update(Object.assign({}, updateArme));
  }
  // Supprimer une arme
  deleteArme(id: string) {
    this.db.doc<Arme>(ArmeService.url + `/` + id).delete();
  }

  private getArmeDocument(id: string): AngularFirestoreDocument<Arme> {
    return this.db.doc<Arme>(ArmeService.url + `/` + id);
  }
}
