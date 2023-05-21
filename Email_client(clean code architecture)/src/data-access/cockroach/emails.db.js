const table_name = "Emails";
module.exports = function makeEmailsDbMethods({ con }) {
  return Object.freeze({
    insertEmails,
  });

  async function insertEmails({
    email_id,
    bodyHTML,
    subject,
    threadId,
    createdAt,
    updatedAt,
    UserId,
    isRead,
    messageId,
    isReplyTo,
    isScheduledAt,
    snippet,
    isArchieved,
    isTrash,
    databaseName,
  }) {
    console.log("inside inside emails data-access");
    console.log(databaseName);

    const result = await con.query(
      ` INSERT INTO ${databaseName}."Emails" (
         "Body", "Subject", "ThreadId", "createdAt", "updatedAt", "UserId", "isRead","messageId", "inReplyTo", "scheduledAt", "Snippet", "isArchieved", "isTrashed"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) `,
      [
       
        bodyHTML,
        subject,
        threadId,
        createdAt,
        updatedAt,
        UserId,
        isRead,
        email_id,
        isReplyTo,
        isScheduledAt,
        snippet,
        isArchieved,
        isTrash,
      ]
    );
    console.log("email inserted");
  }
};
