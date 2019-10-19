import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ModalidadeDTO } from "../../models/modalidade.dto";

@Injectable()
export class ModalidadeService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findAll(): Observable<ModalidadeDTO[]> {
        return this.http.get<ModalidadeDTO[]>(`${API_CONFIG.baseUrl}/modalidades`);
    }

}