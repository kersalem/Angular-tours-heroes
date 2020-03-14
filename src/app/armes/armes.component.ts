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
  order: boolean;
  constructor(private router: Router, private armeService: ArmeService) { }
  ngOnInit() {
    this.getArmes();
    this.order = false;
  }

  getArmes(): void {
   this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

/*  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => {this.armes = armes; methode});
  }*/

  updateArme(id: string) {
    this.armeService.idArme = id;
    this.router.navigateByUrl('/armeEditor');
  }

  deleteArme(id: string) {
    this.armeService.deleteArme(id);
  }

  triArme(element) {
    this.order = !this.order;
    if (this.order) {
      this.armes.sort(function(a1, a2) {
        return (a1[element] < a2[element]) ? 1 : -1;
      });
    } else {
      this.armes.sort(function(a1, a2) {
        return (a2[element] <= a1[element]) ? 1 : -1;
      });
    }
  }
}
