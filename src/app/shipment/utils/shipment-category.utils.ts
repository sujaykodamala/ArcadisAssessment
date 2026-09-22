import { ShipmentCategory } from "../models/shipmentcategory";

export function getShipmentCategory(weight: number): ShipmentCategory {
    if (weight < 1) {
        return ShipmentCategory.LessThanOneKg;
    }

    if (weight <= 5) {
        return ShipmentCategory.BetweenOneAndFiveKg;
    }

    return ShipmentCategory.MoreThanFiveKg;
}