import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizarClubePage } from './visualizar-clube';

@NgModule({
  declarations: [
    VisualizarClubePage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizarClubePage),
  ],
})
export class VisualizarClubePageModule {}
