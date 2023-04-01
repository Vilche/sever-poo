const { Schema, model } = require("mongoose");

const BillDetailSchema = Schema({

  cantidad: {
    type: Number,
    required: [true, "Cantidad necesaria"]
  },

  fechaDetail: {
    type: String,
    required: true
  },

  totalDetail: {
    type: Number,
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  bill:{
    type: Schema.Types.ObjectId,
    ref: "Bill",
    required: true
  }
});

BillDetailSchema.methods.toJSON = function (){ //se utiliza para personalizar la salida de los documentos al serializarlos como objetos JSON
  const {__v, status, ...data} = this.toObject();//se desestructura el objeto y en tres partes utilizando la sintaxis de spread
  return data;
}

module.exports = model("BillDetail", BillDetailSchema);