const express = require('express');
const logger = require('morgan');
const { errorHandler } = require('../middlewares/errorHendler');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const { damageRouter } = require('../routers/damageReportRouter');

app.use('/damage-reports', damageRouter);

app.use(errorHandler);

module.exports = { app };
