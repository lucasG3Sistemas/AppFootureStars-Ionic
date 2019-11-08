import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { EmpresarioDTO } from "../../models/empresario.dto";
import { ImageUtilService } from "../image-util-service";

@Injectable()
export class EmpresarioService {

    constructor(public http : HttpClient,
        public storage : StorageService,
        public imageUtilService: ImageUtilService) {

    }

    findByEmail(email: string) : Observable<EmpresarioDTO> {
        return this.http.get<EmpresarioDTO>(`${API_CONFIG.baseUrl}/empresarios/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/empr${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : EmpresarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/empresarios`, 
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
            `${API_CONFIG.baseUrl}/empresarios/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}