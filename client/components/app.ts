/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Dashboard} from './dashboard';
import {Add} from "./add";

@RouteConfig([
  {path: '/', as: 'dashboard', component: Dashboard},
  {path: '/add', as: 'add', component: Add}
])

@Component({
  selector: 'app',
  viewInjector: [routerInjectables]
})
@View({
  directives: [coreDirectives, RouterOutlet, RouterLink],
  template: `
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Title</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" href="/">Dashboard</a>
          <a class="mdl-navigation__link" href="/add">Add Stock</a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/">Dashboard</a>
        <a class="mdl-navigation__link" href="/add">Add Stock</a>
      </nav>
    </div>
    <main class="mdl-layout__content" style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class App {
}
