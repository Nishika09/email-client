
module.exports = function makeUpdateEmailFolderAction({
    Joi,
    updateEmailFolder,
    existingFolder
  }) {
    return async function updateEmailFolderController(req, res) {
      const databaseName=req.headers['database_name']
        try {
      const id  = req.params.id;
      const Name=req.body.Name;
      const UserId=req.body.UserId;
      
  
      console.info(`In update email folder controller`, req.body);
      const result = await existingFolder({id,Name,UserId,databaseName});
      if (!result){
        await validateCreateFolderReq({id,Name,UserId});
        await updateEmailFolder( {id,Name,UserId,databaseName} );

        res.status(201).send("folder name updated");
      } else{
        res.status(404).send("folder name already exists");
      }
    } catch (error) {
      console.info(error);
      res.send(error);
    }
  };

  async function validateCreateFolderReq({id,Name,UserId}) {
    try {
      const Schema = Joi.object({
        id: Joi.number().min(1).required(),
        Name: Joi.string().required(),
        UserId: Joi.number().min(1).required(),
      });
      const { error } = Schema.validate({id,Name,UserId});
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (error) {
      throw error;
    }
  }  
}
  // Joi.validate();

  
//       const schema = Joi.object({
//         id: Joi.number().min(1).required(),
//         Name: Joi.string().required(),
//         UserId: Joi.number().min(1).required(),
//       });
  
//       const validation = schema.validate({ id, Name, UserId });
  
//       if (validation.error) {
//         return res.status(400).send(validation.error.message);
//       }
  
//       const result = await updateEmailFolder({ id, Name, UserId });
//       res.status(200).send(result);
//     };
//   };
  
  
  
  
  
  
  