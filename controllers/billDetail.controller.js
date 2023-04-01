const { response } = require("express");
const BillDetail = require("../models/billDetail.model");
const Product = require("../models/product.model");
const Bill = require("../models/bill.model");


const getBillDetail= async (req, res = response) => {
    const [billDetail, total] = await Promise.all([
      BillDetail.find()
        .populate("product")
        .populate({path:"bill", populate:{path:"user"}}),
      BillDetail.countDocuments(),
    ]);
  
    res.status(200).json({
      total,
      billDetail,
    });
  };

  const getBillDetailById = async (req = request, res = response) => {
    const { id } = req.params;
    const detail = await BillDetail.findById(id)
    //buscar el detalle de factura por su ID y reemplaza la propiedad de referencia "bill" con los datos completos de la factura correspondiente
      .populate("bill");
    
    res.status(200).json(detail);
  };

  const createBillDetail = async (req, res = response) => {
    const { bill, product, cantidad } = req.body;//Desestructura el objeto de solicitud para obtener las propiedades
    //capturando datos
    const {precio} = await Product.findById(product); //capturando precio
    const totalDetail = cantidad*precio;
    const countDetails = await BillDetail.countDocuments({bill:bill});
    if (countDetails === 10){
      //Si ya se han registrado 10 detalles de factura para esta factura en particular, devuelve un error con el mensaje
        return res.status(400).json({Error:"Ya se registraron 10 compras en esta factura"})
    }
    if (cantidad > 7 ){
        return res.status(400).json({Error:"solo se permiten 7 /U de este producto"})
    }

   

    const data = {
         totalDetail:totalDetail, bill, product, cantidad,
    }; //save database 

    const SearchTotalBill = await Bill.findById(bill);
    //buscando total de la factura
    const NewBillTotal = SearchTotalBill.totalDetail + totalDetail;
    //agregando la nueva sumatoria con la anterior
    const UpdatedBill = await Bill.findByIdAndUpdate(bill, {totalDetail:NewBillTotal})
    // actualizar factura principal
    const billDetail = new BillDetail(data);
    await billDetail.save();
    //guardando los cambios
    return res.status(200).json(billDetail);
  };

  const updateDetail = async (req, res) => {
    const { id } = req.params;
    const { bill, product, cantidad } = req.body;
    //capturando datos
    const {precio} = await Product.findById(product); //capturando precio
    const totalDetail = cantidad*precio;
    const countDetails = await BillDetail.countDocuments({bill:bill});
    if (cantidad > 7 ){
        return res.status(400).json({Error:"solo se permiten 7 /U de este producto"})
    }

    
    const data = {
         totalDetail:totalDetail, bill, product, cantidad
    }; //save database 

    const SearchTotalBill = await Bill.findById(bill);
    //buscando total de la factura
    const NewBillTotal = SearchTotalBill.totalDetail + totalDetail
    //agregando la nueva sumatoria con la anterior
    const UpdatedBill = await Bill.findByIdAndUpdate(bill, {totalDetail:NewBillTotal})
    // actualizar factura principal


    const Actualizar = await Bill.findByIdAndUpdate(bill, {totalDetail:NewBillTotal})
  
    const billDetail = await BillDetail.findByIdAndUpdate(id, data);
    return res.status(200).json(billDetail);
  };

  
  module.exports = {
    getBillDetail,
    getBillDetailById,
    createBillDetail,
    updateDetail
  };