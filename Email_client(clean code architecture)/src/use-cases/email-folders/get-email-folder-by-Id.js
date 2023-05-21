// module.exports = function makeGetEmailFolderByIdUseCase({
//     Joi,
//     usersDb,
// }){
//     return async function getAllEmailFolderByIdUsecase({UserId}) {
//         console.info(`Inside delete user use case`);
//        const result=await usersDb.getAllEmailFolderById({UserId});
//        console.log([result]);
//        return result;
        
//     }

// }


module.exports = function makeGetEmailFolderByIdUseCase({
  usersDb,
  Joi
}) {
  return async function getAllEmailFolderByIdUsecase({
    UserId,databaseName
  }) {
    // Define Joi schema for validation
    const schema = Joi.object({
      UserId: Joi.number().min(1).required(),
    });

    // Validate input
    const { error } = schema.validate({ UserId });
    if (error) {
      throw new Error(error.details[0].message);
    }

    console.info(`Inside delete user use case`);
    const result = await usersDb.getAllEmailFolderById({ UserId,databaseName });
    console.log([result]);
    return result;
  };
};