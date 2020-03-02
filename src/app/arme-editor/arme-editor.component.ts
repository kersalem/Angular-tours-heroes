import { Component, OnInit, Input } from '@angular/core';
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
  @Input() arme: Arme;
  profileForm = new FormGroup({
    nom: new FormControl(''),
    attaque: new FormControl('0'),
    esquive: new FormControl('0'),
    degats: new FormControl('0'),
    pointDeVie: new FormControl('0'),
  });
  armes: Arme[];
  getArme: Arme;
  totalPoints: number;
  message: string;
  ifCorrect: boolean;
  attaqueValid: boolean;
  esquiveValid: boolean;
  degatsValid: boolean;
  pvValid: boolean;
  constructor(private router: Router, private armeService: ArmeService) { }
  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

  ngOnInit() {
    this.message = '';
    this.totalPoints = 0;
    this.ifCorrect = true;
    this.attaqueValid = true;
    this.esquiveValid = true;
    this.degatsValid = true;
    this.pvValid = true;
    this.getArmes();
    if (this.armeService.idArme) {
      this.armeService.getArme(this.armeService.idArme)
        .subscribe(value => this.getArme = value);
      this.armeService.idArme = null;
    }
  }
  saveArme() {
    const arme = new Arme();
    this.totalPoints = 0;
    arme.nom = this.profileForm.get('nom').value;
    arme.attaque = this.profileForm.get('attaque').value;
    console.log('arme.attaqueeeeeeeeeeeeeeeeeeeeee', arme.attaque);
    arme.esquive = this.profileForm.get('esquive').value;
    arme.degats = this.profileForm.get('degats').value;
    arme.pointDeVie = this.profileForm.get('pointDeVie').value;
    this.totalPoints = arme.attaque.valueOf() + arme.esquive.valueOf() + arme.degats.valueOf() + arme.pointDeVie.valueOf();
    if (this.totalPoints === 0) {
      this.router.navigateByUrl('/armes');
      if (this.getArme) {
          arme.id = this.getArme.id;
          console.log(' this.totalPoints', this.totalPoints);

          this.armeService.updateArme(this.getArme, arme);
        } else {
        console.log('error');
        this.armeService.addArme(arme);
        }
       /* if (this.getTotal() !== 0) {
          this.message = 'Le total des points doit être égale à 0';
        } else {
          this.message = 'okay';
          arme.id = this.getArme.id;
          console.log('modiffffffff');
          this.armeService.updateArme(this.getArme, arme);
        }
      } else {
        this.message = 'toto';
        console.log('creationnnnnnnnnnnnnnnnnnnn');
        this.armeService.addArme(arme);
      }*/
    } else {
      console.log('creation et modif NOK');
      this.message = 'toto';
    }
  }
  getTotal(nvelleValeur) {
    console.log(this.totalPoints);
    console.log(nvelleValeur + typeof nvelleValeur.valueOf());
    this.totalPoints = this.totalPoints + nvelleValeur.valueOf();
  }
  limitNumber(caracteristique, numberEdit) {
    switch (caracteristique) {
      case 'attaque':
        this.attaqueValid = (numberEdit > -6 && numberEdit < 6);
        break;
      case 'esquive':
        this.esquiveValid = (numberEdit > -6 && numberEdit < 6);
        break;
      case 'degats':
        this.degatsValid = (numberEdit > -6 && numberEdit < 6);
        break;
      case 'pointDeVie':
        this.pvValid = (numberEdit > -6 && numberEdit < 6);
        break;
      default:
        console.log('Je rentre switch');
    }
    this.ifCorrect = this.attaqueValid && this.esquiveValid && this.degatsValid && this.pvValid;
  }

}
