Feature: Get Folder By Id.

    Scenario Outline: Try to get folder by id with invalid details, then it will throw error.
        # Given User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to delete new user
        Given User details id: "<UserId>"
        When Try to get folder by Id
        Then It will throw error: "<error>" with message: "<message>" while geting folder by id
        And getFolderById function will call <getFolderByIdFunctionCallCount> time while getting folder by id


        Examples:
            | UserId | getFolderByIdFunctionCallCount | error | message                       |
            |        | 0                              | Error | '"UserId" is required'        |
            | a      | 0                              | Error | '\"UserId\" must be a number' |



    Scenario Outline: Try to get folder by id with valid inputs, then it will throw error.
        # Given User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to delete new user
        Given User details id: "<UserId>"
        When Try to get folder by Id
        Then It will get folder by id with details: <newFolderDetails>

        And getFolderById function will call <getFolderByIdFunctionCallCount> time while getting folder by id

        Examples:
            | UserId | newFolderDetails  | getFolderByIdFunctionCallCount |
            | 1      | '{"UserId": "1"}' | 1                          |
