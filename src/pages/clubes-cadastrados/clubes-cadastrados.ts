import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { ClubeFutebolDTO } from '../../models/clube.dto';
import { API_CONFIG } from '../../config/api.config';
import { CONFIG_USU } from '../../config/config_usu';
import { VisualizarClubePage } from '../visualizar-clube/visualizar-clube';


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
    this.loadData();
  }

  loadData() {
    this.clubeFutebolService.findAll().subscribe(response => {
      this.items = response;
      this.loadImageUrls();
    },
    error => {});
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
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

  showDetail(idClube: string, nomeClube: string) {
    CONFIG_USU.idClube = idClube;
    CONFIG_USU.nomeClube = nomeClube;
    this.navCtrl.push(VisualizarClubePage);
  }

}