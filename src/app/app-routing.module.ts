import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {EditCustomerComponent} from "./components/edit-customer/edit-customer.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthGuard} from "./guardians/auth.guard";


const routes: Routes = [
  { path: '', component: TableComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: 'client/edit/:id', component: EditCustomerComponent, canActivate:[AuthGuard] },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
