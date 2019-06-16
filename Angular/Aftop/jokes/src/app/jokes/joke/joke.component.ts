import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from '../../domain/joke';

@Component({
  selector: 'joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})

export class JokeComponent implements OnInit {

  @Input() joke: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();

  constructor() {
      
   }

   deleteJoke(){
    this.jokeDeleted.emit(this.joke);
   }


  ngOnInit() {
  }

  toggle(joke) {
    joke.hide = !joke.hide;
  }

}
