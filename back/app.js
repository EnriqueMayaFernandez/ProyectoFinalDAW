const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors")
require("dotenv").config();
require("./db");

const apiRouter = require("./routes/api");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json())

const corsOptions ={
  origin:'*',
  credentials: true,
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.use(apiRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}!!`);
});