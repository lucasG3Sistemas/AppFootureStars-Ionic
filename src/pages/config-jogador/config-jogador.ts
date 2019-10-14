import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { API_CONFIG } from '../../config/api.config';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';

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
    public jogadorService: JogadorService,
    public auth: AuthService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.jogadorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.jogador = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot(LoginPage);
          }
        });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getImageIfExists() {
    this.jogadorService.getImageFromBucket(this.jogador.id)
    .subscribe(response => {
      this.jogador.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${this.jogador.id}.jpg`;
    },
    error => {});
  }

  logout() {
    this.auth.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
