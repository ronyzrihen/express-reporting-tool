const DamageRepository = require('../repository/damage_repository');
const { PropertyNotFound } = require('../errors/NotFoundError');

const repository = new DamageRepository();

async function getReports(req, res, next) {
  try {
    const data = await repository.find();
    res.status(200).json(data);
  } catch (e) { next(e); }
}

async function getReportById(req, res, next) {
  if (req.params.id) next();
  try {
    const data = await repository.getOneId(req.params.id);
    if (!data) next(new PropertyNotFound('id'));// todo id not found error
    res.status(200).json(data);
  } catch (e) { next(e); }
}

async function createReport(req, res, next) {
  if (!req.body.id) throw next(new PropertyNotFound('id'));
  try {
    await repository.createReport(req.body);
    res.status(201).json({ Success: 1 });
  } catch (e) { next(e); }
}
async function updateReport(req, res, next) {
  if (!req.params.id) next(new PropertyNotFound('id'));
  try {
    await repository.updateReport(req.params.id, req.body);
    res.status(201).json({ success: 1 });
  } catch (e) { next(e); }
}

async function deleteReport(req, res, next) {
  if (!req.params.id) next(new PropertyNotFound('id'));
  try {
    await repository.delete(req.params.id);
    res.status(201).json({ success: 1 });
  } catch (e) { next(e); }
}

module.exports = {
  getReports, getReportById, createReport, updateReport, deleteReport,
};
