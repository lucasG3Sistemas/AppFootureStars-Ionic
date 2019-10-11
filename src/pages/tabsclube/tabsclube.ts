import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { ListaObservacaoPage } from '../lista-observacao/lista-observacao';
import { ClubeEmprSeusJogadoresPage } from '../clube-empr-seus-jogadores/clube-empr-seus-jogadores';
import { ConfigClubePage } from '../config-clube/config-clube';

@Component({
  templateUrl: 'tabsclube.html'
})
export class TabsClubePage {

  tab1Root = FeedPage;
  tab2Root = ListaObservacaoPage;
  tab3Root = ClubeEmprSeusJogadoresPage;
  tab4Root = ConfigClubePage;

  constructor() {

  }
}