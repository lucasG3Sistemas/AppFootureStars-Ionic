import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';
import { CidadeDTO } from '../../models/municipio.dto';
import { CidadeService } from '../../services/domain/municipio.service';
import { EstadoDTO } from '../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { ModalidadeDTO } from '../../models/modalidade.dto';
import { ModalidadeService } from '../../services/domain/modalidade.service';
import { ClubeFutebolService } from '../../services/domain/clube.service';

@IonicPage()
@Component({
  selector: 'page-signup-clube',
  templateUrl: 'signup-clube.html',
})
export class SignupClubePage {

  formGroup: FormGroup;
  modalidades: ModalidadeDTO[];
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalidadeService: ModalidadeService,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clubeFutebolService: ClubeFutebolService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      idModalidade1: [null, [Validators.required]],
      idModalidade2: [null],
      profissionalizacao: ['', [Validators.required]],
      registro_cbf: [''],
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      complemento: [''],
      idUsuario: CONFIG_USU.emailUsuario
    });

  }

  ionViewDidLoad() {
    this.formGroup.controls.pais.setValue("Brasil");
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estado.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => { });

    this.modalidadeService.findAll()
      .subscribe(response => {
        this.modalidades = response;
        this.formGroup.controls.idModalidade1.setValue(this.modalidades[0].id);
      },
        error => { });
  }

  updateCidades() {
    let estado = this.formGroup.value.estado;
    this.cidadeService.findAll(estado)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.municipio.setValue(null);
      },
        error => { });
  }

  signupClube() {
    this.clubeFutebolService.insert(this.formGroup.value)
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
          }
        }
      ]
    });
    alert.present();
  }

}
