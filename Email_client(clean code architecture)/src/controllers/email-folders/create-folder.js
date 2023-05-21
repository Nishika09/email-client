
module.exports = function makeCreateEmailFolderAction({
  Joi,
  createEmailFolder,
  existingFolder,
}) {
  return async function createEmailFolderController(req, res) {
    const databaseName=req.headers['database_name']
    try {
      console.info(`In create user controller`, req.body);
      
        const Name= req.body.Name;
        const UserId= req.body.UserId;
      
      // console.log(body);
      const result = await existingFolder({Name,UserId,databaseName});
      if (!result){
        await validateCreateFolderReq({Name,UserId});
        await createEmailFolder( {Name,UserId,databaseName} );

        res.status(201).send("folder created");
      } else{
        res.status(404).send("folder name already exists");
      }
    } catch (error) {
      console.info(error);
      res.send(error);
    }
  };

  async function validateCreateFolderReq({Name,UserId}) {
    try {
      const createUserSchema = Joi.object({
        Name: Joi.string().required(),
        UserId: Joi.number().min(1).required(),
      });
      const { error } = createUserSchema.validate({Name,UserId});
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (error) {
      throw error;
    }
  }  
  // Joi.validate();
};
