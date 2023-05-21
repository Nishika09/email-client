module.exports=function makegetAllRelatedUserUseCase({
    usersDb
})
{
    return async function getAllRelatedUserUseCase({currentTime,databaseName})
    {
        return await usersDb.getAllRelatedUser({currentTime,databaseName});
    }
}

