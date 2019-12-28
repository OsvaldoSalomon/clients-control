import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { ClientModel } from "../../model/client.model";
import { FlashMessagesService } from "angular2-flash-messages";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[];
  client: ClientModel = {
    firstName: '',
    lastName: '',
    email: '',
    income: 0
  };

  // @ts-ignore
  @ViewChild("clientForm") clientForm: NgForm;
  // @ts-ignore
  @ViewChild("closeButton") closeButton: ElementRef;

  constructor(
    private clientsService: ClientService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.clientsService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    )
  }

  getTotalIncome(){
    let totalIncome: number = 0;
    if (this.clients){
      this.clients.forEach( client => {
        totalIncome += client.income;
      })
    }
    return totalIncome;
  }

  add({value, valid}: {value: ClientModel, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
      this.clientsService.addClient(value);
      this.clientForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal(){
    this.closeButton.nativeElement.click();
  }
}
