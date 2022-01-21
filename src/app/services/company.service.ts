import {Injectable} from '@angular/core';
import {Company} from "../model/company";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies`);
  }

  public addCompany(c:Company) : Observable<any> {
    let base_url = `${this.baseUrl}/add-company`;
    return this.http.post(base_url, c)



  }



}
