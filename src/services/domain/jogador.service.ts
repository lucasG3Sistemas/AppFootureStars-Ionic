import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { JogadorDTO } from "../../models/jogador.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util-service";

@Injectable()
export class JogadorService {

    constructor(
        public http : HttpClient, 
        public storage : StorageService,
        public imageUtilService: ImageUtilService) {

    }

    findJogNome(idLista : string, usuario : string, nome: string) : Observable<JogadorDTO[]> {
        return this.http.get<JogadorDTO[]>(`${API_CONFIG.baseUrl}/jogadores/?idLista=${idLista}&usuario=${usuario}&nome=${nome}`);
    }

    findBuscaJogadores(idLista : string, usuario : string) : Observable<JogadorDTO[]> {
        return this.http.get<JogadorDTO[]>(`${API_CONFIG.baseUrl}/jogadores/lista?idLista=${idLista}&usuario=${usuario}`);
    }

    findById(id: string) : Observable<JogadorDTO> {
        return this.http.get<JogadorDTO>(`${API_CONFIG.baseUrl}/jogadores/${id}`);
    }

    findByEmail(email: string) : Observable<JogadorDTO> {
        return this.http.get<JogadorDTO>(`${API_CONFIG.baseUrl}/jogadores/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/jdor${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : JogadorDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/jogadores`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/jogadores/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}