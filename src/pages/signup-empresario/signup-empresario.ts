import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup-empresario',
  templateUrl: 'signup-empresario.html',
})
export class SignupEmpresarioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupEmpresarioPage');
  }

  signupEmpresario() {
    console.log("enviou o form");
  }

}
