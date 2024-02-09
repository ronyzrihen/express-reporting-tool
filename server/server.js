const express = require('express');
const logger = require('morgan');
const { errorHandler } = require('../middlewares/errorHendler');
require('express-async-errors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const { damageRouter } = require('../routers/damageReportRouter');

app.use('/damage-reports', damageRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
