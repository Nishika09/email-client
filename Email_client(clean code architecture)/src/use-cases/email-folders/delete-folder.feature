Feature: Delete Folder.

    Scenario Outline: Try to delete folder with invalid details, then it will throw error.
        # Given User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to delete new user
        Given User details id: "<id>"
        When Try to delete folder
        Then It will throw error: "<error>" with message: "<message>" while deleting folder
        And deleteFolder function will call <deleteFolderFunctionCallCount> time while deleting folder


        Examples:
            | id  | deleteFolderFunctionCallCount | error | message                   |
            |     | 0                             | Error | '"id" is required'        |
            | "a" | 0                             | Error | '\"id\" must be a number' |



    Scenario Outline: Try to delete folder with valid inputs, then it will throw error.
        # Given User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to delete new user
        Given User details id: "<id>"
        When Try to delete folder
        Then It will delete folder with details: <newFolderDetails>

        And deleteFolder function will call <deleteFolderFunctionCallCount> time while deleting folder

        Examples:
            | id | newFolderDetails | deleteFolderFunctionCallCount |
            | 1  | '{"id": "1"}'    | 1                             |
