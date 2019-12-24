import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ConfigurationComponent} from "./components/configuration/configuration.component";
import {EditClientComponent} from "./components/edit-client/edit-client.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'client/edit/:id', component: EditClientComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
