import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';
import { EstadoDTO } from '../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/municipio.service';
import { CidadeDTO } from '../../models/municipio.dto';
import { ModalidadePosicaoDTO } from '../../models/modalidade.posicao.dto';
import { ModalidadeDTO } from '../../models/modalidade.dto';
import { ModalidadeService } from '../../services/domain/modalidade.service';
import { ModalidadePosicaoService } from '../../services/domain/modalidade.posicao.service';
import { JogadorService } from '../../services/domain/jogador.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-signup-jogador',
  templateUrl: 'signup-jogador.html'
})
export class SignupJogadorPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  modalidades: ModalidadeDTO[];
  modalidadePosicoes: ModalidadePosicaoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public modalidadeService: ModalidadeService,
    public modalidadePosicaoService: ModalidadePosicaoService,
    public jogadorService: JogadorService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      data_nasc: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      estado_nasc: [null, [Validators.required]],
      municipio_nasc: [null, [Validators.required]],
      sexo: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      profissionalizacao: ['', [Validators.required]],
      codigo_cbf: [''],
      idModalidade: [null, [Validators.required]],
      idPosicao1: [null, [Validators.required]],
      idPosicao2: [null],
      idPosicao3: [null],
      perna_preferida: ['', [Validators.required]],
      prefixo_fone: ['', [Validators.required]],
      ddd_fone: ['', [Validators.required]],
      fone: ['', [Validators.required]],
      email: [CONFIG_USU.emailUsuario, [Validators.required, Validators.email]],
      complemento: [''],
      idClubeFutebol: [null],
      idEmpresario: [null],
      idUsuario: CONFIG_USU.emailUsuario == "" ? storage.getLocalUser().email : CONFIG_USU.emailUsuario
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

    this.modalidadeService.findAll()
      .subscribe(response => {
        this.modalidades = response;
        this.formGroup.controls.idModalidade.setValue(this.modalidades[0].id);
        this.updatePosicoes();
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

  updatePosicoes() {
    let idModalidade = this.formGroup.value.idModalidade;
    this.modalidadePosicaoService.findAll(idModalidade)
      .subscribe(response => {
        this.modalidadePosicoes = response;
        this.formGroup.controls.idPosicao1.setValue(null);
      },
        error => { });
  }

  signupJogador() {
    this.jogadorService.insert(this.formGroup.value)
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

  //public event = {
    //month: '1990-02-19'
  //}

}