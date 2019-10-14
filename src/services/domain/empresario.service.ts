import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { EmpresarioDTO } from "../../models/empresario.dto";

@Injectable()
export class EmpresarioService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findByEmail(email: string) : Observable<EmpresarioDTO> {
        return this.http.get<EmpresarioDTO>(`${API_CONFIG.baseUrl}/empresarios/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/empr${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}