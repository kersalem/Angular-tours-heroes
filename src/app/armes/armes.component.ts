import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MessageService } from '../service/message.service';
import { ArmeService} from '../service/arme.service';
import { Arme } from '../data/arme';
import { ARMES } from '../data/mock-armes';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {
  armes = ARMES;
  selectedArme: Arme;
  constructor(private router: Router, private armeService: ArmeService, private messageService: MessageService) { }
  ngOnInit() {
    this.getArmes();
  }

  getArmes(): void {
   this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

  updateArme(id: string) {
    this.armeService.idArme = id;
    this.router.navigateByUrl('/armeEditor');
  }

  deleteArme(id: string) {
    this.armeService.deleteArme(id);
  }
  onSelect(arme: Arme): void {
    this.selectedArme = arme;
    this.messageService.add('HeroService: Selected arme id=${arme.id}');
  }
}

