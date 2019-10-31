import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorLancesService } from '../../services/domain/jogador.lances.service';
import { StorageService } from '../../services/storage.service';
import { CONFIG_USU } from '../../config/config_usu';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorLancesDTO } from '../../models/jogador.lance.dto';

@IonicPage()
@Component({
  selector: 'page-jogador-adicionar-lance',
  templateUrl: 'jogador-adicionar-lance.html',
})
export class JogadorAdicionarLancePage {

  formGroup: FormGroup;
  item: JogadorLancesDTO;
  tituloPage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public jogadorLanceService: JogadorLancesService
  ) {
    this.formGroup = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      urlVideo: ['', [Validators.required]],
      complemento: [''],
      idJogador: CONFIG_USU.idJogador!="" ? CONFIG_USU.idJogador : null,
      idUsuario: storage.getLocalUser().email
    });
    this.tituloPage = "Cadastrar Vídeo";
  }

  ionViewDidLoad() {
    //if (CONFIG_USU.idLanceJogador != "") {
    //  this.tituloPage = "Editar Vídeo";
    //  this.jogadorLanceService.find(CONFIG_USU.idLanceJogador)
    //  .subscribe(response => {
    //    this.item = response;
    //  },
    //    error => { });
    //}
    //CONFIG_USU.idLanceJogador = "";
  }

  addVideo() {
    this.jogadorLanceService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => { });
      //CONFIG_USU.idLanceJogador = "";
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Vídeo adicionado com sucesso',
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
