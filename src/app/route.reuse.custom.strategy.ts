import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

// contact compo has default angular cre / destroy behavior
// home compo is only created once and then reused

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  private storedRoutes = new Map<string, DetachedRouteHandle>();
  private pathsExceptions = ['contact'];


  constructor() { }


  shouldDetach(route: any): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }


    let path = route['_routerState'].url.replace('/', '');

    let result = true;

    if (route.routeConfig && this.pathsExceptions.indexOf(path) !== -1) {
      result = false;
    }

    return result;
  }


  store(route: any, detachedTree: DetachedRouteHandle): void {
    if (route['_routerState'].url.indexOf('error') !== -1) {
      return;
    }

    let path = route['_routerState'].url.replace('/', '');
    this.storedRoutes.set(path, detachedTree);
  }


  shouldAttach(route: any): boolean {
    let path = route['_routerState'].url.replace('/', '');

    const shouldAttach = !!route.routeConfig && !!this.storedRoutes.get(path);
    return shouldAttach;
  }


  retrieve(route: any): any | null {
    if (!route.routeConfig)
      return null;

    if (route.routeConfig.loadChildren) {
      return null;
    }

    let path = route['_routerState'].url.replace('/', '');

    return this.storedRoutes.get(path);
  }


  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const shouldReuseRoute = future.routeConfig === curr.routeConfig;
    return shouldReuseRoute;
  }

}
