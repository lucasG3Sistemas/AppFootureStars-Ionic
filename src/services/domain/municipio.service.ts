import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/municipio.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class CidadeService {

    private baseApiPath = "http://servicodados.ibge.gov.br/api/v1/localidades/estados";

    constructor(public http: HttpClient) {
    }

    findAll(estado : string) : Observable<CidadeDTO[]>  {
        return this.http.get<CidadeDTO[]>(`${this.baseApiPath}/${estado}/municipios`);
    }
}