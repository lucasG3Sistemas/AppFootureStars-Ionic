import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaJogadoresPage } from './busca-jogadores';

@NgModule({
  declarations: [
    BuscaJogadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaJogadoresPage),
  ],
})
export class BuscaJogadoresPageModule {}
