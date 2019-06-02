import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  //selectedHero: Hero;

 
  constructor(private heroService: HeroService) { }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();  //synchronous - which it would not be with a real api call.

    //instead,  wait for the Observable to emit the array of heroes— which could happen now or several minutes from now. 
    //Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(x => this.heroes = x);
  }

  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}