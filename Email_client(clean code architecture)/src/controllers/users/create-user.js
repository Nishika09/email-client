const { Joi } = require("joi");

module.exports = function makeCreateUserAction({
  Joi,
  createUser,
  defaultFolders,
  existingUsers
}) {
  return async function createUserController(req, res) {
    const databaseName=req.headers['database_name']
    try {
      console.info(`In create user controller`, req.body);
    
        const Name=req.body.Name;
        const Email=req.body.Email;
        const Password= req.body.Password;
        console.log(req.body.databaseName);
        console.log(details.Email);
      
     const result= await existingUsers({Email,databaseName});
      if(!result){

      await validateCreateUserReq(req.body);
      
      const UserId = await createUser({ Name,Email,Password ,databaseName });

      // await defaultFolders({ UserId });
      res.status(201).send("user created");
      }
      else{
        res.send("user already exists");
      }
    } catch (error) {
     console.info(error)
      res.send(error.message);
    }
  };
  // Joi.validate();
  async function validateCreateUserReq(req) {
    try {
      const createUserSchema = Joi.object({
        Name: Joi.string().required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().min(6).required(),
      });
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        
        throw new Error(error.details[0].message);
      }
    } catch (error) {
      throw error;
    }
  }
};

// module.exports = function makeCreateUserController({
//     Joi,
//     createUser,
// }) {
//     const createUserSchema = Joi.object({
//         Name: Joi.string().required(),
//         Email: Joi.string().email().required(),
//         Password: Joi.string().min(6).required(),
//     });

//     return async function createUserController(req, res) {
//         console.info(`In create user controller`, req.body);
//         try {
//             const validatedBody = await createUserSchema.validateAsync(req.body);
//             const result = await createUser(validatedBody);
//             res.status(200).send(result);
//         } catch (error) {
//             res.status(400).send(error.details[0].message);
//         }
//     };
// }
