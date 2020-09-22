import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListClientRoutingModule } from './list-client-routing.module';
import { ListClientComponent } from './list-client.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ListClientComponent],
  imports: [
    CommonModule,
    ListClientRoutingModule,
    MaterialModule
  ]
})
export class ListClientModule { }
