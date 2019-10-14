import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { ClubeFutebolDTO } from '../../models/clube.dto';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-config-clube',
  templateUrl: 'config-clube.html',
})
export class ConfigClubePage {

  clube: ClubeFutebolDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clubeService: ClubeFutebolService,
    public auth: AuthService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clubeService.findByEmail(localUser.email)
        .subscribe(response => {
          this.clube = response;
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
    this.clubeService.getImageFromBucket(this.clube.id)
    .subscribe(response => {
      this.clube.imageUrl = `${API_CONFIG.bucketBaseUrl}/club${this.clube.id}.jpg`;
    },
    error => {});
  }

  logout() {
    this.auth.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}