import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableCompany} from "./companies/companies.component";
import {TableAnalysts} from "./analysts/analysts.component"; // CLI imports router




const routes: Routes = [
  { path: 'analysts', component: TableAnalysts },
  { path: 'companies', component: TableCompany },
  { path: '', redirectTo: '/companies', pathMatch: 'full' },



]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

