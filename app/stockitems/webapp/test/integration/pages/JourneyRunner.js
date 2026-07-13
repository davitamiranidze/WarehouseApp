sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"warehouse/stockitems/test/integration/pages/StockItemsList.gen",
	"warehouse/stockitems/test/integration/pages/StockItemsObjectPage.gen"
], function (JourneyRunner, StockItemsListGenerated, StockItemsObjectPageGenerated) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('warehouse/stockitems') + '/test/flp.html#app-preview',
        pages: {
			onTheStockItemsListGenerated: StockItemsListGenerated,
			onTheStockItemsObjectPageGenerated: StockItemsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

