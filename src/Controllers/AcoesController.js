const express = require("express");
const request = require("request");
const AcoesModel = require("../Models/Acoes");
const CarteiraModel = require("../Models/Carteira");


const router = express.Router();

router.post("/comprar", async (req, res) => {
  try {
    const Carteiras = CarteiraModel.findOne({
      Carteira: req.body.Carteira,
    }).exec();
    if (Carteiras === null)
      return res.status(404).send({
        error: "Carteira Inválida",
      });

    const acao = await AcoesModel.create(req.body);

    return res.send({ acao });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao comprar a ação!",
    });
  }
});

router.get("/busca-acoes/:Ticker", async (req, res) => {
  const Ticker = req.params.Ticker;
    try {
    request(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${Ticker}&apikey=HEG1S5A5N0PGL36X`, function (
      error,
      response,
      body
    ) {
      if (response.statusCode == 200) {
        const data = JSON.parse(body);
        var list = Object.values(data.bestMatches);
        var listNomes = []

        list.map(item => {
          listNomes = [...listNomes, item['1. symbol']]
        })
        res.status(200).send({
          data: listNomes ,
        });
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao consultar a api",
    });
  }
});



module.exports = (app) => app.use("/acoes", router);

// const hostname = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
// const path = "&symbol=IBM&outputsize=compac&apikey=HEG1S5A5N0PGL36X";

// router.get('/', ( req, res, next) => {
//     request(`${hostname}${path}`, function (error, response, body) {
//         if (response.statusCode == 200) {
//           res.status(200).send({
//             data: JSON.parse(body),
//           });
//         }
//       });
// });

// module.exports = router;
