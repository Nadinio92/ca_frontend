import { Injectable } from '@angular/core';
import {Analyst} from "../model/analyst";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AnalystModify} from "../model/analyst-modify";
import {CompanyModify} from "../model/company-modify";

@Injectable({
  providedIn: 'root'
})
export class AnalystService {


  private readonly baseUrl = `${environment.API_URL}/analyst`;

  constructor(private http: HttpClient) { }


  public getAnalysts(): Observable<Analyst[]>{
    return this.http.get<Analyst[]>(this.baseUrl)
  }

  public addAnalyst(a:AnalystModify): Observable<number>{
    return this.http.post<number>(this.baseUrl, a)
  }

  public deleteAnalyst(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  public updateAnalyst(c: AnalystModify): Observable<number> {
    return this.http.put<number>(this.baseUrl, c)
  }

  getAnalystForUpdate(id: number) : Observable<AnalystModify> {
    return this.http.get<AnalystModify>(`${this.baseUrl}/${id}`);
  }


}
