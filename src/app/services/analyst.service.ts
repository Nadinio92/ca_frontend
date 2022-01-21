import { Injectable } from '@angular/core';
import {Analyst} from "../model/analyst";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalystService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  public getAnalysts(): Observable<Analyst[]>{
    return this.http.get<Analyst[]>(`${this.baseUrl}/analysts`)
  }

  public addAnalyst(a:Analyst): Observable<any>{
    let base_url = `${this.baseUrl}/add-analyst`;
    return this.http.post(base_url, a)
  }
}
