import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupJogadorPage } from './signup-jogador';

@NgModule({
  declarations: [
    SignupJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupJogadorPage),
  ],
})
export class SignupJogadorPageModule {}
