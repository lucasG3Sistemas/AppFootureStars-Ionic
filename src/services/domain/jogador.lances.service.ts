import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { JogadorDTO } from "../../models/jogador.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { JogadorLancesDTO } from "../../models/jogador.lance.dto";

@Injectable()
export class JogadorLancesService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    find(id: string) : Observable<JogadorLancesDTO> {
        return this.http.get<JogadorLancesDTO>(`${API_CONFIG.baseUrl}/jogadores/lances/${id}`);
    }

    findLancesJogador(idJogador : string) : Observable<JogadorLancesDTO[]> {
        return this.http.get<JogadorLancesDTO[]>(`${API_CONFIG.baseUrl}/jogadores/lances/idJogador?idJogador=${idJogador}`);
    }

    findLances(usuario : string) : Observable<JogadorLancesDTO[]> {
        return this.http.get<JogadorLancesDTO[]>(`${API_CONFIG.baseUrl}/jogadores/lances/jogador?usuario=${usuario}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : JogadorLancesDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/jogadores/lances`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

}