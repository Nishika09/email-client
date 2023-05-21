const Joi =require("joi");
module.exports = function makeDeleteUserAction({
    Joi,
    deleteUser,
    getAllUsersById

}) {
    return async function deleteUserController(req, res){
        // console.log(user);
        const databaseName=req.headers['database_name']
        try {
            const  id  = req.params.id;
            console.log(id);
            const result =await getAllUsersById(id,databaseName)
            console.log(result);
            if(!result){
                
                await deleteUser({id,databaseName});
                res.status(204)
                .send('user deleted')
          }
          else{
            res.send("user Id does not exist")
          }
        } catch (error) {
        console.info(error);    
      res.status(400).send(error);
        }
        // console.info(`In create user controller`, req.body);
        
        // Joi.validate();
       
    }
}