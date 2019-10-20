import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { HistoricoContratacaoDTO } from '../../models/historico.contratacao.dto';
import { HistoricoContratacaoService } from '../../services/domain/historico.contratacao.service';
import { LoginPage } from '../login/login';
import { StorageService } from '../../services/storage.service';

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
    public storage: StorageService,
    public historicoContratacaoService: HistoricoContratacaoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.historicoContratacaoService.findAll().subscribe(response => {
        this.items = response;
        this.loadImageUrls();
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.parent.parent.setRoot(LoginPage);
          }
        });
    } else {
      this.navCtrl.parent.parent.setRoot(LoginPage);
    }
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
