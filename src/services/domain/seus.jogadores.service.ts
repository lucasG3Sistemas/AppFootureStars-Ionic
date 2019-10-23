import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { JogadorDTO } from "../../models/jogador.dto";

@Injectable()
export class SeusJogadoresService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findSeusJogadores(email: string) : Observable<JogadorDTO[]> {
        return this.http.get<JogadorDTO[]>(`${API_CONFIG.baseUrl}/jogadores/usuario?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
    
    //insert(obj : ListaObservacaoDTO) {
    //    return this.http.post(
    //        `${API_CONFIG.baseUrl}/listas/observacoes`, 
    //        obj,
    //        { 
    //            observe: 'response', 
    //            responseType: 'text'
    //        }
    //    );
    //}

}