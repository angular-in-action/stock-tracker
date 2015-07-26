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
  template: `
<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--12-col" *ng-if="!stocks" style="text-align: center;">
    <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
  </div>
  <div class="mdl-cell mdl-cell--3-col" *ng-for="#stock of stocks">
    <summary [symbol]="stock"></summary>
  </div>
</div>`
})
export class Dashboard {
  stocks: any;
  symbols: Array<string>;

  constructor(http: Http) {
    setTimeout(function() {
      componentHandler.upgradeAllRegistered();
    })

    this.symbols = ['aapl','ebay','fb','goog','amzn'];

    http.get('/api?symbols=' + this.symbols.join())
      .toRx()
      .map(res => res.json())
      .subscribe(stocks => this.stocks = stocks);
  }
}
