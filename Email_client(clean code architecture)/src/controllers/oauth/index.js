const { makeAuth } = require("./user-auth-google");
const userUsecase = require("../../use-cases");
const createUser = userUsecase.users.createUser;
const getUserId = userUsecase.users.getUserId
const fetchGmailFolders=userUsecase.emailFolder.fetchGmailFolders;
const { google } = require("googleapis");
// const  {OAuth2}  = require('google-auth-library');
const { OAuth2 } = google.auth;

const CLIENT_ID ="947117482583-54i30iuop0mqf673hqas7pdq0hf2941f.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

console.log("client" + JSON.stringify({ oauth2Client }));
const auth = makeAuth({ oauth2Client, createUser,getUserId,fetchGmailFolders});

// const authenticationAction= makeAuth({
//   oauth2Client,createUser:userUsecase.users.createUser
// })
const authAction = Object.freeze({
  authFunction: auth.authFunction,
  authCallback: auth.authCallback,
});
// module.exports = Object.freeze({
//   authAction,
// });
module.exports = authAction;
