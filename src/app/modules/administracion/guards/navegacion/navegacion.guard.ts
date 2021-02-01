import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class NavegacionGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let menuActual: any = JSON.parse(localStorage.getItem('MENU_ADMINISTRACION'));
    let primerPath: string = route['_urlSegment'] ? route['_urlSegment']['segments'][1].path : '';
    if (menuActual) {
      let primerNivelMenu = menuActual.filter((item)=> item.ruta == primerPath);
      if (primerNivelMenu.length > 0) {
        let segundoPath: string = route['_urlSegment'] ? route['_urlSegment']['segments'][2].path : '';
        let segundoNivelMenu = primerNivelMenu[0].hijos.filter((item)=> item.ruta == segundoPath);
        if (segundoNivelMenu.length > 0) {
          return true;
        }
      }
    }
    console.warn('Esta intentando acceder a una ruta restringida, por favor utilice el menu lateral para navegar.')
    return false;
  }
  
}
