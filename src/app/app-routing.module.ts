import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompaniesComponent} from "./components/companies/companies.component";
import {AnalystsComponent} from "./components/analysts/analysts.component";





  const routes: Routes = [
    { path: 'analysts', component: AnalystsComponent, },
    { path: 'companies', component: CompaniesComponent },
    { path: '', redirectTo: '/companies', pathMatch: 'full' },

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {

  }

