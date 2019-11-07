import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { API_CONFIG } from '../../config/api.config';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-config-jogador',
  templateUrl: 'config-jogador.html',
})
export class ConfigJogadorPage {

  jogador: JogadorDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;


  //jogador?.imageUrl || 'assets/imgs/avatar-blank.png'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public jogadorService: JogadorService,
    public auth: AuthService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {

      this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.jogadorService.findByEmail(localUser.email)
        .subscribe(response => {
          this.jogador = response as JogadorDTO;
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
        this.blobToDataURL(response).then(dataUrl => {
          let str : string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
        error => { 
          this.profileImage = 'assets/imgs/avatar-blank.png';
        });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
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
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.jogadorService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
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