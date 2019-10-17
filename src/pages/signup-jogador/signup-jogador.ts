import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-signup-jogador',
  templateUrl: 'signup-jogador.html',
})
export class SignupJogadorPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome : ['', [Validators.required]],
        cpf : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        data_nasc : ['', [Validators.required]],
        nacionalidade : ['', [Validators.required]],
        estado_nasc : [null, [Validators.required]],
        municipio_nasc : [null, [Validators.required]],
        sexo : ['', [Validators.required]],
        altura : ['', [Validators.required]],
        peso : ['', [Validators.required]],
        profissionalizacao : ['', [Validators.required]],
        codigo_cbf : ['', [Validators.required]],
        idModalidade : [null, [Validators.required]],
        idPosicao1 : [null, [Validators.required]],
        idPosicao2 : [null],
        idPosicao3 : [null],
        perna_preferida : [null, [Validators.required]],
        prefixo_fone : ['', [Validators.required]],
        ddd_fone : ['', [Validators.required]],
        fone : ['', [Validators.required]],
        email : [CONFIG_USU.emailUsuario, [Validators.required, Validators.email]],
        complemento : [''],
        idClubeFutebol : [null],
        idEmpresario : [null],
        idUsuario : CONFIG_USU.emailUsuario
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupJogadorPage');
  }

  signupJogador() {
    console.log("enviou o form");
  }

}
