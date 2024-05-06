import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminLoginGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router);

  let AdminLogin = localStorage.getItem('AdminLoggin');

  if (AdminLogin=='false') {
    // alert('This Area Is For Admin');
    _router.navigate(['Admin']);
    return false
  }

  return true; 
};
