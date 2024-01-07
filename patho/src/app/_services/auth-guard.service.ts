import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from "../_services/authentication.service";





@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.getAuthenticatedUser();
    console.log(currentUser);
    if (currentUser) {

      console.log(currentUser,"-------------------------------------------------");
      // check if route is restricted by role
      /*if (route.data.roles && route.data.roles.indexOf(currentUser.roles) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }*/
    /*  let isInUserRoles: boolean = false;
      currentUser.roles.forEach((role) => {
        if (route.data.roles && route.data.roles.indexOf(role.libelle) !== -1) {
          isInUserRoles = true;
        }
      });
      if (route.data.roles && !isInUserRoles) {
        // role not authorised so redirect to home page
        this.router.navigate(["/"]);
        return false;
      }*/
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/result"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
