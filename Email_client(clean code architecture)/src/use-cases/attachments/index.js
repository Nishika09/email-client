const dataAccess = require("../../data-access");

const makeInsertAttachmentUseCase=require("./insert-attachments");

const insertAttachmentUsecase= makeInsertAttachmentUseCase({
  usersDb:dataAccess.cockroach.attachments
})
  module.exports = Object.freeze({
   
    insertAttachmentUsecase
    
  });
  