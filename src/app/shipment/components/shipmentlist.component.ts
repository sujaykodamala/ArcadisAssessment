import { Component, signal } from "@angular/core";
import { ShipmentService } from "../services/shipment.service";
import { Shipment } from "../models/shipment";
import { FormsModule } from "@angular/forms";
import { ShipmentFilter } from "../models/shipmentfilter";
import { ShipmentStatus } from "../models/shipmentstatus";
import { ShipmentType } from "../models/shipmenttype";
import { ShipmentCategory } from "../models/shipmentcategory";
import { DecimalPipe } from "@angular/common";
import { Router } from '@angular/router';

@Component({
    providers: [ShipmentService],
    templateUrl: '../templates/shipments.html',
    selector: 'shipment-list',
    imports: [FormsModule, DecimalPipe],
    styleUrl: '../styles/shipmentlist.css'
})

export class ShipmentListComponent
{


    private shipmentService: ShipmentService;

    constructor(shipmentService: ShipmentService, private router: Router)
    {
        this.shipmentService = shipmentService;
    }

    shipmentTypes = Object.values(ShipmentType);
    shipmentStatuses = Object.values(ShipmentStatus);
    shipmentCategories = Object.values(ShipmentCategory);

    shipments = signal<Shipment[]>([]);
    page: number = 1;
    size: number = 10;    

    totalItemCount: number = 0;
    totalPages: number = 0;

    isPrevDisabled: boolean = true;
    isNextDisabled: boolean = true;

    filterZipCode: string | undefined = undefined;
    filterWeight: number | undefined = undefined;
    filterStatus: ShipmentStatus | undefined = undefined;
    filterId: number | undefined = undefined;

    ngOnInit()
    {
        this.shipmentService.getShipmentsMetadata().subscribe(data => {
            this.totalItemCount = data,
            console.log(data),
            this.totalPages = Math.ceil(this.totalItemCount/this.size),
            this.isNextDisabled = this.totalPages <= 1;
        });
        console.log(this.totalItemCount);
        this.getShipmentByPage();
    }

   prevClicked(): void {
    if (this.page > 1) {
        this.page--;
        this.isPrevDisabled = this.page === 1;
        this.isNextDisabled = false;

        this.getShipmentByPage();
         }
    }

    nextClicked(): void {
    if (this.page < this.totalPages) {
        this.page++;

        this.isPrevDisabled = false;
        this.isNextDisabled = this.page === this.totalPages;

        this.getShipmentByPage();
        }
    }

    getShipmentByPage(): void{
         this.shipmentService.getShipmentsByPage(this.page,this.size).subscribe(data =>{
            this.shipments.set(data);
            console.log(this.shipments());
    });
    }

    applyFilter(): void{
        console.log('')
       const request: ShipmentFilter = {
            zipCode: this.filterZipCode || undefined,
            weight: this.filterWeight || undefined,
            status: this.filterStatus || undefined,
            id: this.filterId || undefined,
            page: this.page,
            size: this.size
        };
        this.shipmentService.getFilteredData(request).subscribe(data => {
            this.shipments.set(data);
        });
    }
    
    updateShipment(id: number): void {
        this.router.navigate(['/shipments/update', id]);
    }    

    removeShipment(id: number):void {
        this.shipmentService.deleteShipment(id).subscribe({
        next: () => {
            this.getShipmentByPage();
        },
        error: (error) => {
            console.error(error);
        }
    });
    }
}