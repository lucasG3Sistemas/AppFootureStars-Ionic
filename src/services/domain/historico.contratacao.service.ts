import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { HistoricoContratacaoDTO } from "../../models/historico.contratacao.dto";

@Injectable()
export class HistoricoContratacaoService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findAll() : Observable<HistoricoContratacaoDTO[]> {
        return this.http.get<HistoricoContratacaoDTO[]>(`${API_CONFIG.baseUrl}/historicos/contratacoes`);
    }
    
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/hist${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}