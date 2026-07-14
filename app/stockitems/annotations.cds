using WarehouseService as service from '../../srv/warehouse-service';
annotate service.StockItems with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : product_ID,
                Label : 'product',
            },
            {
                $Type : 'UI.DataField',
                Value : product.category.name,
                Label : 'category',
            },
            {
                $Type : 'UI.DataField',
                Value : product.description,
                Label : 'description',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Product Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Supplier Organisation ',
            ID : 'SupplierOrganisation',
            Target : '@UI.FieldGroup#SupplierOrganisation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Additional Information',
            ID : 'AdditionalInformation',
            Target : '@UI.FieldGroup#AdditionalInformation',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : product.name,
            Label : 'product',
        },
        {
            $Type : 'UI.DataField',
            Value : product.category.name,
            Label : 'category',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierOrganization.name,
            Label : 'supplierOrganization',
        },
        {
            $Type : 'UI.DataField',
            Label : 'receivedDate',
            Value : receivedDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'unitPrice',
            Value : unitPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'quantity',
            Value : quantity,
        },
        {
            $Type : 'UI.DataField',
            Label : 'totalPrice',
            Value : totalPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stockStatus',
            Value : stockStatus,
        },
    ],
    UI.SelectionFields : [
        product.name,
        supplierOrganization.name,
        supplierOrganization.email,
        supplierOrganization.location,
        receivedDate,
        stockStatus,
    ],
    UI.FieldGroup #SupplierOrganisation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : supplierOrganization_ID,
                Label : 'supplierOrganization',
            },
            {
                $Type : 'UI.DataField',
                Value : supplierOrganization.email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : supplierOrganization.location,
                Label : 'location',
            },
        ],
    },
    UI.FieldGroup #AdditionalInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : unitPrice,
                Label : 'unitPrice',
            },
            {
                $Type : 'UI.DataField',
                Value : quantity,
                Label : 'quantity',
            },
            {
                $Type : 'UI.DataField',
                Value : receivedDate,
            },
        ],
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : product.name,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
);

annotate service.StockItems with {
    product @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Products',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : product_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'category/name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'description',
                },
            ],
        },
        Common.ExternalID : product.name,
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
        )
};

annotate service.StockItems with {
    supplierOrganization @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'SupplierOrganizations',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : supplierOrganization_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'email',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'location',
                },
            ],
        },
        Common.ExternalID : supplierOrganization.name,
        Common.ValueListWithFixedValues : true,
        Common.FieldControl : #Mandatory,
    )
};

annotate service.StockItems with {
    receivedDate @(
        Common.Label : 'receivedDate',
        Common.FieldControl : #Mandatory,
    )
};

annotate service.StockItems with {
    stockStatus @Common.Label : 'stockStatus'
};

annotate service.Products with {
    name @(
        Common.Label : 'product',
        Common.FieldControl : #ReadOnly,
        )
};

annotate service.SupplierOrganizations with {
    name @(
        Common.Label : 'supplierOrganization ',
        Common.FieldControl : #ReadOnly,
    )
};

annotate service.SupplierOrganizations with {
    email @(
        Common.Label : 'supplierOrganization email',
        Common.FieldControl : #ReadOnly,
    )
};

annotate service.SupplierOrganizations with {
    location @(
        Common.Label : 'supplierOrganization location',
        Common.FieldControl : #ReadOnly,
    )
};

annotate service.Products with {
    description @Common.FieldControl : #ReadOnly
};

annotate service.Categories with {
    name @Common.FieldControl : #ReadOnly
};

annotate service.StockItems with {
    unitPrice @Common.FieldControl : #Mandatory
};

annotate service.StockItems with {
    quantity @Common.FieldControl : #Mandatory
};

