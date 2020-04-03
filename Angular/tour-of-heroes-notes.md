

## Tour of Heroes Notes

`ng new angular-tour-of-heroes`

```
cd angular-tour-of-heroes
ng serve --open
```

https://angular.io/tutorial/toh-pt6


`ng generate service hero` notice the the @Injectable() decorator  `ng generate <scaffold> <name>` where scaffold is the type of things we can create, such as component, directive, pipe, service, class, interface, enum

`HeroService.getHeroes()` must have an asynchronous signature of some kind. It can take a callback. It could return a Promise. It could return an Observable.

"In this tutorial, HeroService.getHeroes() will return an Observable in part because it will eventually use the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable. Observable is one of the key classes in the RxJS library..."

`<li *ngFor="let hero of heroes$ | async" >`

"The $ is a convention that indicates heroes$ is an Observable, not an array.

The *ngFor can't do anything with an Observable. But there's also a pipe character (|) followed by async, which identifies Angular's AsyncPipe.

The AsyncPipe subscribes to an Observable automatically so you won't have to do so in the component class."