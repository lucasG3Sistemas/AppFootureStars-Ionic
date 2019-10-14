import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { ClubeFutebolDTO } from '../../models/clube.dto';

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
    public clubeService: ClubeFutebolService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clubeService.findByEmail(localUser.email)
        .subscribe(response => {
          this.clube = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    this.clubeService.getImageFromBucket(this.clube.id)
    .subscribe(response => {
      this.clube.imageUrl = `${API_CONFIG.bucketBaseUrl}/club${this.clube.id}.jpg`;
    },
    error => {});
  }

}
