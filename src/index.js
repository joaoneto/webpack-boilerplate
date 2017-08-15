import awesome, { Component } from './lib/awesome';

const app = awesome();

app.use(new Component('test', function () {
  this.setFoo = function (foo) {
    this.foo = foo;
  };

  return {
    foo: 'TESTE'
  };
}));

app.init(function () {
  this.get('test').setFoo('LOL');
});

let x = app.configure('test');
console.log(x)
