module.exports = function makeGetAllUserUseCase({
    usersDb,
}){
    return async function getAllUserUsecase({databaseName}) {
        console.info(`Inside get all users use case`);
        console.log(databaseName);
       const result=await usersDb.getAllUsers({databaseName});
        return result;
    }

}
