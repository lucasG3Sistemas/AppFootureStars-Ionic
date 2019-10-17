import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-signup-clube',
  templateUrl: 'signup-clube.html',
})
export class SignupClubePage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome : ['teste@gmail.com', [Validators.required, Validators.email]],
        idModalidade1 : [null, [Validators.required]],
        idModalidade2 : [null],
        profissionalizacao : ['', [Validators.required]],
        registro_cbf : [''],
        pais : ['', [Validators.required]],
        estado : ['', [Validators.required]],
        municipio : ['', [Validators.required]],
        complemento: [''],
        idUsuario: CONFIG_USU.emailUsuario
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupClubePage');
  }

  signupClube() {
    console.log("enviou o form");
  }

}
