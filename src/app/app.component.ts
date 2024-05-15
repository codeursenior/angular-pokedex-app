import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = signal('Pikachu');
  life = signal(21);

  incrementLife() {
    this.life.update((n) => n + 1);
  }

  decrementLife() {
    this.life.update((n) => n - 1);
  }
}
