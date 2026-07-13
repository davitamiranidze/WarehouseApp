namespace warehouse;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity Categories : cuid, managed {
    name : String(100) not null;
}

entity SupplierOrganizations : cuid, managed {
    name     : String(150) not null;
    location : String(255) not null;
    email    : String(255) not null;
}

entity Products : cuid, managed {
    name        : String(150) not null;
    description : String(500);
    category    : Association to Categories not null;
}

entity StockItems : cuid, managed {
    product              : Association to Products not null;
    supplierOrganization : Association to SupplierOrganizations not null;

    quantity             : Integer not null;
    unitPrice            : Decimal(10, 2) not null;

    @readonly
    totalPrice           : Decimal(10, 2) @formula: 'quantity * unitPrice';

    receivedDate         : Date not null;

    virtual stockStatus  : String;
}
