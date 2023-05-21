const table_name = "Email_Folders";
module.exports = function makeEmailFolderDbMethods({ con }) {
  return Object.freeze({
    createEmailFolder,
    deleteEmailFolder,
    updateEmailFolder,
    getAllEmailFolder,
    existingFolder,
    getAllEmailFolderById,
    updateProviderId,
    fetchLabelsByPriority,
    markFetched
  });

  async function getAllEmailFolder(databaseName) {
    const [result] = await con.query(
      `select * from "${databaseName}.table_name";`
    );
    return result;
  }
  // async function createEmailFolder({ Name, UserId, databaseName }) {
  //   console.log(Name, UserId);
  //   const result = await con.query(
  //     `INSERT INTO "${databaseName}.table_name" (Name,UserId) VALUES (?, ?)`,
  //     [Name, UserId]
  //   );
  //   return result[0];
  // }
  async function deleteEmailFolder({ id, databaseName }) {
    const result = await con.query(
      `DELETE FROM "${databaseName}.table_name" WHERE id= ? `,
      [id]
    );
    return result[0];
  }
  async function updateEmailFolder({ id, Name, UserId, databaseName }) {
    const result = await con.query(
      `UPDATE "${databaseName}.table_name" SET "Name"=?, "UserId"=? WHERE id=? `,
      [Name, UserId, id]
    );
    return result[0];
  }
  async function existingFolder({ Name, UserId, databaseName }) {
    const result = await con.query(
      `SELECT * FROM ${databaseName}."${table_name}" WHERE "Name" = $1 and "UserId" = $2`,
      [Name, UserId]
    );
    console.log("RESULT of check folder:::", result);
    console.log(result.rowCount);
    console.log(Name);
    return result.rowCount;
  }
  async function getAllEmailFolderById({ UserId, databaseName }) {
    console.log(UserId);
    const [result] = await con.query(
      `select * from "${databaseName}.table_name" where "UserId"=?`,
      [UserId]
    );
    console.log(result);
    console.log(UserId);

    return result;
  }

  async function createEmailFolder({
    Name,
    UserId,
    ProviderId,
    Priority,
    databaseName,
  }) {
    console.log("insidde create folder data-access");
    console.log(Name, UserId, ProviderId, Priority);
    // const existingFolder = await con.query(
    //   `SELECT * FROM ${databaseName}."Email_Folders" WHERE "Name"=$1 AND "UserId"=$2`,
    //   [Name, UserId]
    // );

    // if (existingFolder) {
    //   // Update the provider id of the existing folder
    //   await con.query(
    //     `UPDATE ${databaseName}."Email_Folders" SET "ProviderId"=$1 WHERE id=$2`,
    //     [ProviderId, existingFolder.id]
    //   );
    //   return existingFolder.id;
    // }

    // Insert the new folder into the email_folder table
    const result = await con.query(
      `INSERT INTO ${databaseName}."Email_Folders" ("Name", "UserId", "ProviderId","Priority") VALUES ($1, $2, $3, $4) RETURNING id`,
      [Name, UserId, ProviderId, Priority]
    );
    console.log("zzzzzzzzz");
    // return result[0].id;
  }

  async function updateProviderId({
    Name,
    UserId,
    databaseName,
    ProviderId,
    Priority,
  }) {
    console.log("in update providerid data accesss");
    console.log(Name, UserId, ProviderId, databaseName, Priority);
    // await con.query(
    //       `UPDATE ${databaseName}."Email_Folders" SET "ProviderId"=$1 WHERE id=$2 AND "Name"=$3`,
    //       [ProviderId,UserId,Name]
    //     );

    await con.query(
      `update ${databaseName}."Email_Folders" set "ProviderId"=$1,"Priority"=$2 where "UserId"=$3 and "Name"=$4`,
      [ProviderId, Priority, UserId, Name]
    );
    console.log("Done in updating");
    // return result[0];
  }
  async function fetchLabelsByPriority({ UserId, databaseName}) {
    console.log(UserId);
    const result = await con.query(
      `SELECT  "Name", "Priority" FROM ${databaseName}."Email_Folders" where "UserId"=$1 ORDER BY "Priority" ASC;`,
      [UserId]
    );
    console.log(result);
    console.log(UserId);

    return result;
  }

  async function markFetched({labelName,UserId,databaseName }) {
    console.info("Inside markFetched data-access");
    {
      const result = await connection.query(
        `update ${databaseName}."Email_Folders" set "Fetched"=$1 where "UserId"=$2 and "Name"=$3;`,
        ['true',UserId,labelName]
        );
      return result;
    }
  }



};
