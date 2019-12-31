import { Component, OnInit } from '@angular/core';
import { CustomerModel } from "../../model/customer.model";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  client: CustomerModel = {
    firstName: '',
    lastName: '',
    email: '',
    balance: 0
  };

  id:string;

  constructor(
    private clientsService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientsService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  save({value, valid}: {value: CustomerModel, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
      value.id = this.id;
      this.clientsService.modifyClient(value);
      this.router.navigate(['/']);
    }
  }

  delete(){
    if (confirm('Are you sure you want to delete the customer?')) {
      this.clientsService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }

}
