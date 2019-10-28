import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadorAdicionarLancePage } from './jogador-adicionar-lance';

@NgModule({
  declarations: [
    JogadorAdicionarLancePage,
  ],
  imports: [
    IonicPageModule.forChild(JogadorAdicionarLancePage),
  ],
})
export class JogadorAdicionarLancePageModule {}
