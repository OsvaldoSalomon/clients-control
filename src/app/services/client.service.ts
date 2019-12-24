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

}
