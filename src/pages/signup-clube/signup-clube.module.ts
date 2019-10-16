import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupClubePage } from './signup-clube';

@NgModule({
  declarations: [
    SignupClubePage,
  ],
  imports: [
    IonicPageModule.forChild(SignupClubePage),
  ],
})
export class SignupClubePageModule {}
