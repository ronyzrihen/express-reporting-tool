const { Router } = require('express');
const { getReports } = require('../controller/damage_controller');

const damageRouter = new Router();

damageRouter.get('/', getReports);
// damageRouter.get('/:id', getReportById);
// damageRouter.post('/', createReport);
// damageRouter.put('/:id', updateReport);

module.exports = { damageRouter };
