import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  private storedRoutes = new Map<string, DetachedRouteHandle>();
  private pathsExceptions = ['error'];


  constructor() { }


  shouldDetach(route: any): boolean {
    debugger
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
