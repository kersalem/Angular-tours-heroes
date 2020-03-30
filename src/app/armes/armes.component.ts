import { Component, OnInit } from '@angular/core';

import { ArmeService} from '../service/arme.service';
import { Arme } from '../data/Arme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {
  armes: Arme[];
  armeFilter: Arme[];
  order: boolean;
  constructor(private router: Router, private armeService: ArmeService) { }
  ngOnInit() {
    this.getArmes();
    this.order = false;
  }

  getArmes(): void {
   this.armeService.getArmes()
      .subscribe(armes => { this.armes = armes; this.armeFilter = armes; });
  }
  // Mise à jour arme
  updateArme(id: string) {
    this.armeService.idArme = id;
    this.router.navigateByUrl('/armeEditor');
  }
  // Trier colonnes armes
  triArme(element) {
    this.order = !this.order;
    if (this.order) {
      this.armeFilter.sort((a1, a2) => {
        if (a1[element] !== a2[element]) {
          return (a1[element] < a2[element]) ? 1 : -1;
        }
      });
    } else {
      this.armeFilter.sort((a1, a2) => {
        if (a2[element] !== a1[element]) {
          return (a2[element] < a1[element]) ? 1 : -1;
        }
      });
    }
  }
  // Filtrer nom arme
  saisiesFilter(event) {
    this.armeFilter = [];
    for (const armeF of this.armes) {
      if (armeF.name.indexOf(event.value) === 0) {
        this.armeFilter.push(armeF);
      }
    }
  }
  // Supprimer arme
  deleteArme(id: string) {
    this.armeService.deleteArme(id);
  }
}
