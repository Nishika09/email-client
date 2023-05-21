const Joi = require("joi");
const useCases = require("../../use-cases");

const makeCreateUserAction = require("./create-user");
const makeDeleteUserAction = require("./delete-users");
const makeUpdateUserAction = require("./update-users");
const makeGetAllUserAction = require("./get-all-users");
const makeGetAllUserByIdAction = require("./get-users-by-id");

// useCases.users.defaultFolders()
const createCreateuserController = makeCreateUserAction({
  Joi,
  createUser: useCases.users.createUser,
  defaultFolders: useCases.users.defaultFolders,
  existingUsers: useCases.users.existingUsers
});
const createDeleteUserController = makeDeleteUserAction({
  Joi,
  deleteUser: useCases.users.deleteUser,
  getAllUsersById:useCases.users.getAllUsersById
});
const createUpdateUserController = makeUpdateUserAction({
  Joi,
  updateUser: useCases.users.updateUser,
});
const createGetAllUserController = makeGetAllUserAction({
  Joi,
  getAllUsers: useCases.users.getAllUsers,
});
const createGetAllUserByIdController = makeGetAllUserByIdAction({
    Joi,
    getAllUsersById: useCases.users.getAllUsersById,
  });
  

module.exports = Object.freeze({
  createCreateuserController,
  createDeleteUserController,
  createUpdateUserController,
  createGetAllUserController,
  createGetAllUserByIdController
});
