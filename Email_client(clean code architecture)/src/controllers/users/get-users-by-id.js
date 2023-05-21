module.exports = function makeGetAllUserByIdAction({
    Joi,
    getAllUsersById,
}) {
    return async function getAllUserByIdController(req, res){
        const databaseName=req.headers['database_name']
        // console.info(`In create user controller`, req.body);
          const id = req.params.id ; 
          console.log(id);
          const result = await getAllUsersById(id,databaseName);
          res.send(result);
        };
        // Joi.validate();
       
    }