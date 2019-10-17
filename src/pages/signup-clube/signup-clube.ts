import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup-clube',
  templateUrl: 'signup-clube.html',
})
export class SignupClubePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupClubePage');
  }

  signupClube() {
    console.log("enviou o form");
  }

}
