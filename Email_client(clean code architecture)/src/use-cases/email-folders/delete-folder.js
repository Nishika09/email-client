// module.exports = function makeDeleteEmailFolderUseCase({
//     usersDb,
// }){
//     return async function deleteEmailFolderUsecase({id}) {
//         console.info(`Inside delete user use case`);
//        await usersDb.deleteEmailFolder({id});
//         return true;
//     }

// }

module.exports = function makeDeleteEmailFolderUseCase({
    Joi,
    usersDb,
}){
    return async function deleteEmailFolderUsecase({ id,databaseName }) {
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });

        const validation = schema.validate({ id });

        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        console.info(`Inside delete user use case`);
        await usersDb.deleteEmailFolder({ id, databaseName});
        return id;
    }
}
