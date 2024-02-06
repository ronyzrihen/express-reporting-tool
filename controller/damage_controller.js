const DamageRepository = require('../repository/damage_repository');

const repository = new DamageRepository();

async function getReports(req, res) {
  const data = await repository.find();
  res.status(200).json(data);
}

// async function getReportById(req, res) {
//
// }
//
// async function createReport(req, res) {
//
// }
//
// async function updateReport(req, res) {
//
// }

module.exports = { getReports };
