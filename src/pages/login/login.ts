import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CredenciaisDTO } from '../../models/credenciais-dto';
import { AuthService } from '../../services/auth.service';
import { TabsEmprPage } from '../tabsempr/tabsempr';
import { SignupPage } from '../signup/signup';
import { TabsClubePage } from '../tabsclube/tabsclube';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { ClubeFutebolService } from '../../services/domain/clube.service';
import { EmpresarioService } from '../../services/domain/empresario.service';
import { SignupEmpresarioPage } from '../signup-empresario/signup-empresario';
import { CONFIG_USU } from '../../config/config_usu';
import { SignupClubePage } from '../signup-clube/signup-clube';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: UsuarioDTO;

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public menu: MenuController,
    public auth: AuthService,
    public usuarioService: UsuarioService,
    public jogadorService: JogadorService,
    public clubeService: ClubeFutebolService,
    public empresarioService: EmpresarioService,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();

    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));

        let loader = this.presentLoading();
        this.usuarioService.findByEmail(localUser.email)
          .subscribe(response => {
            this.usuario = response;

            if (response.tipoUsuario == "CLUBEFUTEBOL") {
              this.navCtrl.push(TabsClubePage);
            } else if (response.tipoUsuario == "EMPRESARIO") {
              this.navCtrl.push(TabsEmprPage);
            } else {
              this.navCtrl.push(TabsPage);
            }

            loader.dismiss();
          },
            error => {
              loader.dismiss();
            });
      },
        error => { });
  }

  login() {
    let email = this.creds.email;
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));

        let loader = this.presentLoading();
        this.usuarioService.findByEmail(email)
          .subscribe(response => {
            this.usuario = response;

            if (this.usuario.tipoUsuario == "CLUBEFUTEBOL") {
              //verifica se o usuario possui o perfil cadastrado
              this.clubeService.findExistsEmail(this.usuario.email)
              .subscribe(response => {
                this.navCtrl.push(TabsClubePage);
              },
              error => {
                CONFIG_USU.emailUsuario = this.usuario.email;
                this.navCtrl.push(SignupClubePage, {
                  loginEfetuado: true
                });
              });
              

            } else if (this.usuario.tipoUsuario == "EMPRESARIO") {
              //verifica se o usuario possui o perfil cadastrado
              this.empresarioService.findExistsEmail(this.usuario.email)
              .subscribe(response => {
                this.navCtrl.push(TabsEmprPage);
              },
              error => {
                CONFIG_USU.emailUsuario = this.usuario.email;
                this.navCtrl.push(SignupEmpresarioPage, {
                  loginEfetuado: true
                });
              });

            } else if (this.usuario.tipoUsuario == "JOGADORFUTEBOL") {
              //verifica se o usuario possui o perfil cadastrado
              this.jogadorService.findExistsEmail(this.usuario.email)
              .subscribe(response => {
                this.navCtrl.push(TabsPage);
              },
              error => {
                CONFIG_USU.emailUsuario = this.usuario.email;
                this.navCtrl.setRoot(SignupJogadorPage, {
                  loginEfetuado: true
                });
              });
            }

            loader.dismiss();
          },
            error => {
              loader.dismiss();
            });
      },
        error => { });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
