import { ShipmentCategory } from "./shipmentcategory";
import { ShipmentStatus } from "./shipmentstatus";
import { ShipmentType } from "./shipmenttype";

export interface ShipmentFilter {
    id?: number;
    status?: ShipmentStatus;
    zipCode?: string;
    weight?: number,
    page: number;
    size: number;
}