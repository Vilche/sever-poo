const { Schema, model } = require("mongoose");


const BillSchema = Schema({

  fecha: {
    type: String,
    required: true
  },

  total: {
    type: Number,
    default: 0
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

BillSchema.methods.toJSON = function (){
  const { __v, status, ...data } = this.toObject();
  return data;
}

module.exports = model("Bill", BillSchema);