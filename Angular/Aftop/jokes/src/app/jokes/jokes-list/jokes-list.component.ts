import { Component, OnInit } from '@angular/core';
import { Joke } from '../../domain/joke';
import { JokeFormComponent } from '../joke-form/joke-form.component';

@Component({
  selector: 'jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.css']
})

export class JokesListComponent implements OnInit {

  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke('What did the cheese say when it looked in the mirror?', 'Hello-me (Halloumi)'),
      new Joke('What kind of cheese do you use to disguise a small horse?', 'Mask-apony (Mascarpone)'),
      new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’'),
    ];
  }

  ngOnInit() {
  }

  addJoke(joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke) {
    console.log('deleteJoke ' + joke.setup);

    const index = this.jokes.indexOf(joke, 0);
    if (index > -1) {
      this.jokes.splice(index, 1);
    }
  }



}
