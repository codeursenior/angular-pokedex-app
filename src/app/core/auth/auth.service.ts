import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  login(name: string, password: string): Observable<boolean> {
    // Faites votre appel à un service d'authentification si besoin ...
    const isLoggedIn = name === 'pikachu' && password === 'pikachu';
    this._isLoggedIn.set(isLoggedIn);

    return of(isLoggedIn).pipe(delay(1000));
  }
}
