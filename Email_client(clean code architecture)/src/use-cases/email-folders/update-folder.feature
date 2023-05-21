Feature: Update Folder.

    Scenario Outline: Try to update folder with invalid details, then it will throw error.
        Given User details id: "<id>", Name: "<Name>",UserId: "<UserId>"
        When Try to update folder
        Then It will throw error: "<error>" with message: "<message>" while updating folder
        And updateFolder function will call <updateFolderFunctionCallCount> time while updating folder



        Examples:
            | id | Name    | UserId | updateFolderFunctionCallCount | error | message                  |
            |    |         |        | 0                             | Error | '"id" is required'       |
            | a  |         |        | 0                             | Error | '"id" is required'       |
            | 1  |         |        | 0                             | Error | '\"Name\" is required'   |
            | 1  | Starred |        | 0                             | Error | '\"UserId\" is required' |
            | 1  | Starred | a      | 0                             | Error | '\"UserId\" is required' |

    Scenario Outline: Try to update folder with valid inputs, then it will throw error.
        Given User details id: "<id>", Name: "<Name>",UserId: "<UserId>"
        When Try to update folder
        Then It will update folder with details: <message>
        And updateFolder function will call <updateFolderFunctionCallCount> time while updating folder



        Examples:
            | id | Name    | UserId | message     | updateFolderFunctionCallCount |
            | 1  | Starred | 1      | '{"id": 1}' | 1                             |
