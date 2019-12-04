import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClubeFutebolDTO } from "../../models/clube.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util-service";

@Injectable()
export class ClubeFutebolService {

    constructor(
        public http : HttpClient, 
        public storage : StorageService,
        public imageUtilService: ImageUtilService) {

    }

    findAll() : Observable<ClubeFutebolDTO[]> {
        return this.http.get<ClubeFutebolDTO[]>(`${API_CONFIG.baseUrl}/clubes`);
    }

    findById(id: string): Observable<ClubeFutebolDTO> {
        return this.http.get<ClubeFutebolDTO>(`${API_CONFIG.baseUrl}/clubes/${id}`);
    }

    findByEmail(email: string) : Observable<ClubeFutebolDTO> {
        return this.http.get<ClubeFutebolDTO>(`${API_CONFIG.baseUrl}/clubes/email?value=${email}`);
    }

    findExistsEmail(email: string) : Observable<ClubeFutebolDTO> {
        return this.http.get<ClubeFutebolDTO>(`${API_CONFIG.baseUrl}/clubes/email/exists?value=${email}`);
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

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clubes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}