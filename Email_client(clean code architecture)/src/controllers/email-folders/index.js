const Joi = require("joi");
const useCases = require("../../use-cases");
const makeCreateEmailFolderAction = require("./create-folder");
const makeDeleteEmailFolderAction = require("./delete-folder");
const makeUpdateEmailFolderAction = require("./update-folder");
const makeGetAllEmailFolderAction = require("./get-all-email-folders");
const makeGetAllEmailFolderByIdAction = require("./get-email-folder-by-Id");


const createCreateEmailFolderController = makeCreateEmailFolderAction({
  Joi,
  createEmailFolder: useCases.emailFolder.createEmailFolder,
  existingFolder: useCases.emailFolder.existingFolder,
});

const createDeleteEmailFolderController = makeDeleteEmailFolderAction({
  Joi,
  deleteEmailFolder: useCases.emailFolder.deleteEmailFolder,
});
const createUpdateEmailFolderController = makeUpdateEmailFolderAction({
  Joi,
  updateEmailFolder: useCases.emailFolder.updateEmailFolder,
  existingFolder: useCases.emailFolder.existingFolder,
});
const createGetAllEmailFolderController = makeGetAllEmailFolderAction({
  Joi,
  getAllEmailFolder: useCases.emailFolder.getAllEmailFolder,
});
const createGetAllEmailFolderByIdController = makeGetAllEmailFolderByIdAction({
  Joi,
  getAllEmailFolderById: useCases.emailFolder.getAllEmailFolderById,
});

module.exports = Object.freeze({
  createCreateEmailFolderController,
  createDeleteEmailFolderController,
  createUpdateEmailFolderController,
  createGetAllEmailFolderController,
  createGetAllEmailFolderByIdController,
});
