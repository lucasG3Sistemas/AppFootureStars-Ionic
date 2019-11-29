import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/municipio.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/municipio.service';
import { EmpresarioService } from '../../services/domain/empresario.service';

@IonicPage()
@Component({
  selector: 'page-signup-empresario',
  templateUrl: 'signup-empresario.html',
})
export class SignupEmpresarioPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public empresarioService: EmpresarioService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      data_nasc: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      estado_nasc: [null, [Validators.required]],
      municipio_nasc: [null, [Validators.required]],
      sexo: ['', [Validators.required]],
      prefixo_fone: ['55', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      ddd_fone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      fone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      complemento: [''],
      idUsuario: CONFIG_USU.emailUsuario
    });

  }

  ionViewDidLoad() {
    this.formGroup.controls.nacionalidade.setValue("Brasil");
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estado_nasc.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });
  }

  updateCidades() {
    let estado = this.formGroup.value.estado_nasc;
    this.cidadeService.findAll(estado)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.municipio_nasc.setValue(null);
      },
        error => { });
  }

  signupEmpresario() {
    this.empresarioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
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
            this.navCtrl.popToRoot();
            //this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
