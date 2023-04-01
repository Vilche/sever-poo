const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateFields,
    validateJWT,
} = require("../middleware");

const {
    productExistById,
    BillDetailExistById,
    BillExistById,
} = require("../helpers/db-validators");

const {
    getBillDetail,
    getBillDetailById,
    createBillDetail,
    updateDetail,
} = require("../controllers/billDetail.controller");


const router = Router();

router.get("/", getBillDetail);


router.get("/:id",
    [
        check("id", "El id no existe").isMongoId(),
        check("id").custom(BillDetailExistById),
        validateFields
    ],
    getBillDetailById);


router.post("/",
    [
        validateJWT,
        check("bill", "la factura no puede estar vacia").not().isEmpty(),
        check("bill", "No es un mongoId").isMongoId(),
        check("bill").custom(BillExistById),
        check("cantidad", "la cantidad no puede estar vacia").not().isEmpty().isNumeric(),
        check("product", "El producto no puede estar vacio").not().isEmpty(),
        check("product", "no es un mongoId").isMongoId(),
        check("product").custom(productExistById),
        validateFields
    ],
    createBillDetail);


router.put("/:id",
    [
        validateJWT,
        check("id", "Este detalle de factura no existe").isMongoId(),
        check("id").custom(BillDetailExistById),
        check("bill", "La compra no puede estar vacia").not().isEmpty(),
        check("bill", "este no es un mongoId").isMongoId(),
        check("bill").custom(BillExistById),
        check("cantidad", "la cantidad no puede estar vacia").not().isEmpty().isNumeric(),
        check("product", "product dont can be empty").not().isEmpty(),
        check("product", "este no es un mongoId").isMongoId(),
        check("product").custom(productExistById),
        validateFields
    ],
    updateDetail);


module.exports = router;

