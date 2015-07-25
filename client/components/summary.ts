/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Directive, coreDirectives} from 'angular2/angular2';

declare var componentHandler: any;

@Component({
  selector: 'summary',
  properties: ['stock: symbol']
})
@View({
  directives: [coreDirectives],
  template: `
  <style>
    .demo-card-event.mdl-card {
      width: 100%;
      height: 250px;
    }
    .demo-card-event > .mdl-card__actions {
      border-color: rgba(255, 255, 255, 0.2);
    }
    .demo-card-event > .mdl-card__title {
      align-items: flex-start;
    }
    .demo-card-event > .mdl-card__title > h4 {
      margin-top: 0;
    }
    .demo-card-event > .mdl-card__actions {
      display: flex;
      box-sizing:border-box;
      align-items: center;
    }
    .demo-card-event > .mdl-card__title,
    .demo-card-event > .mdl-card__actions,
    .demo-card-event > .mdl-card__actions > .mdl-button {
      color: #fff;
    }
  </style>
  <div class="mdl-card mdl-shadow--2dp demo-card-event">
    <div *ng-if="!stock" class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
    <span *ng-if="stock">
      <div class="mdl-card__title mdl-card--expand">
        <h4>
          {{stock.symbol.toUpperCase()}}<br />
          {{stock.lastTradePriceOnly | currency:'USD':true}}<br />
          {{stock.change | currency:'USD':true}} {{stock.changeInPercent | percent}}
        </h4>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          View {{stock.name}}
        </a>
      </div>
    </span>
  </div>`
})
export class Summary {
  constructor() {
    setTimeout(function() {
      componentHandler.upgradeAllRegistered();
    })
  }
}
