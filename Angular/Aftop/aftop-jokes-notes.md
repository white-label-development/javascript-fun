

## AFTOP: Jokes Notes

Route to `JokesComponent` which is the parent of `JokesListComponent`. Jokes html contains `<jokes-list></jokes-list>` (note: if Jokes only offered JokesList functionality I guess it would make more sense to incorporate the code from JokesList into Jokes as otherwise Jokes does not really do anything).


JokesListComponent is the parent of JokeFormComponent. It lists the jokes 

```
<joke *ngFor="let j of jokes" [joke]="j" (jokeDeleted)="deleteJoke($event)" ></joke>
```

Where we have the structral directive `*ngfor` (which changes the DOM) looping the jokes array of the JokesListComponent (`jokes: Joke[];`) and creating a new JokeComponent instance for each.

we are property binding `[joke]` to `j` ie: setting the input parameter of each JokeComponent (`@Input() joke: Joke;`) to item in the loop, so each component instance(?) has a joke instance.

and event binding `(jokeDeleted)` to JokesListComponent's deleteJoke() method. 

The JokeCompoent html has a button with an event binding `(click)="deleteJoke($event)"`, when this is raised (button is clicked) this calls the JokeComponent's `deleteJoke()` method which calls `emit` for the output parameter.

```
@Output() jokeDeleted = new EventEmitter<Joke>();

deleteJoke() {
  this.jokeDeleted.emit(this.joke);
}
```
JokesListComponent is listening for a raised/emitted event, so the emitted property (a joke) becomes passed into the JokesListComponet's `deleteJoke($event)` method.



The JokesListCompent html also contains the JokeForm: `<joke-form (jokeCreated)="addJoke($event)"></joke-form>`.

Again, we have an emit output from JokeFormComponent called jokedCreated `this.jokeCreated.emit(new Joke(setup, punchline));` and JokesListComponent is listening for this event and has bound it to `addJoke($event)`.


#### template variables

We can create local template variables by adding variables starting with the # character on any
element in our template.  
```
<input type="text" class="form-control" placeholder="Enter the punchline" #punchline>

<button type="button" class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create</button>
```
The will bind the contact of the text element to the punchline variable. NOTE punchline _is only available as a variable in the template_, we don’t automatically see the variable setup inside the javascript code of our Component class.

In the above example, the button click is using `setup.value` and `punchline.value` in `createJoke()`.


Use EventEmitters to emit events. So given a class with an output declaration

 `@Output() jokeCreated = new EventEmitter<Joke>();` and template `<joke-form (jokeCreated)="addJoke($event)"></joke-form>`

 we can emit (see below) and the listener has their own function that responds to the event (`addJoke()`)
 ```
createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
}
 ```
 So, that's the basics of the Jokes example. Author's Plunk so far: http://plnkr.co/edit/b0F6Dhb40Hm5zfiamAix?p=preview  (page 62)