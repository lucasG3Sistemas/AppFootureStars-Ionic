import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { ClubeFutebolDTO } from '../../models/clube.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-clubes-cadastrados',
  templateUrl: 'clubes-cadastrados.html',
})
export class ClubesCadastradosPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  reg: number;
  items: ClubeFutebolDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clubeFutebolService: ClubeFutebolService) {
  }

  ionViewDidLoad() {
    this.clubeFutebolService.findAll().subscribe(response => {
      this.items = response;
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    this.reg = 0;
    for (var i=0; i<this.items.length; i++) {
      this.reg = 1;
      let item = this.items[i];
      this.clubeFutebolService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/club${item.id}.jpg`;
        },
        error => {});
    }
  }

  verificaReg() : number {
    return this.reg;
  }

}