// module.exports = function makeGetAllUserByIdUseCase({
//     usersDb,
// }){
//     return async function getAllUserByIdUsecase(id) {
//         console.info(`Inside get user by id  use case`);
//        const result=await usersDb.getAllUsersById(id);
//         return result;
//     }

// }


module.exports = function makeGetAllUserByIdUseCase({
    Joi,
    usersDb
}){
    return async function getAllUserByIdUsecase(id,databaseName) {
        const schema = Joi.number().min(1).unsafe().required();
        const { error } = schema.validate(id);
        if (error) {
            throw new Error(`Invalid ID: ${error.message}`);
        }
        console.info(`Inside get user by id  use case`);
        console.log(id+"kkkk");
        const result = await usersDb.getAllUsersById(id,databaseName);
        return result;
    }
}
