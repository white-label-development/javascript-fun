## Javascript Basics

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

