import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosJogadorPage } from './videos-jogador';

@NgModule({
  declarations: [
    VideosJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(VideosJogadorPage),
  ],
})
export class VideosJogadorPageModule {}
