import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser"
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@IonicPage()
@Component({
  selector: 'page-videos-jogador',
  templateUrl: 'videos-jogador.html',
})
export class VideosJogadorPage {

  vid = 'https://www.youtube.com/embed/hHYDVmWE9FI';

  constructor( private dom: DomSanitizer, public plt: Platform,
    private youtube: YoutubeVideoPlayer, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosJogadorPage');
  }

  openMyVideo() {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo('rhQmy93LZH8');  
    } else {
      window.open('https://www.youtube.com/watch?v=rhQmy93LZH8');
    }
    
  }

  sanitize(vid) {
    return this.dom.bypassSecurityTrustResourceUrl(vid);
  }

}
