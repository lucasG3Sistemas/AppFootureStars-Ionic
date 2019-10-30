import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadorDetalheCadastrarPage } from './jogador-detalhe-cadastrar';

@NgModule({
  declarations: [
    JogadorDetalheCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(JogadorDetalheCadastrarPage),
  ],
})
export class JogadorDetalheCadastrarPageModule {}
