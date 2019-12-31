import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { CustomerModel } from "../model/customer.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<CustomerModel>;
  clientDoc: AngularFirestoreDocument<CustomerModel>;
  clients: Observable<CustomerModel[]>;
  client: Observable<CustomerModel>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = db.collection('clients', ref => ref.orderBy('firstName', 'asc'))
  }

  getCustomers(): Observable<CustomerModel[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
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

  addClient(clientModel: CustomerModel){
    this.clientsCollection.add(clientModel);
  }

  getClient(id:string){
    this.clientDoc = this.db.doc<CustomerModel>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
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
    return this.client;
  }

  modifyClient(client: CustomerModel){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: CustomerModel){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
