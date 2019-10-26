import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CredenciaisDTO } from '../../models/credenciais-dto';
import { AuthService } from '../../services/auth.service';
import { TabsEmprPage } from '../tabsempr/tabsempr';
import { SignupPage } from '../signup/signup';
import { TabsClubePage } from '../tabsclube/tabsclube';
import { StorageService } from '../../services/storage.service';
import { CONFIG_USU } from '../../config/config_usu';


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
    public storage: StorageService,
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
    console.log(this.storage);
    console.log(this.storage.getLocalUser);
    let localUser = this.storage.getLocalUser();
    
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        if (localUser.email.includes("clube")) {
          this.navCtrl.setRoot(TabsClubePage);
        } else if (localUser.email.includes("empresario")) {
          this.navCtrl.setRoot(TabsEmprPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      },
      error => {});
  }

  login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      if (this.creds.email.includes("clube")) {
        this.navCtrl.push(TabsClubePage);
      } else if (this.creds.email.includes("empresario")) {
        this.navCtrl.push(TabsEmprPage);
      } else {
        this.navCtrl.push(TabsPage);
      }
    },
    error => {});
  }

  signup() {
    CONFIG_USU.idListaObservacao = "";
    this.navCtrl.push(SignupPage);
  }

}
