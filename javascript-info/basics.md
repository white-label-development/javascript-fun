## Javascript Basics

`'use strict'`

Primitive values: (string, number, boolean, symbol, null and undefined) – are assigned/copied "as a whole value".

When an object variable is copied – the reference is copied, the object is not duplicated. Two objects are equal only if they are the same object.

Backticks for embedded variables and expressions in a string

```
let name = "John";

// embed a variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
alert( `the result is ${1 + 2}` ); // the result is 3
```

#### Simple conversions
```
let value = true;
value = String(value); // now value is a string "true". Also obj.toString()

let str = "123";
let num = Number(str); // becomes a number 123. 
alert( +true ); // 1. The unary + converts non number just like Number()

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

#### postfix vs prefix
```
let counter = 1;
alert("this postfix will yield " + counter++); // 1 
alert("but now counter is " + counter); // 2 
alert("this prefix will yield " + ++counter); // 3
```

#### labels
```
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer;    
  }
}
alert('Done!');
```

#### Arrow functions (instead of function expressions)
```
let sum = (a, b) => a + b;
let double = n => n * 2;
let sayHi = () => alert("Hello!");

let sum = (a, b) => {  // multiline example: the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, use return to get results
};
```
#### Debugging (in chrome mainly)

```
function hello(name) {
  let phrase = `Hello, ${name}!`;
  debugger;  // <-- the debugger stops here
  say(phrase);
}
```

#### BDD (part 1)

```
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```
see /mocha-example.html for the basics
ref https://javascript.info/testing-mocha , https://mochajs.org/ , https://www.chaijs.com/, https://sinonjs.org/


#### Polyfills

Transpile with [Babel](https://babeljs.io/)

Webpack or brunch (etc) run the transpiler automatically on very code


#### Objects

```
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```

```
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

bag[fruit] = 5; // take property name from the fruit variable
```

```
function makeUser(name, age) {
  return {
    name, // same as name: name
    age,   // same as age: age
    height: 66,
    // ...
  };
}
```

```
let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
alert( user.noSuchProperty === undefined ); // true means "no such property" unless propery exists and has been set to undefined (!)
```

```
for(key in object) {
  // executes the body for each key among object properties, eg: alert(object\[key\] )
}
```


#### this

The value of this is the object “before dot”, the one used to call the method.

The value of this is evaluated during the run-time. And it can be anything.

```
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(this.name);
  }

};

user.sayHi(); // John. Here during the execution of user.sayHi(), the value of this will be user.
```

#### Misc Data types bits

`let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes`


`["Bilbo", "Gandalf", "Nazgul"].forEach(alert); // for each element call alert`

```
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`); // eg: Nazgul is at index 2 in Bilbo,Gandalf,Nazgul
});
```

```
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
})
```

```
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

```
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```


ref: https://javascript.info/array-methods


```
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Map can also use objects as keys.

A Set is a collection of values, where each value may occur only once.

```
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```


`let [firstName, surname] = "Ilya Kantor".split(' '); //array destructuring`


Json revivier function:

```
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // now works!
```

ref: https://javascript.info/json


#### More on Functions

Rest paramteters (note: The rest parameters must be at the end)
```
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator"); // the variable prefixed with ... "bundles" the args into an array
```

The Spread operator does the opposite
```
let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
```

Also, the spread operator can be used to merge arrays:
```
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```

#### Closure

A variable is a property of a special internal object, associated with the currently executing block/function/script.

Working with variables is actually working with the properties of that object.

NOTE: var variables are either function-wide or global, they are visible through blocks.

Great tasks here: https://javascript.info/closure

Jacascript modules have their own lexical environment

```
<script type="module">
  let x = 5;
</script>

<script type="module">
  alert(window.x); // undefined
  alert(x); // Error: undeclared variable
</script>
```

##### completed "Advanced working with functions" but it needs revisiting again. 

#### Property Accessors

```
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```


#### Prototypal inheritance

```
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; //__proto__ is not the same as [[Prototype]]. That's a getter/setter for it. 
//Also: Object.getPrototypeOf/Object.setPrototypeOf/Object.create - these should be used instead of __proto__ (the modern way)
```

`this` is not affected by prototypes at all. No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.

Alt syntax (Setting Rabbit.prototype = animal literally states the following: "When a new Rabbit is created, assign its \[\[Prototype]] to animal".)
```
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

The modern way:
```
let animal = {
  eats: true
};

let rabbit = Object.create(animal); // create a new object with animal as a prototype

alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // get the prototype of rabbit

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}
``


#### Classes

functional class pattern
```
function User(name, birthday) {
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  this.sayHi = function() {
    alert(`${name}, age:${calcAge()}`);
  };
}

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
``

factory class pattern
```
function User(name, birthday) {
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(`${name}, age:${calcAge()}`);
    }
  };
}

let user = User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```

Prototype-based classes
(Prototype-based classes are the most important and generally the best. Functional and factory class patterns are rarely used in practice.)
```
function User(name, birthday) {
  this._name = name; //internal properties and methods are prepended with an underscore 
  this._birthday = birthday;
}

User.prototype._calcAge = function() {
  return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
  alert(`${this._name}, age:${this._calcAge()}`);
  //methods are lexically not inside function User, they do not share a common lexical environment. 
  //If we declare variables inside function User, then they won’t be visible to methods added like this one.
};

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```
The constructor User only initializes the current object state. Methods are added to User.prototype.



The "class"  construct allows to define prototype-based classes and some new features.

```
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```
May required a polyfill still.
 
Inheritance from Animal `class Rabbit extends Animal { ... } `

use `instanceof` to check whether an object belongs to a class

`alert( rabbit instanceof Rabbit );`


#### Mixins

 a mixin provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes.

 #### Error handling

To catch an exception inside a scheduled function, `try..catch` must be inside that function:
```
setTimeout(function() {
  try {
    noSuchVariable; // try..catch handles the error!
  } catch {
    alert( "error is caught here!" );
  } finally {
  alert( 'finally' );
  }
}, 1000);
```
e.name, e.message, e.stack. `if (e.name == "SyntaxError") ...`

Catch should only process errors that it knows and “rethrow” all others.

`throw e; // rethrow`

Note: The finally clause works for any exit from try..catch. That includes an explicit return, even in the try block.

Global catch (in a browser)
```
  window.onerror = function(message, url, line, col, error) {
  // ...
};
```





















