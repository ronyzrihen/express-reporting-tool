const { Router } = require('express');
const {
  getReports, getReportById, createReport, updateReport, deleteReport,
} = require('../controller/damage_controller');

const damageRouter = new Router();
damageRouter.get('/', getReports);
damageRouter.get('/:id', getReportById);
damageRouter.post('/', createReport);
damageRouter.put('/:id', updateReport);
damageRouter.delete('/:id', deleteReport);

module.exports = { damageRouter };
