import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG_USU } from '../../config/config_usu';
import { CidadeDTO } from '../../models/municipio.dto';
import { CidadeService } from '../../services/domain/municipio.service';
import { EstadoDTO } from '../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup-clube',
  templateUrl: 'signup-clube.html',
})
export class SignupClubePage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService) {

    this.formGroup = this.formBuilder.group({
      nome: ['teste@gmail.com', [Validators.required, Validators.email]],
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
    console.log(this.formGroup.value);
    console.log("enviou o form");
  }

}
