import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tailorLoginGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  let TailorLoggin = localStorage.getItem('TailorLoggin');

  if (TailorLoggin=='false') {
    _router.navigate(['TailorLogin']);
    return false;
  }

  return true;
};
