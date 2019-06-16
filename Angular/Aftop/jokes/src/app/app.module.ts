import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokesComponent } from './jokes/jokes.component';
import { JokesListComponent } from './jokes/jokes-list/jokes-list.component';
import { JokeComponent } from './jokes/joke/joke.component';
import { JokeFormComponent } from './jokes/joke-form/joke-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JokesComponent,
    JokesListComponent,
    JokeComponent,
    JokeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
