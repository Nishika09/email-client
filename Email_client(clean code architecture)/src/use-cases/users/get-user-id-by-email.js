module.exports = function makeGetUserIdUseCase({
    usersDb,
}){
    return async function getUserIdUsecase(Email,databaseName) {
        console.info(`Inside get UserId use case`);
       const result=await usersDb.getUserId(Email,databaseName);
       console.log(result);
        return result;
    }

}
