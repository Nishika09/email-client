// function makeAuth({
//   oauth2Client
// }){
//   return async function authFunction(req,res){
//     console.log("hereee");

// const fetchFolder = require("../../use-cases/email-folders/fetch-folder");
// const fetchFolder = require("../../use-cases/email-folders/fetch-folder");
// const  fetchGmailFolders  = require("../../use-cases/email-folders");
// const createFolder = require("../email-folders/create-folder");
// const getUserId=require('../../use-cases/users/get-user-id-by-email');
// const createUser = require("../users/create-user");

//     // Redirect the user to the authorization page
//     const authorizeUrl=oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: ["email","profile","https://mail.google.com/",
//       'https://www.googleapis.com/auth/gmail.readonly',
//       'https://www.googleapis.com/auth/gmail.modify',
//       'https://www.googleapis.com/auth/gmail.labels',
//       'https://www.googleapis.com/auth/gmail.metadata']

//     });
//     // Redirect the user to the authorize URL
//     res.redirect(authorizeUrl);
//   }
// }

// module.exports=Object.freeze({
//   makeAuth
// })

function makeAuth({ oauth2Client, createUser, fetchGmailFolders, getUserId }) {
  return Object.freeze({
    authFunction,
    authCallback,
  });
  function authFunction(req, res) {
    console.log("hereee");
    try {
      // Redirect the user to the authorization page
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "email",
          "profile",
          "https://mail.google.com/",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.modify",
          "https://www.googleapis.com/auth/gmail.labels",
        ],
      });
      // Redirect the user to the authorize URL
      console.log("AUTH URL :::", authorizeUrl);
      res.redirect(authorizeUrl);
    } catch (err) {
      console.log(err);
    }
  }

  async function authCallback(req, res) {
    const { code } = req.query;
    try {
      console.log("HEllo nishi");
      const { tokens } = await oauth2Client.getToken(code);

      console.log(tokens);

      console.log(res);
      console.log("heyyyy");
      oauth2Client.setCredentials(tokens);
      const { data } = await oauth2Client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        method: "GET",
      });
      console.log("down");
      // const databaseName = "database5";
      // if (tokens.Refresh_Token) {

      const result = await createUser({
        Name: data.name,
        Email: data.email,
        Password: "password",
        Access_Token: tokens.access_token,
        Refresh_Token: tokens.refresh_token,
        Expiry_Date: tokens.expiry_date,
        databaseName: "database5",
      });

      const userId = await getUserId({
        Email: data.email,
        databaseName: "database5",
      });
      console.log(userId);

      const folders = await fetchGmailFolders({
        AccessToken: tokens.access_token,
        RefreshToken: tokens.refresh_token,
        databaseName: "database5",
        UserId: userId,
      });

      console.log(folders);
      console.log("result:" + result);
      console.log("finished");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Object.freeze({
  makeAuth,
});
