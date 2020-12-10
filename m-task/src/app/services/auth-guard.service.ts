import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  routeURL: string;
  isLoggedIn = sessionStorage.getItem("userId") != null;

  constructor(private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedIn){
      this.router.navigate(['login']);
    }
    return this.isLoggedIn;
  }


}
