// Validation functions for stock item data
module.exports.validateStockItem = (req) => {
  const {
    unitPrice,
    quantity,
    product_ID,
    supplierOrganization_ID,
    receivedDate
  } = req.data;


  // Validate fields
  if (unitPrice != null && unitPrice < 0) {
    req.error(400, "Unit price cannot be negative.");
  }

  if (quantity != null && quantity < 0) {
    req.error(400, "Quantity cannot be negative.");
  }

  if (quantity != null && !Number.isInteger(quantity)) {
    req.error(400, "Quantity must be a whole number.");
  }

  if (product_ID !== undefined && !product_ID) {
    req.error(400, "Product is required.");
  }

  if (supplierOrganization_ID !== undefined && !supplierOrganization_ID) {
    req.error(400, "Supplier organization is required.");
  }


  // Validate receivedDate (is not after today)
  if (receivedDate !== undefined) {
    if (!receivedDate) {
      req.error(400, "Received date is required.");
    } else {
      const received = new Date(receivedDate);
      const today = new Date();
      
      received.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (received > today) {
        req.error(400, "Received date cannot be in the future.");
      }
    }
  }
};