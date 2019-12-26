import { Injectable } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import { ClientModel } from "../model/client.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<ClientModel>;
  clientDoc: AngularFirestoreDocument<ClientModel>;
  clients: Observable<ClientModel[]>;
  client: Observable<ClientModel>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = db.collection('clients', ref => ref.orderBy('firstName', 'asc'))
  }

  getClients(): Observable<ClientModel[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ClientModel;
          data.id = action.payload.doc.id;
          return data;
        })
      })
    );
    return this.clients;
  }

  addClient(clientModel: ClientModel){
    this.clientsCollection.add(clientModel);
  }

  getClient(id:string){
    this.clientDoc = this.db.doc<ClientModel>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(
        action=> {
          if (action.payload.exists === false){
            return null;
          }
          else {
            const data = action.payload.data() as ClientModel;
            data.id = action.payload.id;
            return data;
          }
        })
    );
    return this.client;
  }

  modifyClient(client: ClientModel){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: ClientModel){
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
