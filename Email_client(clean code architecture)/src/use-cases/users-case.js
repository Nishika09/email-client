// const { getUsers}= require('../data-access');
  // createUser, getUserById, updateUserById, deleteUserById } = require('./dataAccess');


function getAllUsersUseCase({getAllUsersQueryDb}){
  return async function getAllUsers(){
    return await getAllUsersQueryDb()
  }
}
function createUserUseCase({createUserQueryDb}){
  return async function createUser(body){
    return await createUserQueryDb(body)
  }
}

module.exports = {getAllUsersUseCase,createUserUseCase}










// async function getAllUsers() {
//   try {
//     const users = await getUsers();
//     return { data: users };
//   } catch (error) {
//     console.error(error);
//     return { error: 'Failed to retrieve users' };
//   }
// }

// async function createUser(user) {
//   try {
//     const result = await createUser(user);
//     const createdUser = await getUserById(result.insertId);
//     return { success: true, data: createdUser };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: 'Failed to create user' };
//   }
// }

// async function getUser(id) {
//   try {
//     const user = await getUserById(id);
//     return { success: true, data: user };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: `Failed to retrieve user with id ${id}` };
//   }
// }

// async function updateUser(id, user) {
//   try {
//     const result = await updateUserById(id, user);
//     if (result.affectedRows === 0) {
//       return { success: false, error: `User with id ${id} not found` };
//     }
//     const updatedUser = await getUserById(id);
//     return { success: true, data: updatedUser };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: `Failed to update user with id ${id}` };
//   }
// }

// async function deleteUser(id) {
//   try {
//     const result = await deleteUserById(id);
//     if (result.affectedRows === 0) {
//       return { success: false, error: `User with id ${id} not found` };
//     }
//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: `Failed to delete user with id ${id}` };
//   }
// }

// module.exports = {
//   getAllUsers,
//   // createUser,
//   // getUser,
//   // updateUser,
//   // deleteUser,
// };