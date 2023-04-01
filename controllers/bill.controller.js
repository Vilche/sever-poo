const { response } = require("express");
const Bill = require("../models/bill.model");
const User = require("../models/bill.model");

const getBill= async (req, res = response) => {
    const [Bills, totalDocuments] = await Promise.all([
      Bill.find() // para buscar los documentos en la colección de factura
        .populate("user"), //para cargar los datos del usuario relacionado con cada factura.
      Bill.countDocuments(),//contar el número total de facturas que cumplen con la condición
    ]);
  
    res.status(200).json({
      totalDocuments,
      Bills,
    });
  };

  const getBillById = async (req = request, res = response) => {
    const { id } = req.params;
    const bill = await Bill.findById(id)
      .populate("user");
  
    res.status(200).json(bill);
  };

  const createBill = async (req, res = response) => {
    const { fecha, user} = req.body;
  
    const data = {
      fecha:fecha,
      user: user,
    };
  
    const bill  = new Bill(data);
    await 
bill.save
();
    res.status(200).json(bill);
  };

  const updateBill = async (req, res) => {
    const { id } = req.params;
    const { fecha, user, total  } = req.body;
  
    const data = {
      fecha:fecha,
      user: user,
      total:total
    };
  
    const bill = await Bill.findByIdAndUpdate(id, data);
  
    res.status(200).json(bill);
  };


  
  module.exports = {
    getBill,
    getBillById,
    createBill,
    updateBill,
  }; 