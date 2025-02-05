import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentModule } from './components/component.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ComponentModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {}
