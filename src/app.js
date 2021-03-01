const express = require('express');
const { config } = require('dotenv');
const router = require('./routes/index');

config();


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', router);

app.get("/", (req, res) => {
    res.send("Welcome");
  });
  


app.listen(port, () => {
    console.log(`Server Running on: ${port}`);
  });
  

  module.exports = app;
  