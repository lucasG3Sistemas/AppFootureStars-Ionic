import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { JogadorDTO } from "../../models/jogador.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class JogadorService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findByEmail(email: string) : Observable<JogadorDTO> {
        return this.http.get<JogadorDTO>(`${API_CONFIG.baseUrl}/jogadores/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}