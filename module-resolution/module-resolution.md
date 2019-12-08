## Modules (pluralsight notes)
todo

## Module Resolution

The CommonJS system, used and popularized by Node.js, works well on the server side but can be slow in the browser because it loads each module synchronously.

To solve module resolution in the browser, the Asynchronous Module Definition (AMD) standard was created. The AMD library require.js is used by many front-end libraries because it is much faster than CommonJS, but this unfortunately created two different standards.

To solve the problem of competing standards, the Universal Module Definition (UMD) standard was created. This one works in both the browser and the server by using either CommonJS or AMD depending on what is available

And finally, with ECMAScript 2015 (ES6), JavaScript gained the a native concept of modules.
Within a module, you can use the export keyword to export just about anything. You can export a const, a function, or any other variable binding or declaration. Just prefix the variable statement or declaration with export and you’re all set:

####Side Note
Web application bundlers (Parcel, Webpack etc) have 3 key tasks
* Trigger Javascript compilation (eg: Babel)
* Minify js/css
* Bundle js/css

```
$ npm install -g parcel-bundler
$ npm init -y
```
https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/


##### A quick TS Parcel experiment

Given the two `simple-parcel-typescript` files

If we run ```$ parcel simple-parcel-typescript.html``` Parcel will run its own in-built development server, download/install Typescript, compile, 
bundle and minify the typescript ﬁle (into a dist folder).  

Every time we change code it will kick in, compile the Typescript to regular Javascript, bundle everything up and trigger a refresh in the browser. 


#### Back to module resolution

Given the two `module-resolution' files and the 'greeter.ts' module

The html file has `src="./module-resolution.ts"` which import and execute the default and named functions from the greeter module.

I have no idea how it's possible to execute a function in a module from an inline script (a html page, eg: on click). I'm obviously not getting a concept here
as as the moment we can only import and execute immediately. NOTE: modules are not really for use in the browser, apparantly. 
For browsers use the (not massively supported) ```<script type="module" src="index.js"></script>```

So I guess non-browser imports are mostly used for the scripts involved in compilation etc and not for production javascript used by users of a web page.





refs:

https://www.sitepoint.com/understanding-es6-modules/

https://flaviocopes.com/es-modules/

https://developers.google.com/web/fundamentals/primers/modules

https://medium.com/passpill-project/files-with-mjs-extension-for-javascript-modules-ced195d7c84a

https://parceljs.org/javascript.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import  (dynamic import will import and execute from a module on click)

https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc