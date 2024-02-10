const { Router } = require('express');
const { NotImplementedError } = require('../errors/ServerError');
const {
  getReports, getReportById, createReport, updateReport, deleteReport,
} = require('../controller/damage_controller');

const damageRouter = new Router();
damageRouter.get('/', getReports);
damageRouter.get('/:id', getReportById);
damageRouter.post('/', createReport);
damageRouter.put('/:id', updateReport);
damageRouter.delete('/:id', deleteReport);
damageRouter.all('*', () => { throw new NotImplementedError('Request not implemented'); });
module.exports = { damageRouter };
