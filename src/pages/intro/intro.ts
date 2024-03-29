import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  slides = [
    {
      title: "App Footure Stars!",
      description: "Este aplicativo irá transformar a sua experiência em <b>divulgação e acompanhamento de jogadores de futebol</b> em uma maneira simples e rápida!",
      image: "assets/imgs/app.jpg",
    },  
    {
      title: "Você é um Jogador?",
      description: "Cadastre-se de forma rapída e inclua seus <b>vídeos jogando futebol</b> para que os clubes possam observá-lo!",
      image: "assets/imgs/slide2.jpg",
    },
    {
      title: "Você é um Clube ou Olheiro/Empresário?",
      description: "Cadastra-se, <b>controle seus jogadores na palma da sua mão</b>, além de <b>observar e acompanhar jogadores pretendidos</b> em qualquer lugar, apenas utilizando seu celular!",
      image: "assets/imgs/slide3.jpg",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  acessarHome() {
    this.navCtrl.setRoot(LoginPage);
  }

}
