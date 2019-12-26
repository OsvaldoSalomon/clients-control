import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import {ClientModel} from "../../model/client.model";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[];

  constructor(private clientsService: ClientService) { }

  ngOnInit() {
    this.clientsService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    )
  }
}
