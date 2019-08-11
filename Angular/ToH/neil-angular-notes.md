## Angular Notes

### Setup

`npm install -g @angular/cli`

### Angular's template syntax:

Any directive with an * is a structural directive (changes DOM), eg: `*ngFor="let product of products; index as productId"`

{{ }} interpolation syntax, eg: `<h3>{{ product.name }}</h3>`

property binding [ ] syntax, eg: `[title]="product.name + ' details'"`, `[routerLink]="['/products', productId]"`

[(ngModel)] is Angular's two-way data binding syntax., eg: `<input [(ngModel)]="hero.name" placeholder="name"/>`

Event binding is done by using ( ) around the event,eg: `<button (click)="share()">Share</button>`

 @Component decorator indicates that the following class is a component. Describes metadata (selector (app-{my-component-name}), templateUrl, styleUrls).


### Routing
app.module.ts imports a RouterModule.

`ng generate module app-routing --flat --module=app` (flat puts the file in src/app)


### Other fundamentals are a todo

## Tour of Heroes Notes

`ng new angular-tour-of-heroes`

```
cd angular-tour-of-heroes
ng serve --open
```

https://angular.io/tutorial/toh-pt6


`ng generate service hero` notice the the @Injectable() decorator


`HeroService.getHeroes()` must have an asynchronous signature of some kind. It can take a callback. It could return a Promise. It could return an Observable.

"In this tutorial, HeroService.getHeroes() will return an Observable in part because it will eventually use the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable. Observable is one of the key classes in the RxJS library..."

`<li *ngFor="let hero of heroes$ | async" >`

"The $ is a convention that indicates heroes$ is an Observable, not an array.

The *ngFor can't do anything with an Observable. But there's also a pipe character (|) followed by async, which identifies Angular's AsyncPipe.

The AsyncPipe subscribes to an Observable automatically so you won't have to do so in the component class."



### Angular Guide notes

`{{value}}`

`[property]=3D"value"` , eg: [hero]=3D"selectedHero

`(event) =3D "handler"`, eg: selectHero(hero)

`[(ng-model)] =3D "property"`

### Unit Testing Angular

https://www.youtube.com/watch?v=3DlTKhB6uAmno

Karma (test runner. looks for ) and Jasmine (testing framework). Protractor=
 for e2e tests.

describe() //suite
it() //spec / test

`ng test`

#### Faking Dependencies

manually - such as from a service
```
let fakeJokeService =3D {
    getJoke: () =3D> Observable.of('FAKE_JOKE');
};

let component =3D new JokeComponent(fakeJokeService);
```

##### Jamine Spies

Can intercept existing service / override for tests.

```
let fakeJokeService =3D jasmine.createSpyObj('jokeService', ['getJoke]);

fakeJokeService.getJoke.and.returnValue(Observable.of('FAKE_JOKE'));

let component =3D new JokeComponent(fakeJokeService);
```

'expect(jokeService,getJoke).toHaveBeenCalled();`
'expect(jokeService,getJoke).toHaveBeenCalledWith('Dad Jokes');`

##### TestBed API

Isolated - no HTML template

Shallow - HTML template, no child components

Runs everything in a "zone". zones define an execution context for async op=
s.

when tests are wrapped in async keyword they run in their own(?) async  tes=
ting zone (microtask on queue). .whenStable() runs when all tasks complete.
faekAsync tick() simulates the passage of time until all async request comp=
lete.

#### e2e tests

test a user story.

`ng e2e`



#### Typescript

The process of converting TypeScript into ES5 is called transpilation and we use a tool called `tsc` to
compile on the command line.

```
npm install -g typescript
tsc -
tsc hello.ts // will transpile into hello.js
```

always `"use strict";`

Both let and const create variables that are block-scoped.

`backticked strings can be multiline and support string interpolation ${name}`

Es6 has fat arrow functions `setTimeout(() => console.log("setTimeout called!"), 1000);` (for multiline functions use curly braces).

A better example:

```
let add = function(a,b) {
  return a + b;
};

//can be..
let add = (a,b) => a + b;
```

