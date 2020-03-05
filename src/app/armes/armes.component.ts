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
  constructor(private router: Router, private armeService: ArmeService) { }
  ngOnInit() {
    this.getArmes();
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
}
