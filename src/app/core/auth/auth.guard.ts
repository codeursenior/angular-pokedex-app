import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  console.info('Le guard a bien été appelé !');
  return true;
};
