import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'postoffices',
        pathMatch: 'full'
    },

    {
        path: 'postoffices',
        loadComponent: () =>
            import('./postoffice/components/postofficelist.component')
                .then(m => m.PostOfficeListComponent)
    },
    {
        path: 'postoffices/create',
        loadComponent: () =>
            import('./postoffice/components/createpostoffice.component')
                .then(m => m.CreatePostOfficeComponent)
    },
    {
        path: 'postoffices/update/:zipCode',
        loadComponent: () =>
            import('./postoffice/components/updatepostoffice.component')
                .then(m => m.UpdatePostOfficeComponent)
    },

    {
        path: 'shipments',
        loadComponent: () =>
            import('./shipment/components/shipmentlist.component')
                .then(m => m.ShipmentListComponent)
    },
    {
        path: 'shipments/create',
        loadComponent: () =>
            import('./shipment/components/createshipment.component')
                .then(m => m.CreateShipmentComponent)
    },
    {
        path: 'shipments/update/:id',
        loadComponent: () =>
            import('./shipment/components/updateshipment.component')
                .then(m => m.ShipmentUpdateComponent)
    }
];