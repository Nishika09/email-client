const table_name = "Email_Folder";
module.exports = function makeEmailFolderDbMethods({ con }) {
  return Object.freeze({
    createEmailFolder,
    deleteEmailFolder,
    updateEmailFolder,
    getAllEmailFolder,
    existingFolder,
    getAllEmailFolderById,
  });

  async function getAllEmailFolder() {
    const [result] = await con.query(`select * from ${table_name};`);
    return result;
  }
  async function createEmailFolder({Name,UserId }) {
    console.log(Name,UserId);
    const result = await con.query(
      `INSERT INTO ${table_name} (Name,UserId) VALUES (?, ?)`,
      [Name,UserId]
    );
    return result[0];
  }
  async function deleteEmailFolder({ id }) {
    const result = await con.query(`DELETE FROM ${table_name} WHERE id= ? `, [
      id,
    ]);
    return result[0];
  }
  async function updateEmailFolder({ id, Name,UserId }) {
    const result = await con.query(
      `UPDATE ${table_name} SET Name=?, UserId=? WHERE id=? `,
      [Name, UserId, id]
    );
    return result[0];
  }
  async function existingFolder({ Name, UserId }) {
    const result = await con.query(
      `SELECT * FROM ${table_name} WHERE Name = ? and UserId = ?`,
      [Name, UserId]
    );
    console.log(result)
    console.log(Name);
    return result[0];
  }
  async function getAllEmailFolderById({ UserId }) {
    console.log(UserId);
    const [result] = await con.query(
      `select * from ${table_name} where UserId=?`,
      [UserId]
    );
    console.log(result);
    console.log(UserId);

    return result;
  }
};
