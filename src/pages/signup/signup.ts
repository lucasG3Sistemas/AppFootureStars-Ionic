import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { UsuarioDTO } from '../../models/usuario.dto';
import { SignupClubePage } from '../signup-clube/signup-clube';
import { SignupEmpresarioPage } from '../signup-empresario/signup-empresario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        email: ['teste@gmail.com', [Validators.required, Validators.email]],
        senha : ['', [Validators.required]],
        tipoUsuario : [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    CONFIG_USU.emailUsuario = this.formGroup.value.email;

    if (this.formGroup.value.tipoUsuario == "1") {
      this.navCtrl.push(SignupJogadorPage);
    } else if (this.formGroup.value.tipoUsuario == "2") {
      this.navCtrl.push(SignupClubePage);
    } else if (this.formGroup.value.tipoUsuario == "3") {
      this.navCtrl.push(SignupEmpresarioPage);
    }
    
  }

}
