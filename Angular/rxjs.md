
## RxJs

https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
https://jasonwatmore.com/post/2019/02/07/angular-7-communicating-between-components-with-observable-subject

Define the different streams and the operations that are performed on those streams.

An observable isn’t a stream. An observable is a blueprint which describes a set of streams and how they are connected together with operations.

Streams are chained. Below the `interval` stream passes the observable to the `take` stream and so on
```
let obs = Rx.Observable
  .interval(1000)
  .take(3); //this observable is cold, that means it’s not currently pushing out numbers.
  
obs.subscribe(value => console.log("Subscriber: " + value)); // The observable will become hot and start pushing numbers onto it’s first stream, when it gets it’s first subscriber. We pass a callback (anonymous in this case) to .subscribe() which is called when the stream on the end completes

// will output Subscriber: 0 Subscriber: 1 Subscriber: 2 .. to 30
```

### RxJs In Angular

EventEmitter - Under the hood this works via Observables.
HTTP - HTTP requests in Angular are all handled via Observables.
Forms - Reactive forms in Angular expose an observable, a stream of all the input fields in the form combined.





## Pipes
eg: json, currency, slice, date, number, lowercase, uppercase, percent and custom pipes.

With AsyncPipe we can use promises and observables directly in our template, without having to store the result on an intermediate property or variable.

AsyncPipe accepts as argument an observable or a promise, calls subcribe or attaches a then handler, then waits for the asynchronous result before passing it through to the caller.

