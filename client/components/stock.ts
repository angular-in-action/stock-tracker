/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';
import {Http, httpInjectables} from 'angular2/http';
import {RouteParams} from 'angular2/router';

import {BarChart} from './bar-chart';

@Component({
  selector: 'stock',
  viewInjector: [httpInjectables]
})
@View({
  directives: [coreDirectives, BarChart],
  template: `
<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <h3>{{symbol.toUpperCase()}}</h3>
  </div>
  <div class="mdl-cell mdl-cell--4-col">
    <bar-chart *ng-if="quotes" [quotes]="quotes"></bar-chart>
  </div>
  <div class="mdl-cell mdl-cell--2-col">2</div>
</div>
`
})
export class Stock {
  symbol: string;
  quotes: Array<any>;

  constructor(params: RouteParams, http: Http) {

    this.symbol = params.get('symbol')

    http.get('/api/historical/' + this.symbol)
      .toRx()
      .map(res => res.json())
      .subscribe(quotes => this.quotes = quotes);
  }
}
