/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives, CSSClass} from 'angular2/angular2';

@Component({
  selector: 'summary',
  properties: ['stock: symbol']
})
@View({
  directives: [coreDirectives, CSSClass],
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
<div class="mdl-card mdl-shadow--2dp" [class]="getClass()" style="width: 100%; min-height: auto;">
  <span *ng-if="stock">
    <div class="mdl-card__title">
      <h4 style="color: #fff; margin: 0">
        {{stock.symbol.toUpperCase()}}<br />
        {{stock.lastTradePriceOnly | currency:'USD':true:'.2'}}<br />
        {{stock.change | currency:'USD':true:'.2'}} ({{stock.changeInPercent | percent}})
      </h4>
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
