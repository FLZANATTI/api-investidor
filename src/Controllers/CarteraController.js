const express = require("express");
const CarteiraModel = require("../Models/Carteira");
const AcoesModel = require("../Models/Acoes");

const router = express.Router();

router.post("/", async (req, res) => {
  const { Nome } = req.body;
  try {
    if (await CarteiraModel.findOne({ Nome }))
      return res
        .status(400)
        .send({ error: "Carteira já cadastrada, tente outro nome." });

    const carteira = await CarteiraModel.create(req.body);
    return res.send({ carteira });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao criar carteira!",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const carteiras = await CarteiraModel.find();
    var data = [];
    await Promise.all(carteiras.map(async item => {
      const acoes = await AcoesModel.find({ Carteira: item.Nome }).exec();
      var total = acoes.reduce(function(total, acao){
        var valorTotal = acao.Quantidade * acao.Valor;
        return total + valorTotal;
      }, 0);

      data = [...data, {Nome: item.Nome, Valor: total}]
    }));

    return await res.send({ data });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao listar carteiras!",
    });
  }
});

router.get("/busca-acoes/:Carteira", async (req, res) => {
  const Carteira = req.params.Carteira;
  try {
    const acoes = await AcoesModel.find({ Carteira: Carteira }).exec();
    return res.send({ acoes });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao listar ações da carteira!",
    });
  }
});

module.exports = (app) => app.use("/carteira", router);
