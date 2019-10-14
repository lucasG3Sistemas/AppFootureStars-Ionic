import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { EmpresarioDTO } from '../../models/empresario.dto';
import { EmpresarioService } from '../../services/domain/empresario.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-config-empr',
  templateUrl: 'config-empr.html',
})
export class ConfigEmprPage {

  empresario: EmpresarioDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public empresarioService: EmpresarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.empresarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.empresario = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    this.empresarioService.getImageFromBucket(this.empresario.id)
    .subscribe(response => {
      this.empresario.imageUrl = `${API_CONFIG.bucketBaseUrl}/empr${this.empresario.id}.jpg`;
    },
    error => {});
  }

}
