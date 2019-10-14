import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CredenciaisDTO } from '../../models/credenciais-dto';
import { AuthService } from '../../services/auth.service';
import { TabsEmprPage } from '../tabsempr/tabsempr';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public auth: AuthService
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);   
  } 
 
  ionViewDidLeave() {
    this.menu.swipeEnable(true);   
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot(TabsPage);
      },
      error => {});  
  }

  login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.push(TabsPage);
    },
    error => {});
  }

}
