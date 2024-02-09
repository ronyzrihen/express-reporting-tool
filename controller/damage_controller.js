const DamageRepository = require('../repository/damage_repository');
const { PropertyNotFound } = require('../errors/NotFoundError');
const {
  PropertyNotProvided, DataAlreadyExist, TypeError, ValueError,
} = require('../errors/DataError');

function checkID(id) {
  if (!id) throw new PropertyNotProvided('ID');
  if (!/^-?\d*\.?\d+$/.test(id)) throw new TypeError('ID');
  if (id < 0) throw new ValueError('ID');
}

const repository = new DamageRepository();

async function getReports(req, res) {
  const data = await repository.find();
  res.status(200).json(data);
}

async function getReportById(req, res) {
  checkID(req.params.id);
  const data = await repository.getOneId(req.params.id);
  if (!data) throw new PropertyNotFound('ID');
  res.status(200).json(data);
}
async function createReport(req, res) {
  checkID(req.body.id);
  const { id } = req.body;
  const data = await repository.getOneId(id);
  if (data.length) throw new DataAlreadyExist(`ID: ${id}`);
  const createdData = await repository.createReport(req.body);
  res.status(201).json({ Success: 1, data: createdData });
}

async function updateReport(req, res) {
  checkID(req.params.id);
  checkID(req.body.id);
  const paramID = req.params.id;
  const bodyID = req.body.id;
  const existingData = await repository.getOneId(bodyID);
  if (parseFloat(paramID) !== parseFloat(bodyID) && existingData) throw new DataAlreadyExist(`New ID: ${bodyID}`);
  await repository.updateReport(paramID, req.body);
  res.status(201).json({ success: 1 });
}

async function deleteReport(req, res) {
  checkID(req.params.id);
  const exist = await repository.getOneId(req.params.id);
  if (!exist.length) throw new PropertyNotFound(`ID: ${req.params.id}`);
  await repository.delete(req.params.id);
  res.status(410).json({ success: 1 });
}

module.exports = {
  getReports, getReportById, createReport, updateReport, deleteReport,
};
