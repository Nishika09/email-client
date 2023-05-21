const userControllers = require('./users');
const emailFolderController=require('./email-folders');
const authController=require('./oauth');

module.exports = Object.freeze({
    userControllers,
    emailFolderController,
    authController
});