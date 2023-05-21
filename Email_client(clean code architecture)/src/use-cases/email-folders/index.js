const dataAccess = require("../../data-access");
const makeCreateEmailFolderUseCase = require("./create-folder");
const makeDeleteEmailFolderUseCase = require("./delete-folder");
const makeUpdateEmailFolderUseCase = require("./update-folder");
const makeGetAllEmailFolderUseCase = require("./get-all-email-folder");
const makeExistingFolderUseCase = require("./check-existing-folder");
const makeGetEmailFolderByIdUseCase = require("./get-email-folder-by-Id");
const makeFetchGmailFolders = require("./fetch-labels");
 const makeUpdateProviderUseCase=require('./update-provider-id');

const Joi = require("joi");

const createEmailFolder = makeCreateEmailFolderUseCase({
  usersDb: dataAccess.cockroach.folders,
  Joi,
});
const deleteEmailFolder = makeDeleteEmailFolderUseCase({
  Joi,
  usersDb: dataAccess.cockroach.folders,
});
const updateEmailFolder = makeUpdateEmailFolderUseCase({
  Joi,
  usersDb: dataAccess.cockroach.folders,
});
const getAllEmailFolder = makeGetAllEmailFolderUseCase({
  Joi,
  usersDb: dataAccess.cockroach.folders,
});

const existingFolder = makeExistingFolderUseCase({
  Joi,
  usersDb: dataAccess.cockroach.folders,
});
const getAllEmailFolderById = makeGetEmailFolderByIdUseCase({
  Joi,
  usersDb: dataAccess.cockroach.folders,
});
const fetchGmailFolders = makeFetchGmailFolders({
    Joi
});
const updateProviderId=makeUpdateProviderUseCase({
  usersDb:dataAccess.cockroach.folders
})

module.exports = Object.freeze({
  createEmailFolder,
  deleteEmailFolder,
  updateEmailFolder,
  getAllEmailFolder,
  existingFolder,
  getAllEmailFolderById,
  fetchGmailFolders,
  updateProviderId
});
