import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostOffice } from "../models/postoffice";
import { API_URLS } from "../../constants/api.constants";
import { UpdatePostOfficeRequest } from "../models/updatepostofficerequest";

@Injectable({
    providedIn:'root'
})

export class PostOfficeService
{
    constructor(private readonly httpClient: HttpClient)
    {

    }

    getPostOffice(zipCode: string): Observable<PostOffice>{
        return this.httpClient.get<PostOffice>(`${API_URLS.POST_OFFICES}/${zipCode}`);
    }

    createPostOffice(request: PostOffice) : Observable<PostOffice>
    {
        return this.httpClient.post<PostOffice>(`${API_URLS.POST_OFFICES}`, request);
    }

    getPostOffices(): Observable<PostOffice[]>
    {
        return this.httpClient.get<PostOffice[]>(`${API_URLS.POST_OFFICES}`);
    }

    updatePostOffice(zipCode: string, request: UpdatePostOfficeRequest): Observable<PostOffice>
    {
        return this.httpClient.put<PostOffice>(`${API_URLS.POST_OFFICES}/${zipCode}`, request);
    }

    deletePostOffice(zipCode: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${API_URLS.POST_OFFICES}/${zipCode}`
        );
    }
}