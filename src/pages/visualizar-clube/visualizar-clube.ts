import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClubeFutebolDTO } from '../../models/clube.dto';
import { CONFIG_USU } from '../../config/config_usu';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-visualizar-clube',
  templateUrl: 'visualizar-clube.html',
})
export class VisualizarClubePage {

  clube: ClubeFutebolDTO;
  reg: number;
  nomeClube: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public clubeService: ClubeFutebolService, public loadingCtrl: LoadingController) {
    this.nomeClube = CONFIG_USU.nomeClube;
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.clubeService.findById(CONFIG_USU.idClube)
      .subscribe(response => {
        console.log(response);
        this.clube = response;
        loader.dismiss();
        this.getImageIfExists();
      },
      error => {
        loader.dismiss();
      });
  }

  getImageIfExists() {
    this.clubeService.getImageFromBucket(this.clube.id)
    .subscribe(response => {
      this.clube.imageUrl = `${API_CONFIG.bucketBaseUrl}/club${this.clube.id}.jpg`;
    },
    error => {});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
