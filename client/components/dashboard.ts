/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Http, httpInjectables} from 'angular2/http';

import {Summary} from './summary';

declare var componentHandler: any;

@Component({
  selector: 'dashboard',
  properties: ['stock: symbol'],
  viewInjector: [httpInjectables]
})
@View({
  directives: [coreDirectives, Summary],
  template: `<div class="demo-grid-1 mdl-grid">
  <div class="mdl-cell mdl-cell--3-col" *ng-for="#stock of stocks">
    <summary [symbol]="stock"></summary>
  </div>
</div>`
})
export class Dashboard {
  stocks: any;
  symbols: Array<string>;

  constructor(http: Http) {
    this.symbols = ['aapl','ebay','fb','goog','amzn'];
    this.stocks = this.symbols.map(symbol => {symbol: symbol});
    http.get('/api?symbols=' + this.symbols.join())
      .toRx()
      .map(res => res.json())
      .subscribe(stocks => this.stocks = stocks);
  }
}
