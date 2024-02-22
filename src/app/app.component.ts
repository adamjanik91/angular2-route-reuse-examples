import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
    template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('App compo destroyed');
  }
  title = 'angular2-route-reuse-examples';
}
