# Angular Notes

### Setup

`npm install -g @angular/cli`

### Angular's template syntax:

Any directive with an * is a structural directive (changes DOM), eg: `*ngFor="let product of products; index as productId"`

{{ }} interpolation syntax, eg: `<h3>{{ product.name }}</h3>`

property binding [ ] syntax, eg: `[title]="product.name + ' details'"`, `[routerLink]="['/products', productId]"`

[(ngModel)] is Angular's two-way data binding syntax., eg: `<input [(ngModel)]="hero.name" placeholder="name"/>`

Event binding is done by using ( ) around the event,eg: `<button (click)="share()">Share</button>`

 @Component decorator indicates that the following class is a component. Describes metadata (selector (app-{my-component-name}), templateUrl, styleUrls).


?recap?

`{{value}}`

`[property]= "value"` , eg: [hero]="selectedHero"

`(event) = "handler"`, eg: (click) = selectHero(hero)

`[(ng-model)] ="property"`


### Components

An Angular application is just a tree of  Components, when each Component renders, it recursively renders its children Components. The bootstrap = the root component.

When architecting an Angular application, we are breaking it down into seperate components, describing the responsibilities of each. From their we can consider the inputs & outputs (the public facing interface).

with one way data binding, inputs go down the tree, outputs go up the tree.


##### Content Projection
come back to this if needed. `<ng-content></ng-content>`


### Lifecycle Hooks

##### component hooks
`constructor` This is invoked when Angular creates a component or directive by calling new on the class.

`ngOnChanges` Invoked every time there is a change in one of th input properties of the component.

`ngOnInit` Invoked when given component has been initialized. This hook is only called once after the first ngOnChanges

`ngDoCheck` Invoked when the change detector of the given component is invoked. It allows us to implement our own change detection algorithm for the given component.

`ngOnDestroy` This method will be invoked just before Angular destroys the component. Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.

### Routing
app.module.ts imports a RouterModule.

`ng generate module app-routing --flat --module=app` (flat puts the file in src/app)



## The CLI

`ng build --prod` bundles into dist

`npm install moment --save` example of adding a third party library module

`ng help` for info







