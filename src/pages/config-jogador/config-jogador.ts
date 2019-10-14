import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-config-jogador',
  templateUrl: 'config-jogador.html',
})
export class ConfigJogadorPage {

  jogador: JogadorDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public jogadorService: JogadorService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.jogadorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.jogador = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    this.jogadorService.getImageFromBucket(this.jogador.id)
    .subscribe(response => {
      this.jogador.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${this.jogador.id}.jpg`;
    },
    error => {});
  }

}
