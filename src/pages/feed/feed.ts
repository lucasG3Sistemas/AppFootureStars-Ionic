import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { HistoricoContratacaoDTO } from '../../models/historico.contratacao.dto';
import { HistoricoContratacaoService } from '../../services/domain/historico.contratacao.service';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: HistoricoContratacaoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public historicoContratacaoService: HistoricoContratacaoService) {
  }

  ionViewDidLoad() {
    this.historicoContratacaoService.findAll().subscribe(response => {
      this.items = response;
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.historicoContratacaoService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/hist${item.id}.jpg`;
        },
        error => {});
    }
  }

}
