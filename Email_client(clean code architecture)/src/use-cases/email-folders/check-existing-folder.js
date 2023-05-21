// module.exports = function makeExistingFolderUseCase({ usersDb ,Joi}) {
//     return async function ExistingFolderUsecase({ Name,UserId }) {
//       console.info(`Inside existing user use case`);
     
//       const [result] = await usersDb.existingFolder({Name,UserId});

//       return result;
//     };
//   };
  
module.exports = function makeExistingFolderUseCase({ usersDb, Joi }) {
  const schema = Joi.object({
    Name: Joi.string().required(),
    UserId: Joi.number().min(1).unsafe().required(),
  });

  return async function ExistingFolderUsecase({ Name, UserId ,databaseName}) {
    console.info(`Inside existing user use case`);

    const { error } = schema.validate({ Name, UserId });
    if (error) {
      throw new Error(error.message);
    }

    const result = await usersDb.existingFolder({ Name, UserId ,databaseName});
    

    return result;
  };
};