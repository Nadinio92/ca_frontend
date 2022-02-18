import {Injectable} from '@angular/core';
import {Company} from "../model/company";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyModify} from "../model/company-modify";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly baseUrl = `${environment.API_URL}/company`;

  constructor(private http: HttpClient) {}

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  public addCompany(c: CompanyModify): Observable<number> {
    return this.http.post<number>(this.baseUrl, c)
  }

  public updateCompany(c: CompanyModify): Observable<number> {
    return this.http.put<number>(this.baseUrl, c)
  }

  public deleteCompany(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getCompanyForUpdate(id: number) : Observable<CompanyModify> {
    return this.http.get<CompanyModify>(`${this.baseUrl}/${id}`);
  }

}

