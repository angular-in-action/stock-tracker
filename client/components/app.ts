/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';
import {Summary} from './summary';
import {Http, httpInjectables} from 'angular2/http';

@Component({
  selector: 'app',
  viewInjector: [httpInjectables]
})
@View({
  directives: [Summary, coreDirectives],
  template: `
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Stock Tracker</span>
      </div>
    </header>
    <main class="mdl-layout__content" style="padding: 20px;">
      <div class="demo-grid-1 mdl-grid">
        <div class="mdl-cell mdl-cell--3-col" *ng-for="#stock of stocks">
          <summary [symbol]="stock"></summary>
        </div>
      </div>
    </main>
  </div>
  `
})
export class App {

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
