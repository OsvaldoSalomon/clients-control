import { Component, OnInit } from '@angular/core';
import { CustomerModel } from "../../model/customer.model";
import { CustomerService } from "../../services/customer.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: CustomerModel = {
    firstName: '',
    lastName: '',
    email: '',
    income: 0
  };

  id:string;

  constructor(
    private customersService: CustomerService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customersService.getCustomer(this.id).subscribe(customer => {
      this.customer = customer;
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
      this.customersService.modifyCustomer(value);
      this.router.navigate(['/']);
    }
  }

  delete(){
    if (confirm('Are you sure you want to delete the customer?')) {
      this.customersService.deleteCustomer(this.customer);
      this.router.navigate(['/']);
    }
  }

}
