// module.exports = function makeCreateEmailFolderUseCase({
//     usersDb,
// }){
//     return async function createEmailFolderUsecase({body}) {
//         console.info(`Inside create user use case`);
//        await usersDb.createEmailFolder({body});
//         return body;
//     }

// }
// const Joi = require('joi');

module.exports = function makeCreateEmailFolderUseCase({
    usersDb,
    Joi
}){
    return async function createEmailFolderUsecase({ Name,UserId,ProviderId,Priority,databaseName }) {
        // const schema = Joi.object({
        //     Name: Joi.string().trim().required(),
        //     UserId: Joi.number().min(1).unsafe().required(),
        // });
        // const { error } = schema.validate({Name,UserId});
        // if (error) {
        //     throw new Error(error.message);
        // }
        console.info(`Inside create folder use case`);
        const result=await usersDb.createEmailFolder({ Name,UserId,ProviderId,databaseName,Priority});
        console.log(result);
        return result;
    }
}

