import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClubeFutebolDTO } from "../../models/clube.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class ClubeFutebolService {

    constructor(public http : HttpClient, public storage : StorageService) {

    }

    findAll() : Observable<ClubeFutebolDTO[]> {
        return this.http.get<ClubeFutebolDTO[]>(`${API_CONFIG.baseUrl}/clubes`);
    }
    
    findByEmail(email: string) : Observable<ClubeFutebolDTO> {
        return this.http.get<ClubeFutebolDTO>(`${API_CONFIG.baseUrl}/clubes/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/club${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClubeFutebolDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clubes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        );
    }

}