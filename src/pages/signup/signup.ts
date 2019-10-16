import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { UsuarioDTO } from '../../models/usuario.dto';
import { SignupClubePage } from '../signup-clube/signup-clube';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  usuario: UsuarioDTO = {
    email: "",
    senha: "",
    tipoUsuario: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("enviou o form");
    if (this.usuario.tipoUsuario == "1") {
      this.navCtrl.push(SignupJogadorPage);
    } else if (this.usuario.tipoUsuario == "2") {
      this.navCtrl.push(SignupClubePage);
    }
    
  }

}
