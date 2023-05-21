// module.exports = function makeDeleteUserUseCase({
//     Joi,
//     usersDb,
// }){
//     return async function deleteUserUsecase({id}) {
//         console.info(`Inside delete user use case`);
//        await usersDb.deleteUser({id});

//     }

// }

module.exports = function makeDeleteUserUseCase({ usersDb, Joi }) {
  return async function deleteUserUsecase({ id ,databaseName}) {
    console.info(`Inside delete user use case`);
    const deleteUserSchema = Joi.object({
      id: Joi.number().min(1).unsafe().required(),
    });

    // Validate input using Joi
    const { error } = deleteUserSchema.validate({id});
    if (error) {
      throw new Error(error.message);
    }
    const result = await usersDb.deleteUser({ id,databaseName });
    console.log(id+"kkkk");
    // console.log("hello ", result);
    
    return result;
  };
};
