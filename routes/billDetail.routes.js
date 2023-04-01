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
        check("id", "this id does not exist").isMongoId(),
        check("id").custom(BillDetailExistById),
        validateFields
    ],
    getBillDetailById);


router.post("/",
    [
        validateJWT,
        check("buy", "Buy dont can be empty").not().isEmpty(),
        check("buy", "This is not mongoId").isMongoId(),
        check("buy").custom(BillExistById),
        check("quantity", "the quantity dont can be empty").not().isEmpty().isNumeric(),
        check("product", "product dont can be empty").not().isEmpty(),
        check("product", "This is not mongoId").isMongoId(),
        check("product").custom(productExistById),
        validateFields
    ],
    createDetail);


router.put("/:id",
    [
        validateJWT,
        check("id", "this detail doesnt exist").isMongoId(),
        check("id").custom(DetailExistById),
        check("buy", "Buy dont can be empty").not().isEmpty(),
        check("buy", "This is not mongoId").isMongoId(),
        check("buy").custom(BuyExistById),
        check("quantity", "the quantity dont can be empty").not().isEmpty().isNumeric(),
        check("product", "product dont can be empty").not().isEmpty(),
        check("product", "This is not mongoId").isMongoId(),
        check("product").custom(productExistById),
        validateFields
    ],
    updateDetail);


module.exports = router;

