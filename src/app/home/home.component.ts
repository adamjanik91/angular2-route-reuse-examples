import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <p>
      home works!
    </p>
    <a [routerLink]="['/contact/']" routerLinkActive="active">link to contact component</a>

  `,
  styles: ``
})
export class HomeComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('Home compo destroyed');
  }
}
