const cds = require("@sap/cds");
const { validateStockItem } = require("../utils/validation");

const LOG = cds.log("warehouse");

module.exports = function () {
  const { StockItems } = this.entities;

  const calculateTotalPrice = (req) => {
    const { unitPrice, quantity } = req.data;

    if (unitPrice != null && quantity != null) {
      req.data.totalPrice = unitPrice * quantity;
    }
  };

  // Create,Edit or Activate a draft
  this.before(["NEW", "PATCH", "SAVE"], StockItems.drafts, (req) => {
    validateStockItem(req);
    calculateTotalPrice(req);
  });

  // Direct operations on the active entity
  this.before(["CREATE", "UPDATE"], StockItems, (req) => {
    validateStockItem(req);
    calculateTotalPrice(req);
  });

  // Add computed stock status to READ results
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

  // Log active-entity operations
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
