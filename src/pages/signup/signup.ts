import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { UsuarioDTO } from '../../models/usuario.dto';
import { SignupClubePage } from '../signup-clube/signup-clube';
import { SignupEmpresarioPage } from '../signup-empresario/signup-empresario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';
import { UsuarioService } from '../../services/domain/usuario.service';

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
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      tipoUsuario: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    let loader = this.presentLoading();
    CONFIG_USU.emailUsuario = this.formGroup.value.email;
    this.usuarioService.insert(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.showInsertOk();
      },
      error => { 
        loader.dismiss(); 
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //this.navCtrl.pop(); //desempilhar a página
            if (this.formGroup.value.tipoUsuario == "1") {
              this.navCtrl.push(SignupJogadorPage);
            } else if (this.formGroup.value.tipoUsuario == "2") {
              this.navCtrl.push(SignupClubePage);
            } else if (this.formGroup.value.tipoUsuario == "3") {
              this.navCtrl.push(SignupEmpresarioPage);
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}