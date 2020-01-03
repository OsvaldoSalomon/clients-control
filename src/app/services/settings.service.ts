import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { SettingsModel } from "../model/settings.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {
  settingsDoc: AngularFirestoreDocument<SettingsModel>;
  settings: Observable<SettingsModel>;

  // Unique id of the settings collection
  id = '1';

  constructor(private db: AngularFirestore){}

  getSettings(): Observable<SettingsModel> {
    this.settingsDoc = this.db.doc<SettingsModel>(`settings/${'1'}`);
    this.settings = this.settingsDoc.valueChanges();
    return this.settings;
  }

  modifySettings(settingsModel: SettingsModel){
    this.settingsDoc = this.db.doc<SettingsModel>(`settings/${'1'}`);
    this.settingsDoc.update(settingsModel);
  }
}
