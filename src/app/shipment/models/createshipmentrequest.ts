import { ShipmentCategory } from "./shipmentcategory";
import { ShipmentType } from "./shipmenttype";

export interface CreateShipmentRequest
{
    origin: string, 
    destination: string, 
    weight: number, 
    type: ShipmentType,
    category: ShipmentCategory
}
