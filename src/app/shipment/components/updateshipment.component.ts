import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ShipmentService } from "../services/shipment.service";
import { ShipmentType } from "../models/shipmenttype";
import { ShipmentStatus } from "../models/shipmentstatus";
import { ShipmentCategory } from "../models/shipmentcategory";
import { UpdateShipmentRequest } from "../models/updateshipmentrequest";
import { getShipmentCategory } from "../utils/shipment-category.utils";

@Component({
    selector: "shipment-update",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "../templates/updateshipment.html",
    styleUrl: '../styles/updateshipment.css'
})
export class ShipmentUpdateComponent implements OnInit 
{

    constructor(private readonly shipmentService: ShipmentService){
        
    }

    @Input()
    id!: number;

    shipmentTypes = Object.values(ShipmentType);
    shipmentStatuses = Object.values(ShipmentStatus);

    updateForm = new FormGroup({
        origin: new FormControl("", Validators.required),
        destination: new FormControl("", Validators.required),
        type: new FormControl<ShipmentType | null>(
            null,
            Validators.required
        ),
        weight: new FormControl<number | null>(
            null,
            [Validators.required, Validators.min(0.01)]
        ),
        status: new FormControl<ShipmentStatus | null>(
            null,
            Validators.required
        )
    });

    ngOnInit(): void {
        this.shipmentService
            .getShipmentDetails(this.id)
            .subscribe(shipment => {
                this.updateForm.patchValue({
                    origin: shipment.origin,
                    destination: shipment.destination,
                    type: shipment.type,
                    weight: shipment.weight,
                    status: shipment.status,
                });
            });
    }

    update(): void {
        if (this.updateForm.invalid) {
            this.updateForm.markAllAsTouched();
            return;
        }

        const request =
            this.updateForm.getRawValue() as UpdateShipmentRequest;
        request.category = getShipmentCategory(request.weight);
        this.shipmentService
            .updateShipment(this.id, request)
            .subscribe();
    }
}