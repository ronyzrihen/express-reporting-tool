const express = require('express');
const { errorHandler } = require('../middlewares/errorHendler');// todo add back

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { damageRouter } = require('../routers/damageReportRouter');

app.use('/damage-reports', damageRouter);

app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
