import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MenuComponent } from 'src/app/presentation/app-bar/menu.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  entryComponents: [MenuComponent],
  declarations: [HomePage, MenuComponent],
})
export class HomePageModule {}
