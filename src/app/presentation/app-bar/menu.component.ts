import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  user = 'Test'; //this.store.select(selectGetUser);

  constructor(private store: Store) {}
}
