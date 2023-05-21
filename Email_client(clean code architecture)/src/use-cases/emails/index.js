const dataAccess = require("../../data-access");
const makeFetchEmailsbyLabelUseCase = require("./fetch-emails-by-labels");
const makeInsertEmailsUseCase=require("./insert-emails");

const fetchEmailsByLabelUseCase = makeFetchEmailsbyLabelUseCase({
    usersDb: dataAccess.cockroach.folders
    
  });
const insertEmailsUsecase= makeInsertEmailsUseCase({
  usersDb:dataAccess.cockroach.emails
})
  module.exports = Object.freeze({
    fetchEmailsByLabelUseCase,
    insertEmailsUsecase
    
  });
  