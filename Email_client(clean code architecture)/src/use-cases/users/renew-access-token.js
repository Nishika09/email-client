// module.exports = function makeRefreshAccessToken({ usersDb }) {
//   return async function expiredAcessToken() {
//     console.info(`Inside renew access token use case`);
//     // console.log(databaseName);
//     try {
//       var currentDate = new Date();
//       currentDate = Date.parse(currentDate);
//       const result = await usersDb({ currentDate });
//       return result;
//     } catch (err) {
//       throw err;
//     }
//   };
// };
module.exports = function makeRefreshAccessTokenUseCase({
  usersDb,
})
{
  return async function refreshAccessTokenUseCase( { id,Access_Token,Expiry_Date,databaseName } )
  {
    console.log(id);
      return await usersDb.updateUserAccessToken({ id,Access_Token,Expiry_Date,databaseName});
  }
}
