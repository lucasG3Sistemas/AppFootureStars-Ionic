import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TabsClubePage } from '../tabsclube/tabsclube';
import { TabsEmprPage } from '../tabsempr/tabsempr';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  slides = [
    {
      title: "App FootureStars!",
      description: "Este aplicativo irá transformar a sua experiência de <b>divulgação e acompanhamento de jogadores de futebol</b> em uma maneira simples e rápida!",
      image: "assets/img/slide4.jpg",
    },  
    {
      title: "Você é um Jogador?",
      description: "Cadastre-se de forma rapída e inclua seus <b>vídeos jogando futebol</b> para que os clubes possam observá-lo!",
      image: "assets/img/slide4.jpg",
    },
    {
      title: "Você é um Clube ou Olheiro/Empresário?",
      description: "Cadastra-se, <b>controle seus jogadores na palma da sua mão</b>, além de <b>observar e acompanhar jogadores pretendidos</b> em qualquer lugar apenas utilizando seu celular!",
      image: "assets/img/slide4.jpg",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  acessarHome() {
    this.navCtrl.push(TabsPage);
  }

}
