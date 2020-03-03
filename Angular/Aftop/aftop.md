## AFTOP 2020

##### @ngModule params
imports: The other Angular Modules that export material we need in this Angular Module. eg: `BrowserModule`

declarations: The list of components or directives belonging to this module. eg: `JokeComponent`

bootstrap: Identifies the root component that Angular should bootstrap when it starts the application. eg: `JokeComponent`

A Component is the building block of an Angular application. An application is composed of a tree of such Components glued together all depending from one root component.

Input Property Binding: `<p class="card-text" [hidden]="true">{{joke.punchline}}</p>`

Output Event Binding: `<a class="btn btn-primary" (click)="joke.hide = !joke.hide">Tell Me </a>` 
also  `(click)="createJoke()"`
also `(jokeCreated)="addJoke($event)">`  ($event is a special variable and holds whatever was emitted)

```
class JokeFormComponent {   
    @Output() jokeCreated = new EventEmitter<Joke>();
    createJoke() { this.jokeCreated.emit(new Joke("A setup", "A punchline")); } 
}
```

#### Template Reference Variables
`<input type="text" #setup placeholder="Enter the setup">`  This tells Angular to bind this `<input>` control to the variable setup (setup is only available as a variable in the template).


