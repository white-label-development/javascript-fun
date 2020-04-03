## Unit Testing Angular

https://www.youtube.com/watch?v=3DlTKhB6uAmno

Karma (test runner. looks for ) and Jasmine (testing framework). 
Protractor = for e2e tests.

describe() //suite
it() //spec / test

`ng test`

#### Faking Dependencies

manually - such as from a service
```
let fakeJokeService ={
    getJoke: () => Observable.of('FAKE_JOKE');
};

let component = new JokeComponent(fakeJokeService);
```

##### Jamine Spies

Can intercept existing service / override for tests.

```
let fakeJokeService = jasmine.createSpyObj('jokeService', ['getJoke]);

fakeJokeService.getJoke.and.returnValue(Observable.of('FAKE_JOKE'));

let component = new JokeComponent(fakeJokeService);
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
