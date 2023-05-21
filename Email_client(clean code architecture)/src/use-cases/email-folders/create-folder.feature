Feature: Create New Folder.

    Scenario Outline: Try to create new Folder with invalid details, then it will throw error.
        Given User details Name: "<Name>",UserId: "<UserId>" to create new folder
        When Try to create new folder
        Then It will throw error: "<error>" with message: "<message>" while creating new folder
        And createFolder function will call <createFolderFunctionCallCount> time while creating new folder


        Examples:
            | Name    | UserId | createFolderFunctionCallCount | error | message                       |
            |         |        | 0                             | Error | '"Name" is required'          |
            | Starred |        | 0                             | Error | "\"UserId\" is required" |
            | Starred | a      | 0                             | Error | "\"UserId\" must be a number" |



    Scenario Outline: Try to create new folder with valid inputs, then it will throw error.
        Given User details Name: "<Name>",UserId: "<UserId>" to create new folder
        When Try to create new folder
        Then It will create new folder with details: "<newFolderDetails>"

        And createFolder function will call <createFolderFunctionCallCount> time while creating new folder

        Examples:
            | Name    | UserId | newFolderDetails | createFolderFunctionCallCount |
            | Starred | 1      | '{"id": 1}'      | 1                             |
            | Inbox   | 1      | '{"id": 1}'      | 1                             |
