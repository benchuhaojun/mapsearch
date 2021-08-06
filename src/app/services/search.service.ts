import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../interface/searchinterface'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiServerUrl = environment.apiBaseUrl;
  public mypage:number;
  public mytest:string;

  constructor(private http: HttpClient) { }


  public getSearchs() : Observable<RootObject>{
    return this.http.get<RootObject>(`${this.apiServerUrl}${this.mytest}&returnGeom=Y&getAddrDetails=Y&pageNum=${this.mypage}`);
  }

  public changePageNum(param : number){
    this.mypage = param;
  }
  public changeTestParam(param : string){
    this.mytest = param;
  }
}
