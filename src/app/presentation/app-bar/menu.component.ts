import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { selectGetUser } from 'src/app/application/session/session.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user = 'Test'; //this.store.select(selectGetUser);

  constructor(private store: Store) {}

  ngOnInit() {}
}
