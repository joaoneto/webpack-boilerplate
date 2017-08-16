import awesome, { Component } from './lib/awesome';

const app = awesome();

app.use('test', function () {
  this.foo = 'TESTE';

  this.setFoo = function (foo) {
    this.foo = foo;
  };

  this.$get = function () {
    return { foo: this.foo };
  };
});

app.init(function () {
  var x = this.configure('test');
  x.setFoo('aldksjalsdkjaslkdjas');
});

console.log(app.get('test'));
