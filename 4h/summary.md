4h Summary
===================


`let` over `var`

 let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

### IEFFE: 

This is called an Immediately-Invoked Function Expression.
Without it, our javascript code would be added to the global namespace.
```
(function(){
    // any code here will run immediately when the browser loads this script
})()
```

stop forgeting to use `"Use strict";`

### Bundlers:

compile (modern code or abstracted into something the browser can handle), minify, bundle.



#### Compilers

you could write your code using ES 2017 and have a compiler transform it to ES 2015.

So a compiler (such as Babel) might take some ES 2017 code
```
[1, 2, 3].map((n) => n + 2);
```
and create (transpile?) to 2015
```
"use strict";

[1, 2, 3].map(function (n) {
  return n + 2;
});
```

demo: ```$ parcel index.html``` in /4h/index.html


### Module Resolution

The modern way to organise your javascript applications is to separate your code into modules, to be
exported and then imported where needed.

```export default greet;``` exports the greet() function  (see /4h/greeter.ts)

```
import greet from './greeter'; //import

greet(); //exec
``` 
exports (see /4h/greeter.ts)

demo:```$ parcel build index.html``` created production build




