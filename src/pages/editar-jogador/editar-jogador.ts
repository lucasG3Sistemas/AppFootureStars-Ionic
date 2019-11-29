import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ModalidadePosicaoDTO } from '../../models/modalidade.posicao.dto';
import { ModalidadeDTO } from '../../models/modalidade.dto';
import { CidadeDTO } from '../../models/municipio.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalidadeService } from '../../services/domain/modalidade.service';
import { ModalidadePosicaoService } from '../../services/domain/modalidade.posicao.service';
import { JogadorService } from '../../services/domain/jogador.service';

@IonicPage()
@Component({
  selector: 'page-editar-jogador',
  templateUrl: 'editar-jogador.html',
})
export class EditarJogadorPage {

  formGroup: FormGroup;
  modalidades: ModalidadeDTO[];
  modalidadePosicoes: ModalidadePosicaoDTO[];

  idJogador: number;
  altura: number;
  peso: number;
  profissionalizacao: number;
  codigo_cbf: string;
  idModalidade: number;
  idPosicao1: number;
  idPosicao2: number;
  idPosicao3: number;
  perna_preferida: number;
  prefixo_fone: number;
  ddd_fone: number;
  fone: number;
  complemento: string;


  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalidadeService: ModalidadeService,
    public modalidadePosicaoService: ModalidadePosicaoService,
    public jogadorService: JogadorService,
    public alertCtrl: AlertController) {

    this.idJogador = this.navParams.get("idJogador");
    this.altura = this.navParams.get("altura");
    this.peso = this.navParams.get("peso");
    this.profissionalizacao = this.navParams.get("profissionalizacao");
    this.codigo_cbf = this.navParams.get("codigo_cbf");
    this.idModalidade = this.navParams.get("idModalidade");
    this.idPosicao1 = this.navParams.get("idPosicao1");
    this.idPosicao2 = this.navParams.get("idPosicao2");
    this.idPosicao3 = this.navParams.get("idPosicao3");
    this.perna_preferida = this.navParams.get("perna_preferida");
    this.prefixo_fone = this.navParams.get("prefixo_fone");
    this.ddd_fone = this.navParams.get("ddd_fone");
    this.fone = this.navParams.get("fone");
    this.complemento = this.navParams.get("complemento") != null ? this.navParams.get("complemento") : "";

    this.formGroup = this.formBuilder.group({
      id: [this.idJogador, [Validators.required]],
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      profissionalizacao: ['', [Validators.required]],
      codigo_cbf: [''],
      idModalidade: [this.idModalidade, [Validators.required]],
      idPosicao1: [this.idPosicao1, [Validators.required]],
      idPosicao2: [this.idPosicao2],
      idPosicao3: [this.idPosicao3],
      perna_preferida: ['', [Validators.required]],
      prefixo_fone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      ddd_fone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      fone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      complemento: ['']
    });

  }

  ionViewDidLoad() {
    this.modalidadeService.findAll()
      .subscribe(response => {
        this.modalidades = response;
        this.updatePosicoes();
      },
        error => { });
  }

  updatePosicoes() {
    let idModalidade = this.formGroup.value.idModalidade;
    this.modalidadePosicaoService.findAll(idModalidade)
      .subscribe(response => {
        this.modalidadePosicoes = response;
      },
        error => { });
  }

  salvarEdicao() {
    this.jogadorService.update(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Edição efetuada com sucesso',
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