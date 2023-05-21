module.exports = function makeGetAllEmailFolderAction({
    Joi,
    getAllEmailFolder,
}) {
    return async function getAllEmailFolderController(req, res){

        // console.info(`In create user controller`, req.body);
        
        const databaseName=req.headers['database_name']
          const result = await getAllEmailFolder(databaseName);
          res.send(result);
        };
        // Joi.validate();
       
    }