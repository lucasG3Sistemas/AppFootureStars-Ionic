import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService {

    private baseApiPath = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<EstadoDTO[]>  {
        return this.http.get<EstadoDTO[]>(`${this.baseApiPath}`);
    }
}