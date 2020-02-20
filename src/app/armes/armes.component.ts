import { Component, OnInit } from '@angular/core';

import { Arme } from '../data/arme';
import { ARMES } from '../data/mock-armes';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {
  armes = ARMES;
  constructor() { }
  ngOnInit() {
  }

}

