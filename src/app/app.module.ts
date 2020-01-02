import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {AngularFirestoreModule, FirestoreSettingsToken} from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { CustomersComponent } from './components/customers/customers.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerService } from "./services/customer.service";
import { LoginService } from "./services/login.service";
import { AuthGuard } from "./guardians/auth.guard";
import {SettingsService} from "./services/settings.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    CustomersComponent,
    EditCustomerComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'clients-control'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    CustomerService,
    LoginService,
    AuthGuard,
    SettingsService,
    { provide: FirestoreSettingsToken, useValue:{} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
