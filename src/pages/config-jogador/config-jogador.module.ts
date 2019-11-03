import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigJogadorPage } from './config-jogador';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [
    ConfigJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigJogadorPage),
  ],
  providers: [
    Camera
  ]
})
export class ConfigJogadorPageModule {}
