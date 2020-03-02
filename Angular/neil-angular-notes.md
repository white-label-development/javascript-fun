# Angular Notes

### Setup

`npm install -g @angular/cli`

### Angular's template syntax:

Any directive with an * is a structural directive (changes DOM), eg: `*ngFor="let product of products; index as productId"`

{{ }} interpolation syntax, eg: `<h3>{{ product.name }}</h3>`

property binding [ ] syntax, eg: `[title]="product.name + ' details'"`, `[routerLink]="['/products', productId]"`

[(ngModel)] is Angular's two-way data binding syntax., eg: `<input [(ngModel)]="hero.name" placeholder="name"/>`

Event binding is done by using ( ) around the event,eg: `<button (click)="share()">Share</button>`

 @Component decorator indicates that the following class is a component. Describes metadata (selector (app-{my-component-name}), templateUrl, styleUrls).


?recap?

`{{value}}`

`[property]= "value"` , eg: [hero]="selectedHero"

`(event) = "handler"`, eg: (click) = selectHero(hero)

`[(ng-model)] ="property"`



### Routing
app.module.ts imports a RouterModule.

`ng generate module app-routing --flat --module=app` (flat puts the file in src/app)





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




## Unit Testing Angular

https://www.youtube.com/watch?v=3DlTKhB6uAmno

Karma (test runner. looks for ) and Jasmine (testing framework). 
Protractor = for e2e tests.

describe() //suite
it() //spec / test

`ng test`

#### Faking Dependencies

manually - such as from a service
```
let fakeJokeService ={
    getJoke: () => Observable.of('FAKE_JOKE');
};

let component = new JokeComponent(fakeJokeService);
```

##### Jamine Spies

Can intercept existing service / override for tests.

```
let fakeJokeService = jasmine.createSpyObj('jokeService', ['getJoke]);

fakeJokeService.getJoke.and.returnValue(Observable.of('FAKE_JOKE'));

let component = new JokeComponent(fakeJokeService);
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

```
let error = true; // always fail
function doAsyncTask() { 
  return new Promise((resolve, reject) => { 
    setTimeout(() => { 
      if (error) { 
        reject('error !!'); 
      } else { 
        resolve('done !!'); 
      } 
    }, 1000); 
  });
}

// then can take two arguments: the success and error handlers
doAsyncTask().then( 
  (val) => console.log(val),   
  (err) => console.error(err)
);
// outputs 'error !!' in console
```

```
let promise = Promise.resolve('done'); // we can immediately resolve a promise
let promise = Promise.reject('fail'); // .then still calls the success handler, even when used after the immediate resolve.
```

```
Promise.resolve('done')   
  .then((val) => {throw new Error("fail")})   
  .then((val) => console.log(val))   
  .catch((err) => console.error(err)); // we can chain handlers
```

#### (pluralsight - typescript getting started)

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

Typescript module syntax

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




## Reactive Forms

https://github.com/DeborahK/Angular-ReactiveForms

##### template driven forms: 

template driven html and data binding. Easy. Two way data binding. Automaticaly tracks form and input element state (when form is invalid etc)

##### reactive (model driven) forms: 

defining form model and validation in component code.

+ more flexible
+ immutable data model. no data binding. form cannot mutate model
+ easier to perform an action on a value change
+ reactive transformations -> DebountTime or DistinctUntilChanged
+ easily add input elements dynamically
+ easier unit testing.
+ but requires more code.


##### Form and InputElement State: 

+ Value Changed :pristine or dirty (dirty = chnanged. if all are pristine, the form is pristine)

+ Validity: valid or errors collection (form is valid id all input elements are valid)

+ Visited: touched or untouched (touched - focus has been set and focus left)


Angular's Form Building Blocks track state and value for us

FormControl - track an individual input element

FormGroup - track a collection of FormControls. The form itself is managed as a FormGroup. FormGroups can be nested. The "Forms FormGroup" is the root.

The FormModel is a data structure that represents the form: FormControls, State, Values (of user input into form elements), Error etc.

Template Driven Form generate the FormModel from the template (behind the scenes) but Reactive Forms explicity create the Form model, validation rules and so on, all in the Component Class.

Reactive Froms bind thes input elements in the template to the FormModel defined in the component class, instead  if binding the input elements to the data model properties directly (like Template Driven Forms do).

##### Directives

Template (FormsModule): 

ngForm, ngModel, ngModelGroup. Ng automatically creates a formModel, starting with the root FormGroup instance; it assigns an ngForm directive to any form we add to the template. We can add a template reference to access it (to export it), eg:

```
<form (ngSubmit)="save()" #signupForm="ngForm">

  <input id="firstNameId" [(ngModel)]="customer.firstName" #firstNameVar="ngModel" name="firstName" />

  <button type="submit" [disabled]="!signupForm.valid"> ...
```

The signupForm variable provides a reference to the forms root FormGroup instance. The ngModel directive is used in each input element to keep the value in sync with the component class property (MVVM, two way binding paradigm). Adding the ngModel tells Ng to automatically create a FormControl instance for us, using the input elements name.

Reactive (ReactiveFormsModule):

formGroup, fromControl, formControlName, FormGroupName, formArrayName

We create the formModel ourselves. The template has a lot let Ng attributes.

```
<form (ngSubmit)="save()" [formGroup]="signupForm")>
  <input formControlName="firstName"> ...
