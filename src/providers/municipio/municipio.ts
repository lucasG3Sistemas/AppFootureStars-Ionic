import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MunicipioProvider {

  private baseApiPath = "https://ibge.herokuapp.com/municipio";

  constructor(public http: HttpClient) {

  }

  getMunicipio() {
    return this.http.get(this.baseApiPath + "/municipio/?val=SC");
  }

}
