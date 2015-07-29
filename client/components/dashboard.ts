/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Http, httpInjectables} from 'angular2/http';

import {Summary} from './summary';
import {StocksService} from '../services/stocks';

@Component({
  selector: 'dashboard',
  properties: ['stock: symbol'],
  viewInjector: [httpInjectables, StocksService]
})
@View({
  directives: [coreDirectives, Summary],
  template: `
<h1>
<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--3-col" *ng-for="#stock of stocks">
    <summary [symbol]="stock"></summary>
  </div>
</div>`
})
export class Dashboard {
  stocks: any;
  symbols: Array<string>;

  constructor(http: Http, service: StocksService) {

    this.symbols = service.get();

    if (this.symbols) {
      http.get('/api/snapshot?symbols=' + this.symbols.join())
        .toRx()
        .map(res => res.json())
        .subscribe(stocks => this.stocks = stocks);
    }
  }
}
