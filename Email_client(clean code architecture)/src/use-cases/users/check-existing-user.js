// module.exports = function makeExistingUserUseCase({ usersDb }) {
//     return async function ExistingUserUsecase({ Email }) {
//       console.info(`Inside existing user use case`);
     
//       const [result] = await usersDb.existingUsers({ Email });

//       return result;
//     };
//   };
  
const Joi = require('joi');


module.exports = function makeExistingUserUseCase({ usersDb,Joi }) {
  return async function ExistingUserUsecase({ Email,databaseName }) {
    console.info(`Inside existing user use case`);
    console.log(Email);
    console.log(databaseName);
    const existingUserSchema = Joi.object({
      Email: Joi.string().email().required(),
    });
    

    // Validate input using Joi
    const { error } = existingUserSchema.validate({ Email });
    if (error) {
      throw new Error(error.message);
    }

    const result = await usersDb.existingUsers({ Email,databaseName });
  console.log(result);
    return result;
  };
};
