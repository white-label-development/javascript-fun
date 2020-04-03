
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