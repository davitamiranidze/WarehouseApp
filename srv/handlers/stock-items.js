const cds = require("@sap/cds");
const { validateStockItem } = require("../utils/validation");
const LOG = cds.log("warehouse");

// Handler for stock item operations
module.exports = function () {
  const { StockItems } = this.entities;

  // Creating a new draft
  this.before("NEW", StockItems.drafts, (req) => {
    validateStockItem(req);

    const { unitPrice, quantity } = req.data;

    if (unitPrice != null && quantity != null) {
      req.data.totalPrice = unitPrice * quantity;
    }
  });

  // Editing an existing draft
  this.before("PATCH", StockItems.drafts, (req) => {
    validateStockItem(req);
  });

  // Activating/saving the draft
  this.before("SAVE", StockItems.drafts, (req) => {
    validateStockItem(req);
  });

  // Defining total price before creating or updating stock items
  this.before(["CREATE", "UPDATE"], "StockItems", (req) => {
    validateStockItem(req);
    const { unitPrice, quantity } = req.data;
    req.data.totalPrice = unitPrice * quantity;
  });

  // Setting stock status after reading stock items
  this.after("READ", StockItems, (data) => {
    const items = Array.isArray(data) ? data : [data];

    for (const item of items) {
      if (!item) continue;

      if (item.quantity === 0) {
        item.stockStatus = "Out of Stock";
      } else if (item.quantity <= 5) {
        item.stockStatus = "Low Stock";
      } else {
        item.stockStatus = "In Stock";
      }
    }
  });

  // Logging stock item operations
  this.after("CREATE", StockItems, (data) => {
    LOG.info(`Created stock item ${data.ID}`);
  });

  this.after("UPDATE", StockItems, (data) => {
    LOG.info(`Updated stock item ${data.ID}`);
  });

  this.after("DELETE", StockItems, (_, req) => {
    LOG.info(`Deleted stock item ${req.data.ID}`);
  });
};
