module.exports = function makeInsertAttachmentsUseCase({ usersDb }) {
    return async function insertAttachmentUsecase({
      messageRes,
      email_id,
      databaseName,
    }) {
        try {
      console.info(`Inside insert attachment use case`);
  const {parts}= messageRes.data.payload;

  for(const part of parts){
    const {mimeType ,filename,body,body:{attachmentId},body:{size}}=part;
     
    if(part.filename && part.body.attachmentId){
        const message_attachment_id=attachmentId;
        const file_name=filename;
        const attachment_size=size;
        const type=mimeType;
        const createdAt= new Date(parseInt(messageRes.data.internalDate)).toISOString();
        const updatedAt=new Date().toISOString();


        console.log("email_id in usecase of attachments:",email_id);

        await usersDb.insertAttachments({
            databaseName,
            file_name,
            email_id,
            size:attachment_size,
            type,
            createdAt,
            updatedAt,
            message_attachment_id
        });
    }
  }
}catch(err){
    console.log(err);
    throw err;
}
    }
}
