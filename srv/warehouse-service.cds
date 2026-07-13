using {warehouse as db} from '../db/schema';

// Define the WarehouseService with access restrictions and OData draft support
@requires: 'authenticated-user'
service WarehouseService {

    @restrict: [
        {
            grant: 'READ',
            to   : [
                'Viewer',
                'Admin'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : 'Admin'
        }
    ]
    @odata.draft.enabled
    entity StockItems            as projection on db.StockItems;


    @restrict: [
        {
            grant: 'READ',
            to   : [
                'Viewer',
                'Admin'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : 'Admin'
        }
    ]
    @odata.draft.enabled
    entity Products              as projection on db.Products;


    @restrict: [
        {
            grant: 'READ',
            to   : [
                'Viewer',
                'Admin'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : 'Admin'
        }
    ]
    @odata.draft.enabled
    entity Categories            as projection on db.Categories;


    @restrict: [
        {
            grant: 'READ',
            to   : [
                'Viewer',
                'Admin'
            ]
        },
        {
            grant: [
                'CREATE',
                'UPDATE',
                'DELETE'
            ],
            to   : 'Admin'
        }
    ]
    @odata.draft.enabled
    entity SupplierOrganizations as projection on db.SupplierOrganizations;
}
