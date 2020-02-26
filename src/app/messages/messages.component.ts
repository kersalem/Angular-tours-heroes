import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: string[] = [];
  constructor(public messageService: MessageService) {}
/*  add(message: string) {
    this.messages.push(message);
  }*/
/*
  clear() {
    this.messages = [];
  }
*/

  ngOnInit() {
  }

}
