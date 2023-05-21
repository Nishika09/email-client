// module.exports = function makeDeleteEmailFolderAction({
//     Joi,
//     deleteEmailFolder,
// }) {
//     return async function deleteEmailFolderController(req, res){

//         // console.info(`In create user controller`, req.body);
//         const { id } = req.params;
          
//           const result = await deleteEmailFolder({id});
//           res.send(result);
//         };
//         // Joi.validate();
       
//     }


module.exports = function makeDeleteEmailFolderAction({
    Joi,
    deleteEmailFolder,
}) {
    return async function deleteEmailFolderController(req, res){
        const databaseName=req.headers['database_name']
        try {
            const { id } = req.params;

            // Define schema for validation
            const schema = Joi.object({
                id: Joi.number().min(1).required(),
            });

            // Validate request parameters against schema
            const { error } = schema.validate({ id });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const result = await deleteEmailFolder({id,databaseName});
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

