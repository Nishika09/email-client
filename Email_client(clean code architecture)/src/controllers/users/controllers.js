function getAllUsersabc({ getAllUsers }) {
  return async function getAllUserController(req, res) {
    const result = await getAllUsers();
    res.send(result);
  };
}


module.exports = (getAllUsersabc);

// exports.getAllUsers = async (req, res) => {
//     console.log("inside function getallusers");
//     try {
//         console.log("inside try block")
//         const users = await usersUsecase.getAllUsers();
//       res.json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };

//   exports.getUserById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const user = await usersUsecase.getUserById(id);
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };

//   exports.createUser = async (req, res) => {
//     const { Name, Email } = req.body;
//     try {
//       const user = await usersUsecase.createUser(Name, Email);
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };

//   exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     try {
//       const user = await usersUsecase.updateUser(id, name, email);
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };

//   exports.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const user = await usersUsecase.deleteUser(id);
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };
