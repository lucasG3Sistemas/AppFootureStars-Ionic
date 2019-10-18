import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupClubePage } from './signup-clube';
import { CidadeService } from '../../services/domain/municipio.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupClubePage,
  ],
  imports: [
    IonicPageModule.forChild(SignupClubePage),
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupClubePageModule {}
