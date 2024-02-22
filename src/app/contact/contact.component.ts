import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Contact',
  standalone: true,
  imports: [RouterModule],
  template: `
    <p>
      Contact works!
    </p>
    <a routerLink="/home/">link to home component</a>

  `,
  styles: ``
})
export class ContactComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('Contact compo destroyed');
  }
}
