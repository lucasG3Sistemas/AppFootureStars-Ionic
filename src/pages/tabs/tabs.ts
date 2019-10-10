import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { VideoPage } from '../video/video';
import { ClubecadastradoPage } from '../clubecadastrado/clubecadastrado';
import { ConfigjogadorPage } from '../configjogador/configjogador';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = VideoPage;
  tab3Root = ClubecadastradoPage;
  tab4Root = ConfigjogadorPage;

  constructor() {

  }
}