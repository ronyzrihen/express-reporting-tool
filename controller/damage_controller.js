const DamageRepository = require('../repository/damage_repository');
const { PropertyNotFound } = require('../errors/NotFoundError');
const {
  PropertyNotProvided, DataAlreadyExist, TypeError, ValueError,
} = require('../errors/DataError');

function checkID(id) {
  if (!id) throw new PropertyNotProvided('ID');
  // if (!/^-?\d*\.?\d+$/.test(id)) throw new TypeError('ID');
  // if (id < 0) throw new ValueError('ID');
}

const repository = new DamageRepository();

async function getReports(req, res) {
  const data = await repository.find();
  res.status(200).json(data);
}

async function getReportById(req, res) {
  checkID(req.params.id);
  const data = await repository.getOneId(req.params.id);
  if (!data.length) throw new PropertyNotFound('ID');
  res.status(200).json(data);
}
const getReportByTitle = async (req, res) => {
  const { title } = req.params;
  if (!title) throw new PropertyNotProvided('Title');
  const data = await repository.getTitles(title);
  if (!data.length) throw new PropertyNotFound('Title');
  res.status(200).json(data);
};
async function createReport(req, res) {
  if (!req.body.title) throw new PropertyNotProvided('title');
  if (!req.body.desc) throw new PropertyNotProvided('description');
  const createdData = await repository.createReport(req.body);
  res.status(201).json(createdData);
}

async function updateReport(req, res) {
  checkID(req.params.id);
  const paramID = req.params.id;
  const existingData = await repository.getOneId(paramID);
  if (!existingData.length) throw new PropertyNotFound(`ID ${paramID}`);
  await repository.updateReport(paramID, req.body);
  res.status(201).json({ success: 1 });
}

async function deleteReport(req, res) {
  checkID(req.params.id);
  const exist = await repository.getOneId(req.params.id);
  if (!exist.length) throw new PropertyNotFound(`ID: ${req.params.id}`);
  await repository.delete(req.params.id);
  res.status(200).json({ success: 1 });
}

module.exports = {
  getReports,
  getReportByTitle,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
