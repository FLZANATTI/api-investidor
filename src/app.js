const express = require("express");
const bodyParse = require('body-parser');
const cors = require('cors')

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  
  app.use(cors(corsOptions))
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

require('./Controllers/AcoesController')(app);
require('./Controllers/CarteraController')(app);

const port = process.env.PORT || 3501
app.listen(port);