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

  items: ClubeFutebolDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clubeFutebolService: ClubeFutebolService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubesCadastradosPage');
    this.clubeFutebolService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });

  }

}
