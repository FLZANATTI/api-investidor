const mongoose = require('mongoose');

const AcoesSchema = new mongoose.Schema({
  Ticker: {
    type: String,
    require: true,
  },
  Nome: {
    type: String,
    require: true,
  },
  Valor: {
    type: Number,
    require: true,
  },
  Quantidade: {
    type: Number,
    required: true,
  },
  Carteira: {
    type: String,
    require: true,
  },
});

const Acoes = mongoose.model("Acoes", AcoesSchema);

module.exports = Acoes;
