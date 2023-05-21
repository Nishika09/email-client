module.exports = function makeGetAllEmailFolderUseCase({
    usersDb,
}){
    return async function getAllEmailFolderUsecase(databaseName) {
        console.info(`Inside delete user use case`);
       const result=await usersDb.getAllEmailFolder(databaseName);
        return result;
    }

}
