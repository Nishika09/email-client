Feature: Create New Folder.


    Scenario Outline: Try to create new folder with already registered folder name , then it will throw error.
        Given User details Name: "<Name>", UserId: "<UserId>" to create new folder
        And Already existed folder details: "<folderDetailsByUserId>" with same UserId
        When Try to create new folder
        Then It will throw error: "<error>" with message: "<message>" while creating new folder

        And createFolder function will call <createFolderFunctionCallCount> time while creating new folder

        Examples:
            | Name    | UserId | folderDetailsByUserId | createFolderFunctionCallCount | error | message                                         |
            | Starred | 1      | '{"UserId":"10"}'      | 0                             | Error | 'Folder with the same UserId is already exists' |
