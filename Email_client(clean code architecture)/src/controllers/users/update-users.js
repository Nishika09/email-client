// const { Joi } = require("joi");
// module.exports = function makeUpdateUserAction({ 
//     Joi,
//     updateUser 
// }) {
//   return async function updateUserController(req, res) {
//     const { id } = req.params;
//     // const { Name, Email } = req.body;

//     const Name = req.body.Name;
//     const Email = req.body.Email;
//     const Password = req.body.Password;

//     console.info(`In create user controller`, Name, Email, Password);
//     // const body = {
//     //     Name: req.body.Name,
//     //     Email: req.body.Email,
//     //     Password: req.body.Password,
//     //   };
//     //   console.log(body);
//     const result = await updateUser({ id, Name, Email, Password });
//     res.status(200).send(result);
//   };
// };

module.exports = function makeUpdateUserAction({ 
    Joi, 
    updateUser 
}) {
  return async function updateUserController(req, res) {
    const databaseName=req.headers['database_name']
    try {
        
      const  id  = req.params.id;
      console.log(typeof(id));
      console.log(id);
      const {Name} = req.body;

      const schema = Joi.object({
        id :Joi.number().min(1).unsafe().required(),
        Name: Joi.string().min(3).max(30).required(),
        
      });

      const { error, value } = schema.validate({ id ,Name});

      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      console.info(`In update user controller`, value);
console.log(id+"ok");
      const result = await updateUser({ id ,Name,databaseName});
      res.status(200).send("user updated");
    } catch (error) {
      console.error(error);
      // res.status(500).send("Internal server error");
    }
  };
};
