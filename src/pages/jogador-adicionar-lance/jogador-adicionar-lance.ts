import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorLancesService } from '../../services/domain/jogador.lances.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-jogador-adicionar-lance',
  templateUrl: 'jogador-adicionar-lance.html',
})
export class JogadorAdicionarLancePage {

  formGroup: FormGroup;

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
      idJogador: [null],
      idUsuario: storage.getLocalUser().email
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JogadorAdicionarLancePage');
  }

  addVideo() {
    this.jogadorLanceService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
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
