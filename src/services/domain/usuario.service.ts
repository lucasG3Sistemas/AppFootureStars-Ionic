import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { UsuarioDTO } from "../../models/usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    //findByEmail(email: string) : Observable<JogadorDTO> {
    //    return this.http.get<JogadorDTO>(`${API_CONFIG.baseUrl}/jogadores/email?value=${email}`);
    //}

    insert(obj : UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}