import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRegistroPageRoutingModule } from './form-registro-routing.module';

import { FormRegistroPage } from './form-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormRegistroPageRoutingModule
  ],
  declarations: [FormRegistroPage]
})
export class FormRegistroPageModule {}