In ES6, if we use fat arrow functions the value of `this` inside a fat arrow
function will be the same as the value of this outside the fat arrow function.
It uses the value of this from the surrounding code for its context. i.e. whatever this points to in the
surrounding code, this will point to in the function body of the fat arrow function



Destructuring is a way of extracting values into variables from data stored in objects and arrays.
```
const obj = {fn: 'Asim', sn: 'Hussain', age: vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv 39 };
// {prop} is short for {prop: prop}
const {fn, sn} = obj;
console.log(fn); // Asim
console.log(sn); // Hussain
```

```
let array = [1,2,3];
array.forEach(function (value) {
  console.log(value);
});
```

```
// The for-in loop is designed for iterating over an objects properties, 
var obj = {a:1,b:2};
for (let prop in obj) {
  console.log(prop);
}
```

```
// for-of doesn't cast so string like for-in, and works with break, continue and return. use this one.
let array = [10,20,30];
for (var value of array) {
  console.log(value);
}
```

In ES5 and below the only data structure we had to map keys to values was an Object, eg: `let obj = {key: "value", a: 1}` and use `obj.hasOwnProperty(prop)` to restrict the listing of the objects properties to just those of the object (rather than base class properties, for instance).

Map is a new data structure introduced in ES6 which lets you map keys to values without the
drawbacks of using Objects. Maps record the order in which
elements are inserted.

```
let map = new Map();
map.set("A",1);
map.set("B",2).set("C",3); // it's also chainable

map.get("A"); // 1
map.has("A"); // true
map.size; // 2
map.clear();
```

for-of can be used to loop over a map:

`for (let key of map.keys()) { ... }` and `for (let value of map.values()) { ... }`

```
// The entries method returns the [key,value] pairs in the map as an array 
for (let entry of map.entries()) {
  console.log(entry[0], entry[1]);
}
// "APPLE" 1
// "ORANGE" 2
// "MANGO" 3
```

```
// Using destructuring we can access the keys and values directly, like so:
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "APPLE" 1 etc
```

Looping over key-value pairs via entries is so common that this is the default for a Map.
Therefore we don’t even need to call entries() on a map instance, like so: `for (let [key, value] of map) { ... }`

Sets are a bit like maps but they only store keys not key-value pairs.
Sets can only store unique values.
A set can be created using .add() or initialised from an array.
Sets also record the order in which elements are inserted, it then
replays that order when looping.


```
let set = new Set(['APPLE', 'ORANGE', 'MANGO']);
set.has('APPLE')
set.delete('APPLE');

for (let entry of set) { ... }
```

##### Promises (again)

A promise is a placeholder for a future value. `var promise = new Promise((resolve, reject) => { });`

We pass to Promise an inner function that takes two arguments (which are in fact functions themseleves). Inside this inner function we perform our asynchronous processing and then when we are ready we call resolve(), like so:

```
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
  console.log("Async Work Complete");
  resolve();
  }, 1000);
});
```


```
// We usually return this promise from a function, like so:
function doAsyncTask() {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async Work Complete");
      if (error) {
        reject();
      } else {
        resolve();
      }
    }, 1000);
  });
  return promise;
}
```

We can get notified when a promise resolves by attaching a success handler to its then function `doAsyncTask().then(() => console.log("Task Complete!"));`

```
// then can take two arguments, the second argument is a error handler that gets called if the promise
is rejected
doAsyncTask().then(
  () => console.log("Task Complete!"),
  () => console.log("Task Errored!"),
);


```




#### Jokes Notes

We can create local template variables by adding variables starting with the # character on any
element in our template. 
```
<input type="text" class="form-control" placeholder="Enter the punchline" #punchline>
<button type="button" class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create</button>
```

Use EventEmitters to emit events. So given a class with an output declaration

 `@Output() jokeCreated = new EventEmitter<Joke>();` and template `<joke-form (jokeCreated)="addJoke($event)"></joke-form>`

 we can emit (see below) and the listener has their own function that responds to the event (`addJoke()`)
 ```
createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
}
 ```
 So, that's the basics of the Jokes example. Author's Plunk so far: http://plnkr.co/edit/b0F6Dhb40Hm5zfiamAix?p=preview