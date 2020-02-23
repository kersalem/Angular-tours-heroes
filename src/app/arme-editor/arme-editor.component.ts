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
    nom: new FormControl('')
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
    this.router.navigateByUrl('/armes');
    if (this.getArme) {
      arme.id = this.getArme.id;
      this.armeService.updateArme(this.getArme, arme);
    } else {
        this.armeService.addArme(arme);
    }
  }

}
