import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Arme } from '../data/arme';
import { ARMES } from '../data/mock-armes';

@Injectable({
  providedIn: 'root'
})
export class ArmeService {

  constructor() { }

  getArmes(): Observable<Arme[]> {
    return of(ARMES);
  }
}
