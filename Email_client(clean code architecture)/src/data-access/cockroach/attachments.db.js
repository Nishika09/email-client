const table_name = "Email_Attachments";
module.exports = function makeAttachmentsDbMethods({ con }) {
  return Object.freeze({
    insertAttachments,
  });

  async function insertAttachments({
    databaseName,
    file_name,
    email_id,
    size,
    type,
    createdAt,
    updatedAt,
    message_attachment_id
  }) {
    console.log("inside insert attachments data-access");
    console.log(databaseName);

    const result = await con.query(
      ` INSERT INTO ${databaseName}."Email_Attachments" (
         "Email_Id", "FileName", "size", "Type", "createdAt","updatedAt") VALUES ( $1, $2, $3, $4, $5,$6) `,
      [
       
        databaseName,
        file_name,
        email_id,
        size,
        type,
        createdAt,
        updatedAt,
        message_attachment_id
        
      ]
    );
    console.log("attachments inserted");
  }
};
