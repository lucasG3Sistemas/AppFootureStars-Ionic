import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltrarJogadorPage } from './filtrar-jogador';

@NgModule({
  declarations: [
    FiltrarJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltrarJogadorPage),
  ],
})
export class FiltrarJogadorPageModule {}
