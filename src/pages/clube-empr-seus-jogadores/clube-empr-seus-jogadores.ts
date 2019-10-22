import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { JogadorDTO } from '../../models/jogador.dto';
import { SeusJogadoresService } from '../../services/domain/seus.jogadores.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-clube-empr-seus-jogadores',
  templateUrl: 'clube-empr-seus-jogadores.html',
})
export class ClubeEmprSeusJogadoresPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: JogadorDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public seusJogadoresService: SeusJogadoresService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.seusJogadoresService.findSeusJogadores(localUser.email).subscribe(response => {
      console.log(response);
      this.items = response;
      console.log(this.items);
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.seusJogadoresService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
        error => {});
    }
  }

}
