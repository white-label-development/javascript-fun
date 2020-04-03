## Typescript

The process of converting TypeScript into ES5 is called transpilation and we use a tool called `tsc` to
compile on the command line.

```
npm install -g typescript
tsc -v // version
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
const obj = {fn: 'Asim', sn: 'Hussain', age: 39 };
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

### (pluralsight - typescript getting started)

mod2:

scenario: vscode project

`npm install typescript --save-dev` // i think this will install and update the package.json for us.

uses a webpack dev server as well as webpack for bundling etc.  I am skipping webpack stuff for a later date.

The Typescript project file is tsconfig.json. Can set strict mode, watch etc. `tsc --init` will create a tsconfig with most option commened out, to be tweaked.

`messageElement!.innerText='whatevs';` the exclamation (the non null assertion operator) tells the (strict mode) compiler that we are confident messageElement will not be null, 
and will allow compilation to continue.

mod3:

Boolean, Number, String, Array, Enum

Void, Null, Undefined, Never, Any

`let someValue: number | string;` //can assign a number or a string. This is called a union type. eg: x: string | null

null and undefined can be assigned to any type, normally (like in javascript) but we can use `--strictNullChecks` compiler option (tsconfig) to only allow them in some situations (via a union type).

`let z: number = GetSomeValue();` // ?example of what?

Type Assertions eg: `<number>` or `(value as number)`

```
  let value: any = 5;
  let fixedString: string = (<number>value).toFixed(4);
```

control flow-based type analysis - compiler will update type based on the control flow (if x === "string" ...) where x is a union type.

mod4:

Type annotations on functions

```
  function dullFunc(value1, value2) {};
  //vs
  function funFunc(score: number, greeting: string = 'hi',  message?: string): string {}
```

message? is an optional parameter. TS is not like javascript with it's open method parameters system.

`--noImplicitAny` compiler option can be used to enfore type annotations.


Arrow functions / lambdas: parameters => function body

```
  let squareIt = x => x * x;
  let result = squareit(4); //16

  let adder = (a,b) => a+b;
  let sum = adder(2,3);

  let greeting = () => console.log('hi');
  greeting();
```

```
  let logger: (value: string) => void;
  // logger can be any thing (any function I guess) that takes a string input and returns void

  //conditionally assign a function to logger
  if( score < 0 ) { logger = logError; }
  else { logger = logMessage; }

  logger(`score was ${score}`);

  // fat arrow
  const logMessage = (message:string) => console.log(message);

  // traditional
  function logError(err: string): void { console.error(err); }

  //despite different stype, nboth functions have the same sig.
```

mod5:

```
  interface Employee {
    name: string;
  }

  interface Manager extends Employee {
    department: string;
    scheduleMeeting: (topic: string) => void;
  }

  let developer = {name: 'bob', title='foo'}

  let newEmployee: Employee = developer;
  // developer matches the Employee contract so it can be used with being explicity declared as an Employee. As long as the structures match it's ok (duck typing)
```

interfaces don't compile down to anything in javascript. They are a design tool.

access modifiers: public, private, protected, readonly



```
  class Developer {
    department: string; // class members are public by default
    private _title: string;

    get title(): string {
      return this._title;
    }

    set title(newTitle: string) {
      this._title = newTItle.toUpperCase();
    }

  }

  class WebDeveloper extends Developer {
    // class inheritance
  }

  class Engineer implements Employee {
    // implements an interface
  }
```

at the beginning of a typescript files can use triple slash directives, eg: at the top of app.ts add

`/// <reference path="player.ts">`

this will cause player.ts to be compiled when app.ts is compiled = a chain of dependencies. In tsConfig, if we just set `"files": ["./app.ts"]` as long as the chain is complete, all ts files will be compiled. 

```
  class Developer extends Developer {
    readonly foo: string;
    //bar: string // the ctor shortcut does this for us
    //xxx: string // the ctor shortcut does this for us

    constructor(public bar: string, foo: string, private xxx: string){
      super(); // call parent's constructor
      this.foo = foo;
      //this.bar = bar; //ctor has done this for us
      //this.xxx = xxx; //ctor has done this for us

    }
  }
```

if an access modifer is used in a ctor, typescript will create the property on the class for you.

mod6

##### Typescript module syntax

Can tell the TypeScript compiler which module system to use (AMD, CommonJS, ES2015 etc). May also need some Loader or Bundler (Node, RequireJS, SystemJS, Webpack etc).

(potentially see Pluralsight: JavaScript Module Fundamentals)

modules can export any types (interfaces, functions, even variables)

```
  // person.ts
  export interface Person { } // now available to be imported

  export default class Employee { } //if importing module does not specify specific thing to import, use this

  class Manager { ... } //not accessible outside this module
```

alternatively export all on one line 
`export { Person, Employee as StaffMember }; // aliased`

Import in consuming module
```
 // player.ts
 import {Person, StaffMember} from './person'; // a relative reference eg: slash, dot-slash or dot-dot-slash

 import * as Foo from './person'; // all

 import * as $ from 'jquery'; // non-relative imports.
```

Generally your own code uses relative, and other imported stuff is non-relative. 

Node resolution strategy is set in
classic: looks for .ts and .d.ts files. for non-relative will start in current and traverse up.
node: first looks for .ts, .tsx. .d.ts, then reads package.json and looks for typings property. failing that looks for index files

tip: setting `traceResolution: true` in tsConfig `comilerOptions` can be used to debug not found modules. also, tsConfig `baseUrl` for default non-relatve dir to search for modules. `paths` module to array of paths. `rootDirs` for ???.


##### modules

```
// utils.ts 
function square(x) { return Math.pow(x,2) }
function cow() { console.log("Mooooo!!!") }
export {square, cow}; // {square, cow} is just destructuring syntax
```

```
// script.ts 
import {square, cow} from './utils';
console.log(square(2));
cow()
```

#### Decorators
Decorate a class (add features without changing the class itself). Can take arguments.