import { CanActivate, ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |  Observable<boolean> | Promise<boolean>  {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    }
    return isAuth;
  }
}
