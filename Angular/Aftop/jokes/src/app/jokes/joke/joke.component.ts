import { Component, OnInit, Input } from '@angular/core';
import { Joke } from '../../domain/joke';

@Component({
  selector: 'joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})

export class JokeComponent implements OnInit {

  @Input() joke: Joke;


  constructor() {
      
   }


  ngOnInit() {
  }

  toggle(joke) {
    joke.hide = !joke.hide;
  }

}
