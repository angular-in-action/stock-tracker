/// <reference path="../../typings/tsd.d.ts"/>

let key = 'stocks';

export class StocksService {

  get() {
    let value = localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (err) {
      value = [];
    }
    return value;
  }

  set(value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  add(stock) {
    let value = this.get();
    value.push(stock);
    this.set(value);
  }

  remove(stock) {
    let value = this.get();
    value.splice(value.indexOf(stock), 1);
    this.set(value);
  }
}
