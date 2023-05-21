Feature: Create Existing User.


    Scenario Outline: Try to create new user with already registered email, then it will throw error.
        Given User details Email: "<Email>" to create new user
        And Already existed user details: "<userDetailsByEmail>" with same email
        When Try to create existing user
        Then It will throw error: "<error>" with message: "<message>" while creating new user

        And existingUser function will call <existingUserFunctionCallCount> time while creating new user

        Examples:
            | Email             | userDetailsByEmail | existingUserFunctionCallCount | error | message                                      |
            | aman@rapidops.com | '{"id":"10"}'      | 1                             | Error | 'User with the same email is already exists' |
