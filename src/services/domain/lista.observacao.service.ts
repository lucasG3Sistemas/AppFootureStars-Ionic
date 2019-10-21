import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ListaObservacaoDTO } from "../../models/lista.observacao.dto";

@Injectable()
export class ListaObservacaoService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findListaObservacao(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/listas/observacoes/usuario?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ListaObservacaoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/listas/observacoes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

}