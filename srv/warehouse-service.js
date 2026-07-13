const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {
  require("./handlers/stock-items").call(this);
});
