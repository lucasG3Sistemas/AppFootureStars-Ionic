import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, List } from 'ionic-angular';
import { JogadorFiltroDTO } from '../../models/jogador.filtro.dto';
import { ModalidadeDTO } from '../../models/modalidade.dto';
import { ModalidadePosicaoDTO } from '../../models/modalidade.posicao.dto';
import { ModalidadeService } from '../../services/domain/modalidade.service';
import { ModalidadePosicaoService } from '../../services/domain/modalidade.posicao.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-filtrar-jogador',
  templateUrl: 'filtrar-jogador.html',
})
export class FiltrarJogadorPage {

//  jogador: JogadorFiltroDTO = {
 //   idModalidade: "",
  //  idPosicao: "",
   // sexo: "",
  //  alturaInicial: "",
   // alturaFinal: "",
  //  pesoInicial: "",
   // pesoFinal: "",
   // profissionalizacao: "",
    //perna_preferida: ""
  //};

  formGroup: FormGroup;
  modalidades: ModalidadeDTO[];
  modalidadePosicoes: ModalidadePosicaoDTO[];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalidadeService: ModalidadeService,
    public modalidadePosicaoService: ModalidadePosicaoService) {
    //console.log('UserId', navParams.get('userId'));
    //this.userId = navParams.get('userId');

    this.formGroup = this.formBuilder.group({
      //nacionalidade: ['', [Validators.required]],
      //estado_nasc: [null, [Validators.required]],
      //municipio_nasc: [null, [Validators.required]],

      idModalidade: [null],
      idPosicao: [''],
      sexo: [1],
      alturaInicial: [''],
      alturaFinal: [''],
      pesoInicial: [''],
      pesoFinal: [''],
      profissionalizacao: [''],
      perna_preferida: ['']
    });

  }

  ionViewDidLoad() {
    this.modalidadeService.findAll()
      .subscribe(response => {
        this.modalidades = response;
        this.formGroup.controls.idModalidade.setValue(this.modalidades[0].id);
        this.updatePosicoes();
      },
        error => { });
  }

  updatePosicoes() {
    let idModalidade = this.formGroup.value.idModalidade;
    this.modalidadePosicaoService.findAll(idModalidade)
      .subscribe(response => {
        this.modalidadePosicoes = response;
        this.formGroup.controls.idPosicao.setValue(null);
      },
        error => { });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  filtrarModal() {

    let filtroJogadorDTO: any;
    filtroJogadorDTO;
    let data = { 
      //filtroJogadorDTO: {
        idModalidade: this.formGroup.controls.idModalidade.value,
        idPosicao: this.formGroup.controls.idPosicao.value,
        sexo: this.formGroup.controls.sexo.value,
        alturaInicial: this.formGroup.controls.alturaInicial.value,
        alturaFinal: this.formGroup.controls.alturaFinal.value,
        pesoInicial: this.formGroup.controls.pesoInicial.value,
        pesoFinal: this.formGroup.controls.pesoFinal.value,
        profissionalizacao: this.formGroup.controls.profissionalizacao.value,
        perna_preferida: this.formGroup.controls.perna_preferida.value
     //}
    };
    this.viewCtrl.dismiss(data);
  }

}
