import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { ClubesCadastradosPage } from '../clubes-cadastrados/clubes-cadastrados';
import { VideosJogadorPage } from '../videos-jogador/videos-jogador';
import { ConfigJogadorPage } from '../config-jogador/config-jogador';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = VideosJogadorPage;
  tab3Root = ClubesCadastradosPage;
  tab4Root = ConfigJogadorPage;

  constructor() {

  }
}