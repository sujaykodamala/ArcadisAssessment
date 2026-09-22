import { ShipmentCategory } from "./shipmentcategory";
import { ShipmentStatus } from "./shipmentstatus";
import { ShipmentType } from "./shipmenttype";

export interface Shipment
{
    id: number, 
    type: ShipmentType,
    weight: number, 
    origin: string,
    destination: string, 
    status: ShipmentStatus
    category: ShipmentCategory
}