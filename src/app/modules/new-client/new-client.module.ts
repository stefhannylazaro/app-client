import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewClientRoutingModule } from './new-client-routing.module';
import { NewClientComponent } from './new-client.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewClientComponent],
  imports: [
    CommonModule,
    NewClientRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewClientModule { }
