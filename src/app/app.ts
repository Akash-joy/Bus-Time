import { Component } from '@angular/core';
import { MainMap } from "./components/main-map/main-map";
import { SetPreference } from "./components/set-preference/set-preference";

@Component({
  selector: 'app-root',
  imports: [MainMap],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular20_study';
}
