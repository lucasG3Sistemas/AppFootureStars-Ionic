import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupEmpresarioPage } from './signup-empresario';

@NgModule({
  declarations: [
    SignupEmpresarioPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupEmpresarioPage),
  ],
})
export class SignupEmpresarioPageModule {}
