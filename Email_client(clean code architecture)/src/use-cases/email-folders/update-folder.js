// module.exports = function makeUpdateEmailFolderUseCase({
//     Joi,
//     usersDb,
// }){
//     return async function updateEmailFolderUsecase({id,Name,UserId}) {
//         console.info(`Inside create user use case`);
//        await usersDb.updateEmailFolder({id,Name,UserId});
//         return {Name,UserId};
//     }

// }
module.exports = function makeUpdateEmailFolderUseCase({
    Joi,
    usersDb,
  }) {
    return async function updateEmailFolderUsecase({ id, Name, UserId ,databaseName}) {
      console.info(`Inside create user use case`);
      
      
      const schema = Joi.object({
        id: Joi.number().min(1).required(),
        Name: Joi.string().required(),
        UserId: Joi.number().min(1).required(),
      });
  
      const validation = schema.validate({ id, Name, UserId });
  
      if (validation.error) {
        throw new Error(validation.error.message);
      }
  
      const result = await usersDb.updateEmailFolder({ id, Name, UserId ,databaseName});
      console.log(result);
      return result;
    };
  };