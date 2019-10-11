import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { ListaObservacaoPage } from '../lista-observacao/lista-observacao';
import { ClubeEmprSeusJogadoresPage } from '../clube-empr-seus-jogadores/clube-empr-seus-jogadores';
import { ConfigEmprPage } from '../config-empr/config-empr';

@Component({
  templateUrl: 'tabsempr.html'
})
export class TabsEmprPage {

  tab1Root = FeedPage;
  tab2Root = ListaObservacaoPage;
  tab3Root = ClubeEmprSeusJogadoresPage;
  tab4Root = ConfigEmprPage;

  constructor() {

  }
}