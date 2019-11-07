import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { API_CONFIG } from '../../config/api.config';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-config-jogador',
  templateUrl: 'config-jogador.html',
})
export class ConfigJogadorPage {

  jogador: JogadorDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public jogadorService: JogadorService,
    public auth: AuthService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.jogadorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.jogador = response;
          this.getImageIfExists();
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.parent.parent.setRoot(LoginPage);
            }
          });
    } else {
      this.navCtrl.parent.parent.setRoot(LoginPage);
    }
  }

  getImageIfExists() {
    this.jogadorService.getImageFromBucket(this.jogador.id)
      .subscribe(response => {
        this.jogador.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${this.jogador.id}.jpg`;
      },
        error => { });
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture() {
    this.jogadorService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }

  logout() {
    this.auth.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
