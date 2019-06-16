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