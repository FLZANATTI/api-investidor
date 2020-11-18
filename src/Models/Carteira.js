const mongoose = require('mongoose');

const CarteiraSchema = new mongoose.Schema({
  Nome: {
    type: String,
    require: true,
  },
  DataCriacao: {
      type: Date,
      default: Date.now,
  },
  ValorInvestido:{
      type: Number
  }
});
  const Carteira = mongoose.model("Carteira", CarteiraSchema);
  
  module.exports = Carteira;