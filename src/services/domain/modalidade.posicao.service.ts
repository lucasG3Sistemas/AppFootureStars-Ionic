import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ModalidadePosicaoDTO } from "../../models/modalidade.posicao.dto";

@Injectable()
export class ModalidadePosicaoService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findAll(idModalidade : string): Observable<ModalidadePosicaoDTO[]> {
        return this.http.get<ModalidadePosicaoDTO[]>(`${API_CONFIG.baseUrl}/modalidades/posicoes/?modalidades=${idModalidade}`);
    }

}