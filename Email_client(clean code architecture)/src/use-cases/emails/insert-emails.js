module.exports = function makeInsertEmailsUseCase({ usersDb }) {
  return async function insertEmailsUsecase({
    messageRes,
    UserId,
    databaseName,
  }) {
    console.info(`Inside insert mail use case`);

    try {
      const {
        id: email_id,
        payload: { headers, body },
        threadId,
        internalDate,
      } = messageRes.data;

      const findHeader = (name) => {
        const header = headers.find(
          (h) => h.name.toLowerCase() === name.toLowerCase()
        );
        return header ? header.value : "";
      };

      const subject = findHeader("subject");
      const createdAt = new Date(parseInt(internalDate));
      const updatedAt = messageRes.headers.date;

      const timestampString = updatedAt;
      const timestamp = new Date(timestampString);
      const UpdatedAt = timestamp.toISOString(); // Convert to "YYYY-MM-DDTHH:MI:SS.SSSZ" format

      const isRead = messageRes.data.labelIds.includes("UNREAD");
      const messageId = findHeader("message-id");
      const isReplyTo = findHeader("in-reply-to");
      const isScheduledAt = new Date().toUTCString();


      const timeStamp = isScheduledAt;
      const timestamping = new Date(timeStamp);
      const iSscheduledAt = timestamping.toISOString();


      const snippet = messageRes.data.snippet;
      const isArchived = messageRes.data.labelIds.includes("ARCHIVED");
      const isTrash = messageRes.data.labelIds.includes("TRASH");
      let bodyHTML;




      console.log(
        subject,
        createdAt,
        UpdatedAt,
        isRead,
        messageId,
        isReplyTo,
        iSscheduledAt,
        snippet,
        isArchived,
        isTrash
      );

      if (
        messageRes &&
        messageRes.data &&
        messageRes.data.payload &&
        messageRes.data.payload.body
      ) {
        const emailHTML = messageRes.data.payload.body.data;
        if (emailHTML) {
          bodyHTML = Buffer.from(emailHTML, "base64").toString("utf-8");
        } else {
          console.log("Email HTML content is missing.");
        }
      } else {
        console.log("Email response is invalid or incomplete.");
      }
      console.log("db name:::;", databaseName);
      await usersDb.insertEmails({
        email_id,
        bodyHTML,
        subject,
        threadId,
        createdAt,
        UpdatedAt,
        UserId,
        isRead,
        messageId,
        isReplyTo,
        iSscheduledAt,
        snippet,
        isArchived,
        isTrash,
        databaseName
    });
    } catch (err) {
      console.error(err);
      throw err;
    }

    // const result=await usersDb.insertmail({email_id, bodyHTML, subject, threadId,createdAt,updatedAt,user_id,isRead,messageId,isReplyTo,isScheduledAt,snippet,isArchived,isTrash });
    // console.log(result);
    // return result;
  };
};
