

  module.exports = function makeGetAllUserAction({
    Joi,
    getAllUsers,
}) {
    return async function getAllUserController(req, res){
      const databaseName=req.headers['database_name'];
      console.log(databaseName);

        // console.info(`In create user controller`, req.body);
        
          
          const result = await getAllUsers({databaseName});
          res.status(200).send(result);
        };
        // Joi.validate();
       
    }