import { Component, OnInit, Input } from '@angular/core';

import {Arme} from '../data/arme';
import {ArmeService} from '../service/arme.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.css']
})
export class ArmeDetailComponent implements OnInit {
  arme: Arme;
  rest: number;

  constructor(
    private route: ActivatedRoute,
    private armeService: ArmeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArme();
  }
  // Obtenir infos arme en fonction de son id
  getArme(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.armeService.getArme(id)
      .subscribe(arme => this.arme = arme);
  }
  // Retour url précédente
  goBack(): void {
    this.location.back();
  }
}
