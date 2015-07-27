/// <reference path="../../typings/tsd.d.ts"/>

import {Component, View, coreDirectives, NgStyle} from 'angular2/angular2';

@Component({
  selector: 'bar-chart',
  properties: ['quotes: quotes']
})
@View({
  directives: [coreDirectives, NgStyle],
  template: `
<style>
.bar {
  width: 0.27%;
  background: #999;
  display: inline-block;
  border-top: 1px solid #333;
  border-bottom: 3px solid #999;
}
</style>
<div class="bar-chart" style="margin-top: 60px;">
  <div class="bar" *ng-for="#point of getQuotes()" (mouseout)="detail = null" (mouseover)="detail = point" [ng-style]="{height: point.height + 'px', marginTop: (max - point.height) + 'px'}"></div>
</div>
<div *ng-if="detail" class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {{detail.date | date:'mediumDate'}}
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    {{detail.close | currency:'USD':true:'.2'}}
  </div>
</div>
`
})
export class BarChart {
  quotes: Array<any>;
  max: number;
  min: number;
  detail: any;

  getQuotes() {
    this.max = this.quotes[0].adjClose;
    this.min = this.quotes[0].adjClose;
    this.quotes.forEach((quote) => {
      if (quote.adjClose > this.max) {
        this.max = quote.adjClose;
      }
      if (quote.adjClose < this.min) {
        this.min = quote.adjClose;
      }
    });
    let multiplier = 100 / (this.max - this.min);
    this.quotes.forEach((quote) => {
      quote.date = new Date(quote.date);
      quote.height = (quote.adjClose - this.min) * multiplier;
    });
    return this.quotes;
  }

}
