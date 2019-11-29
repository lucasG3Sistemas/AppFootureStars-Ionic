import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarJogadorPage } from './editar-jogador';

@NgModule({
  declarations: [
    EditarJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarJogadorPage),
  ],
})
export class EditarJogadorPageModule {}
