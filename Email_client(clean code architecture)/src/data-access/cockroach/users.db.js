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
    updateUserAccessToken,
    getAllRelatedUser,
    getUserId,
  });

  async function getAllUsers({ databaseName }) {
    console.log(databaseName);
    const result = await con.query(`select * from ${databaseName}.users;`);
    console.log(result);
    return result;
  }
  async function getAllUsersById(id, databaseName) {
    console.log(databaseName);
    console.log(typeof id);
    // if (isNaN(id)) {
    //   throw new Error("Invalid ID");
    // }

    // const Id = BigInt(id);

    console.log(id);
    const { result } = await con.query(
      `select * from ${databaseName}.users where id=$1`,
      [id]
    );
    console.log("oo" + result);
    return result;
  }

  async function createUser({
    Name,
    Email,
    Password,
    databaseName,
    Access_Token,
    Refresh_Token,
    Expiry_Date,
  }) {
    const result = await con.query(
      `INSERT INTO ${databaseName}.users ("Name", "Email", "Password","Access_Token","Refresh_Token","Expiry_Date") VALUES ($1, $2, $3, $4, $5, $6) returning id;`,
      [Name, Email, Password, Access_Token, Refresh_Token, Expiry_Date]
    );
    console.log(result.rows[0].id + "KHxsj");
    return result.rows[0].id;
  }

  async function deleteUser({ id, databaseName }) {
    console.log(typeof id);
    // if (isNaN(id)) {
    //   throw new Error("Invalid ID");
    // }

    // const Id = BigInt(id);
    console.log("hello");
    const result = await con.query(
      `DELETE FROM ${databaseName}.users WHERE id=$1 `,
      [id]
    );
    console.log(result);
    // console.log(typeof id);
    return result.rowCount;
  }

  async function updateUser({ id, Name, databaseName }) {
    const result = await con.query(
      `UPDATE ${databaseName}.users SET "Name"=$1 WHERE id=$2`,
      [Name, id]
    );
    console.log(result + "ppp");
    return result.rowCount;
  }

  async function defaultFolders({ UserId, databaseName }) {
    console.log(databaseName, UserId );
    console.log("inside data access default folders");
    const folders = ["INBOX", "ARCHIVE", "SENT", "TRASH", "OUTBOX"];
    let result = [];
    for (let i in folders) {
      console.log("inside  default folders");
      result[i] = await con.query(
        `INSERT INTO ${databaseName}."Email_Folders" ("UserId","Name") VALUES ($1,$2) `,
        [UserId, folders[i]]
      );
      console.log("inside data access default ");
    }
    return result;
  }
  async function existingUsers({ Email, databaseName }) {
    const { result } = await con.query(
      `SELECT * FROM ${databaseName}.users WHERE "Email" = $1`,
      [Email]
    );
    console.log(result + "nnn");
    console.log(Email);
    return result;
  }

  // async function refreshAccessToken({ currentDate}) {
  //   const result = await con.query(
  //     `SELECT * FROM database5.users WHERE "Expiry_Date" > $1`,
  //     [currentDate]);
  //     // console.log(result)

  //   return result.rows;
  // }

  async function updateUserAccessToken({
    id,
    Access_Token,
    Expiry_Date,
    databaseName,
  }) {
    console.log(
      "AT AccesToken data access:",
      id,
      Access_Token,
      Expiry_Date,
      databaseName
    );
    const result = await con.query(
      `update ${databaseName}.users set("Access_Token","Expiry_Date") = ($1,$2) where "id"=$3`,
      [Access_Token, Expiry_Date, id]
    );
    console.log("RESULT", result);
    return result;
  }

  async function getAllRelatedUser({ currentTime, databaseName }) {
    console.log("Inside getAllRelatedUser data-access");
    const result = await con.query(
      `select * from ${databaseName}.users where "Expiry_Date"-${currentTime}>=60000;`
    ); //1800000
    return result.rows;
  }

  async function getUserId({ Email, databaseName }) {
    console.log("in get userId data access");
    console.log(Email, databaseName);
    const result = await con.query(
      `select id from database5.users where "Email"=$1`,
      [Email]
    );
    console.log(result.rows[0].id);
    // console.log(UserId);

    return result.rows[0].id;
  }

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
};
