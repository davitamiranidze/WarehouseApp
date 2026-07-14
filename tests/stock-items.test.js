const cds = require("@sap/cds");
require("@cap-js/cds-test");

describe("WarehouseService - StockItems", () => {
  const { GET, POST } = cds.test(__dirname + "/..");

  const servicePath = "/odata/v4/warehouse";

  const adminAuth = {
    auth: {
      username: "admin",
      password: "",
    },
  };

  const viewerAuth = {
    auth: {
      username: "daviti",
      password: "",
    },
  };

  let existingStockItem;
  let product;
  let supplier;

  /*
   * Runs before the tests.
   * It loads existing records that can be used by the tests.
   */
  beforeAll(async () => {
    const productsResponse = await GET(
      `${servicePath}/Products?$top=1`,
      adminAuth,
    );

    const suppliersResponse = await GET(
      `${servicePath}/SupplierOrganizations?$top=1`,
      adminAuth,
    );

    const stockItemsResponse = await GET(
      `${servicePath}/StockItems?$top=1`,
      adminAuth,
    );

    product = productsResponse.data.value[0];
    supplier = suppliersResponse.data.value[0];
    existingStockItem = stockItemsResponse.data.value[0];

    if (!product) {
      throw new Error(
        "No Product exists. Add Product test data in db/data first.",
      );
    }

    if (!supplier) {
      throw new Error(
        "No SupplierOrganization exists. Add supplier test data in db/data first.",
      );
    }

    if (!existingStockItem) {
      throw new Error(
        "No StockItem exists. Add StockItem test data in db/data first.",
      );
    }
  });

  /*
   * Test number 1
   * GET the main entity collection
   * Verify the expected record count.
   */
  test("GET StockItems returns the expected record count", async () => {
    const response = await GET(`${servicePath}/StockItems`, adminAuth);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.value)).toBe(true);
    const expectedRecordCount = 20;

    expect(response.data.value).toHaveLength(expectedRecordCount);
  });

  /*
   * Test number 2
   * GET a single entity by key
   * Verify its field values.
   */
  test("GET one StockItem by ID returns the correct values", async () => {
    const id = existingStockItem.ID;

    const response = await GET(
      `${servicePath}/StockItems(ID=${id},IsActiveEntity=true)`,
      adminAuth,
    );

    expect(response.status).toBe(200);
    expect(response.data.ID).toBe(id);
    expect(response.data.quantity).toBe(existingStockItem.quantity);
    expect(Number(response.data.unitPrice)).toBe(
      Number(existingStockItem.unitPrice),
    );
    expect(response.data.product_ID).toBe(existingStockItem.product_ID);
    expect(response.data.supplierOrganization_ID).toBe(
      existingStockItem.supplierOrganization_ID,
    );
  });

  /*
    * Test number 3
   * POST a new record
   * Verify it is created correctly.
   */
  test("POST creates a StockItem correctly", async () => {
    const newStockItem = {
      product_ID: product.ID,
      supplierOrganization_ID: supplier.ID,
      unitPrice: 20,
      quantity: 5,
      receivedDate: "2026-07-13",
    };

    const response = await POST(
      `${servicePath}/StockItems`,
      newStockItem,
      adminAuth,
    );

    expect(response.status).toBe(201);
    expect(response.data.ID).toBeDefined();
    expect(response.data.product_ID).toBe(product.ID);
    expect(response.data.supplierOrganization_ID).toBe(supplier.ID);
    expect(Number(response.data.unitPrice)).toBe(20);
    expect(response.data.quantity).toBe(5);
  });

  /*
   * Test number 4
   * Test the custom handler
   * Negative unit prices must be rejected.
   */
  test("custom validation rejects a negative unit price", async () => {
    const invalidStockItem = {
      product_ID: product.ID,
      supplierOrganization_ID: supplier.ID,
      unitPrice: -10,
      quantity: 5,
      receivedDate: "2026-07-13",
    };

    await expect(
      POST(`${servicePath}/StockItems`, invalidStockItem, adminAuth),
    ).rejects.toMatchObject({
      response: {
        status: 400,
      },
    });
  });

  /*
   * Test number 5
   * Test authorization
   * Viewer can read but cannot create StockItems.
   */
  test("Viewer role is rejected when creating a StockItem", async () => {
    const newStockItem = {
      product_ID: product.ID,
      supplierOrganization_ID: supplier.ID,
      unitPrice: 15,
      quantity: 2,
      receivedDate: "2026-07-13",
    };

    await expect(
      POST(`${servicePath}/StockItems`, newStockItem, viewerAuth),
    ).rejects.toMatchObject({
      response: {
        status: 403,
      },
    });
  });
});
