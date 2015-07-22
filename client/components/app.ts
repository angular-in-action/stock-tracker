/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  template: `
    <h1 class="title">{{ title }}</h1>
  `
})
export class App {
  title: string;
  constructor() {
    this.title = 'Angular2!';
  }
}
