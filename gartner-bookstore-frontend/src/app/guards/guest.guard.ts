/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_HOME } from '../app.routes';
import { AuthService } from '../store/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private router: Router) { }

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const res = this.authService.token ? true : false;
    if (!res) {
      return true;
    } else {
      return this.router.navigate([ROUTE_HOME]);
    }
  }
}
