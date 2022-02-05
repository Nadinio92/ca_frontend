import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../model/company";
import {Sector} from "../model/sector";

@Injectable({
  providedIn: 'root'
})
export class SectorService{
  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getSectors(): Observable<Sector[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/sectors`);
  }

}
