import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from "../../services/customer.service";
import { CustomerModel } from "../../model/customer.model";
import { FlashMessagesService } from "angular2-flash-messages";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-clients',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: CustomerModel[];
  customer: CustomerModel = {
    firstName: '',
    lastName: '',
    email: '',
    income: 0
  };

  // @ts-ignore
  @ViewChild("customerForm") customerForm: NgForm;
  // @ts-ignore
  @ViewChild("closeButton") closeButton: ElementRef;

  constructor(
    private customersService: CustomerService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      clients => {
        this.customers = clients;
      }
    )
  }

  getTotalBalance(){
    let totalBalance: number = 0;
    if (this.customers){
      this.customers.forEach(customer => {
        totalBalance += customer.income;
      })
    }
    return totalBalance;
  }

  add({value, valid}: {value: CustomerModel, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
      this.customersService.addCustomer(value);
      this.customerForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal(){
    this.closeButton.nativeElement.click();
  }
}


