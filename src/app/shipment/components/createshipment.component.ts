import { Component, signal } from "@angular/core";
import { ShipmentService } from "../services/shipment.service";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { ShipmentType } from "../models/shipmenttype";
import { CreateShipmentRequest } from "../models/createshipmentrequest";
import { getShipmentCategory } from "../utils/shipment-category.utils";

@Component({
    selector: 'create-shipment',
    imports: [ReactiveFormsModule],
    templateUrl: '../templates/createshipment.html',
    styleUrl: '../styles/createshipment.css'
})
export class CreateShipmentComponent {


    constructor(private readonly shipmentService: ShipmentService)
    {

    }
    
    showSuccess = signal(false);
    showError = signal(false);
    ShipmentType = ShipmentType;
    failureReason: string = '';

    shipmentTypes = Object.values(ShipmentType);

    createForm = new FormGroup({
        weight: new FormControl<number | null>(
            null,
            [Validators.required, Validators.min(0.01)]
        ),

        shipmentType: new FormControl<ShipmentType | null>(
            null,
            Validators.required
        ),

        origin: new FormControl(
            '',
            Validators.required
        ),

        destination: new FormControl(
            '',
            Validators.required
        )
    });

   save(): void {
        if (this.createForm.invalid) {
            return;
        }

        const weight = this.createForm.value.weight!;
        const category = getShipmentCategory(weight);

        const request: CreateShipmentRequest = {
            destination: this.createForm.value.destination ?? '',
            origin: this.createForm.value.origin ?? '',
            weight: weight,
            type: this.createForm.value.shipmentType!,
            category: category
        };

        this.shipmentService.createShipment(request).subscribe({
            next: () => {
                this.showSuccess.set(true);
                this.showError.set(false);
                this.createForm.reset();

                window.setTimeout(() => {
                    this.showSuccess.set(false);
                }, 3000);
            },

            error: (error) => {
                this.failureReason =
                    error?.error?.message ?? "Unable to create shipment.";

                this.showError.set(true);
                this.showSuccess.set(false);

                window.setTimeout(() => {
                    this.showError.set(false);
                }, 3000);
            }
        });
    }
}
