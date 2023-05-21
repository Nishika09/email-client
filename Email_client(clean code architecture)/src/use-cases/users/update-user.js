// module.exports = function makeUpdateUserUseCase({
//     usersDb,
// }){
//     return async function updateeUserUsecase({id,body}) {
//         console.info(`Inside create user use case`);
//        await usersDb.updateUser({id,body});
//         return body;
//     }

// }
// const Joi = require('joi');

module.exports = function makeUpdateUserUseCase({
    usersDb,
    Joi
}){
    return async function updateUserUseCase({id, Name,databaseName}) {
        console.info(`Inside update user use case`);
        console.log(id, Name)

        const schema = Joi.object({
            id: Joi.number().min(1).unsafe().required(),
            Name: Joi.string().min(3).max(50).required(),
            
        });

        const validation = schema.validate({id,Name});
        if (validation.error) {
            throw new Error(validation.error.details[0].message);
        }

        const result = await usersDb.updateUser({id, Name,databaseName});
        return result;
    }
}
