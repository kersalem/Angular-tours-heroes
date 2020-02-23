import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArmeService } from '../service/arme.service';
import { Arme } from '../data/Arme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-arme-editor',
  templateUrl: './arme-editor.component.html',
  styleUrls: ['./arme-editor.component.css']
})
export class ArmeEditorComponent implements OnInit {
  profileForm = new FormGroup({
    nom: new FormControl(''),
    attaque: new FormControl('0'),
    esquive: new FormControl('0'),
    degats: new FormControl('0'),
    pointDeVie: new FormControl('0'),
  });
  armes: Arme[];
  getArme: Arme;

  constructor(private router: Router, private armeService: ArmeService) { }
  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

  ngOnInit() {
    this.getArmes();
    if (this.armeService.idArme) {
      this.armeService.getArme(this.armeService.idArme)
        .subscribe(value => this.getArme = value);
      this.armeService.idArme = null;
    }
  }
  saveArme() {
    const arme = new Arme();
    arme.nom = this.profileForm.get('nom').value;
    arme.attaque = this.profileForm.get('attaque').value;
    arme.esquive = this.profileForm.get('esquive').value;
    arme.degats = this.profileForm.get('degats').value;
    arme.pointDeVie = this.profileForm.get('pointDeVie').value;
    this.router.navigateByUrl('/armes');
    if (this.getArme) {
      arme.id = this.getArme.id;
      this.armeService.updateArme(this.getArme, arme);
    } else {
        this.armeService.addArme(arme);
    }
  }

}
