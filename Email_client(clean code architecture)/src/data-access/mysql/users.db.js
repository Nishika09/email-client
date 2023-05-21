// const { pool } = require('../config');
// module.exports = {
//     getAllUsers: async () => {
//       try {
//         console.log("inside data access");
//         const results = await pool.query('SELECT * FROM users');
//         return results.rows;
//       } catch (error) {
//         throw new Error(`Unable to fetch all users: ${error}`);
//       }
//     },
// }
const table_name = "users";
module.exports = function makeUserDbMethods({ con }) {
  return Object.freeze({
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    defaultFolders,
    existingUsers,
    getAllUsersById,
  });

  async function getAllUsers({databaseName}) {
    console.log(databaseName);
    const [result] = await con.query(`select * from ${databaseName}.users;`);
    return result;
  }
  async function getAllUsersById(id,databaseName) {
    console.log(databaseName);
    const [result] = await con.query(`select * from ${databaseName}.users where id=?`, [
      id,
    ]);
    return result;
  }

  async function createUser({ Name, Email, Password,databaseName }) {
    const [result] = await con.query(
      `INSERT INTO ${databaseName}.users (Name, Email, Password) VALUES (?, ?, ?)`,
      [Name, Email, Password]
    );
    console.log(result.insertId);
    return result.insertId;
  }

  async function deleteUser({ id ,databaseName}) {
    const [result] = await con.query(`DELETE FROM ${databaseName}.users WHERE id= ? `, [
      id,
    ]);
    console.log(result);
    return result;
  }

  async function updateUser({ id, Name,databaseName}) {
    const result = await con.query(
      `UPDATE ${databaseName}.users SET Name=? WHERE id=? `,
      [Name,id]
    );
    return result.affectedRows;
  }

  async function defaultFolders({ UserId }) {
    console.log("inside data access default folders");
    const folders = ["inbox", "archive", "sent", "trash", "outbox"];
    for (let i in folders) {
      const result = await con.query(
        `INSERT INTO  Email_Folder (UserId,Name) VALUES (?,?) `,
        [UserId, folders[i]]
      );
    }
  }
  async function existingUsers({ Email,databaseName }) {
    const [result] = await con.query(
      `SELECT * FROM ${databaseName}.users WHERE Email = ?`,
      [Email]
    );
    console.log(result);
    console.log(Email);
    return result;
  }
};
//     getUserById: async (id) => {
//       try {
//         const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
//         return result.rows[0];
//       } catch (error) {
//         throw new Error(`Unable to fetch user with id ${id}: ${error}`);
//       }
//     },

//     createUser: async (userData) => {
//       const { Name, Email, Password } = userData;
//       try {
//         const result = await pool.query(
//           'INSERT INTO users (name, email, password) VALUES (?, ?, ?) ',
//           [Name, Email, Password]
//         );
//         return result.rows[0];

//     },

//     updateUser: async (id, userData) => {
//       const { name, email, password } = userData;
//       try {
//         const result = await pool.query(
//           'UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 ',
//           [name, email, password, id]
//         );
//         return result.rows[0];
//       } catch (error) {
//         throw new Error(`Unable to update user with id ${id}: ${error}`);
//       }
//     },

//     deleteUser: async (id) => {
//       try {
//         const result = await pool.query('DELETE FROM users WHERE id=$1 ', [id]);
//         return result.rows[0];
//       } catch (error) {
//         throw new Error(`Unable to delete user with id ${id}: ${error}`);
//       }
//     },
//   };
