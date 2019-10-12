import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClubeFutebolService } from '../../services/domain/clube.service';


@IonicPage()
@Component({
  selector: 'page-clubes-cadastrados',
  templateUrl: 'clubes-cadastrados.html',
})
export class ClubesCadastradosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clubeFutebolService: ClubeFutebolService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubesCadastradosPage');
    this.clubeFutebolService.findAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });

  }

}
