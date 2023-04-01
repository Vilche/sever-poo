const Category = require("./category.model");
const Role = require("./role.model");
const Server = require("./server");
const User = require("./user.model");
const Product = require("./product.model");
const Bill = require("./bill.model");
const BillDetail = require("./billDetail.model"); //agregando los modelos

module.exports = {
  Category,
  Role,
  Server,
  User,
  Product,
  Bill,
  BillDetail
};
