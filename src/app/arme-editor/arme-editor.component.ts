import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArmeService } from '../service/arme.service';
import { Arme } from '../data/Arme';
import {Router} from '@angular/router';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-arme-editor',
  templateUrl: './arme-editor.component.html',
  styleUrls: ['./arme-editor.component.css']
})


export class ArmeEditorComponent implements OnInit {
  @Input() arme: Arme;
  profileForm = new FormGroup({
    name: new FormControl(''),
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
  constructor(private router: Router, private armeService: ArmeService, private messageService: MessageService) { }
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
    arme.name = this.profileForm.get('name').value;
    arme.attaque = this.profileForm.get('attaque').value;
    arme.esquive = this.profileForm.get('esquive').value;
    arme.degats = this.profileForm.get('degats').value;
    arme.pointDeVie = this.profileForm.get('pointDeVie').value;
    this.totalPoints = arme.attaque.valueOf() + arme.esquive.valueOf() + arme.degats.valueOf() + arme.pointDeVie.valueOf();
    if (this.totalPoints === 0) {
      this.router.navigateByUrl('/armes');
      if (this.getArme) {
          arme.id = this.getArme.id;
          this.armeService.updateArme(this.getArme, arme);
        } else {
        this.armeService.addArme(arme);
        }
    } else {
      this.messageService.add('Le total doit être égal à 0');
    }
  }
  limitNumber(caracteristique, numberEdit) {
    switch (caracteristique) {
      case 'attaque':
        this.attaqueValid = (numberEdit > -6 && numberEdit < 6);
        if (numberEdit < -5 || numberEdit > 5) {
          this.messageService.add('Choisissez un chifre en -5 et 5');
        }
        break;
      case 'esquive':
        this.esquiveValid = (numberEdit > -6 && numberEdit < 6);
        if (numberEdit < -5 || numberEdit > 5) {
          this.messageService.add('Choisissez un chifre en -5 et 5');
        }
        break;
      case 'degats':
        this.degatsValid = (numberEdit > -6 && numberEdit < 6);
        if (numberEdit < -5 || numberEdit > 5) {
          this.messageService.add('Choisissez un chifre en -5 et 5');
        }
        break;
      case 'pointDeVie':
        this.pvValid = (numberEdit > -6 && numberEdit < 6);
        if (numberEdit < -5 || numberEdit > 5) {
          this.messageService.add('Choisissez un chifre en -5 et 5');
        }
        break;
      default:
    }
    this.ifCorrect = this.attaqueValid && this.esquiveValid && this.degatsValid && this.pvValid;
  }

}
