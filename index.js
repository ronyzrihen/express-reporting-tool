const express = require('express');
const errorHandler = require('./middlewares/errorHendler');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded());



app.listen(port, ()=> console.log(`Listening on port ${port}`));

