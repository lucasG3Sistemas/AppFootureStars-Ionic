import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ListaObservacaoDTO } from '../../models/lista.observacao.dto';
import { ListaObservacaoService } from '../../services/domain/lista.observacao.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-lista-observacao',
  templateUrl: 'lista-observacao.html',
})
export class ListaObservacaoPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: ListaObservacaoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public listaObservacaoService: ListaObservacaoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.listaObservacaoService.findListaObservacao(localUser.email).subscribe(response => {
      this.items = response['jogadores'];
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.listaObservacaoService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
        error => {});
    }
  }

}
