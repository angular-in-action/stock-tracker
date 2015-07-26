/// <reference path="../../typings/tsd.d.ts" />

// @TODO Router isn't actually loading the stocks component with params, might be bug
// See https://github.com/angular/router/issues/353

import {Component, View, coreDirectives, CSSClass} from 'angular2/angular2';
import {RouterLink, routerInjectables} from 'angular2/router';

@Component({
  selector: 'summary',
  properties: ['stock: symbol'],
  viewInjector: [routerInjectables]
})
@View({
  directives: [coreDirectives, RouterLink, CSSClass],
  template: `
<style>
  .mdl-card.increase {
    background: #558B2F;
    color: #fff;
  }
  .mdl-card.decrease {
    background: #C62828;
    color: #fff;
  }
</style>
<div class="mdl-card mdl-shadow--2dp" [class]="getClass()" style="width: 100%;">
  <span *ng-if="stock">
    <div class="mdl-card__title mdl-card--expand">
      <h4 style="color: #fff; margin-top: 0">
        {{stock.symbol.toUpperCase()}}<br />
        {{stock.lastTradePriceOnly | currency:'USD':true:'.2'}}<br />
        {{stock.change | currency:'USD':true:'.2'}} ({{stock.changeInPercent | percent}})
      </h4>
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored" style="color: #fff;" [router-link]="['/stocks', {symbol: stock.symbol}]">
        View {{stock.name}}
      </a>
    </div>
  </span>
</div>
`
})
export class Summary {
  stock: any;

  getClass() {
    if (!this.stock) {
      return;
    }

    if (this.stock.change > 0) {
      return 'increase';
    } else if (this.stock.change < 0) {
      return 'decrease';
    }
  }
}
