import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaObservacaoPage } from './lista-observacao';

@NgModule({
  declarations: [
    ListaObservacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaObservacaoPage),
  ],
})
export class ListaObservacaoPageModule {}
