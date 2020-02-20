import { Component, OnInit, Input } from '@angular/core';
import {Arme} from '../data/arme';

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.css']
})
export class ArmeDetailComponent implements OnInit {
  @Input() arme: Arme;
  constructor() { }

  ngOnInit() {
  }

}
