module.exports = function makeUpdateProviderUseCase({
    usersDb,
}){
    return async function updateProviderIdUsecase({UserId,Name,ProviderId,Priority,databaseName}) {
        console.info(`Inside update Providerid use case`);
       await usersDb.updateProviderId({UserId,Name,ProviderId,Priority,databaseName});
        // return body;
    }

}