import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupJogadorPage } from './signup-jogador';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/municipio.service';

@NgModule({
  declarations: [
    SignupJogadorPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupJogadorPage)
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupJogadorPageModule {}
