Feature: Create New User.

      Scenario Outline: Try to create new user with invalid details, then it will throw error.
            Given Create User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to create new user
            When Try to create new user
            Then It will throw error: "<error>" with message: "<message>" while creating new user
            And createUser function will call <createUserFunctionCallCount> time while creating new user


            Examples:
                  | Name       | Email             | Password | createUserFunctionCallCount | error | message                                                  |
                  |            |                   |          | 0                           | Error | '"Name" is required'                                     |
                  | Aman Gupta |                   |          | 0                           | Error | '"Email" is required'                                    |
                  | Aman Gupta | aman              |          | 0                           | Error | '"Email" must be a valid email'                          |
                  | Aman Gupta | aman@rapidops.com |          | 0                           | Error | '"Password" is required'                                 |
                  | Aman Gupta | aman@rapidops.com | 1234     | 0                           | Error | "\"Password\" length must be at least 6 characters long" |



      Scenario Outline: Try to create new user with valid inputs, then it will throw error.
            Given Create User details Name:"<Name>",Email:"<Email>",and Password:"<Password>" to create new user
            When Try to create new user
            Then It will create new user with details: <newUserDetails>

            And createUser function will call <createUserFunctionCallCount> time while creating new user

            Examples:
                  | Name       | Email                   | Password   | newUserDetails    | createUserFunctionCallCount |
                  | Aman Gupta | aman.gupta@rapidops.com | 1234567890 | '{"insertId": 1}' | 1                           |
