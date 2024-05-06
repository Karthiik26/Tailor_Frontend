import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router);

  let login = localStorage.getItem('isLoggedIn');

  if (!login) {
    _router.navigate(['Login']);
    return false;
  }
 
  return true;
};