```
##### Building a Reactive Form

Form does not directly modify the FormModel.

Create a new FormGroup, usually in ngOnInit(). This is the FormModel (not the data model).

```
customerForm.controls.firstName.valid
customerForm.get('firstName').valid
```

Without two-way binding how do we update the form from it's initial values?

`setValue` is used to update *every* FormControl in the FormModel.
```
this.customerForm.setValue(
  {
    firstName: 'Jack',
    firstName: 'Harkness'
  }
);
```

use `patchValue` to update a subset
```
this.customerForm.patchValue(
  {
    firstName: 'Jack'    
  }
);
```

The FormBuilder is class we can use to create a FormGroup for us, from a configuration. Usually injected, eg: `(private fb: FormBuilder)`.

```
// we are defining a template for the form. Note the 3 styles
this.customerForm = this.fb.group({
  firstName: '',
  lastName: ['', [Validators.required, Validators.minLength(3)]],
  sendCatalog: {value: true, disabled: false}
  ...
});
```

async validators are the third paramter of the array style (lastName).

We can adjust validation rules at runtime.
```
myControl.clearValidators();
myControl.setValidators(Validators.email);
myControl.updateValueAndValidity(); //optional. apply the new validators (ie: check is valid against the value)
```

Customer Validation Rules:

A custom validator is a function

```
function myValidator (c: AbstractControl): {[key: string] : boolean} | null {
  if(somethingIsWrong){ return { 'myvalidator': true }; } //key is the name of the broken validation rule
  return null; 
}

// in the fb.group:
myvalidator: [null, myValidator]
```

A validator function can only take one parameter. If we need to pass in more we need to wrap the function in a factory function and return the validator function (now an arrow function).

```
function myValidator (param: any): ValidatorFn {
  return (c: AbstractControl): {[key: string] : boolean} | null => {
    if(somethingIsWrong){ return { 'myvalidator': true }; } 
    return null; 
  };
}
```

Cross field validation is achieved using a nested FormGroup

```
availability: this.fb.group({
  start: ['', Validators.required],
  end: ['', Validators.required]
})

// and in the html
<div formGroupName="availability">
  <input formControlName="start" />
  <input formControlName="end" />
</div>

```

### Decorators
Decorate a class (add features without changing the class itself). Can take arguments.

#### Javascript modules

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

## RxJs

https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/


## AFTOP: Jokes Notes

Route to `JokesComponent` which is the parent of `JokesListComponent`. Jokes html contains `<jokes-list></jokes-list>` (note: if Jokes only offered JokesList functionality I guess it would make more sense to incorporate the code from JokesList into Jokes as otherwise Jokes does not really do anything).


JokesListComponent is the parent of JokeFormComponent. It lists the jokes 

```
<joke *ngFor="let j of jokes" [joke]="j" (jokeDeleted)="deleteJoke($event)" ></joke>
```

Where we have the structral directive `*ngfor` (which changes the DOM) looping the jokes array of the JokesListComponent (`jokes: Joke[];`) and creating a new JokeComponent instance for each.

we are property binding `[joke]` to `j` ie: setting the input parameter of each JokeComponent (`@Input() joke: Joke;`) to item in the loop, so each component instance(?) has a joke instance.

and event binding `(jokeDeleted)` to JokesListComponent's deleteJoke() method. 

The JokeCompoent html has a button with an event binding `(click)="deleteJoke($event)"`, when this is raised (button is clicked) this calls the JokeComponent's `deleteJoke()` method which calls `emit` for the output parameter.

```
@Output() jokeDeleted = new EventEmitter<Joke>();

deleteJoke() {
  this.jokeDeleted.emit(this.joke);
}
```
JokesListComponent is listening for a raised/emitted event, so the emitted property (a joke) becomes passed into the JokesListComponet's `deleteJoke($event)` method.



The JokesListCompent html also contains the JokeForm: `<joke-form (jokeCreated)="addJoke($event)"></joke-form>`.

Again, we have an emit output from JokeFormComponent called jokedCreated `this.jokeCreated.emit(new Joke(setup, punchline));` and JokesListComponent is listening for this event and has bound it to `addJoke($event)`.


#### template variables

We can create local template variables by adding variables starting with the # character on any
element in our template.  
```
<input type="text" class="form-control" placeholder="Enter the punchline" #punchline>

<button type="button" class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create</button>
```
The will bind the contact of the text element to the punchline variable. NOTE punchline _is only available as a variable in the template_, we don’t automatically see the variable setup inside the javascript code of our Component class.

In the above example, the button click is using `setup.value` and `punchline.value` in `createJoke()`.


Use EventEmitters to emit events. So given a class with an output declaration

 `@Output() jokeCreated = new EventEmitter<Joke>();` and template `<joke-form (jokeCreated)="addJoke($event)"></joke-form>`

 we can emit (see below) and the listener has their own function that responds to the event (`addJoke()`)
 ```
createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
}
 ```
 So, that's the basics of the Jokes example. Author's Plunk so far: http://plnkr.co/edit/b0F6Dhb40Hm5zfiamAix?p=preview  (page 62)

