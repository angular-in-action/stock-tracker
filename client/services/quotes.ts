/// <reference path="../../typings/tsd.d.ts"/>

import {Http} from 'angular2/http';

export class QuotesService {

  url: string = 'http://localhost:8080/api?symbols=';
  http: Http;

  constructor(http: Http) {
    console.log(http);
  }

  search(symbols: Array<string>) { //: Rx.Observable<any[]> {
    /*return this.http.get(`${this.url}${symbols.join(',')}`).
      toRx().
      map(res => res.json());*/
  }

}
