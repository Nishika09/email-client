const Joi = require("joi");
const dataAccess = require("../../data-access");


const makeCreateUserUseCase = require("./create-user");
const makeDeleteUserUseCase = require("./delete-user");
const makeUpdateUserUseCase = require("./update-user");
const makeGetAllUserUseCase = require("./get-all-users");
const makeDefaultFolders = require("./create-default-folders");
const makeExistingUserUseCase = require("./check-existing-user");
const makeGetAllUserByIdUseCase = require("./get-users-by-id");
const makeRefreshAccessTokenUseCase=require("./renew-access-token");
const makegetAllRelatedUserUseCase = require("./get-all-related-user");
const makeGetUserIdUseCase= require("./get-user-id-by-email");
const usersDb = require("../../data-access/cockroach/users.db");

const defaultFolders = makeDefaultFolders({
  usersDb: dataAccess.cockroach.users,
});
const createUser = makeCreateUserUseCase({
  Joi,
  usersDb: dataAccess.cockroach.users,
  defaultFolders
});
const deleteUser = makeDeleteUserUseCase({
  Joi,
  usersDb: dataAccess.cockroach.users,
});
const updateUser = makeUpdateUserUseCase({
  Joi,
  usersDb: dataAccess.cockroach.users,
});
const getAllUsers = makeGetAllUserUseCase({
  usersDb: dataAccess.cockroach.users,
});
const existingUsers = makeExistingUserUseCase({
  Joi,
  usersDb: dataAccess.cockroach.users,
});
const getAllUsersById = makeGetAllUserByIdUseCase({
  Joi,
  usersDb: dataAccess.cockroach.users,
});
const getAllRelatedUser=makegetAllRelatedUserUseCase({
usersDb:dataAccess.cockroach.users
});
const updateUserAccesToken=makeRefreshAccessTokenUseCase({
usersDb:dataAccess.cockroach.users
})
const getUserId=makeGetUserIdUseCase({
  usersDb:dataAccess.cockroach.users
})

module.exports = Object.freeze({
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  defaultFolders,
  existingUsers,
  getAllUsersById,
  getAllRelatedUser,
  updateUserAccesToken,
  getUserId
});
