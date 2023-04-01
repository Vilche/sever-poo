const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateFields, //validar los archivos
    validateJWT,    //validar los token
  } = require("../middleware"); //validaciones en medio de req y res
  
  const {
    userByIdExist,    //validar con la db
    BillExistById,
  } = require("../helpers/db-validators");
  
  const {
    getBill,
    getBillById,
    createBill,
    updateBill,
  } = require("../controllers/bill.controller");

  const router = Router(); 

  router.get("/", getBill);


  router.get("/:id",
  [
    check("id","Este no es un id valido").isMongoId(), //validar id de mongo
    check("id").custom(BillExistById), // validar si existe en db
    validateFields 
  ],
   getBillById);


  
router.post
("/",
  [
    validateJWT,
    check("fecha", "la fecha esta vacia").not().isEmpty(),
    check("user", "El usuario debe estar registrado").not().isEmpty().isMongoId(),
    check("user").custom(userByIdExist),
    validateFields
    //validando campos necesarios y retornando err si hay  
  ],  
  createBill);


  router.put("/:id",
  [
    validateJWT,
    check("id","Esta factura no existe").isMongoId(),
    check("id").custom(BillExistById),
    check("fecha", "la fecha esta vacia").not().isEmpty(),
    check("user", "El usuario debe escribirse").not().isEmpty(),
    check("user").custom(userByIdExist),
    check("total", "El total esta vacio").not().isEmpty().isNumeric(),
    validateFields
  ], 
  updateBill);



  module.exports = router; 