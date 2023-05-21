Feature: Update User.

    Scenario Outline: Try to update user with invalid details, then it will throw error.
        Given User details id: "<id>", Name: "<Name>"
        When Try to update user
        Then It will throw error: "<error>" with message: "<message>" while updating user
        And updateUser function will call <updateUserFunctionCallCount> time while updating user



        Examples:
            | id | Name    | updateUserFunctionCallCount | error | message                   |
            |    |         | 0                           | Error | '"id" is required'        |
            | 1  |         | 0                           | Error | '\"Name\" is required'    |
            | a  | Nishika | 0                           | Error | '\"id\" must be a number' |


    Scenario Outline: Try to update user with valid inputs, then it will throw error.
        Given User details id: "<id>", Name: "<Name>"
        When Try to update user
        Then It will update user with details: <newUserDetails>

        And updateUser function will call <updateUserFunctionCallCount> time while updating user



        Examples:
            | id | Name    | newUserDetails | updateUserFunctionCallCount |
            | 1  | Nishika | 1              | 1                           |
