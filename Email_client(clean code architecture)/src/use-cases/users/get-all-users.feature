Feature: Get All Users.


    Scenario Outline: Try to get all users
        # Given User details Email: "<Email>" to create new user

        When Try to get all user
        Then It will give all users: "<allUserDetails>"
        And getAllUser function will call <getAllUserFunctionCallCount> time while getting all user

        Examples:
            | allUserDetails | getAllUserFunctionCallCount |
            |                | 0                           |
