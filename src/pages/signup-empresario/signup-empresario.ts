import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-signup-empresario',
  templateUrl: 'signup-empresario.html',
})
export class SignupEmpresarioPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome: ['teste@gmail.com', [Validators.required]],
        cpf : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        data_nasc : ['', [Validators.required]],
        nacionalidade : ['', [Validators.required]],
        estado_nasc : [null, [Validators.required]],
        municipio_nasc : [null, [Validators.required]],
        sexo : ['', [Validators.required]],
        prefixo_fone: ['', [Validators.required]],
        ddd_fone: ['', [Validators.required]],
        fone: ['', [Validators.required]],
        complemento: [''],
        idUsuario: CONFIG_USU.emailUsuario
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupEmpresarioPage');
    console.log(CONFIG_USU.emailUsuario);
  }

  signupEmpresario() {
    console.log("enviou o form");
  }

}
