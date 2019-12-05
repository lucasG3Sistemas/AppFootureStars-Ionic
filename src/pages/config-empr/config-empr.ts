import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { EmpresarioDTO } from '../../models/empresario.dto';
import { EmpresarioService } from '../../services/domain/empresario.service';
import { API_CONFIG } from '../../config/api.config';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-config-empr',
  templateUrl: 'config-empr.html',
})
export class ConfigEmprPage {

  empresario: EmpresarioDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public empresarioService: EmpresarioService,
    public auth: AuthService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController) {

      this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.profileImage = null;
      
      this.empresarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.empresario = response as EmpresarioDTO;
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
    this.empresarioService.getImageFromBucket(this.empresario.id)
    .subscribe(response => {
      this.empresario.imageUrl = `${API_CONFIG.bucketBaseUrl}/empr${this.empresario.id}.jpg`;
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
    let loader = this.presentLoading();
    this.empresarioService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Salvando..."
    });
    loader.present();
    return loader;
  }

  cancel() {
    this.picture = null;
  }

  logout() {
    this.auth.logout();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
