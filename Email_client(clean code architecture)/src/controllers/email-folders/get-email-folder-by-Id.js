module.exports = function makeGetAllEmailFolderByIdAction({
    Joi,
    getAllEmailFolderById,
}) {
    return async function getAllEmailFolderByIdController(req, res){
        const databaseName=req.headers['database_name']

        // console.info(`In create user controller`, req.body);
        const UserId  = req.params.UserId;
          
          const result = await getAllEmailFolderById({UserId,databaseName});
          console.log(result);
          res.send(result);
        };
        // Joi.validate();
       
    }
