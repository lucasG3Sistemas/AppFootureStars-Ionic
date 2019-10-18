import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupEmpresarioPage } from './signup-empresario';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/municipio.service';

@NgModule({
  declarations: [
    SignupEmpresarioPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupEmpresarioPage),
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupEmpresarioPageModule {}
