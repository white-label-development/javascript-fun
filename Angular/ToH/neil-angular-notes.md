## Angular Notes

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

...

`ng generate service hero` notice the the @Injectable() decorator


`HeroService.getHeroes()` must have an asynchronous signature of some kind. It can take a callback. It could return a Promise. It could return an Observable.

"In this tutorial, HeroService.getHeroes() will return an Observable in part because it will eventually use the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable. Observable is one of the key classes in the RxJS library..."