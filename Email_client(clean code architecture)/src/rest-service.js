const express = require("express");
const controllers = require("./controllers");
// const { createGetAllEmailFolderByIdController } = require("./controllers/email-folders");
const router = express.Router();

function init() {
  initUserRoutes();
  initEmailFolderRoutes();
  initAuthRoutes();
}

function initUserRoutes() {
  router.post("/users", controllers.userControllers.createCreateuserController);
  router.get("/users", controllers.userControllers.createGetAllUserController);
  router.get(
    "/users/:id",
    controllers.userControllers.createGetAllUserByIdController
  );
  router.put(
    "/users/:id",
    controllers.userControllers.createUpdateUserController
  );
  router.delete(
    "/users/:id",
    controllers.userControllers.createDeleteUserController
  );
}

function initEmailFolderRoutes() {
  router.post(
    "/emailfolders",
    controllers.emailFolderController.createCreateEmailFolderController
  );
  router.get(
    "/emailfolders",
    controllers.emailFolderController.createGetAllEmailFolderController
  );
  router.get(
    "/emailfolders/:UserId",
    controllers.emailFolderController.createGetAllEmailFolderByIdController
  );
  router.put(
    "/emailfolders/:id",
    controllers.emailFolderController.createUpdateEmailFolderController
  );
  router.delete(
    "/emailfolders/:id",
    controllers.emailFolderController.createDeleteEmailFolderController
  );
}
function initAuthRoutes() {
  router.get("/auth", controllers.authController.authFunction); //controllers.authController.authAction.authFunction)
  router.get("/auth/callback", controllers.authController.authCallback); //controllers.authController.authAction.authCallback);
}

init();

module.exports = router;
