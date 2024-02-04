const { getDamageReports } = require('../repository/damage_repository');

function  getReports(req, res){
  const data = getDamageReports;

}
function  getReportById(req,
                        res){}
function  createReport(req, res){}
function  updateReport(req, res){}


module.exports={ getReports, getReportById, createReport, updateReport};