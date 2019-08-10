## Angular Notes

### Angular's template syntax:

Any directive with an * is a structural directive (changes DOM), eg: `*ngFo=
r=3D"let product of products; index as productId"`

{{ }} interpolation syntax, eg: `<h3>{{ product.name }}</h3>`

property binding [ ] syntax, eg: `[title]=3D"product.name + ' details'"`, `=
[routerLink]=3D"['/products', productId]"`

[(ngModel)] is Angular's two-way data binding syntax., eg: `<input [(ngMode=
l)]=3D"hero.name" placeholder=3D"name"/>`

Event binding is done by using ( ) around the event,eg: `<button (click)=3D=
"share()">Share</button>`

@Component decorator indicates that the following class is a component. Des=
cribes metadata (selector (app-{my-component-name}), templateUrl, styleUrls=
).

### Routing
app.module.ts imports a RouterModule.

`ng generate module app-routing --flat --module=3Dapp` (flat puts the file =
in src/app)

### Other fundamentals are a todo

## Tour of Heroes Notes

`ng new angular-tour-of-heroes`

```
cd angular-tour-of-heroes
ng serve --open
```

...

`ng generate service hero` notice the the @Injectable() decorator

`HeroService.getHeroes()` must have an asynchronous signature of some kind.=
 It can take a callback. It could return a Promise. It could return an Obse=
rvable.

"In this tutorial, HeroService.getHeroes() will return an Observable in par=
t because it will eventually use the Angular HttpClient.get method to fetch=
 the heroes and HttpClient.get() returns an Observable. Observable is one o=
f the key classes in the RxJS library..."

### Angular Guide notes

`{{value}}`

`[property]=3D"value"` , eg: [hero]=3D"selectedHero

`(event) =3D "handler"`, eg: selectHero(hero)

`[(ng-model)] =3D "property"`

### Unit Testing Angular

https://www.youtube.com/watch?v=3DlTKhB6uAmno

Karma (test runner. looks for ) and Jasmine (testing framework). Protractor=
 for e2e tests.

describe() //suite
it() //spec / test

`ng test`

#### Faking Dependencies

manually - such as from a service
```
let fakeJokeService =3D {
    getJoke: () =3D> Observable.of('FAKE_JOKE');
};

let component =3D new JokeComponent(fakeJokeService);
```

##### Jamine Spies

Can intercept existing service / override for tests.

```
let fakeJokeService =3D jasmine.createSpyObj('jokeService', ['getJoke]);

fakeJokeService.getJoke.and.returnValue(Observable.of('FAKE_JOKE'));

let component =3D new JokeComponent(fakeJokeService);
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
