// Validation functions for stock item data
module.exports.validateStockItem = (req) => {
  const {
    unitPrice,
    quantity,
    product_ID,
    supplierOrganization_ID,
    receivedDate,
  } = req.data;

  // Unit price
  if (unitPrice != null) {
    const price = Number(unitPrice);

    if (!Number.isFinite(price)) {
      req.error(400, "Unit price must be a valid number.");
    } else if (price < 0) {
      req.error(400, "Unit price cannot be negative.");
    }
  }

  // Quantity
  if (quantity != null) {
    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity)) {
      req.error(400, "Quantity must be a whole number.");
    } else if (parsedQuantity < 0) {
      req.error(400, "Quantity cannot be negative.");
    }
  }

  // Associations
  if (product_ID !== undefined && !product_ID) {
    req.error(400, "Product is required.");
  }

  if (
    supplierOrganization_ID !== undefined &&
    !supplierOrganization_ID
  ) {
    req.error(400, "Supplier organization is required.");
  }

  // Received date
  if (receivedDate !== undefined) {
    if (!receivedDate) {
      req.error(400, "Received date is required.");
      return;
    }

    const received = new Date(`${receivedDate}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(received.getTime())) {
      req.error(400, "Received date is invalid.");
    } else if (received > today) {
      req.error(400, "Received date cannot be in the future.");
    }
  }
};