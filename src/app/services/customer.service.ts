import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { CustomerModel } from "../model/customer.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CustomerService {
  customersCollection: AngularFirestoreCollection<CustomerModel>;
  clientDoc: AngularFirestoreDocument<CustomerModel>;
  clients: Observable<CustomerModel[]>;
  customer: Observable<CustomerModel>;

  constructor(private db: AngularFirestore) {
    this.customersCollection = db.collection('clients', ref => ref.orderBy('firstName', 'asc'))
  }

  getCustomers(): Observable<CustomerModel[]>{
    this.clients = this.customersCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CustomerModel;
          data.id = action.payload.doc.id;
          return data;
        })
      })
    );
    return this.clients;
  }

  addCustomer(customerModel: CustomerModel){
    this.customersCollection.add(customerModel);
  }

  getCustomer(id:string){
    this.clientDoc = this.db.doc<CustomerModel>(`clients/${id}`);
    this.customer = this.clientDoc.snapshotChanges().pipe(
      map(
        action=> {
          if (action.payload.exists === false){
            return null;
          }
          else {
            const data = action.payload.data() as CustomerModel;
            data.id = action.payload.id;
            return data;
          }
        })
    );
    return this.customer;
  }

  modifyCustomer(client: CustomerModel){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteCustomer(customer: CustomerModel){
    this.clientDoc = this.db.doc(`clients/${customer.id}`);
    this.clientDoc.delete();
  }
}
