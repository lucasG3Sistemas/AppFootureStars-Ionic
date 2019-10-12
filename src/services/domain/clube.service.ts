import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClubeFutebolDTO } from "../../models/clube.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClubeFutebolService {

    constructor(public http : HttpClient) {

    }

    findAll() : Observable<ClubeFutebolDTO[]> {
        return this.http.get<ClubeFutebolDTO[]>(`${API_CONFIG.baseUrl}/clubes`);
    }
    
}