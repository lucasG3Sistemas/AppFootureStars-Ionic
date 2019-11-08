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

    //findListaObservacaoNome(email: string, nome: string) {
    //    return this.http.get(`${API_CONFIG.baseUrl}/listas/observacoes/search?usuario=${email}&nome=${nome}`);
    //}

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ListaObservacaoDTO) {
        console.log(obj);
        let url = this.http.post(
            `${API_CONFIG.baseUrl}/listas/observacoes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
        if (obj.id != "") {
            url = this.http.put(
                `${API_CONFIG.baseUrl}/listas/observacoes/${obj.id}`, 
                obj,
                { 
                    observe: 'response', 
                    responseType: 'text'
                }
            );
        }

        return url;
    }

    delete(id: string, idJogador: string) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/listas/observacoes/?id=${id}&jogador=${idJogador}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}