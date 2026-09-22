import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Shipment } from "../models/shipment";
import { API_URLS } from "../../constants/api.constants";
import { CreateShipmentRequest } from "../models/createshipmentrequest";
import { ShipmentFilter } from "../models/shipmentfilter";
import { UpdateShipmentRequest } from "../models/updateshipmentrequest";

@Injectable({
    providedIn: 'root'
})

export class ShipmentService
{
    
    constructor(private readonly httpClient: HttpClient)
    {
        this.httpClient = httpClient;
    }

    getShipmentsByPage(page: number, size: number): Observable<Shipment[]>
    {
        return this.httpClient.get<Shipment[]>(`${API_URLS.SHIPMENTS}?page=${page}&&size=${size}`);
    }

    createShipment(request: CreateShipmentRequest): Observable<Shipment>
    {
        return this.httpClient.post<Shipment>(`${API_URLS.SHIPMENTS}`, request);
    }

    updateShipment(id: number, body: UpdateShipmentRequest): Observable<Shipment>
    {
        return this.httpClient.put<Shipment>(`${API_URLS.SHIPMENTS}/${id}}`, body);
    }

    getShipmentDetails(id: number): Observable<Shipment>
    {
        return this.httpClient.get<Shipment>(
            `${API_URLS.SHIPMENTS}/${id}`
        );
    }

    getShipmentsMetadata() : Observable<number>{
        return this.httpClient.get<number>(`${API_URLS.SHIPMENTS}/count`);
    }

    getFilteredData(filter: ShipmentFilter): Observable<Shipment[]>
    {
        let params = new HttpParams()
        .set('page', filter.page)
        .set('size', filter.size);

        if (filter.weight) {
            params = params.set('weight', filter.weight);
        }

        if (filter.status) {
            params = params.set('status', filter.status);
        }

        if (filter.zipCode) {
            params = params.set('zipCode', filter.zipCode);
        }
        if(filter.id)
        {
            params = params.set('id', filter.id);
        }

        console.log(params);
        return this.httpClient.get<Shipment[]>(
            `${API_URLS.SHIPMENTS}/filter`,
            { params }
        );
    }

    deleteShipment(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            `${API_URLS.SHIPMENTS}/${id}`
        );
    }
}